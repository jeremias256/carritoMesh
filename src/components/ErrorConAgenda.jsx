/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/* ------------------------ REACT ----------------------- */
import React from "react";
import { delete_cookie } from "../helpers/cookies";
import imgWhatsapp from "../assets/imgs/whatsapp.png";
import useCarrito from "../hooks/useCarritoProvider";

export const ErrorConAgenda = () => {
  const { agendamientoInfo } = useCarrito();
  return (
    <>
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full max-w-[900px] flex-col gap-[12px] overflow-hidden rounded-[24px] bg-iplanWhite px-4 py-[24px] text-iplanWhite">
        <div className="flex flex-col items-center justify-center gap-4 px-4 lg:flex-row">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-lato text-[20px] font-bold leading-normal text-iplanGrey2">
              Tu orden fue creada pero tenemos un error en nuestra agenda.
            </p>
            <p className="text-center font-lato text-[20px] font-bold leading-normal text-iplanGrey2">
              Órden de venta #: {agendamientoInfo.orden}
            </p>
          </div>
          <a
            className="max-w-[200px]"
            href="https://wa.me/541150320000"
            target="_blank"
          >
            <img className="w-full" src={imgWhatsapp} alt="whatsapp" />
          </a>
        </div>
      </div>
      <a
        className="mt-4 flex h-[36px] w-auto max-w-[90] items-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
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
        }}
        href="https://portal2-des.iplan.com.ar/node/1875"
      >
        TERMINAR
      </a>
    </>
  );
};
