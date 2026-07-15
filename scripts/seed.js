// One-off script: creates the schema (if missing) and seeds/replaces the menu data.
// Usage: DATABASE_URL=... node scripts/seed.js [path/to/data.json]

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const value = trimmed.slice(idx + 1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

async function main() {
  const dataPath = process.argv[2] || path.join(__dirname, "seed-data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const schema = fs.readFileSync(
    path.join(__dirname, "..", "sql", "schema.sql"),
    "utf-8"
  );

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(schema);

    await client.query(
      `INSERT INTO site_settings (id, restaurant_info, allergens_info)
       VALUES ('main', $1, $2)
       ON CONFLICT (id) DO UPDATE
         SET restaurant_info = EXCLUDED.restaurant_info,
             allergens_info  = EXCLUDED.allergens_info`,
      [JSON.stringify(data.restaurantInfo || {}), data.allergensInfo || ""]
    );

    for (let i = 0; i < data.menuSections.length; i++) {
      const s = data.menuSections[i];
      await client.query(
        `INSERT INTO menu_sections (id, "group", label, eyebrow, title, description, accent, items, position)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE
           SET "group" = EXCLUDED."group",
               label = EXCLUDED.label,
               eyebrow = EXCLUDED.eyebrow,
               title = EXCLUDED.title,
               description = EXCLUDED.description,
               accent = EXCLUDED.accent,
               items = EXCLUDED.items,
               position = EXCLUDED.position`,
        [
          s.id,
          s.group,
          s.label || null,
          s.eyebrow || null,
          s.title,
          s.description || null,
          s.accent || null,
          JSON.stringify(s.items || []),
          i,
        ]
      );
    }

    await client.query("COMMIT");
    console.log(`Seed completato: ${data.menuSections.length} sezioni.`);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
