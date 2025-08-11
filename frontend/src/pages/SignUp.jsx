import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signup } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await signup({ ...formData, role });
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Signup failed:", error.message);
      toast.error("Email already exist" || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-14">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-slate-500">
        <h2 className="text-2xl font-bold text-center text-slate-500 mb-6">
          Join SuperMall – Sign Up
        </h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 px-4 py-2 text-gray-800 border border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-800 border border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-800 border border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-800 border border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="w-full bg-slate-500 text-white py-2 rounded hover:bg-slate-600 cursor-pointer"
          >
            Sign Up as {role === "seller" ? "Seller" : "Buyer"}
          </button>
          <p className="mt-3 text-center text-gray-800">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
