/* ------------------------ LIBS ------------------------ */
/* ------------------------ REACT ----------------------- */
import {
  STEP_COMPRA,
  STEP_HOME,
  STEP_LOGIN,
  VITE_STEP_AGENDAMIENTO,
  VITE_STEP_AGENDAMIENTOOK,
  VITE_STEP_AGENDAMIENTOPENDIENTE,
  VITE_STEP_TIENEMESH,
} from "../Env";
import { Error } from "../components/Error";
import { ErrorConAgenda } from "../components/ErrorConAgenda";
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
      {step == STEP_LOGIN && <Login />}
      {step == STEP_HOME && <Home />}
      {step == STEP_COMPRA && <Compra />}
      {step == VITE_STEP_AGENDAMIENTO && <Agendamiento />}
      {step == VITE_STEP_AGENDAMIENTOOK && <AgendamientoOK />}
      {step == VITE_STEP_TIENEMESH && <TieneMesh />}
      {step == VITE_STEP_AGENDAMIENTOPENDIENTE && <AgendamientoPendiente />}
    </>
  );
};
