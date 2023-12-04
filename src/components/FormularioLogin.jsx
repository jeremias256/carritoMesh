/* ------------------------ REACT ----------------------- */
import { useState, useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* ---------------------- SERVICES ---------------------- */
import { updateLog } from "../services/logeo";
import { readCookie } from "../helpers/cookies";

export const FormularioLogin = () => {
  const { setCargando } = useAuth();
  /* ------------------- ESTADOS LOCALES ------------------ */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateUsername = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 7); // Filtrar solo dígitos y limitar a 7 caracteres
    setUsername(value);

    const regex = /^\d{7}$/;
    const isValid = regex.test(value);
    setIsFormValid(isValid && password.trim() !== "");
  };
  const validatePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
    const regex = /^\d{7}$/;
    setIsFormValid(regex.test(username) && value !== "");
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("?error_validation")) {
      setErrorLogin(true);
    } else {
      setErrorLogin(false);
    }

    if (readCookie("userLogged")) setCargando(true);
    else setCargando(false);
  }, []);

  return (
    <form
      className="flex w-full flex-col items-center"
      method="POST"
      action="/login_carrito/redirectcarrito.php"
    >
      <div className="relative w-full">
        <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
          CGP / Documento
        </label>
        <input
          className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
          maxLength={7}
          name="username"
          value={username}
          onInput={validateUsername}
          type="text"
        />
        {username.length !== 7 && username.length != 0 && (
          <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
            Un CGP cuenta con 7 números
          </p>
        )}
      </div>

      <div className="relative mt-4 w-full">
        <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
          Clave
        </label>
        <input
          className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
          onInput={validatePassword}
          value={password}
          name="password"
          type="password"
        />
        {errorLogin && (
          <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
            CGP o clave es incorrecta
          </p>
        )}
      </div>
      <button
        className="mt-4 flex h-[36px] w-auto max-w-[90] cursor-pointer items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
        disabled={!isFormValid}
        onClick={() => {
          updateLog("Login", "Click en login va a compra");
        }}
        type="submit"
      >
        INGRESAR
      </button>
      <a
        className="mt-4 font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink"
        href="https://www.iplan.com.ar/Liv"
      >
        <u>No soy cliente</u>
      </a>
    </form>
  );
};
