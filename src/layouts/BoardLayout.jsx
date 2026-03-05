import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import UserSideBar from "../components/UserSideBar";
import ProductSideBar from "../components/ProductSideBar";
import ProductPutBar from "../components/ProductPutBar";
import CategoriesBar from "../components/CategoriesBar";
import CategoriesEditBar from "../components/CategoriesEditBar";
import CouponsBar from "../components/CuponsBar";
import AdminSidebar from "../components/SideBarBoard";
import { jwtDecode } from "jwt-decode";

const BoardLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        const decoded = jwtDecode(token);

        if (decoded.nivel !== "admin") {
            navigate("/");
        }

    }, [navigate]);
    
    return (
        <div className="min-h-screen bg-[var(--bg)] text-white flex">
            <AdminSidebar />
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
                <Outlet />
            </div>
            <ProductSideBar />
            <ProductPutBar />
            <UserSideBar />
            <CategoriesBar />
            <CategoriesEditBar />
            <CouponsBar />

        </div>
    );
}

export default BoardLayout;
