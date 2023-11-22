import { useState } from "react";

import imgMesh1 from "../assets/imgs/imgMesh1.jpg";
import imgMesh2 from "../assets/imgs/imgMesh2.jpg";
import imgMesh3 from "../assets/imgs/imgMesh3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { resolverCalcu } from "../helpers";

export const FormMesh = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(false);
  const [resultadoForm, setResultadoForm] = useState(false);
  const handleNetStep = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const borrarCampos = () => {
    setCurrentIndex(1);
    setSelectedOption1(false);
    setSelectedOption2(false);
    setSelectedOption3(false);
    setSelectedOption4(false);
    setResultadoForm(false);
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
  }

  return (
    <form className="flex w-full flex-col justify-center gap-2 overflow-hidden rounded-[12px] bg-iplanGrey">
      <div
        className={`${
          currentIndex == 1 ? "flex" : "hidden"
        } flex-col items-center`}
      >
        <button
          className="h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
          type="button"
        >
          1
        </button>

        <p className="p-8 text-center text-xl font-semibold leading-6 text-iplanBrown">
          ¿Cuántos ambientes tiene tu domicilio?
        </p>
        <div className="grid grid-cols-2 gap-4">
          {pregunta1.map((radio, index) => (
            <label key={index} className="w-16 font-bold text-iplanGrey2">
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

        <div className="mt-4">
          <img src={imgMesh1} alt="imgMesh" />
        </div>

        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            className={!selectedOption1 ? "btnNextDisabled" : "btnNextActived"}
            disabled={!selectedOption1}
            onClick={handleNetStep}
            type="button"
          >
            SIGUIENTE
          </button>
        </div>
      </div>

      <div
        className={`${
          currentIndex == 2 ? "flex" : "hidden"
        } mx-4 flex-col items-center rounded-lg px-2 py-2`}
      >
        <button
          className="h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
          type="button"
        >
          2
        </button>

        <p className="p-8 text-center text-xl font-semibold leading-6 text-iplanBrown">
          ¿Cuántos m2 tiene tu domicilio?
        </p>

        <div className="flex w-full flex-col">
          {pregunta2.map((radio, index) => (
            <label
              key={index}
              className="my-1 w-full text-left font-bold text-iplanGrey2"
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

        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
            onClick={handlePrev}
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={!selectedOption2 ? "btnNextDisabled" : "btnNextActived"}
            disabled={!selectedOption2}
            onClick={handleNetStep}
            type="button"
          >
            SIGUIENTE
          </button>
        </div>
      </div>

      <div
        className={`${
          currentIndex == 3 ? "flex" : "hidden"
        } mx-4 flex-col items-center rounded-lg px-2 py-2`}
      >
        <button
          className="h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
          type="button"
        >
          3
        </button>

        <p className="p-8 text-center text-xl font-semibold leading-6 text-iplanBrown">
          ¿Cuántas plantas tiene tu domicilio?
        </p>

        <div className="items-left flex flex-col justify-center">
          {pregunta3.map((radio, index) => (
            <label key={index} className="my-2 font-bold text-iplanGrey2">
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

        <div className="mt-4">
          <img src={imgMesh3} alt="imgMesh" />{" "}
        </div>

        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
            onClick={handlePrev}
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={!selectedOption3 ? "btnNextDisabled" : "btnNextActived"}
            disabled={!selectedOption3}
            onClick={handleNetStep}
            type="button"
          >
            SIGUIENTE
          </button>
        </div>
      </div>

      <div
        className={`${
          currentIndex == 4 ? "flex" : "hidden"
        } mx-4 flex-col items-center rounded-lg px-2 py-2`}
      >
        <button
          className="h-[32px] w-[32px] rounded-full bg-iplanPink font-lato text-2xl font-bold not-italic text-iplanWhite"
          type="button"
        >
          4
        </button>

        <p className="p-8 text-center text-xl font-semibold leading-6 text-iplanBrown">
          ¿Qué distribución tiene tu domicilio?{" "}
        </p>

        <div className="flex flex-col">
          {pregunta4.map((radio, index) => (
            <label key={index} className="my-2 font-bold text-iplanGrey2">
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
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            className="flex h-[36px] w-auto max-w-[90] items-center justify-center rounded-[25px] bg-iplanPink px-6 py-2 font-roboto text-[17px] font-normal text-iplanWhite"
            onClick={handlePrev}
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            disabled={!selectedOption4}
            className={
              !selectedOption4
                ? "btnSugerenciaDisabled"
                : "btnSugerenciaActived"
            }
            onClick={() => {
              calcularMesh();
            }}
            type="button"
          >
            Ver sugerencia
          </button>
        </div>

        {resultadoForm && (
          <>
            <div className="mt-8 h-auto max-w-[275px] rounded-lg bg-[#ffff] p-2 text-center">
              <h2 className="text-3xl font-bold text-iplanPink">
                Recomendamos
              </h2>
              <ul className="text-xl font-semibold text-iplanBrown">
                <li> WiFi Plus (incluido en servicio Iplan Liv)</li>
                <li> {resultadoForm} torres Power Mesh</li>
              </ul>
            </div>

            <div>
              <button
                onClick={borrarCampos}
                className="btnNextActived mt-3"
                type="button"
              >
                Rehacer test
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};
