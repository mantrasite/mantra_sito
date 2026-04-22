import React from "react";
import { FaInstagram, FaWhatsapp, FaMapMarkedAlt } from "react-icons/fa";
import Reveal from "@/components/Reveal";

const Find_us = () => {
    return (
        <section id="find-us" className="min-h-screen flex flex-col justify-center items-center px-6 text-center pt-10 bg-[#2a0a38]">

            {/* Titolo */}
            <Reveal>
                <h2 className="titoloSection text-[4.5vh] md:text-[2.35vw] font-bold text-[#dbaa5f] mb-[2vh] md:mb-[7vh]">Find Us</h2>
            </Reveal>
            <div className="w-full flex flex-col md:flex-row justify-center items-center">

                {/* Indirizzo */}
                <a href="https://maps.app.goo.gl/M9EgX56wdHnGX4Hb6" target="_blank" className="w-full md:w-2/5 text-white md:mb-8 mb-[4vh] ">
                    <p className="mb-[2vh] text-[2.1vh] md:text-[1.2vw]">Puoi trovarci all&#39;indirizzo:</p>
                    <p className="font-semibold text-[2.3vh] md:text-[1.3vw]">Via Lucchese Romana</p>
                    <p className="text-[#dbaa5f] text-[2.1vh] md:text-[1.2vw]">Altopascio (LU), Italia</p>
                </a>

                {/* Mappa */}
                <div className="flex w-full md:w-2/4 flex-col justify-center items-center">
                    <div className="w-full h-[30vh] md:h-[42.5vh] border-4 border-[#dbaa5f] rounded-xl overflow-hidden shadow-xl mb-[2.5vh]">
                        <iframe
                            title="Dove trovarci"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.8023104451668!2d10.697113000000002!3d43.797715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a79f3bfe904f7%3A0x3ea01124acf7f37!2sMantra%20RistoClub!5e0!3m2!1sit!2sit!4v1744491149828!5m2!1sit!2sit"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    {/* Pulsante Google Maps */}
                    <Reveal>
                        <a
                            href="https://maps.app.goo.gl/M9EgX56wdHnGX4Hb6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#dbaa5f] text-[#3c1d59] px-[5vw] py-[1vh] md:px-[1.7vw] md:py-[1.75vh] rounded-full font-semibold text-[2vh] md:text-[1vw] hover:bg-white transition duration-300 ease-in-out transform hover:scale-110 shadow-lg"
                        >
                            <FaMapMarkedAlt />
                            Apri su Google Maps
                        </a>
                    </Reveal>
                </div>
            </div>

            {/* Icone Social */}
            <div className="mt-6 md:mt-10 text-white">
                <Reveal>
                    <p className="text-[2.3vh] md:text-[1.3vw] font-semibold mb-[2vh]">Ci trovi anche su</p>
                </Reveal>
                <Reveal>
                    <div className="flex justify-center space-x-8 md:mb-0 mb-[9vh]">
                        <a href="https://www.instagram.com/mantra_ristoclub/" target="_blank" rel="noopener noreferrer" title="Instagram">
                            <FaInstagram className="text-[#dbaa5f] text-[5vh] md:text-[2.5vw] hover:text-white transition-transform transform hover:scale-125" />
                        </a>
                        {/*<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <FaFacebook className="text-[#dbaa5f] text-5xl hover:text-white transition-transform transform hover:scale-125" />
            </a>*/}
                        <a href="https://wa.me/3349995643" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                            <FaWhatsapp className="text-[#dbaa5f] text-[5vh] md:text-[2.5vw] hover:text-white transition-transform transform hover:scale-125" />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Find_us;