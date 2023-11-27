import { createContext, useState } from "react";
const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  /* ------------------------ LOGIN ----------------------- */
  const [cargando, setCargando] = useState(false);
  const [cliente, setCliente] = useState({});
  /* ----------------------- COMPRA ----------------------- */
  const [mostrarForm, setMostrarForm] = useState(false);
  const [torres, setTorres] = useState(1);

  return (
    <CarritoContext.Provider
      value={{
        step,
        setStep,
        cargando,
        setCargando,
        cliente,
        setCliente,
        mostrarForm,
        setMostrarForm,
        torres,
        setTorres,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
export { CarritoProvider };
export default CarritoContext;
