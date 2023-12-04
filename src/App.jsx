/* ------------------------ REACT ----------------------- */
import { CarritoProvider } from "./context/CarritoProvider";
import { AuthProvider } from "./context/AuthProvider";
/* --------------------- COMPONENTS --------------------- */
import { AppCarrito } from "./steps/AppCarrito";
/* ----------------------- HELPERS ---------------------- */
import { delete_cookie } from "./helpers/cookies";

const App = () => {
  return (
    <AuthProvider>
      <CarritoProvider>
        <div className="relative m-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center bg-iplanGrey px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] xl:px-[90px] xl:py-[30px]">
          <a
            className="buttonCerrarSesion opacity-[0.4]"
            onClick={() => {
              delete_cookie("userLogged");
              delete_cookie("carritoCGP");
              delete_cookie("carritoLogin");
              delete_cookie("carritoCookieStep");
              delete_cookie("carritoCookieTorre");
              delete_cookie("carritoCookieDirs");
            }}
            href="https://portal2-des.iplan.com.ar/node/1875"
          >
            CERRAR SESION TEST
          </a>
          <AppCarrito />
        </div>
      </CarritoProvider>
    </AuthProvider>
  );
};

export default App;
