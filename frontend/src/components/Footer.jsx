import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3)] px-6 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg text-slate-500">
              About SUPERMALL
            </h3>
            <p className="text-sm mt-2 text-gray-800">
              A community-powered e-commerce platform empowering businesses to
              go global.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-500">Quick Links</h3>
            <ul className="text-sm mt-2 space-y-1 text-gray-800 ">
              <li className="cursor-pointer hover:text-slate-500">
                <Link to="/about">About Us</Link>
              </li>
              <li className="cursor-pointer hover:text-slate-500">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="cursor-pointer hover:text-slate-500">
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-500">Subscribe</h3>
            <p className="text-sm mt-2 mb-2 text-gray-800">
              Stay updated with new shops & offers.
            </p>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 rounded text-gray-800 border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button className="mt-2 w-full bg-slate-500 text-white font-semibold py-1 rounded hover:bg-slate-600 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-center text-sm mt-6 text-gray-800">
          © 2025 SUPERMALL. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
