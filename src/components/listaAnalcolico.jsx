import LineaSeparazione from "./lineaSeparazione";

const ListaAnalcolico = ({ analcolici }) => {
    return (
            <div>
                    {analcolici.map((analcolico, index) => (
                        <>
                            <div key={index} className=" p-6 w-full max-w-lg ">
                                    <h2 className="text-2xl font-bold text-[#dbaa5f] " >{analcolico.nome}</h2>
                                    <div className="flex flex-row mb-2">
                                        <ul className="mt-2 w-[80%] text-[#efe2d0]">
                                            {analcolico.componenti.map((componente, index) => (
                                                <li key={index} className="text-sm">
                                                    {componente}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-end items-end text-right w-[20%] text-xl font-semibold">{analcolico.prezzo} €</div>
                                    </div>
                            </div>
                            <LineaSeparazione grandezza={"w-[35%]"} />
                        </>
                    ))}
                </div>
    );
};

export default ListaAnalcolico;
