import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Shops from "./pages/Shops";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyShop from "./pages/MyShop";
import ShopDetails from "./pages/ShopDetails";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ShopsByCategory from "./pages/ShopsByCategory";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#64748b",
              color: "#ffffff",
              border: "1px solid #cbd5e1",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ecfdf5",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fef2f2",
              },
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/shop/:shopId" element={<ShopDetails />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/checkout/:productId" element={<Checkout />} />
          <Route
            path="/shops/category/:categoryName"
            element={<ShopsByCategory />}
          />
          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path="/myshop" element={<MyShop />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
