import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";


const Root = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div>
            <div
                className={
                    isHome
                        ? "absolute top-0 left-0 w-full z-20 text-white" // transparent, white text
                        : "bg-[#5c34a0cb]  shadow-md  sticky top-0 z-20" // solid background
                }
            >
                <Navbar />
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;