import React from 'react';
import Image from 'next/image';

function Introduction() {
    return (
        <div>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
                        <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                                <Image
                                    className="rounded-xl object-cover w-full max-w-xs sm:max-w-sm lg:max-w-md"
                                    src="/images/aboutus/aboutus1.png"
                                    width={300}
                                    height={200}
                                    alt="About Us image"
                                />
                            </div>
                            <Image
                                className="sm:ml-0 ml-auto rounded-xl object-cover w-full max-w-xs sm:max-w-sm lg:max-w-md"
                                src="/images/aboutus/aboutus.png"
                                width={300}
                                height={200}
                                alt="About Us image"
                            />
                        </div>
                        <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-center items-start gap-8 flex">
                                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                    <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal lg:text-start text-center">
                                        Elevating Beauty, Enhancing Confidence
                                    </h2>
                                    <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-justify">
                                        At Le Luxe Clinic, we blend expertise with innovation to offer premium beauty and wellness treatments.
                                        From advanced laser therapies to skin rejuvenation, slimming, and eyelash extensions, we provide
                                        personalized care that enhances your natural beauty. Experience luxury with results you can see and feel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Introduction;
