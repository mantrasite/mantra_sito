"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useContext } from "react";
import HeaderContext from "@/context/headerContext";
import { ChevronRight, Clock3, MapPin, Search, Sparkles } from "lucide-react";
import {
  GiWheat,
  GiShrimp,
  GiRawEgg,
  GiPeanut,
  GiErlenmeyer,
  GiSeedling,
  GiCarrot,
  GiMilkCarton,
} from "react-icons/gi";

import { FaFish, FaLeaf, FaPepperHot } from "react-icons/fa";

import { MdOutlineSetMeal } from "react-icons/md";

const ALLERGENS_MAP = {
  1: "Glutine",
  2: "Crostacei",
  3: "Uova",
  4: "Pesce",
  5: "Arachidi",
  6: "Soia",
  7: "Latte",
  8: "Frutta a guscio",
  9: "Sedano",
  10: "Senape",
  11: "Sesamo",
  12: "Solfiti",
  13: "Lupini",
  14: "Molluschi",
};

// Simple, high-contrast icon badges (gold-themed). Using letters for clarity.
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
  1: (
    <IconBadge>
      <GiWheat size={14} />
    </IconBadge>
  ), // Glutine
  2: (
    <IconBadge>
      <GiShrimp size={14} />
    </IconBadge>
  ), // Crostacei
  3: (
    <IconBadge>
      <GiRawEgg size={14} />
    </IconBadge>
  ), // Uova
  4: (
    <IconBadge>
      <FaFish size={14} />
    </IconBadge>
  ), // Pesce
  5: (
    <IconBadge>
      <GiPeanut size={14} />
    </IconBadge>
  ), // Arachidi
  6: (
    <IconBadge>
      <GiSeedling size={14} />
    </IconBadge>
  ), // Soia
  7: (
    <IconBadge>
      <GiMilkCarton size={14} />
    </IconBadge>
  ), // Latte
  8: (
    <IconBadge>
      <FaLeaf size={14} />
    </IconBadge>
  ), // Frutta a guscio
  9: (
    <IconBadge>
      <GiCarrot size={14} />
    </IconBadge>
  ), // Sedano
  10: (
    <IconBadge>
      <FaPepperHot size={14} />
    </IconBadge>
  ), // Senape
  11: (
    <IconBadge>
      <GiSeedling size={14} />
    </IconBadge>
  ), // Sesamo
  12: (
    <IconBadge>
      <GiErlenmeyer size={14} />
    </IconBadge>
  ), // Solfiti
  13: (
    <IconBadge>
      <FaLeaf size={14} />
    </IconBadge>
  ), // Lupini
  14: (
    <IconBadge>
      <MdOutlineSetMeal size={14} />
    </IconBadge>
  ), // Molluschi
};

