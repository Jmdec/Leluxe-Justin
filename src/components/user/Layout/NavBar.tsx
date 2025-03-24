"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAll } from "@/components/admin/services/Action";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Notification from "../notification/notification";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

type Service = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  category: Category;
};

function NavBar() {
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  useEffect(() => {
    // Fetch services if the user is logged in
    const fetchServices = async () => {
      const response = await getAll();
      if (response.code === 200) {
        const validServices = response.records.filter(
          (service) => service.categoryId !== undefined
        ) as Service[];
        setServices(validServices);
      } else {
        console.error("Error fetching services:", response.message);
      }
    };
    fetchServices();
  }, []);

  const toggleSidebar = () => setNavbarOpen(!navbarOpen);
  const closeSidebar = () => setNavbarOpen(false);

  const handleCategoryClick = (categoryName: string) => {
    setIsDropdownOpen(false);
    window.location.hash = `#${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/user/appointment-form");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-2">
        <a href="/" className="flex items-center space-x-3">
          <Image src="/images/logonav.png" alt="Le Luxe Logo" width={200} height={60} />
        </a>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-8">
          {[
            { name: "Home", link: "/" },
            { name: "About Us", link: "/user/about-us" },
            { name: "Blogs", link: "/user/blogs" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={() => setActiveLink(item.link)}
              className={`text-gray-800 text-lg font-semibold hover:text-yellow-600 transition-all ${
                activeLink === item.link ? "border-b-2 border-yellow-600" : ""
              }`}
            >
              {item.name}
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`text-gray-800 text-lg font-semibold hover:text-yellow-600 transition-all ${
                activeLink.startsWith("/user/service-offer")
                  ? "border-b-2 border-yellow-600"
                  : ""
              }`}
            >
              Services
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                <a
                  href="/user/service-offer"
                  onClick={() => handleCategoryClick("All Services")}
                  className="block px-4 py-2 text-gray-700 hover:bg-yellow-100"
                >
                  All Services
                </a>
                {services
                  .filter(
                    (value, index, self) =>
                      index === self.findIndex((t) => t.category.name === value.category.name)
                  )
                  .map((service) => (
                    <a
                      key={service.id}
                      href={`/user/service-offer#${service.category.name}`}
                      onClick={() => handleCategoryClick(service.category.name)}
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-100"
                    >
                      {service.category.name}
                    </a>
                  ))}
              </div>
            )}
          </div>

          <a
            href="/user/contact-us"
            onClick={() => setActiveLink("/user/contact-us")}
            className={`text-gray-800 text-lg font-semibold hover:text-yellow-600 transition-all ${
              activeLink === "/user/contact-us" ? "border-b-2 border-yellow-600" : ""
            }`}
          >
            Contact Us
          </a>

          <a
            href="/user/appointment-form"
            onClick={handleClick}
            className="px-6 py-2 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg hover:scale-105 transition"
          >
            Book a Consultation
          </a>
          <Notification />
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-3 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Sidebar for Mobile View */}
        <div
          className={`w-64 min-h-screen h-screen bg-gradient-to-b from-white to-white
            flex flex-col overflow-y-auto fixed top-0 left-0 z-40
            transition-transform transform
            lg:relative lg:z-auto lg:h-auto ${navbarOpen ? "block" : "hidden"} md:hidden`}
        >
          <div className="flex items-center justify-center mt-10 mb-3">
            <div className="flex flex-col items-center text-center font-thin ">
              <Image
                src="/images/logonav.png"
                alt="Admin Panel Logo"
                width={200}
                height={200}
                className="mb-2"
              />
            </div>
            <button onClick={closeSidebar} className="absolute top-4 right-4 text-black">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-6">
            {[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/user/about-us" },
              { name: "Blogs", link: "/user/blogs" },
              { name: "Contact Us", link: "/user/contact-us" },
              { name: "Services", link: "/user/service-offer" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={() => setActiveLink(item.link)}
                className={`text-lg py-2 px-4 rounded-md transition-all ${
                  activeLink === item.link ? "bg-yellow-500 text-white" : "text-gray-700"
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/user/appointment-form"
              onClick={handleClick}
              className={`text-lg py-2 px-4 rounded-md transition-all ${
                activeLink === "/user/appointment-form"
                  ? "bg-yellow-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
