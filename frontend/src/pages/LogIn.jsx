import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

const LogIn = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ ...formData, role });
      navigate("/");
      toast.success("Login successful");
    } catch (err) {
      setError("Invalid email or password" || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-14 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-slate-500">
        <h2 className="text-2xl font-bold text-center text-slate-600 mb-6">
          Welcome back to <span className="text-slate-700">SuperMall</span>
        </h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 px-4 py-2 text-gray-800 border border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-gray-800 border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-gray-800 border-slate-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          {error && (
            <p className="text-red-600 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-500 text-white py-2 rounded hover:bg-slate-600 transition cursor-pointer"
          >
            {loading ? "Logging in..." : `Log In as ${role}`}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-slate-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
