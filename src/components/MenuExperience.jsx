"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useContext } from "react";
import HeaderContext from "@/context/headerContext";
import { Search } from "lucide-react";
import {
  GiWheat, GiShrimp, GiRawEgg, GiPeanut, GiErlenmeyer,
  GiSeedling, GiCarrot, GiMilkCarton,
} from "react-icons/gi";
import { FaFish, FaLeaf, FaPepperHot } from "react-icons/fa";
import { MdOutlineSetMeal } from "react-icons/md";

const ALLERGENS_MAP = {
  1: "Glutine", 2: "Crostacei", 3: "Uova", 4: "Pesce", 5: "Arachidi",
  6: "Soia", 7: "Latte", 8: "Frutta a guscio", 9: "Sedano", 10: "Senape",
  11: "Sesamo", 12: "Solfiti", 13: "Lupini", 14: "Molluschi",
};

const IconBadge = ({ children }) => (
  <span
    aria-hidden
    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5"
    style={{ color: "var(--color-gold)" }}
  >
    {children}
  </span>
);

const ALLERGENS_ICONS = {
  1:  <IconBadge><GiWheat size={14} /></IconBadge>,
  2:  <IconBadge><GiShrimp size={14} /></IconBadge>,
  3:  <IconBadge><GiRawEgg size={14} /></IconBadge>,
  4:  <IconBadge><FaFish size={14} /></IconBadge>,
  5:  <IconBadge><GiPeanut size={14} /></IconBadge>,
  6:  <IconBadge><GiSeedling size={14} /></IconBadge>,
  7:  <IconBadge><GiMilkCarton size={14} /></IconBadge>,
  8:  <IconBadge><FaLeaf size={14} /></IconBadge>,
  9:  <IconBadge><GiCarrot size={14} /></IconBadge>,
  10: <IconBadge><FaPepperHot size={14} /></IconBadge>,
  11: <IconBadge><GiSeedling size={14} /></IconBadge>,
  12: <IconBadge><GiErlenmeyer size={14} /></IconBadge>,
  13: <IconBadge><FaLeaf size={14} /></IconBadge>,
  14: <IconBadge><MdOutlineSetMeal size={14} /></IconBadge>,
};

