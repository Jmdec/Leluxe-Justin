import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
       <span className="text-[#b8860b]"> Privacy Policy</span>
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        Welcome to <span className="font-semibold text-[#b8860b]">Le Luxe Clinic</span>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our online booking system and services.
      </p>

      <div className="border-t border-[#b8860b] my-6"></div>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">1. Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li><span className="font-semibold text-gray-900">Personal Information:</span> Name, email address, phone number, and any details provided when booking an appointment.</li>
        <li><span className="font-semibold text-gray-900">Payment Information:</span> We do not store payment details directly. Transactions are securely handled by our third-party payment providers.</li>
        <li><span className="font-semibold text-gray-900">Service Preferences:</span> Details of services booked, such as Nails, Facial Treatment, Carbon Laser/Pico Glow, and more.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>To process and confirm your appointments.</li>
        <li>To communicate important updates, promotions, or changes to your bookings.</li>
        <li>To enhance your user experience by remembering service preferences.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">3. Data Protection & Security</h2>
      <p className="text-gray-700 mb-6">
        We take appropriate measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data is stored securely and is not shared with third parties unless necessary for booking processing.
      </p>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">4. Third-Party Services</h2>
      <p className="text-gray-700 mb-6">
        We may use third-party providers for payment processing and appointment scheduling. These providers have their own privacy policies governing the use of your information.
      </p>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">5. Your Rights</h2>
      <p className="text-gray-700 mb-6">
        You have the right to access, update, or request the deletion of your personal data. If you have any concerns regarding your privacy, please contact us at <span className="font-semibold text-[#b8860b]">support@leluxeclinic.com</span>.
      </p>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">6. Policy Updates</h2>
      <p className="text-gray-700 mb-6">
        This Privacy Policy may be updated periodically. Any changes will be communicated via our website.
      </p>

      <p className="text-gray-600 text-sm text-center mt-6">
        <span className="font-semibold">Last Updated:</span> February 2025
      </p>
    </div>
  );
}

export default PrivacyPolicy;
