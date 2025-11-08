"use client";

import { useState, useEffect } from "react";

export default function CookieButton() {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[4vh] left-[1vw] w-full z-50">
      <button
        className="bg-[#4b3065] cursor-pointer text-white rounded-full w-[10vw] h-[10vw] landscape:w-[4vw] landscape:h-[4vw] flex items-center justify-center shadow-lg hover:shadow-2xl transition text-[2vh] drop-shadow-lg"
        onClick={() => setOpen(!open)}
      >
        <img
          src="/cookies.svg"
          alt="cookie"
          className="w-[50%] h-[50%] object-contain"
        />
      </button>

      {open && (
        <div className="absolute bottom-[1vh] left-[5vw] right-[5vw] max-w-[90vw] bg-[#2e1a47] text-white shadow-xl overflow-hidden max-h-[80vh] flex flex-col text-[1.6vh] landscape:text-[1.1vw] p-0 ">
          <div className="flex justify-between items-start p-4 border-b border-[#dbaa5f]">
            <h2 className="text-[2vh] landscape:text-[1.4vw]  font-semibold  text-[#dbaa5f]">
              Personalizza le preferenze di consenso
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer text-[#dbaa5f] text-[1.6vh] landscape:text-[1.6vw]"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto p-4 flex-1 space-y-3">
            <p>
              Utilizziamo i cookie per aiutarti a navigare in maniera efficiente
              e a svolgere determinate funzioni. Troverai informazioni
              dettagliate su tutti i cookie sotto ogni categoria di consensi
              sottostanti. I cookie categorizzati come “Necessari” vengono
              memorizzati sul tuo browser in quanto essenziali per consentire le
              funzionalità di base del sito.
            </p>
            <p>
              Utilizziamo inoltre cookie di terze parti che ci aiutano
              nell’analizzare come utilizzi questo sito web, memorizzare le tue
              preferenze e offrirti contenuti e pubblicità rilevanti per te.
              Questi cookie saranno memorizzati sul tuo browser solo a seguito
              del tuo consenso.
            </p>

            <p>
              Puoi decidere di attivare o disattivare alcuni o tutti questi
              cookie, ma la disattivazione di alcuni di questi potrebbe avere un
              impatto sulla tua esperienza sul browser.
            </p>

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#dbaa5f] underline cursor-pointer"
            >
              {showMore ? "Mostra meno" : "Mostra di più"}
            </button>

            {showMore && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#dbaa5f] font-semibold flex justify-between">
                    Necessaria{" "}
                    <span className="text-[#dbaa5f]">Sempre attivi</span>
                  </h3>
                  <p className="mt-1">
                    I cookie necessari sono fondamentali per le funzioni di base
                    del sito Web e il sito Web non funzionerà nel modo previsto
                    senza di essi. Questi cookie non memorizzano dati
                    identificativi personali.
                  </p>
                  <div className="bg-[#3c2c54] p-3 mt-2   text-gray-300">
                    <p>
                      <strong>Cookie:</strong> cookieyes-consent
                    </p>
                    <p>
                      <strong>Durata:</strong> 1 anno
                    </p>
                    <p>
                      <strong>Descrizione:</strong> CookieYes utilizza questo
                      cookie per ricordare le preferenze di consenso degli
                      utenti in modo che vengano rispettate nelle visite
                      successive a questo sito. Non raccoglie né memorizza
                      alcuna informazione personale sui visitatori del sito.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#dbaa5f] font-semibold">Funzionale</h3>
                  <p>
                    Aiutano a svolgere funzionalità come condivisione sui social
                    media e feedback.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#dbaa5f] font-semibold">Analitica</h3>
                  <p>
                    Aiutano a migliorare l’esperienza utente analizzando
                    prestazioni e caricamenti.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#dbaa5f] font-semibold">Prestazioni</h3>
                  <p>Aiutano a migliorare l’esperienza utente.</p>
                </div>
                <div>
                  <h3 className="text-[#dbaa5f] font-semibold">Pubblicitari</h3>
                  <p>
                    Servono per mostrare annunci mirati in base all’interazione
                    passata con il sito.
                  </p>
                </div>

                <p className=" text-gray-400">
                  Per info:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#dbaa5f]"
                  >
                    Informativa sulla privacy di Google
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Bottoni di scelta */}
          <div className="grid landscape:grid-cols-3 grid-cols-1 gap-2 p-4 border-t border-[#dbaa5f] ">
            <button
              onClick={() => handleConsent("rejected")}
              className="bg-[#3c1d59] text-[#dbaa5f] hover:bg-[#dbaa5f] hover:text-[#2e1a47] transition px-6 py-2 landscape:text-[1.4vw] cursor-pointer w-full"
            >
              Rifiuta tutto
            </button>
            <button
              onClick={() => handleConsent("custom")}
              className="bg-[#2e1a47] text-[#dbaa5f] border border-[#dbaa5f] hover:bg-[#dbaa5f] hover:text-[#2e1a47] cursor-pointer transition px-6 py-2 w-full"
            >
              Salva le mie preferenze
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="bg-[#3c1d59] text-[#dbaa5f] hover:bg-[#dbaa5f] hover:text-[#2e1a47] transition px-6 py-2 cursor-pointer w-full"
            >
              Accetta tutto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
