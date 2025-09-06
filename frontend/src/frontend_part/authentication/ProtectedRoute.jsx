import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access-token");
    const location = useLocation()

    if (token) {
        return children
    }
    return (
        <Navigate state={location.pathname} to='/login'>  </Navigate>
    );
};

export default ProtectedRoute;