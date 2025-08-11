import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
    navigate("/login");
  };

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Shops", path: "/shops" },
  ];

  const authLinks = [
    ...(user?.role === "seller" ? [{ name: "My Shop", path: "/myshop" }] : []),
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-500 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold text-slate-500">
            SUPERMALL
          </Link>
        </div>

        {/* Middle: Desktop links */}
        <div className="hidden md:flex space-x-6 items-center">
          {commonLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-slate-500 hover:text-slate-600 font-bold"
            >
              {link.name}
            </Link>
          ))}
          {user &&
            authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-500 hover:text-slate-600 font-bold"
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Right: Auth Button */}
        <div className="flex items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-slate-500 text-white px-4 py-1.5 rounded-md hover:bg-slate-600 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-slate-500 text-white px-4 py-1.5 rounded-md hover:bg-slate-600 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          {commonLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-slate-500 hover:text-blue-600 font-bold"
            >
              {link.name}
            </Link>
          ))}
          {user &&
            authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-slate-500 hover:text-blue-600 font-bold"
              >
                {link.name}
              </Link>
            ))}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 text-slate-500 hover:text-red-600 font-bold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-slate-500 hover:text-blue-600 font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
