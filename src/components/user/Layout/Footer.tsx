import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';


function Footer() {
    return (


        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://www.facebook.com/leluxeclinic" className="flex items-center">
                            <img src="/images/Logo.png" className="h-40 me-3" alt="Le Luxe" width={180} height={200} />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Quick Links</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li>
                                    <a href="/user/about-us" className="hover:underline">About Us</a>
                                </li>
                                <li>
                                    <a href="/user/blogs" className="hover:underline">News and Blogs</a>
                                </li>
                                <li>
                                    <a href="/user/service-offer" className="hover:underline">Services</a>
                                </li>
                                <li>
                                    <a href="/user/contact-us" className="hover:underline">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://www.facebook.com/leluxeclinic"
                                        target="_blank" className="hover:underline ">Facebook</a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/leluxe_clinic?igsh=MTlzeTNncXJkMGUzaw=="
                                        target="_blank" className="hover:underline">Instagram</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/user/privacy-policy" target="_blank" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/user/terms-and-conditions" target="_blank" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://www.facebook.com/profile.php?id=100080647808810" className="hover:underline">Infinitech Advertising Corporation</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Phone */}
                        <a href="tel:+639175480999" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaPhoneAlt className="w-5 h-5" />
                            <span className="sr-only">Phone</span>
                        </a>

                        {/* Email */}
                        <a href="mailto:leluxeclinicph@gmail.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaEnvelope className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/leluxeclinic" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaFacebook className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/leluxe_clinic?igsh=MTlzeTNncXJkMGUzaw==" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaInstagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
