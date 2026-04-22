import React from "react";
import Reveal from "@/components/Reveal";
import { MdOutlinePool } from "react-icons/md";

const Pool = () => {
    return (
        <section id="pool" className="min-h-screen flex flex-col md:flex-row-reverse justify-center items-center px-[5vw] text-center bg-[#24072f]">
            <div className="md:w-1/2 flex justify-center items-center flex-col md:mb-0">
                <Reveal>
                    <h2 className="titoloSection md:text-[2.35vw] text-[4.5vh] font-semibold text-[#dbaa5f] md:mb-[1.75vh] mb-[5vh]">Pool</h2>
                </Reveal>
                <Reveal>
                    <p className="md:max-w-[39vw] w-full text-center md:text-[1.05vw] text-[1.9vh] md:mb-0 mb-[6vh]">
                        La nostra piscina è un&#39;oasi di relax, dove puoi concederti una pausa rinfrescante tra un&#39;attività e l&#39;altra.<br />
                        Immergiti nelle acque cristalline, prenditi un momento per te e goditi la tranquillità.  <br />
                        Durante l&#39;estate, organizziamo eventi esclusivi e serate tematiche che uniscono il piacere di un bagno rinfrescante con la magia di una festa sotto le stelle.  <br />
                        La piscina è il luogo ideale per ricaricare le energie e vivere la vera essenza di Mantra.
                    </p>
                </Reveal>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
                <MdOutlinePool className="md:w-1/5 md:h-1/5 w-[10vh] h-[10vh] text-[#dbaa5f]" />
            </div>
        </section>
    );
}

export default Pool;