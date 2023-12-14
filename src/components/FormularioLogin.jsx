/* ------------------------ LIBS ------------------------ */
import axios from "axios";
/* ------------------------ REACT ----------------------- */
import { useState, useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* ---------------------- SERVICES ---------------------- */
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie, setExpireCookie } from "../helpers/cookies";
import { REDIRECTCARRITO } from "../constants";
import { validarInputContrasena } from "../helpers/helpers";

export const FormularioLogin = () => {
  const { setCargando } = useAuth();
  /* ------------------- ESTADOS LOCALES ------------------ */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noloseCgp, setNoloseCgp] = useState(false);
  const [nolosePassword, setNolosePassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCGPValid, setIsCGPValid] = useState(false);
  /* ----------------- cambiar contrasena ----------------- */
  const [mostrarCambiarContrasenaForm, setMostrarCambiarContrasenaForm] =
    useState(false);
  const [contrasenaActual, setContrasenaActual] = useState(null);
  const validarContrasenaActual = (e) => {
    setContrasenaActual(e.target.value);
  };
  const [nuevaContrasena, setNuevaContrasena] = useState(null);
  const [statusContrasena, setStatusContrasena] = useState(null);
  const validarNuevaContrasena = (e) => {
    let mensaje = validarInputContrasena(e.target.value);
    setStatusContrasena(mensaje);
    setNuevaContrasena(e.target.value);
  };
  const [repetirNuevaContrasena, setRepetirNuevaContrasena] = useState(null);
  const validarRepetirNuevaContrasena = (e) => {
    setRepetirNuevaContrasena(e.target.value);
  };
  const [statusCambiarContrasena, setStatusCambiarContrasena] = useState(false);
  const handleSubmitCambiarPassword = async () => {
    setCargando(true);
    const url = "/login_unificado/sendPWToLU.php";
    let fData = new FormData();
    fData.append("actualP", contrasenaActual);
    fData.append("newP", repetirNuevaContrasena);
    fData.append("MyUser", username);

    try {
      const response = await axios.post(url, fData);
      setStatusCambiarContrasena(true);
      setExpireCookie("carritoCambioPassword", "ok");
    } catch (error) {
    } finally {
      setCargando(false);
    }
  };
  const [statusMailEnviado, setStatusMailEnviado] = useState(false);
  const handleSubmitCambiarPasswordPorMail = async () => {
    setCargando(true);
    const url = "/sendMail/mailMe2.php";
    let fData = new FormData();
    fData.append("emailTo", "");
    fData.append("mCGP", username);

    try {
      const response = await axios.post(url, fData);
      console.log(
        "🚀 - file: FormularioLogin.jsx:45 - handleSubmit - response:",
        response,
      );
      setStatusMailEnviado(true);
      setExpireCookie("carritoCambioPasswordPorMail", "ok");
    } catch (error) {
      console.log(
        "🚀 - file: FormularioLogin.jsx:54 - handleSubmit - error:",
        error,
      );
    } finally {
      setCargando(false);
    }
  };
  /* ----------------- cambiar contrasena ----------------- */
  const validateUsername = (e) => {
    setStatusMailEnviado(false);
    setErrorLogin(false);
    if (readCookie("carritoErrorLogin")) {
      delete_cookie("carritoErrorLogin");
    }
    if (readCookie("carritoCambioPasswordPorMail")) {
      delete_cookie("carritoCambioPasswordPorMail");
    }

    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    setUsername(value);

    const regex = /^\d{7,8}$/;
    const isValid = regex.test(value);
    setIsFormValid(isValid && password.trim() !== "");
    setIsCGPValid(isValid);
  };
  const validatePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
    const regex = /.{7,8}/;
    setIsFormValid(regex.test(value) && value !== "");
  };
  const handleSubmit = async () => {
    setCargando(true);
    const url = REDIRECTCARRITO;
    let fData = new FormData();
    fData.append("username", username);
    fData.append("password", password);

    try {
      const response = await axios.post(url, fData);

      if (response.request.responseURL.includes("?error_validation")) {
        setExpireCookie("carritoErrorLogin", "error");
      } else {
        delete_cookie("carritoErrorLogin");
      }
    } catch (error) {
      console.log(
        "🚀 - file: FormularioLogin.jsx:54 - handleSubmit - error:",
        error,
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (readCookie("carritoErrorLogin")) {
      setErrorLogin(true);
    } else {
      setErrorLogin(false);
    }

    if (readCookie("carritoCambioPassword")) {
      setStatusCambiarContrasena(true);
    }
    if (readCookie("carritoCambioPasswordPorMail")) {
      setStatusMailEnviado(true);
    }

    if (readCookie("userLogged")) setCargando(true);
    else setCargando(false);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full flex-col items-start">
        <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
          Documento / CGP
        </label>
        <input
          className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
          maxLength={8}
          name="username"
          value={username}
          onInput={validateUsername}
          type="text"
        />
        <button
          className="mt-2 pl-4 font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink outline-none focus:outline-none"
          onClick={() => {
            setNoloseCgp(!noloseCgp);
          }}
          type="button"
        >
          <u>No lo sé</u>
        </button>
        <div className="mt-2 flex flex-col items-center justify-around">
          {noloseCgp && (
            <>
              <p className="font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                Si sos cliente Liv, ahora podés ingresar con tu{" "}
                <span className="font-[800]">DNI</span>.
              </p>
              <p className="font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                Tu <span className="font-[800]">CGP</span> (Códio Gestion
                Personal) lo recibiste en el mail de bienvenida a{" "}
                <span className="font-[800]">IPLAN</span>.
              </p>
              <p className="font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                También podés encontrar tu{" "}
                <span className="font-[800]">CGP</span> en la parte superior de
                tus facturas.
              </p>
              <a
                className="font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2"
                href="https://wa.me/541150320000"
                target="_blank"
              >
                Obtenélo a través del chat o contactánonos por{" "}
                <u className="text-iplanGreen">Whatsapp</u>
              </a>
            </>
          )}
        </div>
      </div>

      <div className="relative mt-4 flex w-full flex-col">
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
        <div className="mt-4 flex flex-col">
          <div className="flex items-center justify-between px-4">
            <button
              className="font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink outline-none focus:outline-none"
              onClick={() => {
                setNolosePassword(!nolosePassword);
              }}
              type="button"
            >
              <u>Lo olvidé</u>
            </button>
            {isCGPValid && (
              <button
                className="font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink outline-none focus:outline-none"
                onClick={() => {
                  setMostrarCambiarContrasenaForm(
                    !mostrarCambiarContrasenaForm,
                  );
                }}
                type="button"
              >
                <u>Cambiar contraseña</u>
              </button>
            )}
          </div>
          {nolosePassword && (
            <>
              <p className="mt-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                Tu <span className="font-[800]">CGP</span> (Código Gestión
                Personal) lo recibiste en el mail de bienvenida a{" "}
                <span className="font-[800]">IPLAN</span>.
              </p>
              <p className="font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                Para recuperar tu contraseña: completá el campo{" "}
                <span className="font-[800]">"DNI/CGP"</span> y te enviaremos un
                mail con las instrucciones a tu cuenta de contacto principal.
              </p>
              {isCGPValid && (
                <button
                  className="mx-auto mt-4 flex h-[36px] w-[90px] cursor-pointer items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
                  onClick={handleSubmitCambiarPasswordPorMail}
                  type="button"
                >
                  Enviar
                </button>
              )}
            </>
          )}
          {errorLogin && (
            <p className="mt-2 font-lato text-[16px] font-[400] not-italic leading-normal text-iplanOrange">
              Documento, CGP o clave incorrecta
            </p>
          )}
        </div>
      </div>

      {mostrarCambiarContrasenaForm && (
        <div className="mt-2 flex w-full flex-col">
          <div className="relative mt-4 w-full">
            <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
              Contraseña actual
            </label>
            <input
              className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
              name="contrasenaActual"
              onInput={validarContrasenaActual}
              value={contrasenaActual}
              type="password"
            />
          </div>
          <div className="relative mt-4 w-full">
            <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
              Contraseña nueva
            </label>
            <input
              className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
              name="nuevaContrasena"
              onInput={validarNuevaContrasena}
              value={nuevaContrasena}
              type="password"
            />

            {statusContrasena == "¡Cumple los requisitos!" ? (
              <div className="flex flex-col items-center">
                <p className="mt-2 font-lato text-[16px] font-[800] not-italic leading-normal text-iplanGreen">
                  {statusContrasena}
                </p>
                <div className="relative mt-4 w-full">
                  <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                    Repetir contraseña
                  </label>
                  <input
                    className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
                    name="repetirNuevaContrasena"
                    onInput={validarRepetirNuevaContrasena}
                    value={repetirNuevaContrasena}
                    type="password"
                  />
                </div>
                {nuevaContrasena == repetirNuevaContrasena && (
                  <>
                    <p className="mt-2 font-lato text-[16px] font-[800] not-italic leading-normal text-iplanGreen">
                      Las contraseñas coinciden
                    </p>
                    <button
                      className="mt-4 flex h-[36px] w-auto max-w-[90] cursor-pointer items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
                      onClick={handleSubmitCambiarPassword}
                    >
                      CAMBIAR
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p className="mt-2 font-lato text-[16px] font-bold not-italic leading-normal text-iplanGrey2">
                {statusContrasena}
              </p>
            )}
          </div>
        </div>
      )}
      {statusCambiarContrasena && (
        <p className="pt-2 font-lato text-[16px] font-[800] not-italic leading-normal text-iplanGreen">
          Contraseña cambiada con éxito
        </p>
      )}
      {statusMailEnviado && (
        <p className="pt-2 font-lato text-[16px] font-[800] not-italic leading-normal text-iplanGreen">
          Mail enviado con éxito
        </p>
      )}
      {!mostrarCambiarContrasenaForm && !nolosePassword && (
        <button
          className="mt-4 flex h-[36px] w-auto max-w-[90] cursor-pointer items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
          disabled={!isFormValid}
          onClick={handleSubmit}
          type="button"
        >
          INGRESAR
        </button>
      )}
      <a
        className="mt-4 font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink"
        href="https://www.iplan.com.ar/Liv"
      >
        <u>No soy cliente</u>
      </a>
    </div>
  );
};
