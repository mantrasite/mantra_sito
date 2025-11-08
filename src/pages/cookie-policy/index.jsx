"use client";

export default function CookiePolicy() {
  return (
    <div className="bg-[#24072f] text-white text-[0.75rem] p-6 md:p-10 h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-10 text-center">
        Informativa sui Cookie
      </h1>

      <p className="mb-4">
        <strong>Data di entrata in vigore:</strong> 13-Apr-2025
        <br />
        <strong>Ultimo aggiornamento:</strong> 14-Apr-2025
      </p>

      <p className="mb-4">
        La presente informativa sui cookie descrive le modalità con cui
        raccogliamo e utilizziamo i cookie e le tecnologie simili quando visiti
        il nostro sito web.
      </p>

      <p className="mb-4">
        <strong>Cosa sono i cookie?</strong>
        <br />I cookie sono piccoli file di testo che vengono memorizzati sul
        dispositivo dell'utente quando visita un sito web. I cookie vengono
        utilizzati per garantire il corretto funzionamento del sito e per
        migliorare l'esperienza dell'utente.
      </p>

      <p className="mb-4">
        <strong>Come utilizziamo i cookie?</strong>
        <br />
        Utilizziamo solo cookie necessari al corretto funzionamento del sito,
        come quelli necessari per visualizzare contenuti integrati da terze
        parti (come Google Maps tramite iframe) e per i collegamenti ai social
        network.
      </p>

      <p className="mb-4">
        Non utilizziamo cookie analitici o di marketing. Non raccogliamo
        informazioni per finalità di analisi del traffico o pubblicità mirata.
      </p>

      <p className="mb-4">
        <strong>Tipi di cookie utilizzati:</strong>
        <br />
        Il nostro sito utilizza solo cookie di prima parte strettamente
        necessari per il funzionamento del sito. Questi cookie non raccolgono
        informazioni personali e non sono utilizzati per finalità di marketing.
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Necessari:</strong> Questi cookie sono essenziali per il
          corretto funzionamento del sito web, come il salvataggio delle
          preferenze di navigazione o l'integrazione con i social network e
          Google Maps.
        </li>
      </ul>

      <p className="mb-4">
        <strong>Gestione dei cookie:</strong>
        <br />
        Puoi gestire o disabilitare i cookie direttamente dalle impostazioni del
        tuo browser. Di seguito troverai i link per gestire i cookie nei browser
        più comuni:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>
          <a
            href="https://support.google.com/accounts/answer/32050"
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/it/kb/gestione-dei-cookie"
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/it-it/topic/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edge
          </a>
        </li>
      </ul>

      <p className="mb-4">
        Se desideri maggiori informazioni su come proteggiamo la tua privacy, ti
        invitiamo a consultare la nostra{" "}
        <a href="/privacy-policy" className="underline hover:text-white">
          Privacy Policy
        </a>
        .
      </p>

      <hr className="my-6 border-[#dbaa5f]/30" />

      <div className="text-[0.7rem] space-y-1">
        <p>Titolare del trattamento: Mantra di Danilo Ferrara</p>
        <p>Indirizzo: Corte Paroli 47, 55011 Altopascio (LU)</p>
        <p>P.IVA: 02722070469 – REA: LU-265713</p>
        <p>
          Email PEC:{" "}
          <a
            href="mailto:danyferrara.df@pec.it"
            className="underline hover:text-white"
          >
            danyferrara.df@pec.it
          </a>
        </p>
      </div>
    </div>
  );
}