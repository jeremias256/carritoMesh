/* ------------------------ LIBS ------------------------ */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
/* ------------------------ REACT ----------------------- */
import { useState } from "react";
/* --------------------- COMPONENTS --------------------- */
/* ----------------------- HELPERS ---------------------- */
import { resolverCalcu } from "../helpers/helpers";
/* ----------------------- ASSETS ----------------------- */
import imgMesh1 from "../assets/imgs/imgMeshGris1.png";
import imgMesh2 from "../assets/imgs/imgMesh2.jpg";
import imgMesh3 from "../assets/imgs/imgMesh3.jpg";
import useCarrito from "../hooks/useCarritoProvider";

export const FormMesh = () => {
  const { setTorres, mostrarForm, setMostrarForm } = useCarrito();
  const [vistaConResultado, setVistaConResultado] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  const [respuestasActived, setRespuestasActived] = useState(false);
  const [resultadoForm, setResultadoForm] = useState(false);
  const handleNextStep = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevStep = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const borrarCampos = () => {
    setCurrentIndex(1);
    setSelectedOption1(false);
    setSelectedOption2(false);
    setSelectedOption3(false);
    setSelectedOption4(false);
    setResultadoForm(false);
    setRespuestasActived(false);
  };

  const pregunta1 = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6 o +" },
  ];
  const pregunta2 = [
    { id: 100, label: "hasta 100" },
    { id: 200, label: "entre 100 y 200" },
    { id: 300, label: "entre 200 y 300" },
    { id: 400, label: "entre 300 y 400" },
    { id: 500, label: "+ 400" },
  ];
  const pregunta3 = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3 o  +" },
  ];
  const pregunta4 = [
    { id: "cuadrada", label: "cuadrada" },
    { id: "rectangular", label: "rectangular" },
    { id: "en L", label: "en L" },
  ];

  function handleCheckboxChange1(event) {
    const optionId = parseInt(event.target.value);
    setSelectedOption1(optionId);
  }
  function handleCheckboxChange2(event) {
    const optionId = parseInt(event.target.value);
    setSelectedOption2(optionId);
  }
  function handleCheckboxChange3(event) {
    const optionId = parseInt(event.target.value);
    setSelectedOption3(optionId);
  }
  function handleCheckboxChange4(event) {
    const optionId = event.target.value;
    if (selectedOption4 === optionId) {
      setSelectedOption4(null);
    } else {
      setSelectedOption4(optionId);
    }
  }

  function calcularMesh() {
    setResultadoForm(
      resolverCalcu(
        selectedOption1,
        selectedOption2,
        selectedOption3,
        selectedOption4,
      ),
    );
    setTorres(
      resolverCalcu(
        selectedOption1,
        selectedOption2,
        selectedOption3,
        selectedOption4,
      ),
    );
  }

  return (
    <>
      {!mostrarForm && !vistaConResultado && (
        <div className="flex flex-col items-center">
          <p className="w-full px-4 text-center font-lato text-lg font-normal not-italic text-iplanGrey2">
            ¿Cuantos dispositivos necesito?
          </p>
          <button
            className="mt-4 flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
            onClick={() => {
              setMostrarForm(true);
            }}
            type="button"
          >
            HACER TEST
          </button>
        </div>
      )}
      {vistaConResultado && !mostrarForm && (
        <>
          <p className="font-lato text-[18px] font-normal not-italic leading-normal text-iplanGrey2">
            Te recomendamos para tu hogar
          </p>
          <p className="font-lato text-[18px] not-italic leading-normal text-iplanPink">
            {resultadoForm} Torres Power Mesh
          </p>
          <button
            onClick={() => {
              setMostrarForm(true);
              setCurrentIndex(1);
              setSelectedOption1(false);
              setSelectedOption2(false);
              setSelectedOption3(false);
              setSelectedOption4(false);
              // setResultadoForm(false);
              setRespuestasActived(false);
            }}
            className="mt-2 flex h-[36px] w-auto max-w-[180px] items-center justify-center gap-[6px] rounded-[25px] bg-iplanGrey2 px-6 py-2 font-lato text-[17px] font-bold leading-normal text-iplanWhite outline-none focus:outline-none"
            type="button"
          >
            REHACER TEST
          </button>
        </>
      )}
      {mostrarForm && (
        <div className="flex h-full max-h-[530px] max-w-[300px] flex-col items-end">
          {/* X */}
          <button
            className="outline-none focus:outline-none"
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

          {/* FORM */}
          <div className="mb-4 flex flex-col items-center">
            {!respuestasActived && (
              <form className="h-[500px] w-full max-w-[300px]">
                <div
                  className={`${
                    currentIndex == 1 ? "flex" : "hidden"
                  } h-[500px] w-[260px] flex-col items-center justify-between py-3 xl:w-[300px]`}
                >
                  <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[12px]">
                    <p className="px-4 text-center text-[18px] font-bold not-italic leading-normal text-iplanGrey2">
                      1/4
                    </p>

                    <p className="px-4 py-2 text-center text-[15px] font-bold leading-normal text-iplanBrown">
                      ¿Cuántos ambientes tiene tu domicilio?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {pregunta1.map((radio, index) => (
                        <label
                          key={index}
                          className="text-[15px] font-bold not-italic leading-normal text-iplanGrey2"
                        >
                          <input
                            checked={selectedOption1 === radio.id}
                            onChange={handleCheckboxChange1}
                            type="radio"
                            value={radio.id}
                          />
                          <span className="radio-btn"></span>
                          {radio.label}
                        </label>
                      ))}
                    </div>

                    <div className="mt-2">
                      <img src={imgMesh1} alt="imgMesh" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      className={
                        !selectedOption1 ? "btnNextDisabled" : "btnNextActived"
                      }
                      disabled={!selectedOption1}
                      onClick={handleNextStep}
                      type="button"
                    >
                      SIGUIENTE
                    </button>
                  </div>
                </div>

                <div
                  className={`${
                    currentIndex == 2 ? "flex" : "hidden"
                  } h-[500px] w-[260px] flex-col items-center justify-between py-3 xl:w-[300px]`}
                >
                  <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[12px]">
                    <p className="px-4 text-center text-[18px] font-bold not-italic leading-normal text-iplanGrey2">
                      2/4
                    </p>

                    <p className="px-4 py-2 text-center text-[15px] font-bold leading-normal text-iplanBrown">
                      ¿Cuántos m2 tiene tu domicilio?
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {pregunta2.map((radio, index) => (
                        <label
                          key={index}
                          className="text-[15px] font-bold not-italic leading-normal text-iplanGrey2"
                        >
                          <input
                            checked={selectedOption2 === radio.id}
                            onChange={handleCheckboxChange2}
                            type="radio"
                            value={radio.id}
                          />
                          <span className="radio-btn"></span>
                          {radio.label}
                        </label>
                      ))}
                    </div>

                    <div className="mt-2">
                      <img src={imgMesh2} alt="imgMesh" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
                      onClick={handlePrevStep}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      className={
                        !selectedOption2 ? "btnNextDisabled" : "btnNextActived"
                      }
                      disabled={!selectedOption2}
                      onClick={handleNextStep}
                      type="button"
                    >
                      SIGUIENTE
                    </button>
                  </div>
                </div>

                <div
                  className={`${
                    currentIndex == 3 ? "flex" : "hidden"
                  } h-[500px] w-[260px] flex-col items-center justify-between py-3 xl:w-[300px]`}
                >
                  <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[12px]">
                    <p className="px-4 text-center text-[18px] font-bold not-italic leading-normal text-iplanGrey2">
                      3/4
                    </p>

                    <p className="px-4 py-2 text-center text-[15px] font-bold leading-normal text-iplanBrown">
                      ¿Cuántas plantas tiene tu domicilio?
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {pregunta3.map((radio, index) => (
                        <label
                          key={index}
                          className="text-[15px] font-bold not-italic leading-normal text-iplanGrey2"
                        >
                          <input
                            checked={selectedOption3 === radio.id}
                            onChange={handleCheckboxChange3}
                            type="radio"
                            value={radio.id}
                          />
                          <span className="radio-btn"></span>
                          {radio.label}
                        </label>
                      ))}
                    </div>

                    <div className="mt-2">
                      <img src={imgMesh3} alt="imgMesh" />{" "}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
                      onClick={handlePrevStep}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      className={
                        !selectedOption3 ? "btnNextDisabled" : "btnNextActived"
                      }
                      disabled={!selectedOption3}
                      onClick={handleNextStep}
                      type="button"
                    >
                      SIGUIENTE
                    </button>
                  </div>
                </div>

                <div
                  className={`${
                    currentIndex == 4 ? "flex" : "hidden"
                  } h-[500px] w-[260px] flex-col items-center justify-between py-3 xl:w-[300px]`}
                >
                  <div className="flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[12px]">
                    <p className="px-4 text-center text-[18px] font-bold not-italic leading-normal text-iplanGrey2">
                      4/4
                    </p>

                    <p className="px-4 py-2 text-center text-[15px] font-bold leading-normal text-iplanBrown">
                      ¿Qué distribución tiene tu domicilio?{" "}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {pregunta4.map((radio, index) => (
                        <label
                          key={index}
                          className="text-[15px] font-bold not-italic leading-normal text-iplanGrey2"
                        >
                          <input
                            type="radio"
                            value={radio.id}
                            checked={selectedOption4 === radio.id}
                            onChange={handleCheckboxChange4}
                          />
                          <span className="radio-btn red"></span>
                          {radio.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
                      onClick={handlePrevStep}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                      disabled={!selectedOption4}
                      className={
                        !selectedOption4 ? "btnNextDisabled" : "btnNextActived"
                      }
                      onClick={() => {
                        calcularMesh();
                        setRespuestasActived(true);
                        setVistaConResultado(true);
                      }}
                      type="button"
                    >
                      SIGUIENTE
                    </button>
                  </div>
                </div>
              </form>
            )}

            {respuestasActived && (
              <div className="flex h-[500px] w-full max-w-[300px] flex-col items-center justify-between">
                <div className="mt-8 h-auto max-w-[275px] text-center">
                  <ul className="rounded-[12px] bg-iplanGrey px-4 py-8 text-xl font-semibold text-iplanBrown">
                    <li className="font-lato text-[20px] font-bold not-italic leading-normal text-iplanBrown">
                      Resultado del test:
                    </li>
                    <li className="mt-4  font-lato text-[18px] font-bold not-italic leading-normal text-iplanGrey2">
                      Según tu selección
                    </li>
                    <li className="font-lato text-[18px] font-medium not-italic leading-normal text-iplanGrey2">
                      {selectedOption1} ambientes
                    </li>
                    <li className="font-lato text-[18px] font-medium not-italic leading-normal text-iplanGrey2">
                      {selectedOption2} m²
                    </li>
                    <li className="font-lato text-[18px] font-medium not-italic leading-normal text-iplanGrey2">
                      {selectedOption3} plantas
                    </li>
                    <li className="font-lato text-[18px] font-medium not-italic leading-normal text-iplanGrey2">
                      Distribución {selectedOption4}
                    </li>
                    <li className="mt-8 text-center font-lato text-[18px] font-bold not-italic leading-normal">
                      Te recomendamos
                    </li>
                    <li className="font-lato text-[24px] font-bold not-italic leading-normal text-iplanPink">
                      {" "}
                      <button disabled className="btnActived">
                        {resultadoForm}
                      </button>{" "}
                      {resultadoForm == 1
                        ? "torre Power Mesh"
                        : "torres Power Mesh"}
                    </li>
                  </ul>
                </div>

                {/* <div>
                  <button
                    onClick={() => {
                      setCurrentIndex(1);
                      setSelectedOption1(false);
                      setSelectedOption2(false);
                      setSelectedOption3(false);
                      setSelectedOption4(false);
                      setResultadoForm(false);
                      setRespuestasActived(false);
                    }}
                    className="btnNextActived mt-4"
                    type="button"
                  >
                    REHACER TEST
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
