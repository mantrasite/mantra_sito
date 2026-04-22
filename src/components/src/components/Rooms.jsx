import React from "react";
import Reveal from "@/components/Reveal";
import { IoHomeOutline } from "react-icons/io5";

const Rooms = () => {
    return (
        <section id="rooms" className="min-h-screen flex flex-col md:flex-row-reverse justify-center items-center px-[5vw] text-center bg-[#320c56]">
            <Reveal>
                <h2 className="md:hidden titoloSection text-[4.5vh] text-center font-semibold text-[#dbaa5f] md:mb-[1.75vh] mb-[5vh]">Rooms</h2>
            </Reveal>
            <div className="md:w-1/2 hidden md:flex justify-center items-center">
                <IoHomeOutline className="w-1/5 h-1/5 text-[#dbaa5f]" />
            </div>
            <div className="md:w-1/2 w-full flex justify-center items-center flex-col md:mb-0">
                <Reveal>
                    <h2 className="hidden md:block titoloSection md:text-[2.35vw] font-semibold text-[#dbaa5f] mb-[1.75vh]">Rooms</h2>
                </Reveal>
                <Reveal>
                    <p className="md:max-w-[39vw] w-full text-center md:text-[1.05vw] text-[1.9vh] md:mb-0 mb-[6vh]">
                        Le nostre stanze sono pensate per offrirti un&#39;esperienza esclusiva, dove comfort e design si incontrano per darti il massimo della tranquillità e della privacy. <br />
                        Ogni ambiente è curato nei minimi dettagli, con arredi eleganti e funzionali, in grado di soddisfare anche i clienti più esigenti. <br />
                        Che tu stia cercando un angolo di serenità per una notte di riposo o una base per le tue avventure nella nostra struttura, le nostre stanze sono il rifugio perfetto per ogni tua esigenza.
                    </p>
                </Reveal>
            </div>
            <div className="w-1/2 md:hidden flex justify-center items-center">
                <IoHomeOutline className="w-[10vh] h-[10vh] text-[#dbaa5f]" />
            </div>
        </section>
    );
}

export default Rooms;