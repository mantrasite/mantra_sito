const LineaSeparazione = ({ grandezza }) => {
  return (
    <div className="flex flex-col items-center justify-center w-2">
      {/* Linea superiore con effetto sfumato */}
      <div className={`${grandezza} w-[2px] bg-gradient-to-b from-transparent via-[#f1a637] to-[#f1a637]`}></div>

      {/* Palline centrali */}
      <div className="flex flex-col items-center space-y-2 my-3">
        <div className="w-1 h-1 bg-[#f1a637] rounded-full"></div>
        <div className="w-2 h-2 bg-[#f1a637] rounded-full"></div>
        <div className="w-1 h-1 bg-[#f1a637] rounded-full"></div>
      </div>

      {/* Linea inferiore con effetto sfumato */}
      <div className={`${grandezza} w-[2px] bg-gradient-to-t from-transparent via-[#f1a637] to-[#f1a637]`}></div>
    </div>
  );
};

export default LineaSeparazione;

