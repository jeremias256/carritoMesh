import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faPenRuler } from "@fortawesome/free-solid-svg-icons";
import useCarrito from "../hooks/useCarritoProvider";
import imgMesh from "../assets/imgs/imgMesh.png";

export const Login = () => {
  const { handleSubmitForm } = useCarrito();
  return (
    <>
      <h2 className="pinkTitle mb-8">Comprá tus torres de WiFi Power Mesh</h2>

      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-2 xl:gap-6">
        <div className="card">
          <div className="card__redHeader">
            <h2 className="card__readHeader__title">
              Identificate para iniciar tu compra
            </h2>
          </div>

          <div className="card__body">
            <p className="textGrey21Roboto mb-4">
              Ingresá los datos de tu cuenta
            </p>

            <form
              className="flex w-full flex-col items-center"
              onSubmit={handleSubmitForm}
            >
              <div className="relative w-full">
                <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                  CGP / Documento
                </label>
                <input
                  className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
                  id="formulario_cgp"
                  type="number"
                  defaultValue="1231145"
                />
                <div className="absolute right-8 top-[14px] flex h-[25px] w-6 items-center justify-center rounded-full border-2 border-iplanGrey2 text-iplanGrey2">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
              </div>

              <div className="relative mt-4 w-full">
                <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 font-lato text-[14px] font-bold not-italic leading-normal text-iplanGrey2">
                  Clave
                </label>
                <input
                  className="h-[48px] w-full rounded-[30px] border-2 pl-4 pr-[10px] text-[16px] font-bold not-italic leading-normal text-iplanPink"
                  id="formulario_pass"
                  type="password"
                  defaultValue="1231145"
                />
              </div>

              <button
                className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite"
                type="submit"
              >
                INGRESAR
              </button>

              <a
                className="mt-4 font-roboto text-[17px] font-bold not-italic leading-[135%] tracking-[-0.187px] text-iplanPink"
                href="#"
              >
                <u>No soy cliente</u>
              </a>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="relative flex flex-col gap-3 self-stretch bg-iplanPurple px-6 py-[25px] text-end">
            <div className="absolute left-0 top-0 min-h-[150px] w-[200px] max-w-[75px] rounded-r-[100%] bg-iplanPink"></div>
            <h2 className="font-figtree text-[72px] font-bold not-italic leading-[50px] text-iplanWhite">
              WiFi
            </h2>
            <p className="text-[26px] font-semibold not-italic text-iplanWhite">
              Torres
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-b-[24px] bg-iplanWhite px-[24px] py-[30px]">
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
              $650
            </p>
            <p className="flex gap-[8px] text-center font-lato text-[15px] font-bold not-italic text-iplanGrey2">
              En tu factura - Imp incluidos
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
