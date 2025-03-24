'use client'

import React from 'react';

function Steps() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="section-title text-center mb-12">
          <span className="text-[#b49324] text-lg font-semibold">Get Started</span>
          <h2 className="text-3xl font-bold mt-2">How It Works!</h2>
          <p className="text-lg mt-4 text-gray-600 sm:text-md">
            Discover, book, and experience personalized healthcare effortlessly <br />
            with our user-friendly Appointment Website.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 pt-8">
          <div className="text-center px-6 max-w-xs">
            <div className="work-icon mb-6 inline-block rounded-full p-6 bg-[#b49324] text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-plus w-12 h-12" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
              </svg>
              <span className="badge bg-white text-[#b49324] rounded-full absolute top-[-12px] right-[-12px] text-sm font-semibold w-8 h-8 flex items-center justify-center">1</span>
            </div>
            <h5 className="text-xl font-semibold mb-2  sm:text-xl">Sign Up / Log In</h5>
            <p className="text-gray-600 text-xs sm:text-base">Log in or create your account to verify and access the services.</p>
          </div>

          <div className="text-center px-6 max-w-xs">
            <div className="work-icon mb-6 inline-block rounded-full p-6 bg-[#b49324] text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar4-week w-12 h-12" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
              </svg>
              <span className="badge bg-white text-[#b49324] rounded-full absolute top-[-12px] right-[-12px] text-sm font-semibold w-8 h-8 flex items-center justify-center">2</span>
            </div>
            <h5 className="text-xl font-semibold mb-2  sm:text-xl">Book Appointment</h5>
            <p className="text-gray-600 text-xs sm:text-base">Effortlessly book an appointment at your convenience.</p>
          </div>

          <div className="text-center px-6 max-w-xs">
            <div className="work-icon mb-6 inline-block rounded-full p-6 bg-[#b49324] text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-prescription2 w-12 h-12" viewBox="0 0 16 16">
                <path d="M7 6h2v2h2v2H9v2H7v-2H5V8h2z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z" />
              </svg>
              <span className="badge bg-white text-[#b49324] rounded-full absolute top-[-12px] right-[-12px] text-sm font-semibold w-8 h-8 flex items-center justify-center">3</span>
            </div>
            <h5 className="text-xl font-semibold mb-2  sm:text-xl">Get Services</h5>
            <p className="text-gray-600 text-xs sm:text-base">Receive personalized healthcare services tailored to your needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
