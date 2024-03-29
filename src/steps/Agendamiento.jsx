/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useEffect, useState } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie, setExpireCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import imgStep from "../assets/imgs/step2.png";
import { updateLog } from "../services/logeo";
import { SERVICECARRITOMESHAPI } from "../constants";
import { STEP_COMPRA, STEP_HOME } from "../Env";

export const Agendamiento = () => {
  const { num } = useAuth();
  const {
    direcciones,
    setDirecciones,
    torres,
    setTorres,
    setStep,
    site,
    setSite,
    setMensaje,
    setAgendamientoInfo,
  } = useCarrito();
  /* ------------------- ESTADOS LOCALES ------------------ */
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    delete_cookie("carritoAgendamientoFecha");
    delete_cookie("carritoAgendamientoHorario");
    delete_cookie("carritoAgendamientoCupo");
    if (readCookie("carritoCookieDirs"))
      setDirecciones(JSON.parse(readCookie("carritoCookieDirs")));
    if (readCookie("carritoCookieTorre"))
      setTorres(readCookie("carritoCookieTorre"));
    if (readCookie("carritoCookieSite"))
      setSite(readCookie("carritoCookieSite"));

    const agendamientoFetch = async (fechaEntrega) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let internetLiv = direcciones.find((obj) => obj.SiteID == site);
        const raw = JSON.stringify({
          id_cliente: num,
          site_id: site,
          agenda_cupo: fechaEntrega.id,
          sub_id: internetLiv.Servicio.Subscripcion,
          cantidad: torres,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(SERVICECARRITOMESHAPI, requestOptions);
        const result = await response.text();
        let resulstJSON = JSON.parse(result);
        // ("ERROR AGENDA [5] / agendamiento existente / ERROR AGENDA [E] / ERROR AGENDA [34]");
        if (resulstJSON.Codigo == 0) {
          updateLog(
            "componente agendamiento",
            `venta completada número de orden ${resulstJSON.Orden}`,
          );
          let infoInstalacion = {
            horario: readCookie("carritoAgendamientoHorario"),
            fecha: readCookie("carritoAgendamientoFecha"),
            orden: resulstJSON.Orden,
          };

          setAgendamientoInfo(infoInstalacion);
          setExpireCookie("carritoMensaje", "OK", 24 * 60 * 6000);
          setMensaje(readCookie("carritoMensaje"));
          setExpireCookie("carritoCookieStep", 5, 24 * 60 * 6000);
          setStep(5);
        } else if (resulstJSON.Codigo == 1) {
          updateLog(
            "componente agendamiento",
            "agendamiento con error en orden",
          );
          let infoInstalacion = {
            horario: readCookie("carritoAgendamientoHorario"),
            fecha: readCookie("carritoAgendamientoFecha"),
            orden: resulstJSON.Orden,
          };
          setAgendamientoInfo(infoInstalacion);
          setExpireCookie("carritoMensaje", "sinAgenda", 24 * 60 * 6000);
          setMensaje(readCookie("carritoMensaje"));
          setExpireCookie("carritoCookieStep", 5, 24 * 60 * 6000);
          setStep(5);
        } else {
          updateLog("componenteagendamiento", "agendamiento error");
          setExpireCookie("carritoMensaje", "error", 24 * 60 * 6000);
          setMensaje(readCookie("carritoMensaje"));
          setExpireCookie("carritoCookieStep", 5, 24 * 60 * 6000);
          setStep(5);
        }
      } catch (error) {
      } finally {
        setSpinner(false);
      }
    };

    let interv = setInterval(() => {
      if (readCookie("carritoAgendamientoFecha")) {
        setSpinner(true);
        let fechaEntrega = {};
        fechaEntrega.fecha = readCookie("carritoAgendamientoFecha");
        fechaEntrega.horario = readCookie("carritoAgendamientoHorario");
        fechaEntrega.id = readCookie("carritoAgendamientoCupo");

        clearInterval(interv);
        if (site != 0) {
          agendamientoFetch(fechaEntrega);
        }
      } else {
      }
    }, 1000);

    return () => {
      clearInterval(interv);
    };
  }, [site]);

  if (!site) return <Spinner />;

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-16 flex w-full max-w-[900px] flex-col items-center lg:mt-0">
            {/* STEP */}
            <div className="relative mb-8 flex">
              <div className="absolute right-[200px] top-0 border-r-[1px] border-[#b8b8b8] pr-6">
                <button
                  class="outline-none focus:outline-none"
                  onClick={() => {
                    setStep(STEP_HOME);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    size="2xl"
                    style={{ color: "#7C7B85" }}
                    className="cursor-pointer"
                  />
                </button>
              </div>

              <div className="ml-[20px] flex items-center gap-2 pl-[20px]">
                <div className="grid grid-cols-[1fr,1fr,1fr] items-center justify-items-center gap-0">
                  <button
                    className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite outline-none focus:outline-none"
                    onClick={() => {
                      setStep(STEP_COMPRA);
                    }}
                    type="button"
                    value="1"
                  >
                    1
                  </button>
                  <img className="" src={imgStep}></img>
                  <button
                    className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite outline-none focus:outline-none"
                    disabled
                    type="button"
                    value="2"
                  >
                    2
                  </button>
                  <p className="max-w-[60px] text-center font-lato text-[14px] font-[400] not-italic text-iplanPink">
                    Configurar compra
                  </p>
                  <p className=""></p>
                  <p className="max-w-[60px] text-center font-lato text-[14px] font-[400] not-italic text-iplanPink outline-none focus:outline-none">
                    Agendar instalación
                  </p>
                </div>
              </div>
            </div>

            {/* MENSAJE */}
            <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
              <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
                Agenda para recibir el equipamiento y
              </h2>
              <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
                completar tu compra
              </h2>
            </div>

            {/* CALENDARIO */}
            <div className="mt-4 flex h-full w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
              <div className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-start lg:flex-row">
                  <iframe
                    className="w-full shadow-none hover:shadow-none"
                    height="500"
                    //INFX AGREGAR EN DESA Y LOCAL &tipo=EE&developer=1
                    src={`/agendamientoCarrito/calendar/?site=${site}&tur=2&tipo=EE`}
                    title="Agendamiento"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
