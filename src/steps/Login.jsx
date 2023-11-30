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
  const { setStep } = useCarrito();

  //TODOX SE PUEDE EVITAR LA PRIMERA VISTA DEL LOGIN ANTES DE CAMBIAR DE STEP ?
  useEffect(() => {
    const fetchData = async (numero) => {
      console.log("FETCH PARA SABER SI YA TIENE MESH");
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          service: "consulta",
          id_cliente: numero, //num
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

        let carritoCookieMesh = JSON.parse(result).find((servicio) => {
          return servicio.Servicio.Servicio === "Wi-Fi Power Mesh";
        });
        return carritoCookieMesh;
      } catch (error) {
        console.log("Error:", error);
      }
    };

    let interv = setInterval(async () => {
      if (
        //BUSCO SI TIENE MESH, ESTA LOGEADO VA A VISTA MESH
        readCookie("carritoCookieMesh") == "MESH" &&
        readCookie("userLogged") &&
        readCookie("carritoCGP")
      ) {
        console.log("TIENE MESH VA A STEP 6 POR LA COOKIE");
        setExpireCookie("carritoCookieStep", 6, 24 * 60 * 60000);
        setStep(6);
        clearInterval(interv);
      } else if (
        //ESTA LOGEADO VA AL STEP CORRESPONDIENTE
        readCookie("carritoCookieStep") &&
        readCookie("userLogged") &&
        readCookie("carritoCGP")
      ) {
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("carritoCGP");
        let stepNum = readCookie("carritoCookieStep");
        console.log(`LEO COOKIE DE STEP VOY A STEP ${stepNum}`);

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
        console.log("LEO COOKIES DE CARRITO Y USERLOGGED VOY A COMPRA");
        let cookieName = readCookie("userLogged");
        let cookieCgp = readCookie("carritoCGP");
        setAuth(cookieName);
        setCgp(cookieCgp);
        setNum(String(cookieCgp).slice(0, -1));
        setExpireCookie("carritoCookieStep", 3, 24 * 60 * 60000);
        clearInterval(interv);

        /* --------- BUSCO COOKIE MESH SINO FETCH PARA VERIFICAR SI TIENE MESH --------- */
        if (readCookie("carritoCookieMesh") == "NOMESH") {
          setExpireCookie("carritoCookieStep", 3, 24 * 60 * 60000);
          setStep(3);
        } else {
          let tieneMesh = await fetchData(String(cookieCgp).slice(0, -1));

          setCargando(false);
          if (tieneMesh) {
            setExpireCookie("carritoCookieMesh", "MESH", 24 * 60 * 60000);
            setExpireCookie("carritoCookieStep", 6, 24 * 60 * 60000);
            setStep(6);
          } else {
            setExpireCookie("carritoCookieMesh", "NOMESH", 24 * 60 * 60000);
            setExpireCookie("carritoCookieStep", 3, 24 * 60 * 60000);
            setStep(3);
          }
        }
        /* --------- BUSCO COOKIE MESH SINO FETCH PARA VERIFICAR SI TIENE MESH --------- */
      } else {
        console.log("si existe la cookie va al step 3 pero no hay cookie");
      }
    }, 1000);
  }, []);

  return (
    <>
      <h2 className="pinkTitle mb-8">Comprá tus torres de WiFi Power Mesh</h2>

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
