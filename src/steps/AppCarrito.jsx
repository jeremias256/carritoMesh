/* ------------------------ LIBS ------------------------ */
/* ------------------------ REACT ----------------------- */
import {
  STEP_AGENDAMIENTO,
  STEP_AGENDAMIENTOOK,
  STEP_AGENDAMIENTOPENDIENTE,
  STEP_COMPRA,
  STEP_HOME,
  STEP_LOGIN,
  STEP_TIENEMESH,
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
  AgendamientoPendienteConError,
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
      {step == STEP_AGENDAMIENTO && <Agendamiento />}
      {step == STEP_AGENDAMIENTOOK && <AgendamientoOK />}
      {step == STEP_TIENEMESH && <TieneMesh />}
      {step == STEP_AGENDAMIENTOPENDIENTE && <AgendamientoPendiente />}
      {step == 8 && <AgendamientoPendienteConError />}
    </>
  );
};
