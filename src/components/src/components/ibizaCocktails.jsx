import { ibizaGiorno, drinkToronto } from "@/data/cocktail";
import { PiStarFourFill } from "react-icons/pi";
import { useContext } from "react";
import DimensioniContext from "@/context/dimensioniContext";


const IbizaCocktails = () => {
    const { getDynamicVh } = useContext(DimensioniContext);  

    const nazione = "IBIZA";

    return (
        <>
            <div className="h-full flex flex-row" >
                <div className="w-[25%] h-full flex flex-col justify-center items-center">
                <img
                    src={`/menu/${nazione}.svg`}
                    alt={nazione}
                    className="pl-[4vw]  max-w-[80%]"
                    />
                </div>
                <div className="w-[75%] flex flex-col h-full">
                    {/* ibiza giorno */}
                    <div className=" h-1/2">
                        <div className="h-[100%] flex flex-row w-full pt-[1.5%]">
                            <div className="w-[70%] text-center flex flex-col">
                                <p style={{fontSize:`${getDynamicVh(4.1)}px`}} className="uppercase">{ibizaGiorno[0].nome}</p>
                                <div className=" pt-[2%] px-3 text-[#efe2d0]  whitespace-pre-line" style={{fontSize:`${getDynamicVh(3.4)}px`}}>
                                    {ibizaGiorno[0].descrizione}
                                </div>
                            </div>
                            <div className="w-[30%] h-full pr-1 pt-[4%] flex flex-col justify-start items-center">
                                <ul className=" w-[80%] h-[70%] text-[#efe2d0] pl-2">
                                    {ibizaGiorno[0].ingredienti.map((ingrediente, index) => (
                                        <li key={index} style={{fontSize:`${getDynamicVh(3)}px`}}  className=" mb-1 flex flex-row">
                                            <div style={{width:`${getDynamicVh(2.1)}px`}} className=" flex justify-center items-center mr-[1vw]"><PiStarFourFill className=" text-[#dbaa5f]" /></div><span >{ingrediente}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{fontSize:`${getDynamicVh(6)}px`}}  className="flex justify-end items-end text-right h-[30%] pt-[2%] mr-[7vw] w-full text-[#f1a637] font-semibold">
                                        {ibizaGiorno[0].prezzo} €
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ibiza notte */}
                    <div className=" h-1/2">
                        <div className="h-[100%] flex flex-row w-full pt-[0.5%]">
                            <div className="w-[70%] text-center flex flex-col">
                                <p style={{fontSize:`${getDynamicVh(4.1)}px`}} className="uppercase">{drinkToronto[0].nome}</p>
                                <div className=" pt-[2%] px-3 text-[#efe2d0]  whitespace-pre-line" style={{fontSize:`${getDynamicVh(3.4)}px`}}>
                                        {drinkToronto[0].descrizione}
                                </div>
                            </div>
                            <div className="w-[30%] h-full pr-1 pt-[4%] flex flex-col justify-start items-center">
                                <ul className=" w-[80%] h-[70%] text-[#efe2d0] pl-2">
                                    {drinkToronto[0].ingredienti.map((ingrediente, index) => (
                                        <li key={index} style={{fontSize:`${getDynamicVh(3)}px`}} className="mb-1 flex flex-row">
                                            <div style={{width:`${getDynamicVh(2.1)}px`}} className=" flex justify-center items-center  mr-[1vw]"><PiStarFourFill className=" text-[#dbaa5f]" /></div><span >{ingrediente}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{fontSize:`${getDynamicVh(6)}px`}}  className="flex justify-end items-end text-right h-[30%]  pb-[5%] w-full mr-[7vw] text-[#f1a637] font-semibold">
                                        {drinkToronto[0].prezzo} €
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default IbizaCocktails