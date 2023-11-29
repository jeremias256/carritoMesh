/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/* ----------------------- ASSETS ----------------------- */
import useAuth from "../hooks/useAuthProvider";

export const TieneMesh = () => {
  const { auth } = useAuth();
  return (
    <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full max-w-[832px] flex-col gap-[12px] overflow-hidden rounded-[24px] bg-iplanBlue py-[24px] text-iplanWhite">
      <p className="text-center font-lato text-[32px] font-bold not-italic leading-normal">
        Hola, {auth}
      </p>

      <p className="px-4 text-center font-lato text-[20px] font-bold leading-normal lg:px-16">
        Para modificar tu plan o
      </p>
      <p className="px-4 text-center font-lato text-[20px] font-bold leading-normal lg:px-16">
        Sumarle servicios de Streaming
      </p>

      <div className="flex flex-row items-center justify-center">
        <p className="px-4 text-center font-lato text-[20px] font-bold leading-normal">
          Conectate por Whatsapp con el área comercia de IPLAN :
        </p>
        <div className="hover:text-iplanGreen cursor-pointer">
          <a href="https://wa.me/541150320000" target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};
