"use client";

import {
    useDisclosure,
} from "@heroui/modal";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { create as action } from "@/components/admin/inquiry/Action";
import { create as validationSchema } from "@/components/admin/inquiry/schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { Button } from "@heroui/button";



const ContactForm = () => {
    const { onClose } = useDisclosure();

    const initialValues = {
        fullname: "",
        email: "",
        phonenumber: "",
        message: "",
        reply: "",
    };

    const onSubmit = async (
        values: typeof initialValues,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);
        try {
            const formattedValues: Prisma.InquiryCreateInput = {
                fullname: values.fullname,
                email: values.email,
                phonenumber: values.phonenumber,
                message: values.message,
                reply: values.reply || null,
            };
            console.log("Submitting request:", formattedValues);
            const response = await action(formattedValues);
            console.log("Response:", response);

            onPostSubmit(response, { resetForm }, onClose);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <section className="bg-white dark:bg-gray-600" id="contact">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                        <div className="h-full pr-6">
                            <h2 className="mb-4 text-2xl font-bold font-manrope dark:text-white">Ready to Get Started?</h2>
                            <p className="mt-3 mb-12 text-lg text-gray-600 font-normal dark:text-slate-400">
                                Experience the best in beauty treatments at Le Luxe Clinic. From whitening drips to slimming and skin tightening, we provide top-tier services for all your beauty needs. Indulge in luxury and look your absolute best!
                            </p>
                            <ul className="mb-6 md:mb-0">
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-600 text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address</h3>
                                        <p className="text-gray-600 dark:text-slate-400">204 RVGS Bldg. Gloria Diaz St. BF Resort</p>
                                        <p className="text-gray-600 dark:text-slate-400">Las Piñas, Philippines</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-600 text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                            <path d="M15 7a2 2 0 0 1 2 2"></path>
                                            <path d="M15 3a6 6 0 0 1 6 6"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact</h3>
                                        <p className="text-gray-600 dark:text-slate-400">
                                            <a href="tel:+63284700664" className="hover:underline">(02) 8470 0664</a>
                                        </p>
                                        <p className="text-gray-600 dark:text-slate-400">
                                            <a href="tel:+639175480999" className="hover:underline">0917 548 0999</a>
                                        </p>
                                        <p className="text-gray-600 dark:text-slate-400">
                                            <a href="mailto:leluxeclinicph@gmail.com" className="hover:underline">leluxeclinicph@gmail.com</a>
                                        </p>
                                    </div>

                                </li>
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-600 text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                            <path d="M12 7v5l3 3"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working Hours</h3>
                                        <p className="text-gray-600 dark:text-slate-400">Monday - Sunday: 11:00 AM - 9:00 PM</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ isSubmitting }: FormikProps<typeof initialValues>) => (
                                    <Form>
                                        <div className="mb-6">
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <Field name="fullname">
                                                    {({ field, meta }: FieldProps) => (
                                                        <div>
                                                            <label htmlFor="fullname" className="pb-1 text-xs uppercase tracking-wider">Full Name</label>
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                id="fullname"
                                                                placeholder="Your name"
                                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                            />
                                                            {meta.touched && meta.error && (
                                                                <small className="text-red-500">{meta.error}</small>
                                                            )}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <Field name="email">
                                                    {({ field, meta }: FieldProps) => (
                                                        <div>
                                                            <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider">Email</label>
                                                            <input
                                                                {...field}
                                                                type="email"
                                                                id="email"
                                                                placeholder="Your email address"
                                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                            />
                                                            {meta.touched && meta.error && (
                                                                <small className="text-red-500">{meta.error}</small>
                                                            )}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <Field name="phonenumber">
                                                    {({ field, meta }: FieldProps) => (
                                                        <div>
                                                            <label htmlFor="phonenumber" className="pb-1 text-xs uppercase tracking-wider">Phone Number</label>
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                id="phonenumber"
                                                                placeholder="Your phone number"
                                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                            />
                                                            {meta.touched && meta.error && (
                                                                <small className="text-red-500">{meta.error}</small>
                                                            )}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <Field name="message">
                                                    {({ field, meta }: FieldProps) => (
                                                        <div>
                                                            <label htmlFor="message" className="pb-1 text-xs uppercase tracking-wider">Message</label>
                                                            <textarea
                                                                {...field}
                                                                id="message"
                                                                placeholder="Write your message..."
                                                                className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                                                            />
                                                            {meta.touched && meta.error && (
                                                                <small className="text-red-500">{meta.error}</small>
                                                            )}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Button
                                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                                                type="submit"
                                                isLoading={isSubmitting}
                                            >
                                                Submit Inquiry
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add map below the contact form */}
            <div className="mt-2 mb-28 ">
                <div className="w-full h-80">
                    <h2 className="mb-4 text-2xl font-bold font-manrope dark:text-white text-center">Find Us Here!</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.740263431642!2d120.98554569999999!3d14.442126600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d3a0a778f495%3A0x5aac03a5b0f60209!2sRVGS%20BUILDING!5e0!3m2!1sen!2sph!4v1739331127275!5m2!1sen!2sph"
                        allowFullScreen={true}
                        loading="lazy"
                        tabIndex={0}
                        style={{ width: '90%', height: '100%' }}
                        className="mx-auto"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
