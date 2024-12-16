import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/layoutAdmin";
import LayoutWebsite from "./layouts/layoutWebsite";
import HomePage from "./pages/website/home/Page";
import PageShop from "./pages/website/shop/PageShop";
import AboutPage from "./pages/website/about/Page";
import ContactPage from "./pages/website/contact/Page";
import Signup from "./pages/auth/signup";
import Signin from "./pages/auth/singin";
import Private from "./components/private";
import ProductlistAdmin from "./pages/admin/product-list/Page";
import ProductAdd from "./components/ProductAdd";
import NotFoundPage from "./pages/website/404/Page";
import ProductEdit from "./components/ProductEdit";
import DashboardPage from "./pages/admin/Page";
import ProductDetail from "./pages/website/shop/product-detail/page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Signin />} />
          <Route path="register" element={<Signup />} />
          <Route path="shop" element={<PageShop />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="shop/:id" element={<ProductDetail />} />
        </Route>
        <Route
          path="/admin"
          element={
            <Private>
              <LayoutAdmin />
            </Private>
          }
        >
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
