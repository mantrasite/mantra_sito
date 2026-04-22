"use client";

import {
  GiWheat,
  GiShrimp,
  GiRawEgg,
  GiPeanut,
  GiSeedling,
  GiCarrot,
  GiMilkCarton,
  GiErlenmeyer,
} from "react-icons/gi";

import { FaFish, FaLeaf, FaPepperHot } from "react-icons/fa";
import { MdOutlineSetMeal } from "react-icons/md";
import { ArrowLeft } from "lucide-react";

import HeaderContext from "@/context/headerContext";
import DimensioniContext from "@/context/dimensioniContext";

import { useContext } from "react";
import { useRouter } from "next/navigation";

const Icon = ({ children }) => (
  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-[var(--color-gold)]">
    {children}
  </span>
);

const ALLERGENS = [
  { id: 1, name: "Glutine", icon: <GiWheat size={18} /> },
  { id: 2, name: "Crostacei", icon: <GiShrimp size={18} /> },
  { id: 3, name: "Uova", icon: <GiRawEgg size={18} /> },
  { id: 4, name: "Pesce", icon: <FaFish size={18} /> },
  { id: 5, name: "Arachidi", icon: <GiPeanut size={18} /> },
  { id: 6, name: "Soia", icon: <GiSeedling size={18} /> },
  { id: 7, name: "Latte", icon: <GiMilkCarton size={18} /> },
  { id: 8, name: "Frutta a guscio", icon: <FaLeaf size={18} /> },
  { id: 9, name: "Sedano", icon: <GiCarrot size={18} /> },
  { id: 10, name: "Senape", icon: <FaPepperHot size={18} /> },
  { id: 11, name: "Sesamo", icon: <GiSeedling size={18} /> },
  { id: 12, name: "Solfiti", icon: <GiErlenmeyer size={18} /> },
  { id: 13, name: "Lupini", icon: <FaLeaf size={18} /> },
  { id: 14, name: "Molluschi", icon: <MdOutlineSetMeal size={18} /> },
];

export default function AllergeniPage() {
  const router = useRouter();
  const dimensioni = useContext(DimensioniContext);
  const getDynamicVh = dimensioni?.getDynamicVh ?? (() => 24);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/menu");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      {/* HEADER */}
      <div className="mb-10 text-center relative">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-[var(--color-gold)]">
          Legenda Allergeni
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Riferimento ufficiale per tutti gli allergeni presenti nel menu
        </p>

        {/* BACK BUTTON */}
        <button
          className="absolute left-0 top-0 text-[#dbaa5f] hover:text-[#f1a637] transition-all duration-300 p-2 rounded-full hover:bg-[#f1a63720]"
          onClick={handleBack}
        >
          <ArrowLeft
            style={{
              width: `${getDynamicVh(6.2)}px`,
              height: `${getDynamicVh(6.2)}px`,
            }}
            className="stroke-1"
          />
        </button>
      </div>

      {/* GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALLERGENS.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <Icon>{a.icon}</Icon>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                {a.id}. {a.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <p className="mt-10 text-center text-xs text-white/40">
        Le informazioni possono variare in base agli ingredienti disponibili.
      </p>
    </div>
  );
}
