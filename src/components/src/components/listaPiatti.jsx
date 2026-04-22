import { PiStarFourFill } from "react-icons/pi";
import DimensioniContext from "@/context/dimensioniContext";
import { useContext } from "react";

const ListaPiatti = ({ id, piatto, nazione }) => {
    const { getDynamicVh } = useContext(DimensioniContext);

    return (
        <>
            <div className="h-full" >
                {piatto.map(({ nome, prezzo, ingredienti }, index) => (
                    <div className="h-full" key={nome + prezzo}>
                        <div className="h-[80%] flex flex-row w-screen">
                            <div className="w-full h-full pr-1 flex flex-col justify-end items-center">
                                <ul className=" w-[80%] h-[90%] text-[#efe2d0]">
                                    {ingredienti.map((ingrediente, index) => (
                                        <li key={index} className="flex flex-row justify-start items-center w-full text-left" style={{lineHeight: `${getDynamicVh(7)}px` , fontSize: `${getDynamicVh(3.5)}px` }}>
                                            <div  style={{width:`${getDynamicVh(2.1)}px`}}  className=" flex justify-center items-center mr-[1vw]"><PiStarFourFill className=" text-[#dbaa5f]" /></div>{ingrediente}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="h-[20%] pb-3 w-full flex flex-row pt-2">
                            <div className="flex justify-end items-end text-right w-full text-[#f1a637] font-semibold pr-[5vw]" style={{ fontSize: `${getDynamicVh(10)}px` }}>{prezzo} €</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListaPiatti;
