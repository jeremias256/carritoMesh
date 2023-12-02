/* ------------------------ LIBS ------------------------ */
/* ------------------------ REACT ----------------------- */
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import {
  Login,
  Home,
  Compra,
  Agendamiento,
  Final,
  TieneMesh,
  FinalAgendamiento,
} from "./";
import { Error } from "../components/Error";
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
      {step == 5 && <Final />}
      {step == 6 && <TieneMesh />}
      {step == 7 && <FinalAgendamiento />}
    </>
  );
};
