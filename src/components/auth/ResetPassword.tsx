"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "./Action"; 
import jwt from "jsonwebtoken";

const ResetPasswordComponent = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwt.decode(token) as { email: string } | null;
                if (decoded?.email) {
                    console.log(decoded.email);
                    setEmail(decoded.email);
                } else {
                    throw new Error("Invalid token: email not found");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            console.error("Token is missing");
        }
    }, [token]);

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Please confirm your password"),
    });

    const initialValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const onSubmit = async (
        values: typeof initialValues,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setSubmitting(true);
        setLoading(true);

        try {
            const response = await resetPassword({ email: email!, newPassword: values.newPassword });

            if (!response.success) {
                throw new Error(response.message || "Failed to reset password");
            }

            toast.success("Your password has been successfully reset!");
            resetForm();
            router.push("/auth/login");
        } catch (error: any) {
            console.error("Password Reset Error:", error.message);
            toast.error(error.message || "Error resetting password");
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    return (
        <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="text-lg sm:text-xl py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center font-bold uppercase">
                Reset Password
            </div>

            <Card className="py-4 px-6" radius="none">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
                                    New Password
                                </label>
                                <Field
                                    as={Input}
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Enter your new password"
                                />
                                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <Field
                                    as={Input}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your new password"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="flex items-center justify-center col-span-2 mb-6">
                                <Button
                                    size="md"
                                    color="primary"
                                    fullWidth
                                    className="w-full py-3 text-sm sm:text-base"
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? "Resetting password..." : isSubmitting ? "Submitting..." : "Reset Password"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="flex flex-col sm:flex-row justify-center items-center mt-2">
                    <p className="text-center text-gray-600 text-sm mb-2 sm:mb-0 sm:mr-2">Remembered your password?</p>
                    <Link href="/auth/login" className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default ResetPasswordComponent;
