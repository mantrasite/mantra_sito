import { useContext, useState } from "react";
import Link from "next/link";
import DimensioniContext from "@/context/dimensioniContext";

const Cerchio_best = ({ absolute = true, nome, stile, styleProp, href = "", children }) => {
  const [isHovered, setIsHovered] = useState(false); // Stato per il hover
  const { getDynamicVh } = useContext(DimensioniContext);

  const handleMouseEnter = () => setIsHovered(true); // Quando il mouse entra
  const handleMouseLeave = () => setIsHovered(false); // Quando il mouse esce

  return (
    <div
      style={styleProp}
      className={`${absolute ? "absolute" : ""} ${stile} flex items-center justify-center`}
      data-nazione={nome}
    >
      {/* Carica l'immagine SVG e rendila cliccabile */}
      <Link
        href={href}
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="/menu/logo_mantra_stretto_cerchio.svg"
          alt="Cerchio"
          className="w-full  object-cover"
        />
      </Link>

      {/* Elementi figli (label o altro) */}
      <Link href={href} className="absolute text-center w-[80%]"><span className="uppercase font-extrabold">{children}</span></Link>
    </div>
  );
};

export default Cerchio_best;
