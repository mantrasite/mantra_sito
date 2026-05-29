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
  1: <IconBadge><GiWheat size={14} /></IconBadge>,
  2: <IconBadge><GiShrimp size={14} /></IconBadge>,
  3: <IconBadge><GiRawEgg size={14} /></IconBadge>,
  4: <IconBadge><FaFish size={14} /></IconBadge>,
  5: <IconBadge><GiPeanut size={14} /></IconBadge>,
  6: <IconBadge><GiSeedling size={14} /></IconBadge>,
  7: <IconBadge><GiMilkCarton size={14} /></IconBadge>,
  8: <IconBadge><FaLeaf size={14} /></IconBadge>,
  9: <IconBadge><GiCarrot size={14} /></IconBadge>,
  10: <IconBadge><FaPepperHot size={14} /></IconBadge>,
  11: <IconBadge><GiSeedling size={14} /></IconBadge>,
  12: <IconBadge><GiErlenmeyer size={14} /></IconBadge>,
  13: <IconBadge><FaLeaf size={14} /></IconBadge>,
  14: <IconBadge><MdOutlineSetMeal size={14} /></IconBadge>,
};

// ─── Componente riutilizzabile per un singolo item ───────────────────────────
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
          <p className="mt-2 text-sm leading-6 text-white/72">{item.description}</p>
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

