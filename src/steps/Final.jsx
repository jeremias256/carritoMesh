export const Final = () => {
  return (
    <div className="shadow-[1px_1px_2px_0px_rgba(0,0,0,0.15) flex max-w-[832px] flex-col gap-[12px] overflow-hidden rounded-[24px] bg-iplanBlue py-[24px] text-iplanWhite">
      <p className="text-center font-lato text-[32px] font-bold not-italic leading-normal">
        ¡Felicitaciones!
      </p>
      <div className="flex items-center justify-center gap-[16px]">
        <p className="font-lato text-[20px] font-bold leading-normal">
          Ya contás con
        </p>
        <img
          className="h-[48px] w-[100px]"
          src="src/assets/imgs/imgDgo.png"
        ></img>
      </div>
      <p className="text-center font-lato text-[20px] font-bold leading-normal">
        En breve recibirás en <span>correo@dominio.com</span> toda la
        información necesaria para disfrutar el servicio
      </p>
    </div>
  );
};
