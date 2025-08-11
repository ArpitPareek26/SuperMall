import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ShopDetails = () => {
  const { pathname } = useLocation();
  const { shopId } = useParams();
  const navigate = useNavigate();
  const { fetchShopById, fetchProductsByShopId, shop, products } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const loadShopAndProducts = async () => {
      try {
        await fetchShopById(shopId);
        await fetchProductsByShopId(shopId);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    if (shopId) {
      loadShopAndProducts();
    } else {
      setError("Invalid Shop ID");
      setLoading(false);
    }
  }, [shopId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading shop details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  if (!shop)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Shop not found.</p>
      </div>
    );

  return (
    <div className="pt-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-10 border border-slate-500 mb-6">
        {/* Banner Image */}
        <img
          src={shop.banner || "https://via.placeholder.com/800x300"}
          alt={shop.name}
          className="w-full h-auto object-cover rounded-md mb-6"
        />

        {/* Shop Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{shop.name}</h2>
          <p className="text-gray-800 text-sm mb-1">
            Category: <span className="font-medium">{shop.category}</span>
          </p>
          <p className="text-gray-800 text-sm mb-1">
            Floor: <span className="font-medium">{shop.floor}</span>
          </p>
          <p className="text-gray-600 mt-4">{shop.description}</p>
        </div>

        {/* Product Listing */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Products in this Shop
          </h3>

          {products.length === 0 ? (
            <p className="text-gray-800 italic">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-slate-500 rounded-lg shadow hover:shadow-lg p-4 transition flex flex-col justify-between"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h4>
                    <p className="text-gray-800 text-sm mb-1">
                      ₹{product.discountedPrice}
                    </p>
                    <p className="text-gray-800 text-xs mb-4">
                      {product.category || "Uncategorized"}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="mt-auto w-full bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded text-sm font-medium transition cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
