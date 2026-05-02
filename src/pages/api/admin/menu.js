import { put, get, head } from "@vercel/blob";
import bcrypt from "bcrypt";

function unauthorized(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Admin"');
  res.status(401).json({ error: "Unauthorized" });
}


async function readData() {
  try {
    const blob = await head("menu.json");

    const response = await fetch(blob.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unable to fetch blob");
    }

    return await response.json();
  } catch (e) {
    console.error("READ DATA ERROR:", e);
    return { menuSections: [] };
  }
}

async function writeData(data) {
  await put("menu.json", JSON.stringify(data), {
    access: "private",
  });

  return true;
}

async function checkAuth(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) return false;

  try {
    const [u, p] = Buffer.from(header.split(" ")[1], "base64")
      .toString()
      .split(":");

    // 🔐 Plain auth
    if (
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      u === process.env.ADMIN_USERNAME &&
      p === process.env.ADMIN_PASSWORD
    ) {
      return true;
    }

    // 🔐 bcrypt auth (recommended)
    if (
      process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD_HASH &&
      u === process.env.ADMIN_USERNAME
    ) {
      return await bcrypt.compare(p, process.env.ADMIN_PASSWORD_HASH);
    }

    return false;
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  if (!(await checkAuth(req))) return unauthorized(res);

  try {
    // GET → leggi menu
    if (req.method === "GET") {
      const data = await readData();
      return res.status(200).json(data);
    }

    // POST → aggiungi item
    if (req.method === "POST") {
      const { sectionId, item } = req.body;

      if (!sectionId || !item) {
        return res.status(400).json({ error: "Missing sectionId or item" });
      }

      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

      section.items.push(item);
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    // PUT → update item
    if (req.method === "PUT") {
      const { sectionId, index, item } = req.body;

      if (typeof index !== "number" || !sectionId || !item) {
        return res.status(400).json({ error: "Missing data" });
      }

      const data = await readData();
      const section = data.menuSections.find((s) => s.id === sectionId);

      if (!section) {
        return res.status(404).json({ error: "Section not found" });
      }

      section.items[index] = item;
      await writeData(data);

      return res.status(200).json({ ok: true });
    }

    // DELETE → elimina item
    if (req.method === "DELETE") {
      const { sectionId, index } = req.body;

      if (typeof index !== "number" || !sectionId) {
        return res.status(400).json({ error: "Missing data" });
      }

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
    return res.status(405).end("Method Not Allowed");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error: " + err.message });
  }
}
