"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sendLink } from "./Action";

const ForgotPasswordComponent = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const initialValues = { email: "" };

    const onSubmit = async (
        values: typeof initialValues,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);
        setLoading(true);

        try {
            const response = await sendLink(values);

            if (!response.success) {
                throw new Error(response.message || "Failed to send reset link");
            }

            toast.success("Password reset link sent! Check your email.");
            resetForm();
            router.push("/auth/login");
        } catch (error: any) {
            console.error("Password Reset Error:", error.message);
            toast.error(error.message || "Error sending password reset link");
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <div className="w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-xl py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center font-bold uppercase">
                Forgot Password
            </div>

            <Card className="py-6 px-6 md:px-8" radius="none">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Email Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="email">
                                    Email
                                </label>
                                <Field as={Input} id="email" name="email" type="email" placeholder="Enter your email" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center col-span-2 mb-6">
                                <Button size="md" color="primary" className="w-full flex items-center justify-center gap-2" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending Reset Link
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* Already have an account? */}
                <div className="flex justify-center mt-2">
                    <p className="text-center text-gray-600 text-sm mr-2">Remembered your password?</p>
                    <Link href="/auth/login" className="text-sm text-blue-600 font-medium hover:text-blue-700 transition">
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPasswordComponent;
