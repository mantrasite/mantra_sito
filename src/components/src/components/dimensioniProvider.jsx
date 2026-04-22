import DimensioniContext from "@/context/dimensioniContext";
import { useState,useEffect } from "react";

const DimensioniProvider = ({ children }) => {
    const [vhUnit, setVhUnit] = useState(1); // 1vh effettivo

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const updateHeight = () => {
        setVhUnit(window.innerHeight * 0.01); // Calcola 1vh effettivo
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      
      window.addEventListener("resize", updateHeight);
      updateHeight(); // Imposta altezza iniziale
  
      return () => window.removeEventListener("resize", updateHeight);
    }, []);
  
    // Funzione per ottenere un vh corretto
    const getDynamicVh = (vhValue) => vhValue * vhUnit;
  
    return (
      <DimensioniContext.Provider value={{ getDynamicVh }}>
        {children}
      </DimensioniContext.Provider>
    );
}

export default DimensioniProvider;
