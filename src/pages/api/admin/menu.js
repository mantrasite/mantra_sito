import bcrypt from "bcrypt";
import { query } from "@/lib/db";

const MAX_BACKUPS = 5;

// --------------------
// READ DATA
// --------------------
async function readData() {
  const result = await query(
    `SELECT id, "group", label, eyebrow, title, description, accent, items
     FROM menu_sections
     ORDER BY position ASC`
  );
  return { menuSections: result.rows };
}

// --------------------
// BACKUP
// --------------------
async function createBackup() {
  try {
    const data = await readData();

    await query("INSERT INTO menu_backups (data) VALUES ($1)", [
      JSON.stringify(data),
    ]);

    await query(
      `DELETE FROM menu_backups
       WHERE id IN (
         SELECT id FROM menu_backups
         ORDER BY created_at DESC
         OFFSET $1
       )`,
      [MAX_BACKUPS]
    );
  } catch (e) {
    console.warn("BACKUP ERROR:", e.message);
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
    if (req.method === "GET") {
      const data = await readData();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { sectionId, item, section: newSection } = req.body;

      if (newSection) {
        const { id, title, group } = newSection;
        if (!id || !title || !group)
          return res.status(400).json({ error: "Missing section id, title or group" });

        const existing = await query("SELECT id FROM menu_sections WHERE id = $1", [id]);
        if (existing.rows.length)
          return res.status(409).json({ error: "Section id already exists" });

        await createBackup();

        const posResult = await query(
          "SELECT COALESCE(MAX(position), -1) + 1 AS next FROM menu_sections"
        );

        await query(
          `INSERT INTO menu_sections (id, "group", label, title, items, position)
           VALUES ($1, $2, $3, $4, '[]'::jsonb, $5)`,
          [id, group, newSection.label || title, title, posResult.rows[0].next]
        );

        return res.status(200).json({ ok: true });
      }

      const sectionCheck = await query("SELECT id FROM menu_sections WHERE id = $1", [sectionId]);
      if (!sectionCheck.rows.length)
        return res.status(404).json({ error: "Section not found" });

      await createBackup();

      await query(
        `UPDATE menu_sections SET items = items || $1::jsonb WHERE id = $2`,
        [JSON.stringify([item]), sectionId]
      );

      return res.status(200).json({ ok: true });
    }

    if (req.method === "PUT") {
      const { sectionId, index, item, items: reorderedItems } = req.body;

      const sectionResult = await query(
        "SELECT items FROM menu_sections WHERE id = $1",
        [sectionId]
      );
      if (!sectionResult.rows.length)
        return res.status(404).json({ error: "Section not found" });

      if (Array.isArray(reorderedItems)) {
        if (reorderedItems.length !== sectionResult.rows[0].items.length)
          return res.status(400).json({ error: "Item count mismatch" });

        await createBackup();

        await query(
          `UPDATE menu_sections SET items = $1::jsonb WHERE id = $2`,
          [JSON.stringify(reorderedItems), sectionId]
        );

        return res.status(200).json({ ok: true });
      }

      if (index < 0 || index >= sectionResult.rows[0].items.length)
        return res.status(400).json({ error: "Invalid index" });

      await createBackup();

      await query(
        `UPDATE menu_sections
         SET items = jsonb_set(items, ARRAY[$1::text], $2::jsonb)
         WHERE id = $3`,
        [String(index), JSON.stringify(item), sectionId]
      );

      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const { sectionId, index, deleteSection } = req.body;

      const sectionResult = await query(
        "SELECT items FROM menu_sections WHERE id = $1",
        [sectionId]
      );
      if (!sectionResult.rows.length)
        return res.status(404).json({ error: "Section not found" });

      if (deleteSection) {
        await createBackup();

        await query("DELETE FROM menu_sections WHERE id = $1", [sectionId]);

        return res.status(200).json({ ok: true });
      }

      if (index < 0 || index >= sectionResult.rows[0].items.length)
        return res.status(400).json({ error: "Invalid index" });

      await createBackup();

      await query(
        `UPDATE menu_sections SET items = items - $1::int WHERE id = $2`,
        [index, sectionId]
      );

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
