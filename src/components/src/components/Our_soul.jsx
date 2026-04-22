import React from "react";
import Reveal from "@/components/Reveal";
import { motion} from "framer-motion";

const Our_soul = () => {
    return (
        <section id="our-soul" className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:pb-0 pb-[4vh] text-center md:text-left bg-[#4c1c75]">
            <Reveal>
                <h2 className="md:hidden titoloSection text-[4.5vh] top-0 text-center font-semibold text-[#dbaa5f] md:mb-[1.75vh] mb-[5vh]">Our Soul</h2>
            </Reveal>
            <div className="md:w-1/2  md:flex hidden flex-col justify-center items-center">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src="/logo_mantra.svg" alt="Our Soul" className="w-[60%] md:w-[50%] object-cover " />
            </div>
            <div className="md:w-1/2 flex justify-center items-center flex-col md:mb-0">
                <Reveal>
                    <h2 className="hidden md:block titoloSection text-[2.35vw] text-center font-semibold text-[#dbaa5f] mb-[1.75vh]">Our Soul</h2>
                </Reveal>
                <Reveal>
                    <p className="md:max-w-[39vw] w-full text-center md:text-[1.05vw] text-[1.9vh] md:mb-0 mb-[7vh]">
                        Mantra è molto più di un semplice ristorante.<br />
                        È un luogo dove sapori, suoni e sensazioni si fondono in un&#39;esperienza unica.<br />
                        Oltre ai piatti curati nei minimi dettagli, ti attende un cocktail bar d&#39;autore, dove ogni drink è una scoperta di gusto e creatività.<br />
                        L&#39;atmosfera è pensata per coinvolgere i sensi, con luci soffuse, musica selezionata e un&#39;accoglienza che ti fa sentire al centro.<br />
                        Mantra è il tuo rifugio, dove rilassarti, lasciarti ispirare e vivere momenti autentici e memorabili.<br />
                    </p>
                </Reveal>
            </div>
            <div className="md:w-1/2  md:hidden flex flex-col justify-center items-center">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src="/logo_mantra_stretto.svg" alt="Our Soul" className="w-[60%] md:w-[50%] object-cover " />
            </div>
        </section>
    );
}

export default Our_soul;    