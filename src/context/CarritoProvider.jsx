/* ------------------------ REACT ----------------------- */
import { createContext, useState } from "react";
import {
  STEP_COMPRA,
  STEP_LOGIN,
  STEP_HOME,
  MESH,
  STEP_AGENDAMIENTOPENDIENTE,
} from "../Env";

const CarritoContext = createContext();
const CarritoProvider = ({ children }) => {
  const [step, setStep] = useState(STEP_LOGIN); //INFX STEP_COMPRA PARA USO LOCAL
  /* ----------------------- COMPRA ----------------------- */
  // let SUB = [
  //   {
  //     Site: "CIUDAD DE LA PAZ_1951_2_11",
  //     SiteID: "1696445110",
  //     Servicio: {
  //       Servicio: "Internet Liv",
  //       Subscripcion: "1574013",
  //       Numero: "90000518765",
  //       Cargo: "462.840000",
  //       Fecha: "2017/05/24",
  //       Agrupador: "IL",
  //       PlanID: "6414",
  //       PaqueteID: "53591",
  //       SubscriptionID: "1574011",
  //     },
  //   },
  // ];
  // let SUBS = [
  //   {
  //     Site: "JORGE NEWBERY_2410_1_F",
  //     SiteID: "1696449058",
  //     Servicio: {
  //       Servicio: "Internet Liv",
  //       Subscripcion: "1594951",
  //       Numero: "190210232187",
  //       Cargo: "1802.210000",
  //       Fecha: "2017/08/17",
  //       Agrupador: "IL",
  //       PlanID: "7201",
  //       PaqueteID: "55466",
  //       SubscriptionID: "1594949",
  //     },
  //   },
  //   {
  //     Site: "JORGE NEWBERY_2410_11_A",
  //     SiteID: "1696449406",
  //     Servicio: {
  //       Servicio: "Internet Liv",
  //       Subscripcion: "1596198",
  //       Numero: "190210232198",
  //       Cargo: "1802.210000",
  //       Fecha: "2017/08/25",
  //       Agrupador: "IL",
  //       PlanID: "7283",
  //       PaqueteID: "55631",
  //       SubscriptionID: "1596196",
  //     },
  //   },
  // ];
  // let SUBCONMESH = [
  //   {
  //     Site: "JOSE DE AMENABAR_1551_3_D",
  //     SiteID: "1696570853",
  //     Servicio: {
  //       Servicio: "Internet Liv",
  //       Subscripcion: "1958995",
  //       Numero: "90000519988",
  //       Cargo: "0.000000",
  //       Fecha: "2020/09/11",
  //       Agrupador: "IL",
  //       PlanID: "33526",
  //       PaqueteID: "114907",
  //       SubscriptionID: "1958993",
  //     },
  //   },
  //   {
  //     Site: "JOSE DE AMENABAR_1551_3_D",
  //     SiteID: "1696570853",
  //     Servicio: {
  //       Servicio: "Wi-Fi Power Mesh",
  //       Subscripcion: "1997108",
  //       Numero: "90000439575",
  //       Cargo: "0.000000",
  //       Fecha: "2020/11/27",
  //       Agrupador: "WM",
  //       PlanID: "34758",
  //       PaqueteID: "114907",
  //       SubscriptionID: "1997107",
  //     },
  //   },
  // ];
  const [precioMesh, setPrecioMesh] = useState(0);
  const [direcciones, setDirecciones] = useState(0);
  const [mostrarForm, setMostrarForm] = useState(null);
  const [torres, setTorres] = useState(1);
  const [agendamiento, setAgendamiento] = useState(null);
  const [agendamientoInfo, setAgendamientoInfo] = useState(null);
  const [site, setSite] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  return (
    <CarritoContext.Provider
      value={{
        precioMesh,
        setPrecioMesh,
        step,
        setStep,
        direcciones,
        setDirecciones,
        mostrarForm,
        setMostrarForm,
        torres,
        setTorres,
        agendamiento,
        setAgendamiento,
        agendamientoInfo,
        setAgendamientoInfo,
        site,
        setSite,
        mensaje,
        setMensaje,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
export { CarritoProvider };
export default CarritoContext;
