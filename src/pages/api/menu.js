import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const [settingsResult, sectionsResult] = await Promise.all([
      query("SELECT restaurant_info, allergens_info FROM site_settings WHERE id = 'main'"),
      query(
        `SELECT id, "group", label, eyebrow, title, description, accent, items
         FROM menu_sections
         ORDER BY position ASC`
      ),
    ]);

    const settings = settingsResult.rows[0] || {};

    return res.status(200).json({
      restaurantInfo: settings.restaurant_info || {},
      allergensInfo: settings.allergens_info || "",
      menuSections: sectionsResult.rows,
    });
  } catch (e) {
    console.error("Errore API menu:", e);
    return res.status(500).json({
      menuSections: [],
      restaurantInfo: {},
      allergensInfo: {},
    });
  }
}
