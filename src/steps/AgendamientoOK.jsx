/* ------------------------ REACT ----------------------- */
import { useEffect, useState } from "react";
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
import { Error } from "../components/Error";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie } from "../helpers/cookies";

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
            <span>Turno asignado:</span>
            <span className="ml-[8px] font-lato text-[16px] font-[900] leading-normal text-iplanPink">
              {agendamiento.fecha} Turno{" "}
              {agendamiento.horario == "MA" ? "Mañana" : "Tarde"} de{" "}
              {agendamiento.horario == "MA" ? "8hs a 13hs" : "13hs a 17hs"}
            </span>
          </p>
        </div>

        {/* <button className="flex h-[36px] w-auto max-w-[90] items-center justify-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none">
          TERMINAR
        </button> */}
      </div>
    </div>
  );
};
