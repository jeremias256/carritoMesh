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

export const Login = () => {
  const { setCargando, setAuth, cargando, setCgp, setNum } = useAuth();
  const { setStep, setAgendamientoInfo } = useCarrito();

  //TODOX SE PUEDE EVITAR LA PRIMERA VISTA DEL LOGIN ANTES DE CAMBIAR DE STEP ?
  useEffect(() => {
    const fetchServicios = async () => {
      console.log("FETCH PARA SABER SI YA TIENE MESH");
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          service: "consulta",
          data: {
            Codigo: "AC",
            Agrupador: "",
          },
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://portal2-des.iplan.com.ar/login_unificado/main/Calls/Tenfold/giveSubscription.php",
          requestOptions,
        );
        const result = await response.text();

        let internetLivs = JSON.parse(result).filter((servicio) => {
          if (servicio.Servicio.Servicio == "Internet Liv") {
            return servicio;
          }
        });
        console.log(
          "🚀 - file: Login.jsx:53 - internetLivs - internetLivs:",
          internetLivs,
        );

        let clienteConMesh = JSON.parse(result).filter((servicio) => {
          return servicio.Servicio.Servicio == "Wi-Fi Power Mesh";
        });

        // if (internetLivs.length > 1) clienteConMesh = false;

        return clienteConMesh;
      } catch (error) {
        console.log("Error:", error);
      }
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

        const response = await fetch(
          "https://portal2-des.iplan.com.ar/login_unificado/main/Calls/Tenfold/giveAgendamiento.php",
          requestOptions,
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const result = await response.text();

        return result;
        // Aquí puedes manejar el resultado de la llamada fetch
      } catch (error) {
        // Manejar errores
        console.error("Error al obtener datos:", error);
      }
    };

    let interv = setInterval(async () => {
      if (
        //ESTA LOGEADO VA AL STEP CORRESPONDIENTE
        (readCookie("carritoCookieStep") == 3 ||
          readCookie("carritoCookieStep") == 4) &&
        readCookie("userLogged") &&
        readCookie("carritoCGP")
      ) {
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("carritoCGP");
        let stepNum = readCookie("carritoCookieStep");
        console.log("LEO COOKIE DE STEP VOY A STEP 3 o 4");

        // let tieneAgendamiento = fetchAgendamientoPendiente();
        // console.log(
        //   "🚀 - file: Login.jsx:126 - interv - tieneAgendamiento:",
        //   tieneAgendamiento,
        // );
        // setAgendamientoInfo(tieneAgendamiento);

        setAuth(cookieName);
        setCgp(cookieCgp);
        setNum(String(cookieCgp).slice(0, -1));
        setCargando(false);
        setStep(stepNum);
        clearInterval(interv);
      } else if (
        //LOGEO PRIMERA VEZ
        readCookie("carritoCGP") &&
        readCookie("userLogged")
      ) {
        let cgp = readCookie("carritoCGP");
        setExpireCookie("carritoLogin", cgp, 24 * 60 * 60000);
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("carritoCGP");
        setAuth(cookieName);
        setCgp(cookieCgp);
        setNum(String(cookieCgp).slice(0, -1));
        clearInterval(interv);

        /* --------- BUSCO COOKIE MESH SINO FETCH PARA VERIFICAR SI TIENE MESH --------- */
        setCargando(false);

        let tieneAgendamiento = await fetchAgendamientoPendiente();
        tieneAgendamiento = JSON.parse(tieneAgendamiento);
        console.log(
          "🚀 - file: Login.jsx:151 - interv - tieneAgendamiento:",
          tieneAgendamiento,
        );
        let tieneMesh = await fetchServicios(String().slice(0, -1));
        console.log(
          "🚀 - file: Login.jsx:157 - interv - tieneMesh:",
          tieneMesh,
        );

        if (tieneAgendamiento.Codigo == 0) {
          console.log(
            "🚀 - file: Login.jsx:155 - interv - tieneAgendamiento:",
            tieneAgendamiento,
          );
          setAgendamientoInfo(tieneAgendamiento);
          console.log("VA AL STEP 5 TIENE AGENDAMIENTO PENDIENTE");
          setStep(7);
        } else if (tieneMesh.length > 0) {
          console.log("TIENE MESH VA A STEP 6");
          setStep(6);
        } else {
          console.log("NO TIENE MESH NI AGENDMAIENTO VA A COMPRA STEP 3");
          setStep(3);
        }

        /* --------- BUSCO COOKIE MESH SINO FETCH PARA VERIFICAR SI TIENE MESH --------- */
      } else {
        console.log("si existe la cookie va al step 3 pero no hay cookie");
      }
    }, 1000);
  }, []);

  return (
    <>
      <h2 className="pinkTitle mb-8 mt-16 lg:mt-0">
        Comprá tus torres de WiFi Power Mesh
      </h2>

      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-6">
        <div className="card">
          {cargando ? (
            <Spinner />
          ) : (
            <>
              <div className="card__redHeader">
                <h2 className="card__readHeader__title">
                  Identificate para iniciar tu compra
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

        <div className="card">
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
                <img src={imgMesh}></img>
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
              {formatearNum(parseInt(MESH))}
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
