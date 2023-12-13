/* ------------------------ REACT ----------------------- */
import { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(false);
  const [auth, setAuth] = useState("CLIENTE");
  const [cgp, setCgp] = useState(null);
  const [num, setNum] = useState(null);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
