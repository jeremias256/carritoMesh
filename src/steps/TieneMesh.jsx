/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie, setExpireCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import useAuth from "../hooks/useAuthProvider";
import { useEffect } from "react";

export const TieneMesh = () => {
  const { auth } = useAuth();
  const url = "https://portal2-des.iplan.com.ar/Liv";

  useEffect(() => {
    // delete_cookie("userLogged");
    // delete_cookie("carritoCGP");
    delete_cookie("carritoCookieStep");
    delete_cookie("carritoCookieDirs");
    delete_cookie("carritoCookieSite");
    delete_cookie("carritoCookieTorre");
  }, [auth]);

  return (
    <div className="flex w-full flex-col items-center">
      <a
        className="buttonCerrarSesion"
        onClick={(e) => {
          delete_cookie("userLogged");
          delete_cookie("carritoCGP");
          delete_cookie("carritoCookieStep");
          delete_cookie("carritoCookieDirs");
          delete_cookie("carritoCookieSite");
          delete_cookie("carritoCookieTorre");
        }}
        href={url}
      >
        CERRAR SESIÓN
      </a>
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full max-w-[832px] flex-col gap-[12px] overflow-hidden rounded-[24px] bg-iplanPink py-[24px] text-iplanWhite">
        <p className="text-center font-lato text-[32px] font-bold not-italic leading-normal">
          Hola
        </p>

        <p className="px-4 text-center font-lato text-[28px] font-bold leading-normal lg:px-16">
          Ya contás con Wi Fi Power Mesh en tu IPLANliv
        </p>

        <div className="flex flex-col items-center justify-center">
          <p className="px-4 text-center font-lato text-[20px] font-bold leading-normal">
            Para sumar conectividad o aumentar la velocidad de tu plan
          </p>
          <span className="mt-2 flex items-center gap-4 px-4 text-center font-lato text-[20px] font-bold leading-normal">
            contactate por Whatsapp con el área comercial de IPLAN:{" "}
            <div className="hover:text-iplanGreen">
              <a
                className="hover:text-iplanGreen"
                href="https://wa.me/541150320000"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="2xl"
                  style={{ color: "#f2f2f2" }}
                />
              </a>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
