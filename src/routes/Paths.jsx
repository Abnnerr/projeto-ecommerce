import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import PageLayout from "../layouts/PageLayout";


import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";


import NotFound from "../pages/NotFound";

import Home from "../pages/Home/index";

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<PageProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="usuario/:name" element={<Usuario />} />
          <Route path="orders" element={<OrdersPage />} /> */}
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          {/* <Route path="about-us" element={<AboutUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="projects" element={<ProjectsPersonali />} />
          <Route path="/filamentos-3d" element={<Filamentos />} /> */}
        </Route>

        {/* <Route path="/admin" element={<BoardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
         */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;