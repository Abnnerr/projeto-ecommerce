import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";

import CartSidebar from "../components/CartSidebar";


const PageLayout = () => {

    return (
        <div>
            <Header />
            <Menu />
            <Outlet />
            <CartSidebar />
            <Footer />
        </div>
    );
}

export default PageLayout;