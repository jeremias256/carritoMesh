import React from "react";
import useCarrito from "../hooks/useCarritoProvider";

export const FinalAgendamiento = () => {
  const { mensaje, setMensaje, agendamientoInfo } = useCarrito();
  return (
    <>
      {agendamientoInfo && (
        <div className="mt-16 flex w-full max-w-[900px] flex-col items-center lg:mt-0">
          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[140px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
            <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
              Ya contas con un agendamiento pendiente
            </h2>
            <h2 className="flex items-center font-lato text-[32px] font-bold not-italic leading-normal">
              para tu hogar!
            </h2>
          </div>

          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
            <p className="textBrown20Lato">
              TURNO PARA ENTREGA DE EQUIPAMIENTO:
            </p>

            <div className="flex justify-center gap-3 self-stretch overflow-hidden rounded-[12px] bg-iplanGrey py-3">
              <p className="font-lato text-[16px] font-[900] not-italic leading-normal text-[#5B5151]">
                <span>Turno asignado:</span>
                <span className="ml-[8px] font-lato text-[16px] font-[900] leading-normal text-iplanPink">
                  {agendamientoInfo.Fecha} Turno {agendamientoInfo.Horario}{" "}
                  Orden : {agendamientoInfo.Orden}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
