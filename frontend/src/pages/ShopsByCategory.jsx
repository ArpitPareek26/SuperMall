import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ShopsByCategory = () => {
  const location = useLocation();
  const { categoryName } = useParams();
  const { shops, categoryShops, fetchShopsByCategory } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      fetchShopsByCategory(categoryName);
    }
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="pt-20 px-6 pb-12 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-slate-500 mb-10">
        Shops in <span>"{categoryName}"</span> Category
      </h1>

      {Array.isArray(categoryShops) && categoryShops.length === 0 ? (
        <p className="text-center text-gray-800 text-lg">
          No shops found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoryShops.map((shop, index) => (
            <div
              key={`${shop._id}-${index}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between text-center border border-slate-500"
            >
              <img
                src={
                  shop.banner ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={shop.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {shop.name}
              </h2>
              <p className="text-sm text-gray-800 mb-1">
                Category: {shop.category || "N/A"}
              </p>
              <p className="text-sm text-gray-800 mb-1">
                Floor: {shop.floor || "N/A"}
              </p>
              <button
                onClick={() => navigate(`/shop/${shop._id}`)}
                className="mt-auto bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600 transition cursor-pointer"
              >
                Visit Shop
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopsByCategory;
