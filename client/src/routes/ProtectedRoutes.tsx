// React Imports
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props: any) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/m-login" />;
  }
};

export default ProtectedRoutes;
