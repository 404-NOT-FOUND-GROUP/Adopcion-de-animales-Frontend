import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children, allowedRoles }) => {
    const role = localStorage.getItem("role");

    if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
    }

    return children;
};