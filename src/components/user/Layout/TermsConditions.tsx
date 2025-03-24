import React from 'react';
// ..
function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
       <span className="text-[#b8860b]">  Terms & Conditions</span>
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        Welcome to <span className="font-semibold text-[#b8860b]">Le Luxe Clinic</span>. By accessing our website and booking services, you agree to comply with the following terms and conditions. Please read them carefully before using our services.
      </p>

      <div className="border-t border-[#b8860b] my-6"></div>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">1. Appointments & Bookings</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>All appointments must be booked through our official website or in person at Le Luxe Clinic.</li>
        <li>A confirmation email or message will be sent upon successful booking.</li>
        <li>Rescheduling or cancellations must be made at least <span className="font-semibold text-gray-900">24 hours</span> in advance.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">2. Payments & Refund Policy</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>Payments for services are due at the time of booking or upon arrival.</li>
        <li>We accept cash, credit/debit cards, and other approved payment methods.</li>
        <li>Refunds are only applicable in cases of service cancellations made within the allowed time frame.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">3. Late Arrivals & No-Shows</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>Clients arriving more than <span className="font-semibold text-gray-900">15 minutes</span> late may have their appointment rescheduled or canceled.</li>
        <li>No-shows without prior notice may be subject to a cancellation fee.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">4. Health & Safety</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>Clients must inform staff of any medical conditions, allergies, or skin sensitivities before treatments.</li>
        <li>We maintain high hygiene standards, and all tools are sanitized after every use.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">5. Service Guarantee</h2>
      <p className="text-gray-700 mb-6">
        We strive to provide the best quality services. If you are unsatisfied, please contact us within <span className="font-semibold text-gray-900">48 hours</span> for adjustments or solutions.
      </p>

      <h2 className="text-2xl font-semibold text-[#b8860b] mb-3">6. Changes to Terms</h2>
      <p className="text-gray-700 mb-6">
        Le Luxe Clinic reserves the right to modify these terms at any time. Any updates will be posted on our website.
      </p>

      <p className="text-gray-600 text-sm text-center mt-6">
        <span className="font-semibold">Last Updated:</span> February 2025
      </p>
    </div>
  );
}

export default TermsConditions;
