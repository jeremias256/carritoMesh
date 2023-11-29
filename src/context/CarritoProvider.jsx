import { createContext, useState } from "react";
const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  //INFX 3 PARA USAR LOCAL 1 PARA PROD
  const [step, setStep] = useState(1);
  /* ----------------------- COMPRA ----------------------- */
  const [mostrarForm, setMostrarForm] = useState(false);
  const [torres, setTorres] = useState(1);
  const [agendamiento, setAgendamiento] = useState({});

  return (
    <CarritoContext.Provider
      value={{
        step,
        setStep,
        mostrarForm,
        setMostrarForm,
        torres,
        setTorres,
        setAgendamiento,
        agendamiento,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
export { CarritoProvider };
export default CarritoContext;
