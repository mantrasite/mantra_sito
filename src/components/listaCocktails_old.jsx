import { FaCircle, FaRegCircle } from 'react-icons/fa'; // Importa le icone per i pallini

const ListaCocktails = ({ id, cocktails }) => {
    return (
        <>
            <div className="h-full px-12" >
                {cocktails.map(({ nome, prezzo, ingredienti, valutazioni }, index) => (
                    <div className="h-full" key={index}>
                        <div className="h-[80%] flex flex-row w-full pt-2">
                            <div className="w-[40%] flex flex-row">
                                <div className="w-[60%] h-full flex flex-col justify-end items-center">
                                    <h4 className="h-[10%] flex justify-end text-[#f1a637] items-center text-lg">ARGENTINA</h4>
                                    <img src="/argentina.svg" alt="argentina" className=" h-[90%] max-w-[100%]" />
                                </div>
                                <div className="bg-red-200 w-[40%]"></div>
                                
                            </div>
                            <div className="w-[60%] h-full pr-1 flex flex-row item-start">
                                <div className="w-[40%] h-full pr-1 flex flex-col justify-end items-center">
                                    <h4 className="h-[10%] w-[80%] flex justify-start text-left items-start text-lg">{nome}</h4>
                                    <ul className="mt-2 w-[80%] h-[90%] text-[#efe2d0]">
                                        {ingredienti.map((ingrediente, index) => (
                                            <li key={index} className="text-sm text-left">
                                                {ingrediente}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-[60%] h-full">
                                    <div className="h-[10%] w-full text-right text-xl">{prezzo} €</div>
                                    <div className="h-[90%] w-full pt-3 px-3 text-center text-xs text-[#efe2d0]">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore.</div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[20%] w-full pb-3 flex flex-row pt-3">
                            <div className="grid grid-cols-3 text-sm w-full">
                                {Object.keys(valutazioni).map((key) => (
                                    <div key={(Math.floor(Math.random() * 1000) + 1)+key} className="flex justify-center items-center">
                                        <span className="capitalize">{key}:</span>
                                        <span className="flex ml-2 text-[#efe2d0]" style={{ fontSize: '4vh' }}>
                                            {/* Usando le icone per i pallini pieni e vuoti */}
                                            {Array(valutazioni[key]).fill(<FaCircle style={{ paddingRight: '0.4em' }} />)} {/* Pallini pieni */}
                                            {Array(5 - valutazioni[key]).fill(<FaRegCircle style={{ paddingRight: '0.4em' }} />)} {/* Pallini vuoti */}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListaCocktails;
