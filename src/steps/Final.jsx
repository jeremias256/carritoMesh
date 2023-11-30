/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Spinner } from "../components";
import useCarrito from "../hooks/useCarritoProvider";
import { readCookie } from "../helpers/cookies";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuthProvider";
import { Error } from "../components/Error";

export const Final = () => {
  const { mensaje, setMensaje } = useCarrito();
  const [agendamiento, setAgendamiento] = useState({});

  useEffect(() => {
    console.log("RENDERIZO USEEEFFECT DE FINAL");
    if (
      readCookie("carritoAgendamientoHorario") &&
      readCookie("carritoAgendamientoFecha")
    ) {
      let infoInstalacion = {
        horario: readCookie("carritoAgendamientoHorario"),
        fecha: readCookie("carritoAgendamientoFecha"),
      };
      setAgendamiento(infoInstalacion);
    }
    if (readCookie("carritoMensaje")) {
      setMensaje(readCookie("carritoMensaje"));
    }
  }, [mensaje]);

  if (!agendamiento) return <Spinner />;
  if (mensaje == "error") return <Error />;
  return (
    <div className="flex w-full max-w-[900px] flex-col items-center">
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          ¡Felicitaciones ya contás con WiFi Power Mesh
        </h2>
        <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
          para tu hogar!
        </h2>
      </div>

      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
        <p className="textBrown20Lato">
          Primer turno para entrega de equipamiento:
        </p>

        <div className="flex justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
          <p className="font-lato text-[16px] font-[900] not-italic leading-normal text-[#5B5151]">
            <span>Turno asignado:</span>
            <span className="ml-[8px] font-lato text-[16px] font-[900] leading-normal text-iplanPink">
              {agendamiento.fecha} Turno{" "}
              {agendamiento.horario == "MA" ? "Mañana" : "Tarde"} de{" "}
              {agendamiento.horario == "MA" ? "8hs a 13hs" : "13hs a 17hs"}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="mt-2 flex items-center gap-4 px-4 text-center font-lato text-[20px] font-bold leading-normal">
            Contactate por Whatsapp con un asesor de IPLAN:{" "}
            <div className="hover:text-iplanGreen">
              <a
                className="hover:text-iplanGreen"
                href="https://wa.me/541150320000"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="2xl"
                  style={{ color: "#f2f2f2" }}
                />
              </a>
            </div>
          </span>
        </div>

        {/* <button className="flex h-[36px] w-auto max-w-[90] items-center justify-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none">
          TERMINAR
        </button> */}
      </div>
    </div>
  );
};
