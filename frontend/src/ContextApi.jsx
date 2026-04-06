import { createContext, useState } from "react";

export const Context = createContext();

function ContextApi({ children }) {
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const values = {
    userRole,
    setUserRole,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default ContextApi;
