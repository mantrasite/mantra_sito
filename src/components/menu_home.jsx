import Link from "next/link";
import Cerchio from "./cerchio";
import { useContext } from "react";
import DimensioniContext from "@/context/dimensioniContext";

const Menu_home = ({ titolo }) => {
    const { getDynamicVh } = useContext(DimensioniContext);

    return (
        <div className="w-screen flex items-center justify-center">
            <Cerchio nome={""} styleProp={{ fontSize: `${getDynamicVh(5.5)}px` }} stile=" h-[70vh] w-[70vh] " href={"/menu/"+titolo.toLowerCase()} >
                {titolo}
            </Cerchio>
        </div>
    )
}

export default Menu_home;
