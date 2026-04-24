import { list } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const { blobs } = await list();

    const file = blobs.find((b) => b.pathname === "menu.json");

    if (!file) {
      return res.status(200).json({
        menuSections: [],
        restaurantInfo: {},
        allergensInfo: {},
      });
    }

    const response = await fetch(file.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (e) {
    console.error("Errore API menu:", e);
    return res.status(500).json({
      menuSections: [],
      restaurantInfo: {},
      allergensInfo: {},
    });
  }
}
