import { Outlet } from "react-router";
import Footer from "../components/Footer";
import HeaderAuth from "../components/HeaderAuth";
<<<<<<< HEAD

=======
>>>>>>> 23472482f705d404ef8808d4f89386ab8bbd1921

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