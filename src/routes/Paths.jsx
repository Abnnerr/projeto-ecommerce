import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import PageLayout from "../layouts/PageLayout";
import AuthLayout from "../layouts/AuthLayout";
import PageProduct from "../pages/PageProduct";
import ResetPassword from "../pages/ResetPassword";
import Checkout from "../pages/Checkout";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Route>

                
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/product/:slug" element={<PageProduct />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
                <Route path="/dashboard" element={''}>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default Paths;