import { createContext, useState } from "react";
const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  //INFX 3 PARA USAR LOCAL 1 PARA PROD
  const [step, setStep] = useState(1);
  /* ----------------------- COMPRA ----------------------- */
  const [direcciones, setDirecciones] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [torres, setTorres] = useState(1);
  const [agendamiento, setAgendamiento] = useState({});
  const [site, setSite] = useState(0);
  const [mensaje, setMensaje] = useState("");

  return (
    <CarritoContext.Provider
      value={{
        direcciones,
        setDirecciones,
        step,
        setStep,
        mostrarForm,
        setMostrarForm,
        torres,
        setTorres,
        setAgendamiento,
        agendamiento,
        site,
        setSite,
        mensaje,
        setMensaje,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
export { CarritoProvider };
export default CarritoContext;
