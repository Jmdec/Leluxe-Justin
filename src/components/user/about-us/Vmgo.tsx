import React from "react";

function Vmgo() {
    return (
        <div className="bg-white">
            <section
                id="features"
                className="relative block px-6 py-10 md:py-20 md:px-10 bg-white"
            >
                <div className="relative mx-auto max-w-5xl text-center">
                    <h2 className="block w-full font-bold  font-manrope text-black text-3xl sm:text-4xl">
                        Our Mission, Vision & Goals
                    </h2>
                    <p className="mx-auto my-4 w-full max-w-xl text-center font-medium leading-relaxed tracking-wide text-gray-600">
                        At Le Luxe Clinic, we are dedicated to enhancing beauty and confidence
                        through luxurious, high-quality aesthetic treatments. Our goal is to provide
                        exceptional results with expertise and innovation.
                    </p>
                </div>

                <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                    {/* MISSION */}
                    <div className="rounded-md bg-yellow-50 p-8 text-center shadow-md transition duration-300 hover:bg-yellow-100 hover:shadow-lg">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-heart text-white"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 21l-8 -8a5 5 0 0 1 7 -7l1 1l1 -1a5 5 0 1 1 7 7l-8 8"></path>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-black font-semibold">Our Mission</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600">
                            To empower individuals by enhancing their natural beauty through
                            innovative treatments and personalized care, ensuring lasting confidence.
                        </p>
                    </div>

                    {/* VISION */}
                    <div className="rounded-md bg-yellow-50 p-8 text-center shadow-md transition duration-300 hover:bg-yellow-100 hover:shadow-lg">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-eye text-white"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <circle cx="12" cy="12" r="2"></circle>
                                <path d="M22 12c-2 -4.5 -5.5 -7 -10 -7s-8 2.5 -10 7c2 4.5 5.5 7 10 7s8 -2.5 10 -7"></path>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-black font-semibold">Our Vision</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600">
                            To be a globally recognized aesthetic clinic, setting new standards
                            in luxury beauty treatments with professionalism and innovation.
                        </p>
                    </div>

                    {/* GOALS */}
                    <div className="rounded-md bg-yellow-50 p-8 text-center shadow-md transition duration-300 hover:bg-yellow-100 hover:shadow-lg">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-target text-white"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="9"></circle>
                                <circle cx="12" cy="12" r="5"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                            </svg>
                        </div>
                        <h3 className="mt-6 text-black font-semibold">Our Goals</h3>
                        <ul className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-600 text-left list-disc list-inside">
                            <li>Offer state-of-the-art aesthetic services</li>
                            <li>Personalize treatments for each client</li>
                            <li>Stay at the forefront of beauty innovations</li>
                        </ul>   
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Vmgo;
