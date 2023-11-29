import { createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("CLIENTE SIN NOMBRE");
  const [cargando, setCargando] = useState(false);
  const [cgp, setCgp] = useState(0);
  const [num, setNum] = useState(0);
  const [site, setSite] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        cgp,
        setCgp,
        num,
        setNum,
        site,
        setSite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
