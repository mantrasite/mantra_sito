const LineaSeparazioneHeader = () => {
    return (
      <div className="flex items-center justify-center mt-1 mb-2">
        {/* Linea sinistra con effetto sfumato */}
        <div className={"w-[50%] h-[2px] bg-gradient-to-r from-transparent via-[#f1a637] to-[#f1a637]"}></div>
        {/* Linea destra con effetto sfumato */}
        <div className={"w-[50%] h-[2px] bg-gradient-to-l from-transparent via-[#f1a637] to-[#f1a637]"}></div>
      </div>
    );
  };
  
  export default LineaSeparazioneHeader;
  