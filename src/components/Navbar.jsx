import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import { IoMdClose } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import { Link } from "lucide-react";
import HeaderContext from "@/context/headerContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerCtx = useContext(HeaderContext) || {};
  const setHideHeader = headerCtx.setHideHeader;


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8); // mostra logo dopo ~80% della viewport
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync menu open state to body class so other components can react
  useEffect(() => {
    try {
      if (menuOpen) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    } catch (e) {
      // ignore (SSR or restricted env)
    }

    // ensure body can't scroll when menu is open (fallback for missing CSS)
    try {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    } catch (e) {}

    // inform header context so pages can hide header
    try {
      if (typeof setHideHeader === "function") setHideHeader(menuOpen);
    } catch (e) {}

    return () => {
      try {
        document.body.classList.remove("menu-open");
      } catch (e) {}
      try {
        document.body.style.overflow = "";
      } catch (e) {}
      try {
        if (typeof setHideHeader === "function") setHideHeader(false);
      } catch (e) {}
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // Chiude il menu dopo il click
  };

  const navItems = [
    "Home",
    "Our Soul",
    "Restaurant and Cocktail Bar",
    "Rooms",
    "Pool",
    "Find Us",
  ];

  return (
    <motion.nav
      className={`h-[6.5vh] fixed cursor-pointer top-0 left-0 w-full z-50 transition-colors flex items-center md:justify-center justify-between  md:px-12 md:py-[2vh] 
        ${menuOpen
          ? "bg-transparent" // quando il menu è aperto non mostrare il header scuro
          : isScrolled
            ? "bg-[#4c1c75]/80 backdrop-blur-lg"
            : "bg-transparent"}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Desktop menu */}
      <ul className="hidden md:flex cursor-pointer  space-x-[4.5vw]">
        {navItems.map((item, index) => (
          <li key={index}>
            <Reveal>
              <button
                onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
                className="text-[#dbaa5f] cursor-pointer text-[1.9vh] hover:text-white transition-colors"
              >
                {item}
              </button>
            </Reveal>
          </li>
        ))}
        <li >
            <Reveal>
              <a
                href="/menu"
                className="text-[#dbaa5f] cursor-pointer text-[1.9vh] hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Menù
              </a>
            </Reveal>
          </li>
      </ul>
      {/* Mobile menu toggle */}
      <div className="md:hidden w-screen left-0 right-0 flex items-center justify-between px-4 py-[2.5vh]">
        {isScrolled || menuOpen ? (
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="z-10">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src="/logo_mantra_stretto.svg" alt="Our Soul" className="h-[4.8vh] object-cover" />
            </div>
            <div className="flex justify-center absolute items-end h-full left-1/2 transform -translate-x-1/2 text-[#dbaa5f] font-bold text-lg">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src="/logo_mantra_text_lite.svg" alt="Mantra" className="h-[4.5vh] object-cover mb-1" />
            </div>
          </motion.div>
        ) : (
          // elemento vuoto per mantenere lo spazio
          <div className="w-[4.8vh]" />
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="z-10 text-[#dbaa5f] text-2xl mr-2 flex justify-center items-center"
        >
          {menuOpen ? <IoMdClose /> : <VscMenu />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="absolute top-full left-0 w-full backdrop-blur-md bg-[#2a0a38] flex flex-col items-center space-y-5 py-8 z-40 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border-t border-[#dbaa5f]/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
                  className="text-[#dbaa5f] text-lg tracking-wide font-medium px-4 py-2 hover:text-white hover:scale-105 transition-all duration-300 ease-out"
                >
                  {item}
                </button>
              </motion.li>
            ))}
            <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 * 0.05 }}
              >
                <a
                  href="/menu"
                    className="text-[#dbaa5f] text-lg tracking-wide font-medium px-4 py-2 hover:text-white hover:scale-105 transition-all duration-300 ease-out"
                    onClick={() => setMenuOpen(false)}
                >
                  Menù
                </a>
              </motion.li>
          </motion.ul>
        )}


      </AnimatePresence>
    </motion.nav >
  );
};

export default Navbar;