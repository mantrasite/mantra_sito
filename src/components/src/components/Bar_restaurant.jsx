import React from "react";
import { FaGlassMartini } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import { PiForkKnifeLight } from "react-icons/pi";

const Bar_restaurant = () => {
    return (
        <section id="restaurant-and-cocktail-bar" className="flex min-h-screen w-full flex-col justify-center items-center px-6 text-center bg-[#3d0a58]">
            <div className="hidden md:flex justify-center items-center">
                <Reveal>
                    <h2 className=" md:hidden titoloSection text-[4.5vh] font-semibold text-[#dbaa5f] mb-[1.75vh] mt-[8vh] ">Cocktail Bar</h2>
                </Reveal>
                <div className="grid  grid-cols-2 grid-rows-2 gap-y-[15vh]  justify-center items-center text-white w-full max-w-11/12 py-[6.5vh] px-[7vh]">
                    <div className="flex flex-col justify-center items-center text-right">
                        <Reveal>
                            <h2 className="md:block hidden titoloSection text-[2.35vw] font-semibold text-[#dbaa5f] mb-[1.75vh]">Cocktail Bar</h2>
                        </Reveal>
                        <Reveal>
                            <p className="text-center text-[1.05vw]">
                                Il nostro Cocktail Bar è il cuore pulsante della vita notturna.<br />
                                Lasciati avvolgere dai nostri cocktail d&#39;autore, preparati con ingredienti freschi e miscelati con maestria dai nostri esperti bartender.<br />
                                Ogni drink è un&#39;esperienza unica, un incontro perfetto tra creatività e qualità.<br />
                                Sia che tu voglia un classico intramontabile o una nuova creazione esclusiva, il nostro bar è pronto a soddisfare ogni tua richiesta.
                            </p>
                        </Reveal>
                    </div>
                    <div className="flex justify-center items-center">
                        <FaGlassMartini className="w-1/5 h-1/5 text-[#dbaa5f]" />
                    </div>
                    <div className="flex justify-center items-center">
                        <PiForkKnifeLight className="w-1/4 h-1/4 text-[#dbaa5f]" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-left">
                        <Reveal>
                            <h2 className="titoloSection text-[2.35vw] font-semibold text-[#dbaa5f] mb-[1.75vh]">Restaurant</h2>
                        </Reveal>
                        <Reveal>
                            <p className="text-center text-[1.05vw]">
                                Gusta piatti gourmet preparati con ingredienti freschi, selezionati con cura per offrirti il meglio della cucina locale e internazionale. <br />
                                Ogni piatto è una vera e propria opera d&#39;arte, studiata per sorprendereti sia nei sapori che nella presentazione. <br />
                                La nostra cucina è un&#39;esperienza che va oltre il semplice pasto: è un viaggio che stimola il palato, esalta ogni sensazione e ti fa sentire a casa in un ambiente accogliente ed elegante.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
            <div className="md:hidden  ">
                <Reveal>
                    <h2 className="titoloSection text-[4.5vh] text-center font-semibold text-[#dbaa5f] mt-[11vh] md:mb-[1.75vh] mb-[5vh]">Cocktail Bar</h2>
                </Reveal>
                <div className="flex w-full flex-col justify-center items-center ">
                    <Reveal>
                        <p className=" text-center md:text-[1.05vw] text-[1.9vh] mb-[2vh]">
                            Il nostro Cocktail Bar è il cuore pulsante della vita notturna.<br />
                            Lasciati avvolgere dai nostri cocktail d&#39;autore, preparati con ingredienti freschi e miscelati con maestria dai nostri esperti bartender.<br />
                            Ogni drink è un&#39;esperienza unica, un incontro perfetto tra creatività e qualità.<br />
                            Sia che tu voglia un classico intramontabile o una nuova creazione esclusiva, il nostro bar è pronto a soddisfare ogni tua richiesta.
                        </p>
                    </Reveal>
                    <div className="flex justify-center items-center mt-[5vh] mb-[3vh]">
                        <FaGlassMartini className="w-[15vw] h-[15vw] text-[#dbaa5f]" />
                    </div>
                </div>
                <Reveal>
                    <h2 className="titoloSection text-[4.5vh] text-center font-semibold text-[#dbaa5f] mt-[7vh] md:mb-[1.75vh] mb-[5vh]">Restaurant</h2>
                </Reveal>
                <div className="flex flex-col  w-full justify-center items-center ">
                    <Reveal>
                        <p className="text-center md:text-[1.05vw] text-[1.9vh] mb-[2vh]">
                            Gusta piatti gourmet preparati con ingredienti freschi, selezionati con cura per offrirti il meglio della cucina locale e internazionale. <br />
                            Ogni piatto è una vera e propria opera d&#39;arte, studiata per sorprendereti sia nei sapori che nella presentazione. <br />
                            La nostra cucina è un&#39;esperienza che va oltre il semplice pasto: è un viaggio che stimola il palato, esalta ogni sensazione e ti fa sentire a casa in un ambiente accogliente ed elegante.
                        </p>
                    </Reveal>
                    <div className="flex justify-center items-center mt-[5vh] mb-[12vh]">
                        <PiForkKnifeLight className="w-[20vw] h-[20vw] text-[#dbaa5f]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Bar_restaurant;