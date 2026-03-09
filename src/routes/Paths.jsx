import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import PageLayout from "../layouts/PageLayout";
import BoardLayout from "../layouts/BoardLayout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import AboutUs from "../pages/AboutUs";

import NotFound from "../pages/NotFound";

import Home from "../pages/Home/index";
import Dashboard from "../pages/admin/DashBoard";
import Banners from "../pages/admin/Banners";
import Coupons from "../pages/admin/Coupons";
import Users from "../pages/admin/Users";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import PageProducts from "../pages/Products";
import PageDetailProduct from "../pages/DetailProduct";
import PageCheckOut from "../pages/CheckOut";
import Teste from "../pages/Teste";
import Orders from "../pages/admin/Orders";


const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="checkout" element={<PageCheckOut />} />
          <Route path="product/:id" element={<PageDetailProduct />} />
          <Route path="products" element={<PageProducts />} />
          {/* <Route path="usuario/:name" element={<Usuario />} />
          <Route path="orders" element={<OrdersPage />} /> */}
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="about-us" element={<AboutUs />} />
          {/* <Route path="blog" element={<Blog />} />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="projects" element={<ProjectsPersonali />} />
          <Route path="/filamentos-3d" element={<Filamentos />} />  */}
        </Route>

        <Route path="/admin" element={<BoardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="banners" element={<Banners />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;