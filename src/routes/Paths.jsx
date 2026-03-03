import { BrowserRouter, Route, Routes } from "react-router";
import PageLayout from "../layouts/PageLayout";
import AuthLayout from "../layouts/AuthLayout";
import BoardLayout from "../layouts/BoardLayout";

import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import PageProduct from "../pages/PageProduct";
import ResetPassword from "../pages/ResetPassword";
import OrdersPage from "../pages/Orders";
import Dashboard from "../pages/Dashboard";
import Usuario from "../pages/Usuario";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminBanners from "../pages/admin/Banners";
import AdminCoupons from "../pages/admin/Coupons";
import AdminUsers from "../pages/admin/Users";
import AdminCategories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/Products";

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:slug" element={<PageProduct />} />
          <Route path="usuario/:name" element={<Usuario />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin" element={<BoardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;