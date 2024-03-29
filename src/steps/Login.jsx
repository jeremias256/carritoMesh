/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
import { FormularioLogin, Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { formatearNum } from "../helpers/helpers";
import { readCookie, setExpireCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import { MESH } from "../Env";
import imgMesh from "../assets/imgs/imgMesh.png";
import { updateLog } from "../services/logeo";
import { GIVEAGENDAMIENTOAPI, GIVESUBSCRIPTIONAPI } from "../constants";
import axios from "axios";

export const Login = () => {
  const { setCargando, setAuth, cargando, setCgp, setNum } = useAuth();
  const { setStep, setAgendamientoInfo, precioMesh, setPrecioMesh } =
    useCarrito();

  useEffect(() => {
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
    const fetchPrecios = async () => {
      const url = "/cobertura/give_precios.php";
      let fData = new FormData();
      fData.append("Producto", "Mesh");

      try {
        const response = await axios.post(url, fData);
        setPrecioMesh(response.data);
      } catch (error) {
      } finally {
        setCargando(false);
      }
    };

    fetchPrecios();

    let interv = setInterval(async () => {
      //LOGEO POR ZDC
      if (readCookie("userLogged") && !readCookie("carritoCGP")) {
        //LOGIN POR ZDC
        clearInterval(interv);
        updateLog("URL", window.location.href);
        updateLog("Componente login", "ingreso por ZDC va a componente home"); //ZONA
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("iplanUser2020");
        setAuth(cookieName);
        setCgp(cookieCgp);
        setNum(String(cookieCgp).slice(0, -1));
        setStep(2);
        setCargando(false);
      } else if (
        //LOGEO PRIMERA VEZ
        readCookie("userLogged") &&
        readCookie("carritoCGP")
      ) {
        clearInterval(interv);
        updateLog("URL", window.location.href);
        updateLog("Componente login", "click button login");
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("carritoCGP");
        setAuth(cookieName);
        setCgp(cookieCgp);
        setNum(String(cookieCgp).slice(0, -1));
        setCargando(false);

        let tieneMesh = await fetchMesh();
        let tieneAgendamiento = await fetchAgendamientoPendiente();
        tieneAgendamiento = JSON.parse(tieneAgendamiento);
        if (tieneMesh.length > 0) {
          updateLog(
            "Componente login",
            "cliente con mesh va a componente tienemesh",
          );
          setStep(6);
        } else if (tieneAgendamiento.Codigo == 0) {
          updateLog(
            "Componente login",
            "cliente con agendamiento pendiente va a componente agendamiento pendiente",
          );
          setAgendamientoInfo(tieneAgendamiento);
          setStep(7);
        } else if (tieneAgendamiento.Codigo == 2) {
          updateLog(
            "Componente login",
            "cliente con agendamiento pendiente antiguo va a componente agendamiento pendiente con error",
          );
          setStep(8);
        } else {
          updateLog(
            "Componente login",
            "cliente sin mesh va a componente carrito",
          );
          setExpireCookie("carritoCookieStep", 3, 24 * 60 * 6000);
          setStep(3);
        }
      } else {
      }
    }, 1000);
  }, []);

  return (
    <>
      <h2 className="pinkTitle mb-8 mt-16 lg:mt-0">
        Comprá tus WiFi Torres Mesh
      </h2>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-6">
        <div className="cardLogin bg-iplanWhite">
          {cargando ? (
            <Spinner />
          ) : (
            <>
              <div className="card__redHeader">
                <h2 className="card__readHeader__title">
                  Inicia sesión para comenzar tu compra
                </h2>
              </div>

              <div className="card__body">
                <p className="textGrey21Roboto mb-4">
                  Ingresá los datos de tu cuenta
                </p>
                <FormularioLogin />
              </div>
            </>
          )}
        </div>

        <div className="cardCarritoMesh">
          <div className="relative flex h-[100%] max-h-[152px] flex-col gap-3 self-stretch bg-iplanPurple px-6 py-[25px] text-end">
            <div className="absolute left-0 top-0 min-h-[150px] w-[200px] max-w-[75px] rounded-r-[200px] bg-iplanPink"></div>
            <h2 className="font-figtree text-[54px] font-bold not-italic leading-[50px] text-iplanWhite lg:text-[60px]">
              WiFi
            </h2>
            <p className="text-[26px] font-semibold not-italic text-iplanWhite">
              Torres Mesh
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-b-[24px] bg-iplanWhite px-[24px] pb-[24px] pt-[5px]">
            <div className="flex max-h-[167px] items-center">
              <div className="w-1/2">
                <img className="max-w-[100%]" src={imgMesh} />
              </div>
              <div className="mt-4 w-1/2">
                <h3 className="font-figtree text-[28px] font-bold not-italic leading-[35px] tracking-[-0.32px] text-iplanPink lg:text-[32px]">
                  Power Mesh
                </h3>
                <p className="text-center font-roboto text-[19px] font-semibold not-italic leading-[130%] tracking-tight text-iplanGrey2 lg:text-[23px]">
                  máxima potencia en cada rincón de tu hogar
                </p>
              </div>
            </div>
            <div className="mt-[32px] flex gap-[8px] text-center">
              <p className="font-roboto text-[20px] font-medium not-italic text-iplanPink">
                <FontAwesomeIcon icon={faPenRuler} />
              </p>
              <p className="font-roboto text-[20px] font-medium not-italic text-iplanGrey2">
                Instalación bonificada
              </p>
            </div>
            <p className="mt-3 text-[54px] font-bold not-italic leading-[50px] tracking-[-0.48px] text-iplanGrey2">
              {precioMesh != 0 ? formatearNum(parseInt(precioMesh)) : ""}
            </p>
            <p className="mt-2 flex gap-[8px] text-center font-lato text-[15px] font-bold not-italic text-iplanGrey2">
              En tu factura - Imp incluidos
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