export default function MenuExperience({ sections, restaurant }) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [activeMacroSection, setActiveMacroSection] = useState("menu");
  const {
    setNomeHeader,
    setHeaderColorato,
    setHeaderId,
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

  // sync hideHeader with HeaderContext (preferred) and with resize for desktop layout
  useEffect(() => {
    setHideHeader(!!contextHideHeader);
  }, [contextHideHeader]);

  // detect desktop breakpoint to switch layout
  useEffect(() => {
    const check = () => {
      try {
        setIsDesktop(window.innerWidth >= 1024);
      } catch (e) {
        setIsDesktop(false);
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const groupedSections = useMemo(
    () => ({
      menu: sections.filter((section) => section.group === "menu"),
      bevande: sections.filter((section) => section.group === "bevande"),
    }),
    [sections],
  );

  const visibleSections = useMemo(() => {
    const normalizedQuery = normalizeValue(query);
    const scopedSections = sections.filter(
      (section) => section.group === activeMacroSection,
    );

    if (!normalizedQuery) {
      return scopedSections;
    }

    return scopedSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const searchable = [
            item.name,
            item.description,
            item.notes ?? "",
            ...(item.badges ?? []),
          ]
            .join(" ")
            .toLowerCase();

          return searchable.includes(normalizedQuery);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [activeMacroSection, query, sections]);

  useEffect(() => {
    if (!visibleSections.length) {
      return;
    }

    setActiveSection((current) => {
      if (visibleSections.some((section) => section.id === current)) {
        return current;
      }

      return visibleSections[0].id;
    });
  }, [visibleSections]);

  useEffect(() => {
    const syncSectionFromHash = () => {
      const hashValue = window.location.hash.replace("#", "").trim();

      if (!hashValue) {
        return;
      }

      const matchingSection = sections.find(
        (section) => section.id === hashValue,
      );

      if (matchingSection) {
        setActiveMacroSection(matchingSection.group);
        setActiveSection(hashValue);
      }
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);

    return () => {
      window.removeEventListener("hashchange", syncSectionFromHash);
    };
  }, [sections, visibleSections]);

  // legacy fallback: also observe body class if context not available
  useEffect(() => {
    if (typeof contextHideHeader !== "undefined") return; // context drives visibility

    const update = () => {
      try {
        setHideHeader(document.body.classList.contains("menu-open"));
      } catch (e) {
        setHideHeader(false);
      }
    };

    update();
    const observer =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(update)
        : null;
    if (observer)
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [contextHideHeader]);

  useEffect(() => {
    if (!groupedSections[activeMacroSection].length) {
      return;
    }

    setActiveSection((current) => {
      const sectionInCurrentGroup = groupedSections[activeMacroSection].find(
        (section) => section.id === current,
      );

      if (sectionInCurrentGroup) {
        return current;
      }

      return groupedSections[activeMacroSection][0].id;
    });
  }, [activeMacroSection, groupedSections]);

  const selectedSection =
    visibleSections.find((section) => section.id === activeSection) ??
    visibleSections[0] ??
    null;

  const hasApericenaConviviale = visibleSections.some(
    (section) => section.id === "apericena-conviviale",
  );
  const hasAntipasti = visibleSections.some(
    (section) => section.id === "antipasti",
  );
  const hasSelezioneTartare = visibleSections.some(
    (section) => section.id === "selezione-tartare",
  );
  const hasPrimiPiatti = visibleSections.some(
    (section) => section.id === "primi-piatti",
  );
  const hasSecondiPiatti = visibleSections.some(
    (section) => section.id === "secondi-piatti",
  );
  const hasSelezioneHamburger = visibleSections.some(
    (section) => section.id === "selezione-hamburger",
  );
  const hasCoperto = visibleSections.some((section) => section.id === "coperto");
  const hasDolci = visibleSections.some((section) => section.id === "dolci");
  const hasViniRossi = visibleSections.some(
    (section) => section.id === "vini-rossi",
  );
  const hasViniBianchi = visibleSections.some(
    (section) => section.id === "vini-bianchi",
  );
  const hasViniRosati = visibleSections.some(
    (section) => section.id === "vini-rosati",
  );
  const hasChampagne = visibleSections.some(
    (section) => section.id === "champagne",
  );
  const hasFranciacorta = visibleSections.some(
    (section) => section.id === "franciacorta",
  );
  const hasBollicine = visibleSections.some(
    (section) => section.id === "bollicine",
  );

  const activateSection = (sectionId) => {
    const section = sections.find((entry) => entry.id === sectionId);

    if (section) {
      setActiveMacroSection(section.group);
    }

    setActiveSection(sectionId);

    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }

    requestAnimationFrame(() => {
      const resultsSection = document.getElementById("menu-results");

      resultsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const activateMacroSection = (macroSection) => {
    setActiveMacroSection(macroSection);

    const nextSection = groupedSections[macroSection][0];

    if (!nextSection) {
      return;
    }

    setActiveSection(nextSection.id);

    if (window.location.hash !== `#${nextSection.id}`) {
      window.history.replaceState(null, "", `#${nextSection.id}`);
    }
  };

  const redirectToDrinks = () => {
    // navigate to internal drinks menu page instead of external site
    window.location.href = "/menu/signature";
  };

  const macroButtonClass = [
    "rounded-md macro-section-button relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200 active:scale-[0.98]",
  ].join(" ");

  const categoryButtonClass = [
    "rounded-md macro-section-button relative z-10 flex w-full cursor-pointer select-none items-center justify-center rounded-[10px] border px-4 py-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.98]",
  ].join(" ");

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
                width={128}
                height={128}
                priority
                className="h-auto w-32"
              />
            </div>
          </div>
        </header>
      )}

      <div className="sticky top-0 z-20 mt-4 space-y-3 bg-background pb-3 pt-3">
        <nav className="category-grid relative z-10 grid grid-cols-3 gap-2 pb-1">
          <button
            type="button"
            onClick={() => activateMacroSection("menu")}
            className={[
              macroButtonClass,
              activeMacroSection === "menu"
                ? "border-(--color-gold)"
                : "border-(--color-gold)/35 bg-white/4 text-(--color-gold)",
            ].join(" ")}
            style={
              activeMacroSection === "menu"
                ? {
                    background: "var(--color-gold)",
                    borderColor: "var(--color-gold)",
                    color: "var(--color-ink)",
                  }
                : undefined
            }
            aria-pressed={activeMacroSection === "menu"}
          >
            <span>Menu</span>
          </button>

          <button
            type="button"
            onClick={() => activateMacroSection("bevande")}
            className={[
              macroButtonClass,
              activeMacroSection === "bevande"
                ? "border-(--color-gold)"
                : "border-(--color-gold)/35 bg-white/4 text-(--color-gold)",
            ].join(" ")}
            style={
              activeMacroSection === "bevande"
                ? {
                    background: "var(--color-gold)",
                    borderColor: "var(--color-gold)",
                    color: "var(--color-ink)",
                  }
                : undefined
            }
            aria-pressed={activeMacroSection === "bevande"}
          >
            <span>Vini</span>
          </button>

          <button
            type="button"
            onClick={redirectToDrinks}
            className={[
              macroButtonClass,
              "border-(--color-gold)/35 bg-white/4 text-(--color-gold)",
            ].join(" ")}
          >
            <span>Drink</span>
          </button>
        </nav>

        <label className="menu-card mb-4 flex items-center gap-3 rounded-[10px]! px-4 py-3">
          <Search className="h-4 w-4 text-(--color-gold)" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              activeMacroSection === "bevande" ? "Cerca vini" : "Cerca piatti"
            }
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            aria-label="Cerca nel menu"
          />
        </label>

        <nav className="category-grid relative z-10 grid grid-cols-2 gap-2 pb-1 sm:grid-cols-3">
          {activeMacroSection === "menu" && hasApericenaConviviale ? (
            <button
              type="button"
              onClick={() => activateSection("apericena-conviviale")}
              onPointerUp={() => activateSection("apericena-conviviale")}
              onTouchStart={() => activateSection("apericena-conviviale")}
              className={[
                categoryButtonClass,
                activeSection === "apericena-conviviale"
                  ? "border-(--color-gold)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              style={
                activeSection === "apericena-conviviale"
                  ? {
                      background: "var(--color-gold)",
                      borderColor: "var(--color-gold)",
                      color: "var(--color-ink)",
                    }
                  : undefined
              }
              aria-pressed={activeSection === "apericena-conviviale"}
            >
              <span>Apericena</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasAntipasti ? (
            <button
              type="button"
              onClick={() => activateSection("antipasti")}
              onPointerUp={() => activateSection("antipasti")}
              onTouchStart={() => activateSection("antipasti")}
              className={[
                categoryButtonClass,
                activeSection === "antipasti"
                  ? "border-(--color-gold)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              style={
                activeSection === "antipasti"
                  ? {
                      background: "var(--color-gold)",
                      borderColor: "var(--color-gold)",
                      color: "var(--color-ink)",
                    }
                  : undefined
              }
              aria-pressed={activeSection === "antipasti"}
            >
              <span>Antipasti</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasSelezioneTartare ? (
            <button
              type="button"
              onClick={() => activateSection("selezione-tartare")}
              onPointerUp={() => activateSection("selezione-tartare")}
              onTouchStart={() => activateSection("selezione-tartare")}
              className={[
                categoryButtonClass,
                activeSection === "selezione-tartare"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "selezione-tartare"}
            >
              <span>Tartare</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasPrimiPiatti ? (
            <button
              type="button"
              onClick={() => activateSection("primi-piatti")}
              onPointerUp={() => activateSection("primi-piatti")}
              onTouchStart={() => activateSection("primi-piatti")}
              className={[
                categoryButtonClass,
                activeSection === "primi-piatti"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "primi-piatti"}
            >
              <span>Primi</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasSecondiPiatti ? (
            <button
              type="button"
              onClick={() => activateSection("secondi-piatti")}
              onPointerUp={() => activateSection("secondi-piatti")}
              onTouchStart={() => activateSection("secondi-piatti")}
              className={[
                categoryButtonClass,
                activeSection === "secondi-piatti"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "secondi-piatti"}
            >
              <span>Secondi</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasSelezioneHamburger ? (
            <button
              type="button"
              onClick={() => activateSection("selezione-hamburger")}
              onPointerUp={() => activateSection("selezione-hamburger")}
              onTouchStart={() => activateSection("selezione-hamburger")}
              className={[
                categoryButtonClass,
                activeSection === "selezione-hamburger"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "selezione-hamburger"}
            >
              <span>Hamburger</span>
            </button>
          ) : null}


          {activeMacroSection === "menu" && hasDolci ? (
            <button
              type="button"
              onClick={() => activateSection("dolci")}
              onPointerUp={() => activateSection("dolci")}
              onTouchStart={() => activateSection("dolci")}
              className={[
                categoryButtonClass,
                activeSection === "dolci"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "dolci"}
            >
              <span>Dolci</span>
            </button>
          ) : null}

          {activeMacroSection === "menu" && hasCoperto ? (
            <button
              type="button"
              onClick={() => activateSection("coperto")}
              onPointerUp={() => activateSection("coperto")}
              onTouchStart={() => activateSection("coperto")}
              className={[
                categoryButtonClass,
                activeSection === "coperto"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "coperto"}
            >
              <span>Coperto</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasViniRossi ? (
            <button
              type="button"
              onClick={() => activateSection("vini-rossi")}
              onPointerUp={() => activateSection("vini-rossi")}
              onTouchStart={() => activateSection("vini-rossi")}
              className={[
                categoryButtonClass,
                activeSection === "vini-rossi"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "vini-rossi"}
            >
              <span>Rosso</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasViniBianchi ? (
            <button
              type="button"
              onClick={() => activateSection("vini-bianchi")}
              onPointerUp={() => activateSection("vini-bianchi")}
              onTouchStart={() => activateSection("vini-bianchi")}
              className={[
                categoryButtonClass,
                activeSection === "vini-bianchi"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "vini-bianchi"}
            >
              <span>Bianco</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasViniRosati ? (
            <button
              type="button"
              onClick={() => activateSection("vini-rosati")}
              onPointerUp={() => activateSection("vini-rosati")}
              onTouchStart={() => activateSection("vini-rosati")}
              className={[
                categoryButtonClass,
                activeSection === "vini-rosati"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "vini-rosati"}
            >
              <span>Rosato</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasChampagne ? (
            <button
              type="button"
              onClick={() => activateSection("champagne")}
              onPointerUp={() => activateSection("champagne")}
              onTouchStart={() => activateSection("champagne")}
              className={[
                categoryButtonClass,
                activeSection === "champagne"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "champagne"}
            >
              <span>Champagne</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasFranciacorta ? (
            <button
              type="button"
              onClick={() => activateSection("franciacorta")}
              onPointerUp={() => activateSection("franciacorta")}
              onTouchStart={() => activateSection("franciacorta")}
              className={[
                categoryButtonClass,
                activeSection === "franciacorta"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "franciacorta"}
            >
              <span>Franciacorta</span>
            </button>
          ) : null}

          {activeMacroSection === "bevande" && hasBollicine ? (
            <button
              type="button"
              onClick={() => activateSection("bollicine")}
              onPointerUp={() => activateSection("bollicine")}
              onTouchStart={() => activateSection("bollicine")}
              className={[
                categoryButtonClass,
                activeSection === "bollicine"
                  ? "border-(--color-gold) bg-(--color-gold) text-(--color-ink)"
                  : "border-white/10 bg-white/5 text-white/70",
              ].join(" ")}
              aria-pressed={activeSection === "bollicine"}
            >
              <span>Bollicine</span>
            </button>
          ) : null}
        </nav>
      </div>

      <main id="menu-results" className="mt-5 space-y-4">
        {visibleSections.length === 0 ? (
          <section className="menu-card px-5 py-8 text-center text-white/75">
            <p className="font-display text-3xl uppercase text-(--color-gold)">
              Nessun risultato
            </p>
            <p className="mt-3 text-sm leading-6">
              Prova con un ingrediente, una categoria o un tag diverso.
            </p>
          </section>
        ) : selectedSection ? (
          <section
            key={selectedSection.id}
            id={selectedSection.id}
            className="px-1 py-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  className="font-display mt-2 text-3xl uppercase leading-none"
                  style={{ color: "var(--color-gold)" }}
                >
                  {selectedSection.title}
                </h2>
                {selectedSection.id === "secondi-piatti" ? (
                  <p className="mt-3 max-w-136 text-sm leading-6 text-white/72">
                    Tutti i secondi sono comprensivi di contorno a scelta tra
                    patate fritte o patate arrosto.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 space-y-1 border-t border-white/8 pt-2">
              {selectedSection.items.map((item) => (
                <article
                  key={item.name}
                  className="border-b border-white/8 px-0 py-4 last:border-b-0"
                >
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
                      <p className="mt-2 text-sm leading-6 text-white/72">
                        {item.description}
                      </p>
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
                              <span className="hidden sm:inline">
                                {ALLERGENS_MAP[a]}
                              </span>
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {Array.isArray(item.allergens) &&
                      item.allergens.length === 0 &&
                      item.notes ? (
                        <div className="mt-3 text-sm leading-6 text-white/72">
                          Allergeni: variabile — {item.notes}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <footer className="mt-10 pb-10 text-center text-sm">
        <span className="inline">
          Per informazioni su sostanze e allergeni è possibile consultare
          l’apposita documentazione o rivolgersi al personale
        </span>
        <br />
        <a
          href="/allergeni"
          className="underline underline-offset-4 transition"
        >
          Legenda allergeni
        </a>
      </footer>
    </div>
  );
}
