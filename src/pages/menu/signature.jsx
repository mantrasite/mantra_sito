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
    IBIZA: { x: 0.485, y: 0.38 },
    SICILIA: { x: 0.508, y: 0.38 },
    BUDAPEST: { x: 0.51, y: 0.35 },
    AUSTRALIA: { x: 0.68, y: 0.58 },
    CARTAGENA: { x: 0.375, y: 0.5 }
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
        nome="IBIZA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(1)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile=" cerchio"
        href={path + "drinkIbiza"}
      >
        IBIZA
      </Cerchio>

      <Cerchio
        nome="SICILIA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(1)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[3vw] cerchio"
        href={path + "drinkSicilia"}
      >
        SICILIA
      </Cerchio>

      <Cerchio
        nome="AUSTRALIA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(10)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="right-[3vw] cerchio"
        href={path + "drinkAustralia"}
      >
        AUSTRALIA
      </Cerchio>

      <Cerchio
        nome="BUDAPEST"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          top: `${getDynamicVh(1)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[3vw] cerchio"
        href={path + "drinkBudapest"}
      >
        BUDAPEST
      </Cerchio>

      {/* Mappa */}
      <img
        src="/menu/mappa_mondo.svg"
        alt="mappa_mondo"
        className="max-w-[60%] z-[-999] mb-[10%]"
      />

      {/* Cerchi a destra */}
      <Cerchio
        nome="CARTAGENA"
        styleProp={{
          width: `${getDynamicVh(28)}px`,
          height: `${getDynamicVh(28)}px`,
          bottom: `${getDynamicVh(10)}px`,
          fontSize: `${getDynamicVh(4.1)}px`,
        }}
        stile="left-[3vw] cerchio"
        href={path + "drinkCartagena"}
      >
        CARTAGENA
      </Cerchio>

      {/* Linee dinamiche */}
      <svg
        className="absolute  left-0 w-full h-full pointer-events-none z-50"
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
