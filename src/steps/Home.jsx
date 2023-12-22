/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useState, useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
import { formatearNum } from "../helpers/helpers";
/* ----------------------- ASSETS ----------------------- */
import { MESH } from "../Env";
import imgMesh from "../assets/imgs/imgMesh.png";
import { setExpireCookie } from "../helpers/cookies";
import { updateLog } from "../services/logeo";
import { Spinner } from "../components";
import { GIVEAGENDAMIENTOAPI, GIVESUBSCRIPTIONAPI } from "../constants";

export const Home = () => {
  const [stepClick, setStepClick] = useState(3);
  const { auth, num } = useAuth();
  const { setStep, setAgendamientoInfo, precioMesh } = useCarrito();
  const [cargandoLocal, setCargandoLocal] = useState(false);

  const verificarCliente = async () => {
    const fetchMesh = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          service: "consulta",
          data: {
            Codigo: "AC",
            Agrupador: "",
          },
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(GIVESUBSCRIPTIONAPI, requestOptions);
        const result = await response.text();

        let clienteConMesh = JSON.parse(result).filter((servicio) => {
          return servicio.Servicio.Servicio == "Wi-Fi Power Mesh";
        });
        return clienteConMesh;
      } catch (error) {}
    };
    const fetchAgendamientoPendiente = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "PHPSESSID=976786n46u8pk6q3pcn6vhm9uh");
        const raw = JSON.stringify({
          service: "obtener_estado_cliente",
          data: {},
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(GIVEAGENDAMIENTOAPI, requestOptions);
        const result = await response.text();

        return result;
      } catch (error) {}
    };
    setCargandoLocal(true);
    let tieneMesh = await fetchMesh();
    let tieneAgendamiento = await fetchAgendamientoPendiente();
    tieneAgendamiento = JSON.parse(tieneAgendamiento);

    if (tieneAgendamiento.Codigo == 0) {
      setCargandoLocal(false);
      setAgendamientoInfo(tieneAgendamiento);
      updateLog(
        "componente home",
        "cliente con agendamiento pendiente va componente agendamientoPendiente",
      );
      setStep(7);
    } else if (tieneMesh.length > 0) {
      setCargandoLocal(false);
      updateLog(
        "componente home",
        "cliente con mesh va a componente tieneMesh",
      );
      setStep(6);
    } else {
      setCargandoLocal(false);

      setExpireCookie("carritoCookieStep", 3, 24 * 60 * 6000);
      updateLog("componente home", "cliente sin mesh va a componente carrito");
      setStep(3);
    }
  };

  return (
    <>
      <h2 className="pinkTitle mb-8">Comprá tus torres de WiFi Power Mesh</h2>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-8">
        <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[500px] max-w-[404px] flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
          <p className="my-[16px] font-roboto text-[21px] font-semibold not-italic leading-[130%]">
            Bienvenido
          </p>
          <p className="font-lato text-[34px] font-medium not-italic leading-[46px]">
            {auth}
          </p>
          <p className="mt-[16px] p-[8px] font-figtree text-[28px] font-normal not-italic leading-[35px] text-iplanWhite">
            Ya podes conseguir
            <span className="text-[32px] font-bold">
              {" "}
              la mejor cobertura WiFi{" "}
            </span>
            dentro de tu hogar
          </p>
        </div>

        <div className="cardCarritoMesh">
          {cargandoLocal ? (
            <Spinner />
          ) : (
            <>
              <div className="relative flex flex-col gap-3 self-stretch bg-iplanPurple px-6 py-[25px] text-end">
                <div className="absolute left-0 top-0 min-h-[150px] w-[200px] max-w-[75px] rounded-r-[200px] bg-iplanPink"></div>
                <h2 className="font-figtree text-[72px] font-bold not-italic leading-[50px] text-iplanWhite">
                  WiFi
                </h2>
                <p className="text-[26px] font-semibold not-italic text-iplanWhite">
                  Torres
                </p>
              </div>

              <div className="flex h-full flex-col items-center rounded-b-[24px] bg-iplanWhite px-[24px] pb-[24px] pt-[5px]">
                <div className="flex max-h-[167px] items-center">
                  <div className="w-1/2">
                    <img className="max-w-[100%]" src={imgMesh} />
                  </div>
                  <div className="w-1/2">
                    <h3 className="font-figtree text-[32px] font-bold not-italic leading-[35px] tracking-[-0.32px] text-iplanPink">
                      Power Mesh
                    </h3>
                    <p className="text-center font-roboto text-[23px] font-semibold not-italic leading-[130%] tracking-tight text-iplanGrey2">
                      máxima potencia en cada rincón de tu hogar
                    </p>
                  </div>
                </div>
                <div className="mt-[16px] flex gap-[8px] text-center">
                  <p className="font-roboto text-[20px] font-medium not-italic text-iplanPink">
                    <FontAwesomeIcon icon={faPenRuler} />
                  </p>
                  <p className="font-roboto text-[20px] font-medium not-italic text-iplanGrey2">
                    Instalación bonificada
                  </p>
                </div>
                <p className="mt-3 text-[48px] font-bold not-italic leading-[50px] tracking-[-0.48px] text-iplanGrey2">
                  {precioMesh != 0 ? formatearNum(parseInt(precioMesh)) : ""}
                </p>
                <p className="flex gap-[8px] text-center font-lato text-[15px] font-bold not-italic text-iplanGrey2">
                  En tu factura - Imp incluidos
                </p>
                <button
                  className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
                  onClick={() => {
                    updateLog("componente home", "click en boton contratar");
                    verificarCliente();
                  }}
                  type="button"
                >
                  CONTRATAR
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
