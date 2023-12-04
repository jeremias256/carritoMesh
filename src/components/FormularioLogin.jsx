/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
/* ------------------------ REACT ----------------------- */
import { useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* ---------------------- SERVICES ---------------------- */
import { updateLog } from "../services/logeo";

export const FormularioLogin = () => {
  const { setCargando } = useAuth();

  // const SignupSchema = Yup.object().shape({
  //   username: Yup.string()
  //     .min(6, "El cgp cuenta con al menos 7 caracteres")
  //     .max(7, "")
  //     .required("Ingrese un CGP"),
  //   password: Yup.string().required("Ingrese una contraseña"),
  // });

  // const handleSubmitLogin = async (data) => {
  //   const url = "/login_carrito/redirectcarrito.php";

  //   let formData = new FormData();
  //   formData.append("username", data.username);
  //   formData.append("password", data.password);

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error en la solicitud: ${response.status}`);
  //     }
  //     const result = await response.text();
  //     console.log(
  //       "🚀 - file: FormularioLogin.jsx:93 - handleSubmitLogin - result:",
  //       result,
  //     );
  //   } catch (error) {
  //     console.log(
  //       "🚀 - file: FormularioLogin.jsx:94 - handleSubmitLogin - error:",
  //       error,
  //     );
  //   }
  // };

  return (
    // <Formik
    //   initialValues={{ username: "", password: "" }}
    //    onSubmit={handleSubmitLogin}
    //   validationSchema={SignupSchema}
    // >
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
          name="username"
          type="number"
        />
        <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
          {/* <ErrorMessage name="username" /> */}
        </p>
        {/* <div className="absolute right-8 top-[14px] flex h-[25px] w-6 items-center justify-center rounded-full border-2 border-iplanGrey2 text-iplanGrey2">
          <FontAwesomeIcon icon={faQuestion} />
        </div> */}
      </div>

      <div className="relative mt-4 w-full">
        <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
          Clave
        </label>
        <input
          className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
          name="password"
          type="password"
        />
        <p className="text-[16px] font-medium not-italic leading-normal text-iplanPink">
          {/* <ErrorMessage name="password" /> */}
        </p>
      </div>
      <button
        className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite focus:outline-none"
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
    // </Formik>
  );
};
