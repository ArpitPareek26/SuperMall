import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="pt-16 px-6 py-12 w-full bg-white min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center text-slate-500 mb-10">
        📞 Contact Us
      </h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-slate-500 mb-4">
            Reach Us At:
          </h2>
          <p className="text-gray-800 mb-2">
            📍 <strong>Address:</strong> SuperMall HQ, Village Connect Tower,
            Rajasthan, India
          </p>
          <p className="text-gray-800 mb-2">
            📞 <strong>Phone:</strong> +91 98765 43210
          </p>
          <p className="text-gray-800 mb-4">
            📧 <strong>Email:</strong> support@supermall.in
          </p>

          <h2 className="text-xl font-semibold text-slate-500 mt-6 mb-2">
            Business Hours:
          </h2>
          <p className="text-gray-800">Mon - Sat: 9:00 AM – 6:00 PM</p>
          <p className="text-gray-800">Sunday: Closed</p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-slate-500">
          <h2 className="text-lg font-semibold mb-4 text-slate-500">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-500">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-slate-500 text-gray-800 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-slate-500 text-gray-800 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full border border-slate-500 text-gray-800 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-500 text-white py-2 rounded hover:bg-slate-600 transition cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
