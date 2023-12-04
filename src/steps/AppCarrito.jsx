/* ------------------------ LIBS ------------------------ */
/* ------------------------ REACT ----------------------- */
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import {
  Login,
  Home,
  Compra,
  Agendamiento,
  AgendamientoOK,
  TieneMesh,
  AgendamientoPendiente,
} from "./";
/* ----------------------- HELPERS ---------------------- */
/* ----------------------- ASSETS ----------------------- */

export const AppCarrito = () => {
  const { step } = useCarrito();

  return (
    <>
      {step == 1 && <Login />}
      {step == 2 && <Home />}
      {step == 3 && <Compra />}
      {step == 4 && <Agendamiento />}
      {step == 5 && <AgendamientoOK />}
      {step == 6 && <TieneMesh />}
      {step == 7 && <AgendamientoPendiente />}
    </>
  );
};
