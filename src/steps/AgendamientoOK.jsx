/* ------------------------ REACT ----------------------- */
import { useEffect, useState } from "react";
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie } from "../helpers/cookies";
import { ErrorConAgenda } from "../components/ErrorConAgenda";
import { Error } from "../components/Error";
import { updateLog } from "../services/logeo";

export const AgendamientoOK = () => {
  const { mensaje, setMensaje, agendamientoInfo } = useCarrito();

  useEffect(() => {
    if (readCookie("carritoMensaje")) {
      setMensaje(readCookie("carritoMensaje"));
    }

    delete_cookie("carritoCookieStep");
    delete_cookie("carritoCookieDirs");
    delete_cookie("carritoCookieSite");
    delete_cookie("carritoCookieTorre");
  }, [agendamientoInfo]);

  if (!agendamientoInfo) return <Spinner />;
  if (mensaje == "error") return <Error />;
  if (mensaje == "sinAgenda") return <ErrorConAgenda />;

  return (
    <div className="mt-16 flex w-full max-w-[1200px] flex-col items-center lg:mt-0">
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          ¡Felicitaciones ya contás con WiFi Power Mesh
        </h2>
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          para tu hogar!
        </h2>
      </div>

      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
        <p className="textBrown20Lato">TURNO PARA ENTREGA DE EQUIPAMIENTO:</p>

        <div className="flex flex-col items-center justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
          <p className="font-lato text-[24px] font-bold not-italic leading-normal text-[#5B5151]">
            Turno confirmado para el día:{" "}
            <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
              {agendamientoInfo.fecha}
              {"  "}
            </span>{" "}
            En el rango horario{" "}
            <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
              {agendamientoInfo.horario == "MA" ? "Mañana de 8 a 13 HS" : ""}
              {agendamientoInfo.horario == "TA" ? "Tarde de 13 a 17 HS" : ""}
              {agendamientoInfo.horario == "M1" ? "Tarde de 8 a 10 HS" : ""}
              {agendamientoInfo.horario == "M2" ? "Tarde de 10 a 13 HS" : ""}
            </span>
            {"  "}
          </p>
          <div className="w-[90%] border-b-2 border-iplanWhite"></div>
          <p className="font-lato text-[24px] font-bold not-italic leading-normal text-[#5B5151]">
            Órden de venta #:{" "}
            <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
              {agendamientoInfo.orden}
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
            delete_cookie("iplanUser2020");
            delete_cookie("iplanUser");
            delete_cookie("PHPSESSID");
            delete_cookie("carritoErrorLogin");
            delete_cookie("carritoCambioPassword");
            delete_cookie("carritoCambioPasswordPorMail");
          }}
          href="https://portal2-des.iplan.com.ar/node/1875"
        >
          TERMINAR
        </a>
      </div>
    </div>
  );
};
