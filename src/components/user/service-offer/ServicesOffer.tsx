'use client';

import React, { useState, useEffect } from 'react';
import { getAll } from '@/components/admin/services/Action';
import { LuSearch } from "react-icons/lu";

type Category = {
  id: number;
  name: string;
};

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: string;
  imageUrl: string;
  categoryId: number;
  category: Category;
};

export default function ServicesOffer() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAll();
      if (response.code === 200) {
        const validServices = response.records.filter(service => service.categoryId !== undefined) as Service[];
        setServices(validServices);
        setFilteredServices(validServices);
      } else {
        console.error('Error fetching services:', response.message);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const filterServicesByCategory = () => {
      const categoryFromURL = decodeURIComponent(window.location.hash.replace('#', ''));
      setSelectedCategory(categoryFromURL);
      if (categoryFromURL && categoryFromURL !== 'All Services') {
        setFilteredServices(services.filter(service => service.category.name === categoryFromURL));
      } else {
        setFilteredServices(services);
      }
    };

    filterServicesByCategory();
    window.addEventListener('hashchange', filterServicesByCategory);
    return () => window.removeEventListener('hashchange', filterServicesByCategory);
  }, [services]);

  const handleCategoryClick = (categoryName: string) => {
    window.location.hash = categoryName;
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="mx-auto max-w-7xl py-24 px-4 mt-1">
        {/* Hero UI Tab */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <a
            href="#All Services"
            onClick={() => handleCategoryClick('All Services')}
            className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-bold transition-all ${selectedCategory === 'All Services' || !selectedCategory ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'}`}
          >
            All Services
          </a>
          {services
            .filter((value, index, self) => index === self.findIndex(t => t.category.name === value.category.name))
            .map((service) => (
              <a
                key={service.category.id}
                href={`#${service.category.name}`}
                onClick={() => handleCategoryClick(service.category.name)}
                className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-bold transition-all ${selectedCategory === service.category.name ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'}`}
              >
                {service.category.name}
              </a>
            ))}
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-1/2">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Service List */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5 animate-fadeIn">
          {filteredServices
            .filter(service =>
              service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              service.price.toString().includes(searchQuery) ||
              service.duration.toString().includes(searchQuery)
            )
            .map((service) => (
              <div
                key={service.id}
                className="divide-y bg-white divide-gray-200 rounded-lg border shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-50 hover:shadow-2xl hover:border-yellow-600 hover:ring-2 hover:ring-yellow-400"
              >
                <div className="p-4 sm:p-6">
                  {service.imageUrl && (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-28 sm:h-32 object-cover rounded-t-lg"
                    />
                  )}
                  <h2 className="text-sm sm:text-lg font-bold leading-6 text-yellow-600 mt-2">{service.name}</h2>
                  <p className="mb-1 text-xs sm:text-sm font-thin italic text-gray-800">{service.description}</p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    <span className="font-bold">Duration: </span>
                    {service.duration} {service.durationUnit}
                  </p>
                  <p className="my-1 sm:my-2 text-xl sm:text-4xl font-bold tracking-tight text-gray-900 drop-shadow-md">
                    ₱ <span>{service.price}</span>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
