"use client";
import React from "react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isClient, setIsClient] = useState(false)
  
  return (
    <footer className="bg-[#24072f] text-[#dbaa5f] text-[1.2vh] text-center py-2 px-4">
      <span className="inline">
        Mantra di Danilo Ferrara - Corte Paroli 47, 55011 Altopascio (LU) -
        P.IVA 02722070469 - REA LU-265713 -
        <a
          href="mailto:danyferrara.df@pec.it"
          className="underline hover:text-white"
        >
          danyferrara.df@pec.it
        </a>{" "}
        -
        <a
          href="/cookie-policy"
          target="_blank"
          className="underline hover:text-white mx-1"
        >
          Cookie Policy
        </a>{" "}
        |
        <a
          href="/privacy-policy"
          target="_blank"
          className="underline hover:text-white mx-1"
        >
          Privacy Policy
        </a>
        {" "}|
        <a
          href="/allergeni"
          className="underline hover:text-white mx-1"
        >
          Allergeni
        </a>
      </span>
    </footer>
  );
};

export default Footer;