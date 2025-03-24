"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  { id: 1, title: "Gluta IV Drip", description: "Advanced skincare treatments", Image: "/images/treatment/glutadrip.png" },
  { id: 2, title: "Underarm Diode Laser", description: "Precision laser treatments", Image: "/images/treatment/diodlaser.png" },
  { id: 3, title: "Carbon Laser", description: "Non-invasive sculpting", Image: "/images/treatment/carbonlaser.png" },
  { id: 4, title: "Manicure", description: "Revitalize & refresh", Image: "/images/treatment/manicure.png" },
];

function TopServices() {
  const router = useRouter();

  return (
    <div className="w-full py-10 bg-white text-center">
      <h2 className="text-3xl font-bold text-[#D4AF37]">Top Services</h2>
      <p className="text-gray-600 text-lg mt-2 mb-6">
        Experience luxury and excellence with our premium treatments.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 md:px-10">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => router.push("/user/service-offer")}
            className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-white shadow-lg 
                       transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl 
                       cursor-pointer"
          >
            <Image
              src={service.Image}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900 via-yellow-800/40 transition-opacity duration-500 hover:bg-opacity-80"></div>
            <div className="relative z-10 px-8 pb-8 pt-40">
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="text-sm leading-6 text-gray-300">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopServices;
