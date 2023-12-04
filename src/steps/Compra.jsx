/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouse,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useState, useEffect } from "react";
import useCarrito from "../hooks/useCarritoProvider";
import useAuth from "../hooks/useAuthProvider";
/* --------------------- COMPONENTS --------------------- */
import { FormMesh } from "../components/FormMesh";
import { Spinner } from "../components";
/* ----------------------- HELPERS ---------------------- */
import { formatearNum } from "../helpers/helpers";
import { setExpireCookie, readCookie, delete_cookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import { MESH } from "../Env";
import imgStep from "../assets/imgs/step1.png";
import imgMesh from "../assets/imgs/imgMesh.png";
import { updateLog } from "../services/logeo";

export const Compra = () => {
  const {
    direcciones,
    setDirecciones,
    setStep,
    torres,
    setTorres,
    mostrarForm,
    site,
    setSite,
  } = useCarrito();
  const { num } = useAuth();
  /* ------------------- ESTADOS LOCALES ------------------ */
  const [mostrarButtonComprar, setMostrarButtonComprar] = useState(0);
  const handleChangeDIR = (e) => {
    let value = e.target.value;
    setMostrarButtonComprar(value);
  };

  useEffect(() => {
    const fetchData = async () => {
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
          if (servicio.Servicio.Servicio === "Internet Liv") {
            return servicio;
          }
        });

        setExpireCookie(
          "carritoCookieDirs",
          JSON.stringify(internetLivs),
          24 * 60 * 60000,
        );
        setDirecciones(internetLivs);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (num) fetchData();
  }, [num]);

  if (direcciones.length == 0) return <Spinner />;

  return (
    <>
      {/* STEPS */}
      <div className="relative mb-8 mt-16 flex items-center lg:mt-0">
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
              type="button"
              value="1"
            >
              1
            </button>
            <img className="" src={imgStep}></img>
            <button
              className="pointer h-[32px] w-[32px] rounded-full bg-iplanWhite font-lato text-2xl font-bold not-italic text-iplanGrey2 outline-none focus:outline-none"
              disabled
              type="button"
              value="2"
            >
              2
            </button>
            <p className="max-w-[60px] text-center font-lato text-[14px] font-[400] not-italic text-iplanPink outline-none focus:outline-none">
              Configurar compra
            </p>
            <p className=""></p>
            <p className="max-w-[60px] text-center font-lato text-[14px] font-[400] not-italic text-iplanGrey2">
              Agendar instalación
            </p>
          </div>
        </div>
      </div>

      {/* BOX */}
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start">
        {/* SELECTOR/MENU */}
        <div className="w-full lg:w-[65%]">
          <h3 className="mb-[16px] text-center font-lato text-[28px] font-medium not-italic leading-normal text-iplanBrown">
            ¿Cuántas torres Power Mesh querés para tu hogar?
          </h3>

          <div
            className={`${
              mostrarForm
                ? "rounded-r-[24px]"
                : "rounded-r-[24px] lg:rounded-r-[200px]"
            } shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex flex-col gap-6 overflow-hidden rounded-l-[24px] bg-iplanWhite p-6 lg:flex-row`}
          >
            <div className="items-left flex w-full lg:w-[60%] lg:items-start lg:border-r-2 lg:border-iplanPink">
              <div className="flex h-full w-full flex-col justify-center">
                <div className="flex">
                  <div className="flex w-1/2 flex-col items-start">
                    <span className="flex px-2 py-2 text-left font-figtree text-[20px] font-[900] not-italic leading-[25px] text-iplanPink">
                      WiFi Power Mesh
                    </span>
                    <span className="px-2 text-left font-lato text-[18px] font-medium not-italic leading-normal text-iplanPink">
                      Máxima potencia
                    </span>
                    <span className="px-2 text-left font-lato text-[18px] font-medium not-italic leading-normal text-iplanPink">
                      en cada ríncon de tu hogar
                    </span>
                  </div>

                  <div className="mt-2 flex w-1/2 flex-col items-center">
                    <p className="mb-3 font-lato text-[18px] font-normal not-italic leading-normal text-iplanGrey2">
                      Cantidad de torres:
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        className={torres == 1 ? "btnActived" : "btnDisabled"}
                        onClick={(e) => {
                          setTorres(1);
                          updateLog(
                            "Componente de compra",
                            "Click en boton 1 torre",
                          );
                        }}
                        type="button"
                        value="1"
                      >
                        1
                      </button>
                      <button
                        className={torres == 2 ? "btnActived" : "btnDisabled"}
                        onClick={(e) => {
                          setTorres(2);
                          updateLog(
                            "Componente de compra",
                            "Click en boton 2 torres",
                          );
                        }}
                        type="button"
                        value="2"
                      >
                        2
                      </button>
                      <button
                        className={torres == 3 ? "btnActived" : "btnDisabled"}
                        onClick={(e) => {
                          setTorres(3);
                          updateLog(
                            "Componente de compra",
                            "Click en boton 3 torres",
                          );
                        }}
                        type="button"
                        value="3"
                      >
                        3
                      </button>
                      <button
                        className={torres == 4 ? "btnActived" : "btnDisabled"}
                        onClick={(e) => {
                          setTorres(4);
                          updateLog(
                            "Componente de compra",
                            "Click en boton 4 torres",
                          );
                        }}
                        type="button"
                        value="4"
                      >
                        4
                      </button>
                    </div>
                  </div>
                </div>

                {mostrarForm && (
                  <div className="m-auto hidden max-h-[390px] w-full max-w-[390px] lg:block">
                    <img src={imgMesh}></img>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center border-t-2 pt-4 lg:w-[40%] lg:border-none lg:pt-0">
              <FormMesh />
            </div>
          </div>
        </div>

        {/* TICKET */}
        <div className="flex w-full max-w-[390px] flex-col lg:w-[35%]">
          <h3 className="mb-[16px] text-center font-lato text-[28px] font-medium not-italic leading-normal text-iplanBrown">
            Vas a agregar a tu plan :
          </h3>

          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full flex-col items-end gap-[12px] overflow-hidden rounded-[24px] bg-iplanWhite p-[18px]">
            <div className="w-full rounded-[16px] bg-iplanPink p-[12px]">
              <div className="overflow-hidden rounded-[12px] bg-iplanWhite">
                <p className="px-2 py-2 text-left font-figtree text-[20px] font-[900] not-italic leading-[25px] text-iplanPink">
                  WiFi Power Mesh
                </p>

                <div className="w-full border border-iplanPink"></div>

                <div className="flex justify-between px-[12px] py-2">
                  <p className="font-lato text-[16px] font-[400] not-italic leading-normal text-iplanPink">
                    <span className="font-[900]">
                      {" "}
                      {torres == 1
                        ? `Torre x ${torres}`
                        : `Torres x ${torres}`}{" "}
                    </span>
                  </p>
                  <p className="font-figtree text-[18px] font-[900] not-italic leading-normal text-iplanPink">
                    <span> {formatearNum(parseInt(torres) * MESH)} </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col border-y-[1px] border-y-[#B8B8B8] py-3">
              <span className="mb-3 flex font-lato text-[17px] font-normal not-italic text-iplanBrown">
                Tu dirección de entrega actual es:
              </span>
              <div className="relative w-full">
                {direcciones ? (
                  <>
                    <label className="absolute left-4 top-[-10px] z-20 bg-iplanWhite px-2 text-[14px] font-bold italic text-iplanGrey2">
                      Enviar a:
                    </label>
                    <select
                      className="z-10 h-[48px] w-full rounded-[30px] border-2 border-none bg-iplanGrey pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink focus:outline-none"
                      disabled={direcciones.length > 1 ? false : true}
                      id="formulario_cgp"
                      onChange={(e) => {
                        handleChangeDIR(e);
                        setSite(e.target.value);
                      }}
                    >
                      {direcciones.length > 1 ? (
                        <>
                          <option
                            className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanPink"
                            selected
                            value="0"
                          >
                            Seleccioná domiclio de entrega ...
                          </option>
                          {direcciones.map((opcion, index) => (
                            <option
                              className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanBrown"
                              key={index}
                              value={opcion.SiteID}
                            >
                              {opcion.Site}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option
                          className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanBrown"
                          key={direcciones[0].Site}
                          value={direcciones[0].SiteID}
                        >
                          {direcciones[0].Site}
                          {setSite(direcciones[0].SiteID)}
                        </option>
                      )}
                    </select>
                  </>
                ) : null}
              </div>
            </div>

            <div className="flex w-full justify-between gap-2 overflow-hidden rounded-[8px] bg-iplanGrey2 px-[24px] py-2">
              <p className="text-center font-lato text-[17px] font-bold not-italic leading-normal text-iplanWhite">
                Estás agregando a tu factura:
              </p>
              <p className="text-center font-lato text-[18px] font-[900] not-italic leading-normal text-iplanWhite">
                {formatearNum(parseInt(torres) * MESH)}
              </p>
            </div>
            {(direcciones.length == 1 || mostrarButtonComprar != 0) && (
              <button
                className="mt-2 flex h-[36px] w-auto max-w-[90] items-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
                onClick={(e) => {
                  setExpireCookie("carritoCookieStep", 4, 24 * 60 * 60000);
                  setExpireCookie("carritoCookieSite", site, 24 * 60 * 60000);
                  setExpireCookie(
                    "carritoCookieTorre",
                    torres,
                    24 * 60 * 60000,
                  );
                  setStep(4);
                  updateLog("Formulario MESH", "Click en boton contratar");
                }}
                type="button"
              >
                <p>
                  <FontAwesomeIcon icon={faCartShopping} />
                </p>
                <p>CONTRATAR</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
