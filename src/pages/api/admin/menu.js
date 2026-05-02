import { put, list, del } from "@vercel/blob";
import bcrypt from "bcrypt";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const FILE_NAME = "menu.json";
const BACKUP_PREFIX = "backups/";

// --------------------
// UTILS
// --------------------
async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      cache: "no-store",
    },
  });

  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Fetch failed");
  return res.text();
}

// --------------------
// READ DATA
// --------------------
async function readData() {
  try {
    const { blobs } = await list();
    const file = blobs.find((b) => b.pathname === FILE_NAME);

    if (!file) return { menuSections: [] };

    return await fetchJSON(file.url);
  } catch (e) {
    console.error("READ ERROR:", e);
    return { menuSections: [] };
  }
}

// --------------------
// BACKUP
// --------------------
async function createBackup() {
  try {
    const { blobs } = await list();
    const file = blobs.find((b) => b.pathname === FILE_NAME);

    if (!file) return;

    const content = await fetchText(file.url);

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    const backupName = `${BACKUP_PREFIX}menu-${timestamp}.json`;

    await put(backupName, content, {
      access: "private",
      token: TOKEN,
    });

    await rotateBackups();
  } catch (e) {
    console.warn("BACKUP ERROR:", e.message);
  }
}

// --------------------
// ROTATE BACKUPS (max 5)
// --------------------
async function rotateBackups() {
  try {
    const { blobs } = await list({ prefix: BACKUP_PREFIX });

    if (blobs.length <= 5) return;

    const sorted = blobs.sort(
      (a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt)
    );

    const toDelete = sorted.slice(0, blobs.length - 5);

    await Promise.all(
      toDelete.map((file) => del(file.url, { token: TOKEN }))
    );
  } catch (e) {
    console.warn("ROTATE ERROR:", e.message);
  }
}

// --------------------
// WRITE DATA
// --------------------
async function writeData(data) {
  try {
    await createBackup();

    await put(FILE_NAME, JSON.stringify(data), {
      access: "private",
      allowOverwrite: true,
      token: TOKEN,
    });

    return true;
  } catch (e) {
    console.error("WRITE ERROR:", e);
    throw e;
  }
}

// --------------------
// AUTH
// --------------------
async function checkAuth(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) return false;

  try {
    const [u, p] = Buffer.from(header.split(" ")[1], "base64")
      .toString()
      .split(":");

    if (
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      u === process.env.ADMIN_USERNAME &&
      p === process.env.ADMIN_PASSWORD
    ) {
      return true;
    }

    if (
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD_HASH &&
      u === process.env.ADMIN_USERNAME
    ) {
      return await bcrypt.compare(p, process.env.ADMIN_PASSWORD_HASH);
    }

    return false;
  } catch {
    return false;
  }
}

// --------------------
// HANDLER
// --------------------
export default async function handler(req, res) {
  if (!(await checkAuth(req))) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Admin"');
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = await readData();

    if (req.method === "GET") {
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { sectionId, item } = req.body;

      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section)
        return res.status(404).json({ error: "Section not found" });

      section.items.push(item);
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    if (req.method === "PUT") {
      const { sectionId, index, item } = req.body;

      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section)
        return res.status(404).json({ error: "Section not found" });

      section.items[index] = item;
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const { sectionId, index } = req.body;

      const section = data.menuSections.find((s) => s.id === sectionId);
      if (!section)
        return res.status(404).json({ error: "Section not found" });

      section.items.splice(index, 1);
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    return res.status(405).end();
  } catch (err) {
    console.error("API ERROR:", err);
    return res
      .status(500)
      .json({ error: "Internal server error: " + err.message });
  }
}
