import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivacyPolicy = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="pt-16 px-6 pb-12 w-full bg-white min-h-screen text-gray-800 mt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-500">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At SuperMall, we respect your privacy and are committed to protecting
          your personal data. This Privacy Policy outlines how we collect, use,
          disclose, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Personal Information (e.g., name, email, phone number)</li>
          <li>Shop details and business-related data</li>
          <li>Location and IP address</li>
          <li>Browsing behavior and usage patterns</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and manage your account</li>
          <li>To personalize user experience and show relevant shops</li>
          <li>To improve our services</li>
          <li>To send updates, offers, or newsletters</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          3. Information Sharing
        </h2>
        <p className="mb-4">
          We do not sell your personal data. We may share your information with
          trusted partners and vendors to help operate our platform (e.g.,
          hosting, analytics, payment providers), but only to the extent
          necessary.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          4. Data Security
        </h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data
          from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          5. Your Rights
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Access and update your personal data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing emails</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          6. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this policy periodically. We encourage you to review
          this page regularly for any changes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-slate-500">
          7. Contact Us
        </h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, you
          can contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> support@supermall.in <br />
          <strong>Phone:</strong> +91 01010 10101
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
