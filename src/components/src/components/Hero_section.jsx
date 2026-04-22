import React from "react";
import { motion } from "framer-motion";

const Hero_section = () => {
    return (
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center  bg-[#3c1d59]">
        <motion.img
          alt="Logo Mantra"
          src="/logo_mantra.svg"
          className="w-2/3 md:w-1/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
        </motion.img>
      </section>
    );
    }

export default Hero_section;