function MenuItem({ item }) {
  return (
    <article className="border-b border-white/8 px-0 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-(--color-gold)">
              {item.name}
            </h3>
            {item.price ? (
              <span className="whitespace-nowrap text-md font-semibold text-(--color-cream)">
                {item.price}
              </span>
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-2 text-sm leading-6 text-white/72">{item.description}</p>
          ) : null}
          {item.badges?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-(--color-gold)/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-(--color-gold-soft)"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          {item.allergens?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-(--color-gold)/10 px-3 py-1 text-[0.68rem] flex items-center gap-2 uppercase tracking-[0.12em] text-(--color-gold-soft)"
                >
                  <span aria-hidden>{ALLERGENS_ICONS[a]}</span>
                  <span>{a}</span>
                  <span className="hidden sm:inline">{ALLERGENS_MAP[a]}</span>
                </span>
              ))}
            </div>
          ) : null}
          {Array.isArray(item.allergens) && item.allergens.length === 0 && item.notes ? (
            <div className="mt-3 text-sm leading-6 text-white/72">
              Allergeni: variabile — {item.notes}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const MACRO_GROUPS = [
  { key: "menuPranzo", label: "Menu pranzo" },
  { key: "menu",       label: "Menu cena"   },
  { key: "bevande",    label: "Vini"        },
  { key: "piscina",    label: "Piscina"        },
];

const CATEGORY_SECTIONS = {
  menu: [
    { id: "apericena-conviviale", label: "Apericena" },
    { id: "antipasti",            label: "Antipasti" },
    { id: "selezione-tartare",    label: "Tartare"   },
    { id: "primi-piatti",         label: "Primi"     },
    { id: "secondi-piatti",       label: "Secondi"   },
    { id: "selezione-hamburger",  label: "Hamburger" },
    { id: "dolci",                label: "Dolci"     },
    { id: "coperto",              label: "Coperto"   },
  ],
  bevande: [
    { id: "vini-rossi",   label: "Rosso"        },
    { id: "vini-bianchi", label: "Bianco"       },
    { id: "vini-rosati",  label: "Rosato"       },
    { id: "champagne",    label: "Champagne"    },
    { id: "franciacorta", label: "Franciacorta" },
    { id: "bollicine",    label: "Bollicine"    },
  ],
};

export default function MenuExperience({ sections, restaurant }) {
  const [query, setQuery]                 = useState("");
  const [activeMacro, setActiveMacro]     = useState("menu");
  const [activeSection, setActiveSection] = useState("");
  const {
    setNomeHeader, setHeaderColorato, setHeaderId,
    hideHeader: ctxHideHeader,
  } = useContext(HeaderContext);
  const [hideHeader, setHideHeader] = useState(!!ctxHideHeader);

  useEffect(() => {
    setNomeHeader("");
    setHeaderColorato(false);
    setHeaderId("");
  }, []);

  useEffect(() => { setHideHeader(!!ctxHideHeader); }, [ctxHideHeader]);

  useEffect(() => {
    if (typeof ctxHideHeader !== "undefined") return;
    const update = () => {
      try { setHideHeader(document.body.classList.contains("menu-open")); }
      catch { setHideHeader(false); }
    };
    update();
    const obs = typeof MutationObserver !== "undefined"
      ? new MutationObserver(update) : null;
    if (obs) obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => { if (obs) obs.disconnect(); };
  }, [ctxHideHeader]);

  // Sottocategorie disponibili per il macro corrente
  const availableSectionIds = useMemo(() => {
    const ids = new Set(sections.map((s) => s.id));
    return (CATEGORY_SECTIONS[activeMacro] ?? []).filter((c) => ids.has(c.id));
  }, [activeMacro, sections]);

  // Imposta activeSection al cambio macro
  useEffect(() => {
    if (activeMacro === "menuPranzo") { setActiveSection("menu-pranzo"); return; }
    if (activeMacro === "piscina") { setActiveSection("piscina"); return; }
    setActiveSection((cur) => {
      const valid = availableSectionIds.some((c) => c.id === cur);
      return valid ? cur : (availableSectionIds[0]?.id ?? "");
    });
  }, [activeMacro, availableSectionIds]);

  // Hash sync
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) return;
      const match = sections.find((s) => s.id === hash);
      if (!match) return;
      setActiveMacro(match.group === "menuPranzo" ? "menuPranzo" : match.group);
      setActiveSection(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [sections]);

  // Items da mostrare
  const displayedItems = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (activeMacro === "menuPranzo") {
      const s = sections.find((s) => s.id === "menu-pranzo");
      const items = s?.items ?? [];
      if (!q) return items;
      return items.filter((item) =>
        [item.name, item.description ?? "", ...(item.badges ?? [])]
          .join(" ").toLowerCase().includes(q)
      );
    }

    const section = sections.find((s) => s.id === activeSection);
    const items   = section?.items ?? [];
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.description ?? "", ...(item.badges ?? [])]
        .join(" ").toLowerCase().includes(q)
    );
  }, [activeMacro, activeSection, sections, query]);

  const activeSectionTitle = useMemo(() => {
    if (activeMacro === "menuPranzo") return "Menu Pranzo";
    return sections.find((s) => s.id === activeSection)?.title ?? "";
  }, [activeMacro, activeSection, sections]);

  const activateSection = (id) => {
    setActiveSection(id);
    if (window.location.hash !== `#${id}`)
      window.history.replaceState(null, "", `#${id}`);
    requestAnimationFrame(() => {
      document.getElementById("menu-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const activateMacro = (key) => {
    setActiveMacro(key);
    setQuery("");
  };

  const redirectToDrinks = () => { window.location.href = "/menu/signature"; };

  // Stili bottoni
  const macroActiveStyle = { background: "var(--color-gold)", borderColor: "var(--color-gold)", color: "var(--color-ink)" };
  const macroBase        = "relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200 active:scale-[0.98]";
  const macroInactive    = `${macroBase} border-(--color-gold)/35 bg-white/4 text-(--color-gold)`;
  const catBase          = "relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.98]";
  const catInactive      = `${catBase} border-white/10 bg-white/5 text-white/70`;
  const catActive        = `${catBase} border-(--color-gold) bg-(--color-gold) text-(--color-ink)`;

  return (
    <div className="relative mx-auto lg:mx-0 min-h-screen w-full max-w-115 lg:max-w-full overflow-hidden px-4 lg:px-8 pb-20 pt-4 sm:px-5">

      {!hideHeader && (
        <header className="px-1 pb-2 pt-4 menu-page-header">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display mt-3 text-4xl uppercase leading-none text-(--color-gold)">
              {restaurant.name}
            </h1>
            <div className="flex flex-col pt-4 items-end gap-2">
              <Image
                src="/menu/logo_mantra_oro.svg"
                alt="Logo Mantra"
                width={128} height={128} priority
                className="h-auto w-32"
              />
            </div>
          </div>
        </header>
      )}

      <div className="sticky top-0 z-20 mt-4 space-y-3 bg-background pb-3 pt-3">

        {/* Macro sezioni: 4 bottoni in griglia */}
        <nav className="category-grid relative z-10 grid grid-cols-5 gap-2 pb-1">
          {MACRO_GROUPS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => activateMacro(key)}
              className={activeMacro === key ? macroBase : macroInactive}
              style={activeMacro === key ? macroActiveStyle : undefined}
              aria-pressed={activeMacro === key}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={redirectToDrinks}
            className={macroInactive}
          >
            Drink
          </button>
        </nav>

        {/* Search */}
        <label className="menu-card mb-4 flex items-center gap-3 rounded-[10px]! px-4 py-3">
          <Search className="h-4 w-4 text-(--color-gold)" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeMacro === "bevande"    ? "Cerca vini"            :
              activeMacro === "menuPranzo" ? "Cerca nel menu pranzo" :
                                            "Cerca piatti"
            }
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            aria-label="Cerca nel menu"
          />
        </label>

        {/* Sottocategorie — solo per menu cena e bevande */}
        {activeMacro !== "menuPranzo" && availableSectionIds.length > 0 && (
          <nav className="category-grid relative z-10 grid grid-cols-2 gap-2 pb-1 sm:grid-cols-3">
            {availableSectionIds.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => activateSection(id)}
                className={activeSection === id ? catActive : catInactive}
                aria-pressed={activeSection === id}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Contenuto */}
      <main id="menu-results" className="mt-5 space-y-4">

        {activeMacro === "menuPranzo" ? (
          displayedItems.length === 0 ? (
            <section className="menu-card px-5 py-8 text-center text-white/75">
              <p className="font-display text-3xl uppercase text-(--color-gold)">
                Menu Pranzo
              </p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {query
                  ? "Nessun piatto corrisponde alla ricerca."
                  : "Il menu del pranzo non è ancora disponibile."}
              </p>
            </section>
          ) : (
            <section className="px-1 py-2">
              <div className="space-y-1 border-t border-white/8 pt-2">
                {displayedItems.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </div>
            </section>
          )

        ) : displayedItems.length === 0 ? (
          <section className="menu-card px-5 py-8 text-center text-white/75">
            <p className="font-display text-3xl uppercase text-(--color-gold)">
              Nessun risultato
            </p>
            <p className="mt-3 text-sm leading-6">
              Prova con un ingrediente, una categoria o un tag diverso.
            </p>
          </section>

        ) : (
          <section className="px-1 py-2">
            <h2
              className="font-display mt-2 text-3xl uppercase leading-none"
              style={{ color: "var(--color-gold)" }}
            >
              {activeSectionTitle}
            </h2>
            {activeSection === "secondi-piatti" && (
              <p className="mt-3 max-w-136 text-sm leading-6 text-white/72">
                Tutti i secondi sono comprensivi di contorno a scelta tra patate fritte o patate arrosto.
              </p>
            )}
            <div className="mt-5 space-y-1 border-t border-white/8 pt-2">
              {displayedItems.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-10 pb-10 text-center text-sm">
        <span>
          Per informazioni su sostanze e allergeni è possibile consultare
          l'apposita documentazione o rivolgersi al personale
        </span>
        <br />
        <a href="/allergeni" className="underline underline-offset-4 transition">
          Legenda allergeni
        </a>
      </footer>
    </div>
  );
}
