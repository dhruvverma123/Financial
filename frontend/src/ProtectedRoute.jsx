import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextApi";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Context);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
