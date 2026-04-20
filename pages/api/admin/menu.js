const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const DATA_PATH = path.join(process.cwd(), "src/data/menuMobile.json");

// Database URL must be provided via environment variable
const DATABASE_URL = process.env.DATABASE_URL;

let pool;
if (DATABASE_URL) {
  if (!global._pgPool) {
    global._pgPool = new Pool({ connectionString: DATABASE_URL });
  }
  pool = global._pgPool;
}

function unauthorized(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Admin"');
  res.status(401).json({ error: "Unauthorized" });
}

async function readData() {
  const raw = await fs.promises.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeData(obj) {
  // create backup of current file before writing
  try {
    await ensureBackupsRotate();
  } catch (e) {
    console.warn("Backup rotation failed:", e);
  }

  const content = JSON.stringify(obj, null, 2);
  await fs.promises.writeFile(DATA_PATH, content, "utf8");
}

async function ensureBackupsRotate() {
  const backupsDir = path.join(path.dirname(DATA_PATH), "_backups_menu");
  await fs.promises.mkdir(backupsDir, { recursive: true });

  // if data file exists, create a timestamped copy
  try {
    await fs.promises.access(DATA_PATH, fs.constants.F_OK);
    const now = new Date();
    const stamp = now.toISOString().replace(/[:.]/g, "-");
    const baseName = path.basename(DATA_PATH);
    const backupName = `${baseName}.${stamp}.bak`;
    const backupPath = path.join(backupsDir, backupName);
    await fs.promises.copyFile(DATA_PATH, backupPath);
  } catch (e) {
    // file may not exist yet — ignore
  }

  // keep only the most recent 3 backups
  const files = await fs.promises.readdir(backupsDir);
  const backups = files
    .filter((f) => f.startsWith(path.basename(DATA_PATH) + "."))
    .map((f) => ({ name: f, full: path.join(backupsDir, f) }));

  if (backups.length <= 3) return;

  // sort by mtime ascending (oldest first)
  const statsPromises = backups.map(async (b) => {
    const st = await fs.promises.stat(b.full);
    return { ...b, mtime: st.mtime.getTime() };
  });

  const stats = await Promise.all(statsPromises);
  stats.sort((a, b) => a.mtime - b.mtime);

  const toRemove = stats.slice(0, Math.max(0, stats.length - 3));
  await Promise.all(toRemove.map((r) => fs.promises.unlink(r.full)));
}

async function checkAuth(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) return false;
  const b64 = header.split(" ")[1];
  try {
    const decoded = Buffer.from(b64, "base64").toString("utf8");
    const [u, p] = decoded.split(":");
    // 1) Plain env credentials (legacy/simple)
    const envUserPlain = process.env.ADMIN_USERNAME;
    const envPassPlain = process.env.ADMIN_PASSWORD; // plain-text password (legacy)
    if (envUserPlain && envPassPlain) {
      if (u === envUserPlain && p === envPassPlain) return true;
      return false;
    }

    // 2) Env bcrypt hash (preferred over plain)
    const envUser = process.env.ADMIN_USERNAME;
    const envHash = process.env.ADMIN_PASSWORD_HASH; // bcrypt hash expected
    if (envUser && envHash) {
      if (u !== envUser) return false;
      try {
        const ok = await bcrypt.compare(p, envHash);
        return ok;
      } catch (e) {
        console.error('bcrypt compare failed', e);
        return false;
      }
    }

    // 3) DB-based auth if available
    if (pool) {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM "User" WHERE username = $1 LIMIT 1', [u]);
        if (!result.rows.length) return false;
        const row = result.rows[0];
        const stored = row.password || row.password_hash || row.pass || row.pwd;
        if (!stored) return false;

        if (typeof stored === 'string' && stored.startsWith('$2')) {
          const ok = await bcrypt.compare(p, stored);
          return ok;
        }
        return p === stored;
      } finally {
        client.release();
      }
    }

    // 4) Legacy hardcoded fallback (danilo/danilo)
    if (u === 'danilo' && p === 'danilo') return true;

    return false;
  } catch (e) {
    console.error('Auth check failed', e);
    return false;
  }
}

module.exports = async function handler(req, res) {
  if (!(await checkAuth(req))) {
    return unauthorized(res);
  }

  try {
    if (req.method === "GET") {
      const data = await readData();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      // addItem
      const { sectionId, item } = req.body;
      if (!sectionId || !item) {
        return res.status(400).json({ error: "Missing sectionId or item" });
      }
      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section) return res.status(404).json({ error: "Section not found" });
      section.items.push(item);
      await writeData(data);
      return res.status(200).json({ ok: true, section });
    }

    if (req.method === "PUT") {
      // updateItem
      const { sectionId, index, item } = req.body;
      if (typeof index !== "number" || !sectionId || !item) {
        return res.status(400).json({ error: "Missing sectionId, index or item" });
      }
      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section) return res.status(404).json({ error: "Section not found" });
      if (index < 0 || index >= section.items.length)
        return res.status(400).json({ error: "Invalid index" });
      section.items[index] = item;
      await writeData(data);
      return res.status(200).json({ ok: true, section });
    }

    if (req.method === "DELETE") {
      const { sectionId, index } = req.body;
      if (typeof index !== "number" || !sectionId) {
        return res.status(400).json({ error: "Missing sectionId or index" });
      }
      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section) return res.status(404).json({ error: "Section not found" });
      if (index < 0 || index >= section.items.length)
        return res.status(400).json({ error: "Invalid index" });
      section.items.splice(index, 1);
      await writeData(data);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
