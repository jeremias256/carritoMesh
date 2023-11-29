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
import { setExpireCookie, readCookie } from "../helpers/cookies";
/* ----------------------- ASSETS ----------------------- */
import { MESH } from "../Env";
import imgStep from "../assets/imgs/step1.png";
import imgMesh from "../assets/imgs/imgMesh.png";

export const Compra = () => {
  const { setStep, torres, setTorres, mostrarForm } = useCarrito();
  const { num, site, setSite } = useAuth();

  /* ------------------- ESTADOS LOCALES ------------------ */
  const [resultado, setResultado] = useState([]);
  const [statusMesh, setStatusMesh] = useState({});
  const [mostrarButtonComprar, setMostrarButtonComprar] = useState(0);
  const handleChangeDIR = (e) => {
    let value = e.target.value;
    setMostrarButtonComprar(value);
  };

  //INFX ESTE USEEFFECT ES PARA DESA
  useEffect(() => {
    const fetchData = async () => {
      console.log("DIRS POR FETCH");

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          service: "consulta",
          id_cliente: num, //num
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
        let internetMesh = JSON.parse(result).find((servicio) => {
          return servicio.Servicio.Servicio === "Wi-Fi Power Mesh";
        });

        if (internetMesh) {
          setExpireCookie(
            "internetMesh",
            JSON.stringify(internetMesh),
            24 * 60 * 60,
          );
        }
        setExpireCookie(
          "internetLivDir",
          JSON.stringify(internetLivs),
          24 * 60 * 60,
        );
        setResultado(internetLivs);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (num != 0 && readCookie("internetLivDir") == null) {
      fetchData();
    } else {
      if (readCookie("internetLivDir")) {
        console.log("DIRS POR COOKIE");
        let valueCookie = readCookie("internetLivDir");
        setResultado(JSON.parse(valueCookie));
      }
    }
  }, [num]);

  //INFX ESTE ES PARA USO LOCAL
  // useEffect(() => {
  //   let TEXTO1SUB = `[{"Site":"CIUDAD DE LA PAZ_1951_2_11","SiteID":"1696445110","Servicio":{"Servicio":"Internet Liv","Subscripcion":"1574013","Numero":"90000518765","Cargo":"462.840000","Fecha":"2017\/05\/24","Agrupador":"IL","PlanID":"6414","PaqueteID":"53591","SubscriptionID":"1574011"}},{"Site":"CIUDAD DE LA PAZ_1951_2_11","SiteID":"1696445110","Servicio":{"Servicio":"Wi-Fi Liv","Subscripcion":"1574012","Numero":"90000094589","Cargo":"0.000000","Fecha":"2017\/05\/24","Agrupador":"WL","PlanID":"6414","PaqueteID":"53591","SubscriptionID":"1574010"}}]`;
  //   let TEXTO2SUBS = `[{"Site":"JORGE NEWBERY_2410_1_F","SiteID":"1696449058","Servicio":{"Servicio":"Internet Liv","Subscripcion":"1594951","Numero":"190210232187","Cargo":"1802.210000","Fecha":"2017\/08\/17","Agrupador":"IL","PlanID":"7201","PaqueteID":"55466","SubscriptionID":"1594949"}},{"Site":"JORGE NEWBERY_2410_1_F","SiteID":"1696449058","Servicio":{"Servicio":"Wi-Fi Liv","Subscripcion":"1594950","Numero":"99999999211","Cargo":"0.000000","Fecha":"2017\/08\/17","Agrupador":"WL","PlanID":"7201","PaqueteID":"55466","SubscriptionID":"1594948"}},{"Site":"JORGE NEWBERY_2410_11_A","SiteID":"1696449406","Servicio":{"Servicio":"Internet Liv","Subscripcion":"1596198","Numero":"190210232198","Cargo":"1802.210000","Fecha":"2017\/08\/25","Agrupador":"IL","PlanID":"7283","PaqueteID":"55631","SubscriptionID":"1596196"}},{"Site":"JORGE NEWBERY_2410_11_A","SiteID":"1696449406","Servicio":{"Servicio":"Wi-Fi Liv","Subscripcion":"1596199","Numero":"90000001275","Cargo":"0.000000","Fecha":"2017\/08\/25","Agrupador":"WL","PlanID":"7283","PaqueteID":"55631","SubscriptionID":"1596197"}}]`;
  //   let TEXTOSUBCONMESH = `[{"Site":"JOSE DE AMENABAR_1551_3_D","SiteID":"1696570853","Servicio":{"Servicio":"DGO","Subscripcion":"2126972","Numero":"90000007885","Cargo":"1503.310000","Fecha":"2022\/01\/17","Agrupador":"DT","PlanID":"40129","PaqueteID":[],"SubscriptionID":"2126971"}},{"Site":"JOSE DE AMENABAR_1551_3_D","SiteID":"1696570853","Servicio":{"Servicio":"Internet Liv","Subscripcion":"1958995","Numero":"90000519988","Cargo":"0.000000","Fecha":"2020\/09\/11","Agrupador":"IL","PlanID":"33526","PaqueteID":"114907","SubscriptionID":"1958993"}},{"Site":"JOSE DE AMENABAR_1551_3_D","SiteID":"1696570853","Servicio":{"Servicio":"Wi-Fi Liv","Subscripcion":"1958996","Numero":"90000573025","Cargo":"0.000000","Fecha":"2020\/09\/11","Agrupador":"WL","PlanID":"33526","PaqueteID":"114907","SubscriptionID":"1958994"}},{"Site":"JOSE DE AMENABAR_1551_3_D","SiteID":"1696570853","Servicio":{"Servicio":"Wi-Fi Power Mesh","Subscripcion":"1997108","Numero":"90000439575","Cargo":"0.000000","Fecha":"2020\/11\/27","Agrupador":"WM","PlanID":"34758","PaqueteID":"114907","SubscriptionID":"1997107"}}]`;
  //   let internetLivs = JSON.parse(TEXTOSUBCONMESH).filter((servicio) => {
  //     if (servicio.Servicio.Servicio === "Internet Liv") {
  //       return servicio;
  //     }
  //   });

  //   let internetMesh = JSON.parse(TEXTOSUBCONMESH).find((servicio) => {
  //     return servicio.Servicio.Servicio === "Wi-Fi Power Mesh";
  //   });
  //   console.log(
  //     "🚀 - file: Compra.jsx:108 - internetMesh - internetMesh:",
  //     internetMesh,
  //   );

  //   setResultado(internetLivs);
  // }, [num]);

  if (resultado.length == 0) return <Spinner />;

  return (
    <>
      {/* STEPS */}
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
                  <div className="items-left flex w-1/2 flex-col">
                    <span className="flex px-[12px] py-2 text-left font-figtree text-[20px] font-[900] not-italic leading-[25px] text-iplanPink">
                      WiFi Power Mesh
                    </span>
                    <p className="px-2 font-lato text-[18px] font-medium not-italic leading-normal text-iplanPink">
                      Máxima potencia
                    </p>
                    <p className="px-2 font-lato text-[18px] font-medium not-italic leading-normal text-iplanPink">
                      en cada ríncon de tu hogar
                    </p>
                  </div>

                  <div className="flex w-1/2 flex-col items-center">
                    <p className="mb-3 font-lato text-[18px] font-normal not-italic leading-normal text-iplanGrey2">
                      Cantidad de torres:
                    </p>
                    <div className="flex gap-2">
                      <button
                        className={torres == 1 ? "btnActived" : "btnDisabled"}
                        onClick={(e) => {
                          setTorres(1);
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
                <p className="px-[12px] py-2 font-figtree text-[20px] font-[900] not-italic leading-[25px] text-iplanPink">
                  WiFi Power Mesh
                </p>

                <div className="w-full border border-iplanPink"></div>

                <div className="flex justify-between px-[12px] py-2">
                  <p className="font-lato text-[16px] font-[400] not-italic leading-normal text-iplanPink">
                    Torres x <span className="font-[900]"> {torres} </span>
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
                <label className="absolute left-4 top-[-10px] z-20 bg-iplanWhite px-2 text-[14px] font-bold italic text-iplanGrey2">
                  Enviar a:
                </label>
                {resultado && resultado.length > 0 ? (
                  <>
                    <select
                      className="z-10 h-[48px] w-full rounded-[30px] border-2 border-none bg-iplanGrey pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink focus:outline-none"
                      disabled={resultado.length > 1 ? false : true}
                      id="formulario_cgp"
                      onChange={(e) => {
                        handleChangeDIR(e);
                        setSite(e.target.value);
                      }}
                    >
                      {resultado.length > 1 ? (
                        <>
                          <option
                            className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanPink"
                            value="0"
                          >
                            Seleccioná domiclio de entrega ...
                          </option>
                          {resultado.map((opcion, index) => (
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
                          key={resultado[0].Site}
                          value={resultado[0].SiteID}
                        >
                          {resultado[0].Site}
                          {setSite(resultado[0].SiteID)}
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
            {(resultado.length == 1 || mostrarButtonComprar != 0) && (
              <button
                className="mt-2 flex h-[36px] w-auto max-w-[90] items-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
                onClick={(e) => {
                  setExpireCookie("stepCookie", 4, 24 * 60 * 60);
                  setExpireCookie("siteIDAInstalar", site, 24 * 60 * 60);
                  setStep(readCookie("stepCookie"));
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
