import CalendarioJS from "./CalendarioJS";

export const Agendamiento = () => {
  return (
    <>
      <CalendarioJS />
      <iframe
        height="550px"
        src="https://portal2-des.iplan.com.ar/agendamientoBiz/calendar/?site=1682007543&amp;tur=2&amp;tipo=IN"
        style="border:none;width:100%;"
        title="Agendamiento"
        width="600px"
      ></iframe>
    </>
  );
};
