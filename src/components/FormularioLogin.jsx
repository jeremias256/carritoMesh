/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
/* ------------------------ REACT ----------------------- */
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
/* ----------------------- ASSETS ----------------------- */
import { USUARIOS } from "../constants";

export const FormularioLogin = () => {
  const { setStep, setCargando, setCliente } = useCarrito();
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

      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const usuarioEncontrado = USUARIOS.find(
            (usuario) =>
              usuario.username == data.username &&
              usuario.password == data.password,
          );
          if (usuarioEncontrado) {
            resolve({
              ok: true,
              message: `Simulación exitosa para el usuario ${data.username}`,
              cliente: usuarioEncontrado,
            });
          } else {
            resolve({
              ok: false,
              message: "Credenciales incorrectas",
            });
          }
        }, 4000),
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      setCliente(response.cliente);
      setStep(3);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    } finally {
      setCargando(false);
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
