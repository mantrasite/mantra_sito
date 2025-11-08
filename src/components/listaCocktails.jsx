import { FaCircle, FaRegCircle } from 'react-icons/fa'; 
import { PiStarFourFill } from "react-icons/pi";
import { useContext } from "react";
import DimensioniContext from "@/context/dimensioniContext";

const ListaCocktails = ({ id, cocktails, label = true }) => {
    const { getDynamicVh } = useContext(DimensioniContext);  

    return (
        <>
            <div className="h-full" >
                {cocktails.map(({ nome, prezzo, ingredienti, descrizione ,valutazioni, nazione }, index) => (
                    <div className="h-full" key={nome + prezzo}>
                        <div className="h-[80%] flex flex-row w-screen pt-2">
                            <div className="w-[80%] flex flex-row">
                                <div className="w-[30%] h-full flex flex-col justify-center items-center">
                                    {label && (
                                        <h4 className="h-[10%] flex justify-start text-[#f1a637] items-center text-lg">{nazione}</h4>
                                    )}
                                    <img src={"/menu/"+nazione+".svg"} alt={nazione} className="pl-[5vw] h-[90%] max-w-[90%]" />
                                </div>
                                <div className="w-[75%] pt-[2%] px-[2%] text-center text-[#efe2d0] whitespace-pre-line" style={{fontSize:`${getDynamicVh(3.9)}px`}}>
                                    {descrizione}
                                </div>
                            </div>
                            <div className="w-[25%] h-full pr-1 pt-3 flex flex-col justify-start items-center">
                                <ul className="mt-2 w-[80%] h-[90%] text-[#efe2d0] pl-2">
                                    {ingredienti.map((ingrediente, index) => (
                                        <li key={index} style={{fontSize:`${getDynamicVh(3.9)}px`}} className="mb-2 flex flex-row">
                                            <div style={{width:`${getDynamicVh(2.1)}px`}} className=" flex justify-center items-center mr-[1vw]"><PiStarFourFill className=" text-[#dbaa5f]" /></div><span >{ingrediente}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="h-[20%] pb-3 flex flex-row pt-2">
                            <div className="w-4/5 grid grid-cols-3" style={{fontSize:`${getDynamicVh(3.9)}px`}}>
                                {Object.keys(valutazioni).map((key,index) => (
                                    <div key={key + index} className="flex justify-center items-center">
                                        <span className="capitalize">{key}:</span>
                                        <span className="flex ml-3 text-[#efe2d0]" style={{ fontSize: `${getDynamicVh(3)}px` }}>
                                            {/* Usando le icone per i pallini pieni e vuoti */}
                                            {Array.from({ length: valutazioni[key] }, (_, i) => (
                                                <FaCircle key={`full-${i}`} style={{ marginRight: '0.3em', }} />
                                            ))}
                                            {/* Pallini vuoti */}
                                            {Array.from({ length: 5 - valutazioni[key] }, (_, i) => (
                                                <FaRegCircle key={`empty-${i}`} style={{ marginRight: '0.3em' }} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center items-center text-right w-1/5 text-[#f1a637]  font-semibold" style={{ fontSize: `${getDynamicVh(10)}px` }}>{prezzo}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListaCocktails;
