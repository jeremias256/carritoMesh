/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler, faCartShopping } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import useCarrito from "../hooks/useCarritoProvider";
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
import { formatearNum } from "../helpers/helpers";
/* ----------------------- ASSETS ----------------------- */
import { MESH } from "../Env";
import imgMesh from "../assets/imgs/imgMesh.png";

export const Home = () => {
  const { setStep, cliente } = useCarrito();
  return (
    <>
      <h2 className="pinkTitle mb-8">Comprá tus torres de WiFi Power Mesh</h2>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-8">
        <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex min-h-[499px] max-w-[404px] flex-col items-center justify-center overflow-hidden rounded-[24px] bg-iplanPink px-6 py-8 text-center text-iplanWhite">
          <p className="my-[16px] font-roboto text-[21px] font-semibold not-italic leading-[130%]">
            Bienvenido
          </p>
          <p className="font-lato text-[34px] font-medium not-italic leading-[46px]">
            {cliente.name}
          </p>
          <p className="mt-[16px] p-[8px] font-figtree text-[28px] font-normal not-italic leading-[35px] text-iplanWhite">
            Ya podes conseguir
            <span className="text-[32px] font-bold">
              {" "}
              la mejor cobertura WiFi{" "}
            </span>
            dentro de tu hogar
          </p>
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
            <p className="flex gap-[8px] text-center font-lato text-[15px] font-bold not-italic text-iplanGrey2">
              En tu factura - Imp incluidos
            </p>
            <button
              className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite"
              onClick={(e) => {
                setStep(3);
              }}
              type="button"
            >
              CONTRATAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
