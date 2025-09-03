import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


const Root = () => {
    return (
        <div>
       
            <Outlet></Outlet>
        </div>
    );
};

export default Root;