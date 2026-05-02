import { put, head, list, del } from "@vercel/blob";
import bcrypt from "bcrypt";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function unauthorized(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Admin"');
  res.status(401).json({ error: "Unauthorized" });
}

// --------------------
// READ DATA
// --------------------
async function readData() {
  try {
    const blob = await head("menu.json");

    const response = await fetch(blob.url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) throw new Error("Fetch failed");

    return await response.json();
  } catch (e) {
    console.error("READ ERROR:", e);
    return { menuSections: [] };
  }
}

// --------------------
// BACKUP SYSTEM
// --------------------
async function createBackup() {
  try {
    const blob = await head("menu.json");

    const response = await fetch(blob.url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const content = await response.text();

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    const backupName = `backups/menu-${timestamp}.json`;

    await put(backupName, content, {
      access: "private",
      token: TOKEN,
    });

    await rotateBackups();
  } catch (e) {
    console.warn("Backup failed:", e.message);
  }
}

// --------------------
// KEEP ONLY 5 BACKUPS
// --------------------
async function rotateBackups() {
  try {
    const { blobs } = await list({
      prefix: "backups/",
    });

    if (blobs.length <= 5) return;

    // ordina per data (più vecchi prima)
    const sorted = blobs.sort(
      (a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt)
    );

    const toDelete = sorted.slice(0, blobs.length - 5);

    for (const file of toDelete) {
      await del(file.url, { token: TOKEN });
    }
  } catch (e) {
    console.warn("Rotate backups failed:", e.message);
  }
}

// --------------------
// WRITE DATA
// --------------------
async function writeData(data) {
  try {
    // 1. backup PRIMA
    await createBackup();

    // 2. overwrite
    await put("menu.json", JSON.stringify(data), {
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
  if (!(await checkAuth(req))) return unauthorized(res);

  try {
    if (req.method === "GET") {
      const data = await readData();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { sectionId, item } = req.body;

      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

      section.items.push(item);
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    if (req.method === "PUT") {
      const { sectionId, index, item } = req.body;

      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

      section.items[index] = item;
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const { sectionId, index } = req.body;

      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

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
