import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Handicrafts",
    description: "Explore unique handmade items from local artisans.",
    image:
      "https://images.unsplash.com/photo-1751725154557-b10ab73f1564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFuZGljcmFmdHN8ZW58MHwwfDB8fHww",
  },
  {
    name: "Clothing",
    description: "Traditional and modern wear directly from rural designers.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nfGVufDB8MHwwfHx8MA%3D%3D",
  },
  {
    name: "Local Foods",
    description: "Authentic regional snacks, spices, and grains.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    name: "Electronics",
    description: "Affordable gadgets and devices from local tech vendors.",
    image:
      "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHwwfDB8fHww",
  },
  {
    name: "Toys",
    description: "Handcrafted and factory-made toys for kids of all ages.",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95c3xlbnwwfDB8MHx8fDA%3D",
  },
  {
    name: "Furniture",
    description: "Rural-crafted furniture for home and office spaces.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
  },
  {
    name: "Footwear",
    description: "Leather, ethnic, and handmade shoes and slippers.",
    image:
      "https://plus.unsplash.com/premium_photo-1672883552548-091bbbfa595a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vdHdlYXJ8ZW58MHwwfDB8fHww",
  },
  {
    name: "Beauty",
    description: "Natural and organic skincare and cosmetics.",
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0eXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    name: "Grocery",
    description: "Organic and local produce, fresh meats, and vegetables.",
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8R3JvY2VyeXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    name: "Sports",
    description: "Sports equipment, apparel, and accessories.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb3J0c3xlbnwwfDB8MHx8fDA%3D",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pt-16 px-6 pb-12 w-full bg-gray-50 min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center text-slate-500 mb-10">
        Explore Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between text-center border border-slate-500 h-full"
          >
            <div>
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {cat.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{cat.description}</p>
            </div>
            <button
              onClick={() => navigate(`/shops/category/${cat.name}`)}
              className="bg-slate-500 text-white px-4 py-1 rounded hover:bg-slate-600 cursor-pointer"
            >
              View Shops
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
