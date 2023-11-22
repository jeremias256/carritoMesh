import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouse,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FormMesh } from "../components/FormMesh";
import useCarrito from "../hooks/useCarritoProvider";
import { MESH } from "../Env";
import { useState } from "react";

export const Compra = () => {
  const { torres, setTorres, setStep, step } = useCarrito();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [subscripciones, setSubscripciones] = useState(1);
  return (
    <>
      {/* STEPS */}
      <div className="mb-8 flex items-center gap-4">
        <div className="pointer">
          <FontAwesomeIcon
            icon={faHouse}
            size="2xl"
            style={{ color: "#7C7B85" }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="pointer h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
            type="button"
            value="1"
          >
            1
          </button>
          <img src="src/assets/imgs/step1.png"></img>
          <button
            className="pointer h-[32px] w-[32px] rounded-full bg-iplanWhite font-lato text-2xl font-bold not-italic text-iplanPink"
            type="button"
            value="2"
          >
            2
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-[70%]">
          <p className="mb-[16px] text-center font-lato text-[24px] font-semibold not-italic leading-normal text-[#5b5151]">
            ¿Cuántas torres Power Mesh querés para tu hogar?
          </p>

          <div
            className={`${
              mostrarForm ? "rounded-r-[24px]" : "rounded-r-[200px]"
            } shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex flex-col gap-6 overflow-hidden rounded-l-[24px] bg-iplanWhite p-6 lg:flex-row`}
          >
            <div className="items-left flex w-full lg:w-[60%] lg:items-start">
              <div className="flex h-full w-full flex-col">
                <div className="flex">
                  <div className="items-left flex w-1/2 flex-col">
                    <p className="px-2 font-figtree text-[24px] font-bold not-italic leading-[25px] text-iplanPink">
                      WiFi Power Mesh
                    </p>
                    <p className="px-2 font-figtree text-lg font-semibold not-italic leading-[25px] text-iplanPink">
                      Máxima potencia
                    </p>
                    <p className="px-2 font-figtree text-lg font-semibold not-italic leading-[25px] text-iplanPink">
                      en cada ríncon de tu hogar
                    </p>
                  </div>

                  <div className="flex w-1/2 flex-col items-center">
                    <p className="mb-3 font-lato text-lg font-normal not-italic text-iplanGrey2">
                      Cantidad de torres:
                    </p>
                    <div className="flex gap-3">
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
                  <div className="m-auto max-h-[390px] w-full max-w-[390px]">
                    <img src="src/assets/imgs/imgMesh.png"></img>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center border-l-2 border-iplanPink px-[24px] lg:w-[40%]">
              {!mostrarForm && (
                <div className="flex flex-col items-center">
                  <p className="font-lato text-lg font-normal not-italic text-iplanGrey2">
                    ¿Cuantos dispositivos necesito?
                  </p>
                  <p className="font-lato text-lg font-normal not-italic text-iplanGrey2">
                    Buscá la mejor opción para tu hogar:
                  </p>
                  <button
                    className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite"
                    onClick={() => {
                      setMostrarForm(true);
                    }}
                    type="button"
                  >
                    HACER TEST
                  </button>
                </div>
              )}

              {mostrarForm && (
                <div className="flex flex-col items-end">
                  <button
                    onClick={(e) => {
                      setMostrarForm(false);
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="2xl"
                      style={{ color: "#ED1F70" }}
                    />
                  </button>
                  <FormMesh />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col lg:w-[30%]">
          <p className="mb-[16px] text-center font-lato text-[24px] font-semibold not-italic leading-normal text-[#5b5151]">
            Vas a agregar a tu plan mensual:
          </p>

          <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex w-full flex-col items-end gap-[12px] overflow-hidden rounded-[24px] bg-iplanWhite p-[18px]">
            <div className="w-full rounded-[12px] bg-iplanPink p-[18px]">
              <div className="rounded-[12px overflow-hidden bg-iplanWhite p-3">
                <p className="px-2 font-figtree text-[24px] font-bold not-italic leading-[25px] text-iplanPink">
                  WiFi Power Mesh
                </p>

                <div className="my-2 w-full border-2 border-iplanPink"></div>

                <div className="flex justify-between">
                  <p className="px-2 font-figtree text-lg font-semibold not-italic leading-[25px] text-iplanPink">
                    Torres x <span> {torres} </span>
                  </p>
                  <p className="px-2 font-figtree text-lg font-semibold not-italic leading-[25px] text-iplanPink">
                    $ <span> {parseInt(torres) * MESH} </span>
                  </p>
                </div>
              </div>
            </div>

            {/* {DIRECCIONES SELECT SI > 1} */}
            {subscripciones > 1 && (
              <>
                <div className="border-iplanGrey2Form my-2 w-full border-2"></div>
                <div className="relative w-full">
                  <p className="mx-auto font-lato text-lg font-normal not-italic text-iplanBrown">
                    Tu dirección de entrega actual es:
                  </p>
                  <label className="absolute left-4 top-[-10px] bg-iplanWhite px-2 text-[14px] font-bold text-[#B8B8B8]">
                    Enviar a:
                  </label>
                  <select
                    className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanPink focus:outline-none"
                    id="formulario_cgp"
                  >
                    <option
                      className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanPink"
                      selected
                    >
                      Seleccioná domiclio de entrega ...
                    </option>
                    <option className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanBrown">
                      Enzo Martinez
                    </option>
                    <option className="text-4 h-[48px] w-full rounded-[30px] border-2 bg-iplanGrey pl-4 pr-[10px] font-bold not-italic text-iplanBrown">
                      Jose Luis
                    </option>
                  </select>
                </div>
              </>
            )}

            <div className="border-iplanGrey2Form my-2 w-full border-2"></div>

            <div className="w-full overflow-hidden rounded-[8px] bg-iplanGrey2 p-[8px]">
              <p className="font-lato text-[20px] font-bold leading-normal text-iplanWhite">
                Estás agregando a tu factura: $
                <span>{parseInt(torres) * MESH}</span>
              </p>
            </div>

            <button
              className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center gap-[8px] rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite"
              onClick={(e) => {
                setStep(step + 1);
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
