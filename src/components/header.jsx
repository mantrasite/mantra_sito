"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Stile più elegante
import LineaSeparazioneHeader from "./lineaSeprazioneHeader";
import HeaderContext from "@/context/headerContext";
import { useContext } from "react";
import DimensioniContext from "@/context/dimensioniContext";

const Header = ({stile}) => {
    const router = useRouter();
    const { nome, colorato, id } = useContext(HeaderContext);
    const { getDynamicVh } = useContext(DimensioniContext);
    
    const handleBack = () => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf("/")) || "/";
        router.push(newPath);
    };

    return (
        <header id={id} className={((colorato) ? "bg-[#140d1f] border-b-2 border-[#f1a637] shadow-xl " : "") + stile +" flex w-[100%] items-center justify-between text-white px-4 "}>
            {/* Logo */}
            <Image 
                width={getDynamicVh(13)} 
                height={getDynamicVh(13)} 
                src="/logo_mantra_stretto.svg" 
                alt="Logo" 
                className="rounded-full " 
            />

            {/* Titolo */}
            <div className="h-full flex flex-col mb-2 mt-3">
                <span  style={{fontSize:`${getDynamicVh(5.5)}px`}} className="text-[#dbaa5f] tracking-widest flex justify-center items-end  font-light uppercase px-6 pt-1 ">
                    {nome}
                </span>
                <LineaSeparazioneHeader/>
            </div>

            {/* Bottone Indietro */}
            <button 
                className="text-[#dbaa5f] hover:text-[#f1a637] transition-all duration-300 p-2 rounded-full hover:bg-[#f1a63720]"
                onClick={handleBack}
            >
                <ArrowLeftIcon style={{ width:`${getDynamicVh(6.2)}px`, height:`${getDynamicVh(6.2)}px` }} className="stroke-1" /> 
            </button>
        </header>
    );
};

export default Header;
