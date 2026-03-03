import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeaderAuth from "../components/HeaderAuth";

const AuthLayout = () => {
    return (
        <div>
            <HeaderAuth />
            <Outlet />
            <Footer />
        </div>
    );
}

export default AuthLayout;