/* ------------------------ REACT ----------------------- */
import React, { useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie } from "../helpers/cookies";

export const AgendamientoPendiente = () => {
  const { agendamientoInfo } = useCarrito();

  useEffect(() => {
    delete_cookie("carritoCookieStep");
  }, []);

  return (
    <>
      {!agendamientoInfo ? (
        <Spinner />
      ) : (
        <div className="mt-16 flex w-full max-w-[1200px] flex-col items-center lg:mt-0">
          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
            <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
              Ya contas con un agendamiento pendiente
            </h2>
            <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
              para tu hogar!
            </h2>
          </div>

          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
            <p className="textBrown20Lato">
              TURNO PARA ENTREGA DE EQUIPAMIENTO:
            </p>

            <div className="flex flex-col items-center justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
              <p className="font-lato text-[24px] font-bold not-italic leading-normal text-[#5B5151]">
                Turno confirmado para el día:{" "}
                <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
                  {agendamientoInfo.Fecha}
                  {"  "}
                </span>{" "}
                En el rango horario{" "}
                <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
                  {agendamientoInfo.Horario}
                </span>
                {"  "}
              </p>
              <div className="w-[90%] border-b-2 border-iplanWhite"></div>
              <p className="font-lato text-[24px] font-bold not-italic leading-normal text-[#5B5151]">
                Órden de venta #:{" "}
                <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
                  {agendamientoInfo.Orden}
                </span>
              </p>
            </div>

            {/* <div className="flex justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
              <p className="font-lato text-[24px] font-medium not-italic leading-normal text-[#5B5151]">
                <span className="text-[24px] font-bold">Turno asignado: </span>
                <span className="ml-[8px] font-lato text-[24px] font-bold leading-normal text-iplanPink">
                  {agendamientoInfo.Fecha}
                  {"  "}
                  <span className="text-[24px] text-[#5B5151]">Turno: </span>
                  {agendamientoInfo.Horario}
                  {"  "}
                  <span className="text-[24px] text-[#5B5151]">Orden: </span>
                  {agendamientoInfo.Orden}
                </span>
              </p>
            </div> */}
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
            href="https://www.iplan.com.ar/power-mesh"
          >
            TERMINAR
          </a>
        </div>
      )}
    </>
  );
};
