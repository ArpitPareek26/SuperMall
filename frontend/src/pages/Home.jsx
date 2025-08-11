import React, { useEffect, useState } from "react";
import hero from "../assets/hero.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, shops, products, getAllProducts, fetchAllShops } = useAuth();
  const [featuredShops, setFeaturedShops] = useState([]);
  const [topOffers, setTopOffers] = useState([]);

  const handleStartSelling = () => {
    if (user && user.role === "seller") {
      navigate("/myshop");
    } else {
      toast.error("Please register as seller");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getAllProducts();
    fetchAllShops();
  }, []);

  useEffect(() => {
    if (Array.isArray(shops) && shops.length >= 3) {
      const shuffledShops = [...shops].sort(() => Math.random() - 0.5);
      const randomThree = shuffledShops.slice(0, 3);
      setFeaturedShops(randomThree);
    } else {
      setFeaturedShops(shops);
    }
  }, [shops]);

  useEffect(() => {
    if (Array.isArray(products) && products.length) {
      const sorted = [...products]
        .filter((p) => p.originalPrice && p.discountedPrice)
        .sort(
          (a, b) =>
            (b.originalPrice - b.discountedPrice) / b.originalPrice -
            (a.originalPrice - a.discountedPrice) / a.originalPrice
        );
      setTopOffers(sorted.slice(0, 6));
    } else {
      setTopOffers([]);
    }
  }, [products]);

  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-500 mb-4">
            From home-grown to well-known with SuperMall
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            🌍 SuperMall empowers local artisans, small-town vendors and
            businesses of every scale to go global—with effortless storefront
            setup, secure payments, and smart marketing tools. <br /> 🛒
            Showcase your unique creations—from organic spices to handcrafted
            decor—and grow your business with affordable, data-driven support
            and worldwide reach.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/shops")}
              className="bg-slate-500 text-white px-6 py-2 rounded shadow hover:bg-slate-600 cursor-pointer"
            >
              Explore Shops
            </button>
            <button
              onClick={handleStartSelling}
              className="bg-white border border-slate-500 text-slate-700 px-6 py-2 rounded shadow hover:bg-slate-500 hover:text-white cursor-pointer"
            >
              Start Selling
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src={hero}
            alt="Hero"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Featured Shops */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl font-bold text-center text-slate-500 mb-6">
          Featured Shops
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredShops?.length > 0 &&
            featuredShops.map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center border border-slate-500"
              >
                <img
                  src={shop.banner || "https://via.placeholder.com/150"}
                  alt={shop.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {shop.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Floor: {shop.floor} • Category: {shop.category}
                </p>
                <button
                  onClick={() => navigate(`/shop/${shop._id}`)}
                  className="mt-2 bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600 cursor-pointer"
                >
                  View Shop
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl font-bold text-center text-slate-500 mb-6">
          Today’s Best Offers
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products && products.length > 0 ? (
            [...products]
              .sort(
                (a, b) =>
                  (b.originalPrice - b.discountedPrice) / b.originalPrice -
                  (a.originalPrice - a.discountedPrice) / a.originalPrice
              )
              .slice(0, 6)
              .map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center border border-slate-500"
                >
                  <img
                    src={product.image || productImg}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 text-sm sm:text-base">
                    <p className="text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-green-600">
                      ₹{product.discountedPrice}
                    </p>

                    <span className="bg-green-200 text-green-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
                      {Math.floor(
                        ((product.originalPrice - product.discountedPrice) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="mt-2 bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No offers available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
