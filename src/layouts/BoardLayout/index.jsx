import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import UserSideBar from "../BoardLayout/components/UserSideBar";
import ProductSideBar from "../BoardLayout/components/ProductSideBar";
import ProductPutBar from "../BoardLayout/components/ProductPutBar";
import CategoriesBar from "../BoardLayout/components/CategoriesBar";
import CategoriesEditBar from "../BoardLayout/components/CategoriesEditBar";
import CouponsBar from "../BoardLayout/components/CuponsBar";
import AdminSidebar from "../BoardLayout/components/SideBarBoard";
import HeaderBoard from "../BoardLayout/components/HeaderBoard";
import { Title } from "react-head";
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

        <div className=" bg-[var(--bg)] text-white flex">
            <Title>3Dtech - Dashboard</Title>
            <AdminSidebar />
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 flex flex-col gap-5">
                <HeaderBoard />
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
