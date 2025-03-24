"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { login } from "./Action";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

interface LoginValues {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginValues,
    { resetForm, setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setSubmitting(true);
    try {
      const response = await login(values);

      if (!response.success || !response.user) {
        throw new Error(response.message || "Login failed.");
      }

      localStorage.setItem("userId", response.user.id);
      setCookie(null, "isLoggedIn", "true", { path: "/" });
      setCookie(null, "userRole", response.user.role, { path: "/" });

      toast.success("Login Successful!");

      if (response.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (response.user.role === "user") {
        router.replace("/authorized-user");
      }

      resetForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-xl py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center font-bold uppercase">
        Login Account
      </div>
      <Card className="py-6 px-6 md:px-8" radius="none">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="email">
                  Email
                </label>
                <Field as={Input} id="email" name="email" type="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="password">
                  Password
                </label>
                <Field as={Input} id="password" name="password" type="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>
              <div className="flex items-center justify-center col-span-2 mb-6">
                <Button size="md" color="primary" className="w-full flex items-center justify-center gap-2" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging In
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center mt-2 text-sm">
          <p className="text-gray-600 mr-1">Don't have an account?</p>
          <Link href="/auth/register" className="text-blue-600 font-medium hover:text-blue-700 transition">
            Register
          </Link>
        </div>
        <div className="flex justify-center mt-4 text-sm">
          <Link href="/auth/forgot-password" className="text-blue-600 font-medium hover:text-blue-700 transition">
            Forgot Password?
          </Link>
        </div>
      </Card>
    </div>
  );


};

export default LoginComponent;
