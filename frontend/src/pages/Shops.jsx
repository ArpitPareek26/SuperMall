import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const baseFloors = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
];

const Shops = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { shops, getShopsGroupedByFloor } = useAuth();

  const [floorWiseShops, setFloorWiseShops] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const grouped = getShopsGroupedByFloor();

    const structuredFloors = baseFloors.map((floor) => ({
      floor,
      shops: (grouped[floor] || []).map((shop) => ({
        _id: shop._id,
        name: shop.name || "Unnamed Shop",
        category: shop.category || "General",
        image: shop.banner || "/images/default.jpg",
      })),
    }));

    setFloorWiseShops(structuredFloors);
  }, [shops, getShopsGroupedByFloor]);

  return (
    <div className="pt-16 px-6 pb-12 bg-gray-50 min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center text-slate-500 mb-10">
        Mall Shops by Floor
      </h1>

      {floorWiseShops.map((floor) => (
        <div key={floor.floor} className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-500 mb-4 border-b pb-2">
            {floor.floor}
          </h2>

          {floor.shops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {floor.shops.map((shop, index) => (
                <div
                  key={`${shop.name}-${index}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between text-center border border-slate-500"
                >
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {shop.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{shop.category}</p>
                  <button
                    onClick={() => navigate(`/shop/${shop._id}`)}
                    className="mt-auto bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600 cursor-pointer"
                  >
                    Visit Shop
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No shops on this floor.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Shops;
