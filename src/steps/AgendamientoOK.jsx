/* ------------------------ REACT ----------------------- */
import { useEffect, useState } from "react";
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie } from "../helpers/cookies";
import { ErrorConAgenda } from "../components/ErrorConAgenda";
import { Error } from "../components/Error";

export const AgendamientoOK = () => {
  const { mensaje, setMensaje } = useCarrito();
  const [agendamiento, setAgendamiento] = useState({});

  useEffect(() => {
    console.log("RENDERIZO USEEEFFECT DE FINAL");
    if (
      readCookie("carritoAgendamientoHorario") &&
      readCookie("carritoAgendamientoFecha")
    ) {
      let infoInstalacion = {
        horario: readCookie("carritoAgendamientoHorario"),
        fecha: readCookie("carritoAgendamientoFecha"),
        cupo: readCookie("carritoAgendamientoCupo"),
      };
      setAgendamiento(infoInstalacion);
    }
    if (readCookie("carritoMensaje")) {
      setMensaje(readCookie("carritoMensaje"));
    }

    delete_cookie("carritoCookieStep");
    delete_cookie("carritoCookieDirs");
    delete_cookie("carritoCookieSite");
    delete_cookie("carritoCookieTorre");
  }, [mensaje]);

  if (!agendamiento) return <Spinner />;
  if (mensaje == "error") return <Error />;
  if (mensaje == "sinAgenda") return <ErrorConAgenda />;

  return (
    <div className="mt-16 flex w-full max-w-[900px] flex-col items-center lg:mt-0">
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          ¡Felicitaciones ya contás con WiFi Power Mesh
        </h2>
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          para tu hogar!
        </h2>
      </div>

      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
        <p className="textBrown20Lato">
          Primer turno para entrega de equipamiento:
        </p>

        <div className="flex justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
          <p className="font-lato text-[16px] font-[900] not-italic leading-normal text-[#5B5151]">
            <span>Turno asignado: </span>
            <span className="ml-[8px] font-lato text-[16px] font-[900] leading-normal text-iplanPink">
              {agendamiento.Fecha}
              {"  "}
              <span className="text-[#5B5151]">Turno: </span>
              {agendamiento.Horario}
              {"  "}
              <span className="text-[#5B5151]">Orden: </span>
              {agendamiento.Orden}
            </span>
          </p>
        </div>

        <a
          className="mt-2 flex h-[36px] w-auto max-w-[90] items-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
          onClick={() => {
            delete_cookie("userLogged");
            delete_cookie("carritoCGP");
            delete_cookie("carritoLogin");
            delete_cookie("carritoCookieStep");
            delete_cookie("carritoCookieTorre");
            delete_cookie("carritoCookieDirs");
          }}
          href="https://portal2-des.iplan.com.ar/node/1875"
        >
          TERMINAR
        </a>
      </div>
    </div>
  );
};
