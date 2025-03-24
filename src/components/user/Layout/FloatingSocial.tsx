import React, { useState, useEffect } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

function FloatingSocial() {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleTouch = () => {
      if (window.innerWidth <= 768) {
        setHover(false);
      }
    };

    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div
      className="fixed right-6 bottom-1/2 transform translate-y-1/2 z-50"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!hover && (
        <div className="bg-[#bb9929] rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110">
          <MdDashboardCustomize className="text-white text-2xl" />
        </div>
      )}

      {hover && (
        <div className="mt-4 flex flex-col items-center space-y-4">
          <a
            href="https://www.facebook.com/leluxeclinic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-[#bb9929] bg-white font-semibold rounded-full text-5xl p-2 shadow-md transition-transform duration-300 transform hover:scale-125 hover:shadow-lg" />
          </a>
          <a
            href="https://www.instagram.com/leluxe_clinic?igsh=MTlzeTNncXJkMGUzaw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-[#bb9929] bg-white font-semibold rounded-full text-5xl p-2 shadow-md transition-transform duration-300 transform hover:scale-125 hover:shadow-lg" />
          </a>
          <a
            href="mailto:leluxeclinicph@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="text-[#bb9929] bg-white font-semibold rounded-full text-5xl p-2 shadow-md transition-transform duration-300 transform hover:scale-125 hover:shadow-lg" />
          </a>
        </div>
      )}
    </div>
  );
}

export default FloatingSocial;
