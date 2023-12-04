/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/* ------------------------ REACT ----------------------- */
import React from "react";

export const ErrorConAgenda = () => {
  return (
    <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) mt-4 flex w-full max-w-[800px] flex-col items-center justify-items-center gap-4 rounded-[24px] bg-iplanWhite p-6">
      <div className="flex justify-center gap-3 self-stretch overflow-hidden rounded-[12px] py-3">
        <p className="flex items-center gap-4 px-4 text-center font-lato text-[20px] font-bold leading-normal text-[#5B5151]">
          Tu orden fue creada pero tenemos un error en nuestra agenda.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span className="mt-2 flex items-center gap-4 px-4 text-center font-lato text-[20px] font-bold leading-normal text-[#5B5151]">
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
                style={{ color: "#42E781" }}
              />
            </a>
          </div>
        </span>
      </div>
    </div>
  );
};
