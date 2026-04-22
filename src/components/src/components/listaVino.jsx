import { FaWineGlass } from "react-icons/fa";
import LineaSeparazione from "./lineaSeparazione";
import LineaSeparazioneHeader from "./lineaSeprazioneHeader";
import DimensioniContext from "@/context/dimensioniContext";
import { useContext } from "react";


const Lista = ({ titolo, vini, id }) => {
  const { getDynamicVh } = useContext(DimensioniContext);

  return (
    <> 
      <div style={{marginTop:`${getDynamicVh(2)}px`}}  className="flex flex-col items-center px-3" id={id}>
        <div className="w-full overflow-y-auto grid grid-cols-2 gap-y-5 gap-6 ">
          {vini.map((vino, index) => (
            <div key={index} className="flex flex-row justify-between items-end px-2 pt-1 ">
              <div className="w-[62.5%]  sm:w-2/3">
                <h3 style={{fontSize:`${getDynamicVh(4.1)}px`}} className="text-base font-bold text-[#f1a637] mb-2">{vino.nome}</h3>
                <h1 style={{fontSize:`${getDynamicVh(3.6)}px`}} className=" font-semibold mb-2 text-[#dbaa5f]">{vino.categoria}</h1>
                <p style={{fontSize:`${getDynamicVh(3.1)}px`}} className=" text-[#efe2d0]">{vino.descrizione}</p>
              </div>
              <div className="w-[37.5%] flex justify-end items-end text-right">
                <div className="flex flex-col items-center">
                  <FaWineGlass className="w-5 h-5 text-[#f1a637] mb-2" />
                  <p className="text-sm font-semibold text-[#efe2d0]">{vino.prezzoCalice}</p>
                </div>
                <div className="flex flex-col items-center ml-3">
                  <img src="/menu/vino_bottiglia.svg" alt="Icona Calice" className="w-8 h-8 text-[#f1a637] mb-2" />
                  <p className="text-sm font-semibold text-[#efe2d0]">{vino.prezzoBottiglia}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Lista;
