import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../pages/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  if(loading){
    return <Loader/>
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;
