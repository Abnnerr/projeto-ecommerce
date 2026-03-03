import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import PageLayout from "../layouts/PageLayout";
import AuthLayout from "../layouts/AuthLayout";
import PageProduct from "../pages/PageProduct";
import OrdersPage from "../pages/Orders";
import ResetPassword from "../pages/ResetPassword";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/product" element={<PageProduct />} />
                    <Route path="/usuario/:name" element={<Usuario />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/checkout" element={<Checkout />} />

                </Route>

                
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} >
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default Paths;