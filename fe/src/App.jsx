/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import NotFoundPage from "./pages/website/404/Page";
import DashboardPage from "./pages/admin/Page";
import ProductlistAdmin from "./pages/admin/product-list/Page";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import LayoutWebsite from "./layouts/LayoutWebsite";
import HomePage from "./pages/website/home/Page";
import LoginPage from "./pages/auth/login";
import PageShop from "./pages/website/shop/PageShop";
import AboutPage from "./pages/website/about/Page";
import ContactPage from "./pages/website/contact/Page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="shop" element={<PageShop />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductlistAdmin />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
