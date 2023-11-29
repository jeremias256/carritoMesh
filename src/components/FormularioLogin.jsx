/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
/* ------------------------ REACT ----------------------- */
import { useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
// import { USUARIOS } from "../constants"; ya no se usa

export const FormularioLogin = () => {
  const { setCargando } = useAuth();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El cgp cuenta con al menos 7 caracteres")
      .max(7, "")
      .required("Ingrese un CGP"),
    password: Yup.string().required("Ingrese una contraseña"),
  });
  const handleSubmitLogin = async (data) => {
    try {
      setCargando(true);

      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append("username", data.username);
      formdata.append("password", data.password);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      const response = await fetch(
        "https://portal2-des.iplan.com.ar/login_carrito/redirectcarrito.php",
        requestOptions,
      );
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const result = await response.text();
      console.log(
        "🚀 - file: FormularioLogin.jsx:48 - handleSubmitLogin - result:",
        result,
      );
      /* --------------------- FAKE LOGIN --------------------- */
      // const usuarioEncontrado = USUARIOS.find(
      //   (usuario) =>
      //     usuario.username == data.username &&
      //     usuario.password == data.password
      // );
      // if (usuarioEncontrado) {
      //   setCliente(usuarioEncontrado);
      //   setStep(3);
      // } else {
      //   throw new Error("Credenciales incorrectas");
      // }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmitLogin}
      validationSchema={SignupSchema}
    >
      <Form className="flex w-full flex-col items-center">
        <div className="relative w-full">
          <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
            CGP / Documento
          </label>
          <Field
            className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
            name="username"
            type="number"
          />
          <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
            <ErrorMessage name="username" />
          </p>
          <div className="absolute right-8 top-[14px] flex h-[25px] w-6 items-center justify-center rounded-full border-2 border-iplanGrey2 text-iplanGrey2">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
        </div>

        <div className="relative mt-4 w-full">
          <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
            Clave
          </label>
          <Field
            className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
            name="password"
            type="password"
          />
          <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
            <ErrorMessage name="password" />
          </p>
        </div>
        <button
          className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
          type="submit"
        >
          INGRESAR
        </button>
        {/* TODOX A DONDE ME DIRIGE ?? */}
        <a
          className="mt-4 font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink"
          href="#"
        >
          <u>No soy cliente</u>
        </a>
      </Form>
    </Formik>
  );
};
