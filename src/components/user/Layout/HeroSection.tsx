"use client";
import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  if (!isClient || isLoggedIn === null) {
    return <div>Loading...</div>; // Loading state while checking login status
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (isLoggedIn) {
      // If logged in, navigate to the appointment form
      router.push("/user/appointment-form");
    } else {
      // If not logged in, redirect to the login page
      router.push("/auth/login");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center text-gray-800 px-6 max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-yellow-700">
          Where Beauty Meets Luxury
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-wide mt-2">
          {title}
        </h1>
        <p className="text-sm sm:text-lg mt-4 text-gray-700">{subtitle}</p>

        <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-2 sm:space-x-4">
          <a href="/user/service-offer">
            <button className="px-4 py-2 text-xs sm:text-base text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg hover:scale-105 transition">
              Explore Our Services
            </button>
          </a>
          <a
            href="/user/appointment-form"
            onClick={handleClick}
            className="px-6 py-2 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg hover:scale-105 transition"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      {/* Video section visible on larger screens */}
      <div className="absolute top-20 right-10 sm:right-24 h-[50vh] sm:h-[70vh] hidden sm:block">
        <video
          className="w-full h-full object-cover"
          src="/vid/leluxe.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Button to open modal on smaller screens */}
      <div className="absolute bottom-10 sm:hidden w-full flex justify-center">
        <button
          className="px-4 py-2 text-xs sm:text-base text-white bg-yellow-600 rounded-full shadow-lg hover:scale-105 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Watch Video
        </button>
      </div>

      {/* Modal for video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-full relative max-w-4xl" style={{ maxHeight: '80vh' }}>
            <button
              className="absolute top-2 right-2 text-gray-800 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <IoCloseCircleSharp />
            </button>
            <div className="relative w-full h-[calc(70vh-2rem)]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="/vid/leluxe.mp4"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
