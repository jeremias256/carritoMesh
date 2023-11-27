import useCarrito from "../hooks/useCarritoProvider";
import { Login, Home, Compra, Agendamiento, Final } from "./";

export const AppCarrito = () => {
  const { step } = useCarrito();
  return (
    <>
      {step == 1 && <Login />}
      {step == 2 && <Home />}
      {step == 3 && <Compra />}
      {step == 4 && <Agendamiento />}
      {step == 5 && <Final />}
    </>
  );
};
