/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/* ------------------------ REACT ----------------------- */
import React from "react";
import { delete_cookie } from "../helpers/cookies";
import imgWhatsapp from "../assets/imgs/whatsapp.png";

export const AgendamientoPendienteConError = () => {
  return (
    <div className="mt-16 flex w-full max-w-[1200px] flex-col items-center lg:mt-0">
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          Ya contás con un agendamiento pendiente
        </h2>
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          para tu hogar!
        </h2>
      </div>

      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full max-w-[1200px] justify-center gap-[12px] overflow-hidden rounded-[24px] bg-iplanWhite px-4 py-[24px] text-iplanWhite">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center font-lato text-[20px] font-bold leading-normal text-[#5B5151]">
            Cualquier inconveniente comunicate con nosotros.
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
          delete_cookie("carritoErrorLogin");
          delete_cookie("carritoCambioPassword");
          delete_cookie("carritoCambioPasswordPorMail");
        }}
        href="https://www.iplan.com.ar/power-mesh"
      >
        TERMINAR
      </a>
    </div>
  );
};
