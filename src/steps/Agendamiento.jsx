/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
/* ----------------------- ASSETS ----------------------- */
import imgStep from "../assets/imgs/step2.png";

export const Agendamiento = () => {
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
              className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
              disabled
              type="button"
              value="1"
            >
              1
            </button>
            <img className="" src={imgStep}></img>
            <button
              className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
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
            <p className="max-w-[60px] text-center font-lato text-[14px] font-[400] not-italic text-iplanPink">
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
      <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex min-h-[442px] w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
        <div className="flex w-full flex-col items-center">
          <p className="textBrown20Lato">
            Primer turno para entrega de equipamiento:
          </p>

          <div className="mt-4 flex w-full flex-col items-start lg:flex-row">
            <div className="flex h-full w-full">
              <iframe
                className="w-full"
                height="100%"
                width="100%"
                src="https://portal2-des.iplan.com.ar/agendamientoCarrito/calendar/?site=1696585076&tur=2&tipo=EE&developer=1"
                title="Agendamiento"
              ></iframe>
            </div>

            {/* <div className="flex h-full w-full basis-[60%] flex-col items-start px-3 pb-3">
              <p className="font-lato text-[17px] font-normal not-italic leading-normal">
                Horario de entrega:
              </p>
              <div className="relative mt-3 w-full">
                <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold italic leading-normal text-[#b8b8b8]">
                  Rango horario
                </label>
                <select className="h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-lato text-[16px] font-bold not-italic leading-normal text-iplanPink">
                  <option value="8-13">de 8 a 13hs</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>

        <button className="mt-3 flex h-[36px] w-auto max-w-[90] items-center justify-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite">
          CONFIRMAR
        </button>
      </div>
    </div>
  );
};
