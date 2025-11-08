import HeaderContext from "@/context/headerContext";
import { useState } from "react";

const HeaderProvider = ({ children }) => {
    const [nome, setNome] = useState("");
    const [colorato, setColorato] = useState(true);
    const [id, setId] = useState("");

    const setNomeHeader = (newName) => {
        setNome(newName);
    }

    const setHeaderColorato = (colorato) => {
        setColorato(colorato);
    }

    const setHeaderId = (id) => {
        setId(id);
    }
    return (
        <HeaderContext.Provider value={{ nome, setNomeHeader, colorato, setHeaderColorato, id, setHeaderId }}>
            {children}
        </HeaderContext.Provider>
    )

}

export default HeaderProvider;
