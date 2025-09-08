import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("access-token");
    const location = useLocation()
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role === "admin") {
        return children;

    }
    return (
        <Navigate state={location.pathname} to='/login'>  </Navigate>
    );
};

export default ProtectedAdminRoute;