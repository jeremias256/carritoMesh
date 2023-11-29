/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie, readCookie, setExpireCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import imgStep from "../assets/imgs/step2.png";

export const Agendamiento = () => {
  const { site, setSite } = useAuth();
  const { agendamiento, setAgendamiento, setStep } = useCarrito();
  useEffect(() => {
    delete_cookie("FechaAgendada");
    delete_cookie("TurnoAgendado");
    delete_cookie("CupoAgendado");
    let interv = setInterval(() => {
      if (readCookie("FechaAgendada")) {
        let fechaEntrega = {};
        fechaEntrega.fecha = readCookie("FechaAgendada");
        fechaEntrega.horario = readCookie("TurnoAgendado");
        fechaEntrega.id = readCookie("CupoAgendado");

        setAgendamiento({
          fecha: fechaEntrega.fecha,
          horario: fechaEntrega.horario,
          id: fechaEntrega.id,
        });

        setExpireCookie("agendamientoFecha", fechaEntrega.fecha, 24 * 60 * 60);
        setExpireCookie(
          "agendamientoHorario",
          fechaEntrega.horario,
          24 * 60 * 60,
        );
        setExpireCookie("agendamientoID", fechaEntrega.id, 24 * 60 * 60);
        setExpireCookie("stepCookie", 5, 24 * 60 * 60);
        setStep(readCookie("stepCookie"));
        clearInterval(interv);
      } else {
        console.log("no hay fecha agendadaaaa");
      }
    }, 1000);
  }, []);

  if (readCookie("siteIDAInstalar")) setSite(readCookie("siteIDAInstalar"));
  if (!site) return <Spinner />;

  return (
    <div className="flex w-full max-w-[900px] flex-col items-center">
      {/* STEP */}
      <div className="relative mb-8 flex items-center">
        <div className="absolute right-[200px] top-0 border-r-[1px] border-[#b8b8b8] pr-6">
          <FontAwesomeIcon
            icon={faHouse}
            size="2xl"
            style={{ color: "#7C7B85" }}
            className="cursor-pointer"
          />
        </div>

        <div className="ml-[20px] flex items-center gap-2 pl-[20px]">
          <div className="grid grid-cols-[1fr,1fr,1fr] items-center justify-items-center gap-0">
            <button
              className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite outline-none focus:outline-none"
              disabled
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
          ¡Felicitaciones ya contás con WiFi Power Mesh
        </h2>
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          para tu hogar!
        </h2>
      </div>

      {/* CALENDARIO */}
      <div className="mt-4 flex h-full w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col items-start lg:flex-row">
            <iframe
              className="w-full shadow-none hover:shadow-none"
              height="550"
              //INFX AGREGAR EN DESA Y LOCAL &tipo=EE&developer=1
              src={`https://portal2-des.iplan.com.ar/agendamientoCarrito/calendar/?site=${site}&tur=2&tipo=EE&developer=1`}
              title="Agendamiento"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
