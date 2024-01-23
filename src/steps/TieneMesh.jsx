/* ------------------------ REACT ----------------------- */
import { useEffect } from "react";
import useAuth from "../hooks/useAuthProvider";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie } from "../helpers/cookies";
import imgWhatsapp from "../assets/imgs/whatsapp.png";

export const TieneMesh = () => {
  const { auth } = useAuth();
  useEffect(() => {
    delete_cookie("carritoCookieStep");
  }, []);

  return (
    <>
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full max-w-[1200px] flex-col gap-[12px] overflow-hidden rounded-[24px] bg-iplanPink px-4 py-[24px] text-iplanWhite">
        <p className="text-center font-lato text-[32px] font-bold not-italic leading-normal">
          Hola, {auth}
        </p>
        <p className="text-center font-lato text-[28px] font-bold leading-normal lg:px-16">
          Ya contás con Wi Fi Power Mesh en tu IPLANliv
        </p>

        <div className="flex flex-col items-center justify-center gap-4 px-4 lg:flex-row">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-lato text-[20px] font-bold leading-normal">
              Para sumar conectividad o aumentar la velocidad de tu plan,
            </p>
            <p className="text-center font-lato text-[20px] font-bold leading-normal">
              contactáte por Whatsapp con el área comercial de IPLAN:{" "}
            </p>
          </div>
          <a
            className="max-w-[200px]"
            href="https://wa.me/541150320000?text=Estoy%20interesado%20en%20un%20upgrade%20en%20mi%20servicio%20de%20Power%20mesh"
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
          delete_cookie("carritoErrorLogin");
          delete_cookie("carritoCambioPassword");
          delete_cookie("carritoCambioPasswordPorMail");
        }}
        href="https://www.iplan.com.ar/power-mesh"
      >
        TERMINAR
      </a>
    </>
  );
};