export default function MenuExperience({ sections, restaurant }) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [activeMacroSection, setActiveMacroSection] = useState("menu");
  const {
    setNomeHeader, setHeaderColorato, setHeaderId,
    hideHeader: contextHideHeader,
  } = useContext(HeaderContext);
  const [hideHeader, setHideHeader] = useState(!!contextHideHeader);
  const [isDesktop, setIsDesktop] = useState(false);

  function normalizeValue(value) {
    return value.toLowerCase().trim();
  }

  useEffect(() => {
    setNomeHeader("");
    setHeaderColorato(false);
    setHeaderId("");
  }, []);

  useEffect(() => {
    setHideHeader(!!contextHideHeader);
  }, [contextHideHeader]);

  useEffect(() => {
    const check = () => {
      try { setIsDesktop(window.innerWidth >= 1024); } catch { setIsDesktop(false); }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── groupedSections ora include anche menuPranzo ─────────────────────────
  const groupedSections = useMemo(
    () => ({
      menu: sections.filter((s) => s.group === "menu"),
      menuPranzo: sections.filter((s) => s.group === "menuPranzo"),
      bevande: sections.filter((s) => s.group === "bevande"),
    }),
    [sections],
  );

  // ─── visibleSections: per menuPranzo non si filtra per activeSection ──────
  const visibleSections = useMemo(() => {
    const normalizedQuery = normalizeValue(query);
    const scopedSections = sections.filter((s) => s.group === activeMacroSection);

    if (!normalizedQuery) return scopedSections;

    return scopedSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const searchable = [item.name, item.description, item.notes ?? "", ...(item.badges ?? [])]
            .join(" ")
            .toLowerCase();
          return searchable.includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [activeMacroSection, query, sections]);

  // ─── Tutti gli item del pranzo appiattiti in un'unica lista ──────────────
  const pranzoItems = useMemo(() => {
    const normalizedQuery = normalizeValue(query);
    return groupedSections.menuPranzo.flatMap((section) =>
      section.items.filter((item) => {
        if (!normalizedQuery) return true;
        const searchable = [item.name, item.description, item.notes ?? "", ...(item.badges ?? [])]
          .join(" ")
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      }),
    );
  }, [groupedSections.menuPranzo, query]);

  useEffect(() => {
    if (!visibleSections.length) return;
    setActiveSection((current) => {
      if (visibleSections.some((s) => s.id === current)) return current;
      return visibleSections[0].id;
    });
  }, [visibleSections]);

  useEffect(() => {
    const syncSectionFromHash = () => {
      const hashValue = window.location.hash.replace("#", "").trim();
      if (!hashValue) return;
      const matchingSection = sections.find((s) => s.id === hashValue);
      if (matchingSection) {
        setActiveMacroSection(matchingSection.group);
        setActiveSection(hashValue);
      }
    };
    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);
    return () => window.removeEventListener("hashchange", syncSectionFromHash);
  }, [sections, visibleSections]);

  useEffect(() => {
    if (typeof contextHideHeader !== "undefined") return;
    const update = () => {
      try { setHideHeader(document.body.classList.contains("menu-open")); } catch { setHideHeader(false); }
    };
    update();
    const observer = typeof MutationObserver !== "undefined"
      ? new MutationObserver(update) : null;
    if (observer) observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => { if (observer) observer.disconnect(); };
  }, [contextHideHeader]);

  useEffect(() => {
    if (!groupedSections[activeMacroSection]?.length) return;
    setActiveSection((current) => {
      const inCurrentGroup = groupedSections[activeMacroSection].find((s) => s.id === current);
      if (inCurrentGroup) return current;
      return groupedSections[activeMacroSection][0].id;
    });
  }, [activeMacroSection, groupedSections]);

  const selectedSection =
    visibleSections.find((s) => s.id === activeSection) ?? visibleSections[0] ?? null;

  // helpers has*
  const has = (id) => visibleSections.some((s) => s.id === id);
  const hasApericenaConviviale = has("apericena-conviviale");
  const hasAntipasti = has("antipasti");
  const hasSelezioneTartare = has("selezione-tartare");
  const hasPrimiPiatti = has("primi-piatti");
  const hasSecondiPiatti = has("secondi-piatti");
  const hasSelezioneHamburger = has("selezione-hamburger");
  const hasCoperto = has("coperto");
  const hasDolci = has("dolci");
  const hasViniRossi = has("vini-rossi");
  const hasViniBianchi = has("vini-bianchi");
  const hasViniRosati = has("vini-rosati");
  const hasChampagne = has("champagne");
  const hasFranciacorta = has("franciacorta");
  const hasBollicine = has("bollicine");

  const activateSection = (sectionId) => {
    const section = sections.find((e) => e.id === sectionId);
    if (section) setActiveMacroSection(section.group);
    setActiveSection(sectionId);
    if (window.location.hash !== `#${sectionId}`)
      window.history.replaceState(null, "", `#${sectionId}`);
    requestAnimationFrame(() => {
      document.getElementById("menu-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const activateMacroSection = (macroSection) => {
    setActiveMacroSection(macroSection);
    // per menuPranzo non serve activeSection, usciamo subito
    if (macroSection === "menuPranzo") return;
    const nextSection = groupedSections[macroSection]?.[0];
    if (!nextSection) return;
    setActiveSection(nextSection.id);
    if (window.location.hash !== `#${nextSection.id}`)
      window.history.replaceState(null, "", `#${nextSection.id}`);
  };

  const redirectToDrinks = () => { window.location.href = "/menu/signature"; };

  const macroButtonClass =
    "rounded-md macro-section-button relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200 active:scale-[0.98]";
  const categoryButtonClass =
    "rounded-md macro-section-button relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.98]";

  // stile attivo / inattivo per i macro bottoni
  const macroActive = { background: "var(--color-gold)", borderColor: "var(--color-gold)", color: "var(--color-ink)" };
  const macroInactiveClass = "border-(--color-gold)/35 bg-white/4 text-(--color-gold)";

  return (
    <div className="relative mx-auto lg:mx-0 min-h-screen w-full max-w-115 lg:max-w-full overflow-hidden px-4 lg:px-8 pb-20 pt-4 sm:px-5">
      {!hideHeader && (
        <header className="px-1 pb-2 pt-4 menu-page-header">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display mt-3 text-4xl uppercase leading-none text-(--color-gold)">
                {restaurant.name}
              </h1>
            </div>
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
        {/* ── Macro sezioni ── */}
        <nav className="category-grid relative z-10 grid grid-cols-4 gap-2 pb-1">
          {/* Menu cena */}
          <button
            type="button"
            onClick={() => activateMacroSection("menu")}
            className={[macroButtonClass, activeMacroSection === "menu" ? "" : macroInactiveClass].join(" ")}
            style={activeMacroSection === "menu" ? macroActive : undefined}
            aria-pressed={activeMacroSection === "menu"}
          >
            <span>Menu cena</span>
          </button>

          {/* Menu pranzo */}
          <button
            type="button"
            onClick={() => activateMacroSection("menuPranzo")}
            className={[macroButtonClass, activeMacroSection === "menuPranzo" ? "" : macroInactiveClass].join(" ")}
            style={activeMacroSection === "menuPranzo" ? macroActive : undefined}
            aria-pressed={activeMacroSection === "menuPranzo"}
          >
            <span>Menu pranzo</span>
          </button>

          {/* Vini */}
          <button
            type="button"
            onClick={() => activateMacroSection("bevande")}
            className={[macroButtonClass, activeMacroSection === "bevande" ? "" : macroInactiveClass].join(" ")}
            style={activeMacroSection === "bevande" ? macroActive : undefined}
            aria-pressed={activeMacroSection === "bevande"}
          >
            <span>Vini</span>
          </button>

          {/* Drink */}
          <button
            type="button"
            onClick={redirectToDrinks}
            className={[macroButtonClass, macroInactiveClass].join(" ")}
          >
            <span>Drink</span>
          </button>
        </nav>

        {/* ── Search ── */}
        <label className="menu-card mb-4 flex items-center gap-3 rounded-[10px]! px-4 py-3">
          <Search className="h-4 w-4 text-(--color-gold)" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeMacroSection === "bevande"
                ? "Cerca vini"
                : activeMacroSection === "menuPranzo"
                ? "Cerca nel menu pranzo"
                : "Cerca piatti"
            }
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            aria-label="Cerca nel menu"
          />
        </label>

        {/* ── Sottocategorie (solo per menu cena e bevande) ── */}
        {activeMacroSection !== "menuPranzo" && (
          <nav className="category-grid relative z-10 grid grid-cols-2 gap-2 pb-1 sm:grid-cols-3">
            {activeMacroSection === "menu" && hasApericenaConviviale && (
              <button type="button" onClick={() => activateSection("apericena-conviviale")}
                className={[categoryButtonClass, activeSection === "apericena-conviviale" ? "border-(--color-gold)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                style={activeSection === "apericena-conviviale" ? macroActive : undefined}
                aria-pressed={activeSection === "apericena-conviviale"}>
                <span>Apericena</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasAntipasti && (
              <button type="button" onClick={() => activateSection("antipasti")}
                className={[categoryButtonClass, activeSection === "antipasti" ? "border-(--color-gold)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                style={activeSection === "antipasti" ? macroActive : undefined}
                aria-pressed={activeSection === "antipasti"}>
                <span>Antipasti</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasSelezioneTartare && (
              <button type="button" onClick={() => activateSection("selezione-tartare")}
                className={[categoryButtonClass, activeSection === "selezione-tartare" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "selezione-tartare"}>
                <span>Tartare</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasPrimiPiatti && (
              <button type="button" onClick={() => activateSection("primi-piatti")}
                className={[categoryButtonClass, activeSection === "primi-piatti" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "primi-piatti"}>
                <span>Primi</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasSecondiPiatti && (
              <button type="button" onClick={() => activateSection("secondi-piatti")}
                className={[categoryButtonClass, activeSection === "secondi-piatti" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "secondi-piatti"}>
                <span>Secondi</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasSelezioneHamburger && (
              <button type="button" onClick={() => activateSection("selezione-hamburger")}
                className={[categoryButtonClass, activeSection === "selezione-hamburger" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "selezione-hamburger"}>
                <span>Hamburger</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasDolci && (
              <button type="button" onClick={() => activateSection("dolci")}
                className={[categoryButtonClass, activeSection === "dolci" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "dolci"}>
                <span>Dolci</span>
              </button>
            )}
            {activeMacroSection === "menu" && hasCoperto && (
              <button type="button" onClick={() => activateSection("coperto")}
                className={[categoryButtonClass, activeSection === "coperto" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "coperto"}>
                <span>Coperto</span>
              </button>
            )}
            {activeMacroSection === "bevande" && hasViniRossi && (
              <button type="button" onClick={() => activateSection("vini-rossi")}
                className={[categoryButtonClass, activeSection === "vini-rossi" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "vini-rossi"}>
                <span>Rosso</span>
              </button>
            )}
            {activeMacroSection === "bevande" && hasViniBianchi && (
              <button type="button" onClick={() => activateSection("vini-bianchi")}
                className={[categoryButtonClass, activeSection === "vini-bianchi" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "vini-bianchi"}>
                <span>Bianco</span>
              </button>
            )}
            {activeMacroSection === "bevande" && hasViniRosati && (
              <button type="button" onClick={() => activateSection("vini-rosati")}
                className={[categoryButtonClass, activeSection === "vini-rosati" ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)" : "border-white/10 bg-white/5 text-white/70"].join(" ")}
                aria-pressed={activeSection === "vini-rosati"}>
