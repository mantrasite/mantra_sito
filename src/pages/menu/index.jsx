"use client";

import { useEffect, useState } from "react";
import MenuExperience from "@/components/MenuExperience";

export default function MenuPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Errore menu:", e);
      }
    }

    loadMenu();
  }, []);

  if (!data) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-white">
        Caricamento menu...
      </div>
    );
  }

  return (
    <div className="w-screen h-full">
      <MenuExperience
        sections={data.menuSections || []}
        restaurant={data.restaurantInfo || {}}
        allergensInfo={data.allergensInfo || {}}
      />
    </div>
  );
}
