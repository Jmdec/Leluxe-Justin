"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { create } from "./Action";
import toast from "react-hot-toast";

const Register = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .matches(/[A-Z]/, "Must include at least 1 uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must include at least 1 symbol")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    fullname: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(values.password, 10);

      const formattedValues: Omit<Prisma.UserCreateInput, "id"> = {
        fullname: values.fullname,
        email: values.email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
      };

      const response = await create(formattedValues);

      if (response.code !== 200) {
        throw new Error(response.message || "Registration failed.");
      }

      toast.success("Registration Successful!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-11/12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-xl py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center font-bold uppercase">
        Register an Account
      </div>

      <Card className="py-6 px-6 md:px-8" radius="none">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="fullname">
                  Full Name
                </label>
                <Field as={Input} id="fullname" name="fullname" type="text" placeholder="Enter your full name" />
                <ErrorMessage name="fullname" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="email">
                  Email
                </label>
                <Field as={Input} id="email" name="email" type="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="phone">
                  Phone Number
                </label>
                <Field as={Input} id="phone" name="phone" type="tel" placeholder="Enter your phone number" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="password">
                  Password
                </label>
                <Field as={Input} id="password" name="password" type="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Password Confirmation */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="password_confirmation">
                  Confirm Password
                </label>
                <Field
                  as={Input}
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="password_confirmation" component="div" className="text-red-500 text-xs" />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center col-span-2 mb-6">
                <Button size="md" color="primary" className="w-full flex items-center justify-center gap-2" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Already have an account */}
        <p className="text-center text-gray-600 text-sm">Already have an account?</p>

        {/* Login Link */}
        <div className="flex justify-center mt-2">
          <Link href="/auth/login" className="text-sm text-blue-600 font-medium hover:text-blue-700 transition">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
