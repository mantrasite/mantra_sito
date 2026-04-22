import { useContext } from "react";
import LineaSeparazione from "./lineaSeparazione";
import DimensioniContext from "@/context/dimensioniContext";

const ListaSemplice = ({ elementi, titolo }) => {
  const {getDynamicVh} = useContext(DimensioniContext);
  return (
    <>
      <div className="h-full flex flex-col items-center mt-4 px-10">
        <div className="w-full h-[90%]  grid grid-cols-2 gap-1  gap-x-28 relative">
          {elementi.map((elemento, index) => (
            <div key={index} style={{marginBottom:`${getDynamicVh(8)}px`}}  className="w-full flex flex-row justify-between items-center ">
              <div className="float-left">
                <h3 className="text-base font-bold text-[#dbaa5f]">{elemento.nome}</h3>
              </div>
              <div className="float-right">
                <p className="text-base font-semibold text-[#efe2d0]">{elemento.prezzo}</p>
              </div>
            </div>
          ))}
          
          {/* Linea di separazione centrale */}
          <div className=" absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2">
            <LineaSeparazione grandezza={"h-[30vh]"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaSemplice;
