import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="pt-16 px-6 pb-12 bg-white min-h-screen mt-10 text-gray-800">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-slate-500">
          About SuperMall
        </h1>
        <p className="text-lg text-gray-800 mb-10">
          SuperMall is a digital mall platform designed to empower rural and
          small-town merchants, startups and every scale businesses by giving
          them a modern space to showcase and sell their products to the world.
          Whether it’s handicrafts, local foods, or electronics, we connect
          businesses with customers in the most intuitive and engaging way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-slate-500 mb-2">
              🌟 Our Mission
            </h2>
            <p className="text-gray-800">
              To create an accessible and inclusive marketplace that enables
              small merchants and rural communities to thrive in the global
              digital economy. We believe in technology that serves everyone.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-500 mb-2">
              🛒 What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-800">
              <li>Online shop creation for merchants</li>
              <li>Category & floor-based navigation</li>
              <li>Product filtering and cost comparison</li>
              <li>Special offers and digital promotions</li>
              <li>Secure mobile access</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-500 mb-2">
              🏢 Who We Help
            </h2>
            <p className="text-gray-800">
              SuperMall is crafted for small businesses, rural entrepreneurs,
              artisans, and startups who dream big and need a platform to grow
              their outreach without the constraints of geography.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-500 mb-2">
              🚀 Our Vision
            </h2>
            <p className="text-gray-800">
              A future where every village or small town business has an equal
              opportunity to reach global customers — digitally, affordably, and
              reliably.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-slate-600 mb-4">
          📍 Based in India, built for the world
        </h2>
        <p className="text-gray-800">
          We proudly support local talent and technology while ensuring global
          standards in our platform.
        </p>
      </section>
    </div>
  );
};

export default About;
