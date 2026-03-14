// frontend/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../auth";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
