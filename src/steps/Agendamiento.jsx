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
  } = useCarrito();

  useEffect(() => {
    console.log("RENDERIZO USEEFFECT AGENDAMIENTO");
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
      console.log("ENCONTRO COOKIE DE AGENDA, SIGUE FETCH DE AGENDAMIENTO");
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let internetLiv = direcciones.find((obj) => obj.SiteID == site);

        const raw = JSON.stringify({
          id_cliente: num,
          site_id: site,
          agenda_cupo: fechaEntrega.id,
          sub_id: internetLiv.Servicio.SubscriptionID,
          cantidad: torres,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://portal2-des.iplan.com.ar/login_unificado/main/Calls/ServiceCarritoMesh.php",
          requestOptions,
        );
        const result = await response.text();

        if (
          result == "ERROR AGENDA [5] : agendamiento existente" ||
          result == "ERROR AGENDA [E]"
        ) {
          setExpireCookie("carritoMensaje", "error", 24 * 60 * 60000);
          setMensaje(readCookie("carritoMensaje"));
          setExpireCookie("carritoCookieStep", 5, 24 * 60 * 60000);
          setStep(readCookie("carritoCookieStep"));
        } else {
          setExpireCookie("carritoMensaje", "OK", 24 * 60 * 60000);
          setMensaje(readCookie("carritoMensaje"));
          setExpireCookie("carritoCookieStep", 5, 24 * 60 * 60000);
          setStep(readCookie("carritoCookieStep"));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    let interv = setInterval(() => {
      if (readCookie("carritoAgendamientoFecha")) {
        let fechaEntrega = {};
        fechaEntrega.fecha = readCookie("carritoAgendamientoFecha");
        fechaEntrega.horario = readCookie("carritoAgendamientoHorario");
        fechaEntrega.id = readCookie("carritoAgendamientoCupo");

        clearInterval(interv);
        if (site != 0) agendamientoFetch(fechaEntrega);
      } else {
        console.log("no hay fecha agendada");
      }
    }, 1000);
  }, [site]);

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
