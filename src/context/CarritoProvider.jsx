import { createContext, useState } from "react";
const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [usuario, setCliente] = useState({
    nombre: "Bruce",
    apellido: "Wayne",
  });
  const [torres, setTorres] = useState(0);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    //AJAXLogin
    //if(ok)
    //setCliente({
    //nombre:nombre,
    //apellido:apellido
    //})
    setStep(step + 1);
  };

  return (
    <CarritoContext.Provider
      value={{
        step,
        setStep,
        usuario,
        handleSubmitForm,
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
