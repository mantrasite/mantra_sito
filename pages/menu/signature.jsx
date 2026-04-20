"use client";

import Cerchio from "@/components/cerchio";
import { useRef, useEffect, useState, useContext } from "react";
import HeaderContext from "@/context/headerContext";
import DimensioniContext from "@/context/dimensioniContext";

const SignatureCocktails = () => {
  const { getDynamicVh } = useContext(DimensioniContext);
  const { setNomeHeader, setHeaderColorato } = useContext(HeaderContext);
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const path = "/menu/lista#";

  const countryCoordinates = {
    SANTA: { x: 0.522, y: 0.36 },
    TORONTO: { x: 0.38, y: 0.43 },
    NEWYORK: { x: 0.395, y: 0.45 },
    HAWAII: { x: 0.3, y: 0.45 },
    MOSCA: { x: 0.56, y: 0.4 },
    SEOUL: { x: 0.655, y: 0.48 },
    PRAGA: { x: 0.5, y: 0.44 },
    MADRID: { x: 0.482, y: 0.47 },
  };

  useEffect(() => {
    setNomeHeader("Signature cocktails");
    setHeaderColorato(false);

    const updateLines = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerW = containerRect.width;
      const containerH = containerRect.height;

      const circles = Array.from(document.querySelectorAll(".cerchio"));
      const newLines = circles
        .map((circle) => {
          const nazione = circle.dataset.nazione;
          const nazioneCoord = countryCoordinates[nazione];
          if (!nazioneCoord) return null;

          const rect = circle.getBoundingClientRect();
          const circleCenterX =
            rect.left + rect.width / 2 - containerRect.left;
          const circleCenterY =
            rect.top + rect.height / 2 - containerRect.top;

          // Coordinate sulla mappa
          const mapX = nazioneCoord.x * containerW;
          const mapY = nazioneCoord.y * containerH;

          // Calcolo angolo per partire dal bordo del cerchio
          const dx = mapX - circleCenterX;
          const dy = mapY - circleCenterY;
          const angle = Math.atan2(dy, dx);
          const radius = rect.width / 2;

          const x1 = circleCenterX + radius * Math.cos(angle);
          const y1 = circleCenterY + radius * Math.sin(angle);

          return { x1, y1, x2: mapX, y2: mapY };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const update = () => requestAnimationFrame(updateLines);
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full flex justify-center items-center relative w-full"
    >
      {/* Cerchi a sinistra */}
      <Cerchio
        nome="SANTA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(0)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[17vw] cerchio"
        href={path + "drinkSantaClausVillage"}
      >
        SANTA CLAUS VILLAGE
      </Cerchio>

      <Cerchio
        nome="TORONTO"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(15)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[7vw] cerchio"
        href={path + "drinkToronto"}
      >
        TORONTO
      </Cerchio>

      <Cerchio
        nome="HAWAII"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(15)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[7vw] cerchio"
        href={path + "drinkHawaii"}
      >
        HAWAII
      </Cerchio>

      <Cerchio
        nome="NEWYORK"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(0)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[17vw] cerchio"
        href={path + "drinkNewYork"}
      >
        NEW YORK
      </Cerchio>

      {/* Mappa */}
      <img
        src="/menu/mappa_mondo.svg"
        alt="mappa_mondo"
        className="max-w-[52.5%] z-[-999]"
      />

      {/* Cerchi a destra */}
      <Cerchio
        nome="MOSCA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(0)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[15vw] cerchio"
        href={path + "drinkMosca"}
      >
        MOSCA
      </Cerchio>

      <Cerchio
        nome="SEOUL"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(15)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[5vw] cerchio"
        href={path + "drinkSeoul"}
      >
        SEOUL
      </Cerchio>

      <Cerchio
        nome="PRAGA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(15)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[5vw] cerchio"
        href={path + "drinkPraga"}
      >
        PRAGA
      </Cerchio>

      <Cerchio
        nome="MADRID"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(0)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[15vw] cerchio"
        href={path + "drinkMadrid"}
      >
        MADRID
      </Cerchio>

      {/* Linee dinamiche */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines.map(({ x1, y1, x2, y2 }, index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f1a637"
            strokeWidth="1.28"
          />
        ))}
      </svg>
    </div>
  );
};

export default SignatureCocktails;
