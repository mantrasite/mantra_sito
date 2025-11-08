import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { GrRotateLeft } from "react-icons/gr";
import { MdOpenInBrowser } from "react-icons/md";
export default function RotateWarning() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("instagram")) {
        setIsInstagram(true);
      }
    }
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="rotate-screen ">
      {isInstagram ? (
        <>
          <img
            alt="Logo Mantra"
            src="/logo_mantra.svg"
            className="w-2/3 md:w-1/4 "
          />
          <p className="mt-10 text-[#dbaa5f] text-base mb-4">
            Stai visualizzando il sito da Instagram, che non supporta la
            rotazione dello schermo.
            <br />
            Per continuare:
          </p>
          <div className="text-base text-[#dbaa5f] leading-tight">
            <br />
            <p>1. Premi i 3 puntini in alto a destra</p>
            <br />
            <p>
              2. Scegli <strong>“Apri nel browser”</strong>
            </p>
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="translate-y-[-50%]"
            animate={{ rotate: [0, -90, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <GrRotateLeft size={80} color="#dbaa5f" />
          </motion.div>
          <p className="rotate-text text-[#dbaa5f] translate-y-[-50%]">
            Gira lo schermo e immergiti nell'atmosfera. <br />
            L'esperienza sarà unica.
          </p>
        </>
      )}
    </div>
  );
}
