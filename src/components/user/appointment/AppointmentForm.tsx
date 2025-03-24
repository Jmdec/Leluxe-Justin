"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAll } from "@/components/admin/services/Action";
import { Service } from "@/components/admin/services/Types";
import { create } from "./Action";
import { Prisma } from "@prisma/client";
import { toast } from "react-hot-toast";
import { Button } from "@heroui/button";

const AppointmentForm = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    serviceId: Yup.number()
      .required("Please select a service")
      .oneOf(
        filteredServices.map((service) => service.id),
        "Service is required"
      ),
    message: Yup.string(),
  });

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAll();
      if (response.code === 200) {
        setServices(response.records);
      } else {
        console.error("Error fetching services:", response.message);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredServices(
        services.filter(
          (service) => service.categoryId === Number(selectedCategory)
        )
      );
    } else {
      setFilteredServices([]);
    }
  }, [selectedCategory, services]);

  const initialValues = {
    userId: "",
    fullname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    serviceId: 0,
    message: "",
  };

  const onSubmit = async (
    values: typeof initialValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {
      const formatTime = (time: string): string => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}:00`;
      };

      function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      const formattedDate = formatDate(new Date(values.date));
      const formattedTime = formatTime(values.time);

      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const formattedValues: Omit<Prisma.AppointmentCreateInput, "service"> & {
        serviceId: number;
        userId: string;
      } = {
        fullname: values.fullname,
        serviceId: Number(values.serviceId),
        email: values.email,
        phonenumber: values.phone,
        date: formattedDate,
        time: formattedTime,
        message: values.message || "",
        status: "Pending",
        userId,
        user: {
          connect: { id: userId },
        },
      };

      console.log("Formatted Values to Submit:", formattedValues);
      const response = await create(formattedValues);

      if (response.code === 200) {
        toast.success(response.message);
        resetForm();
        window.location.href = "/authorized-user/appointment";
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center font-bold uppercase">
        Book an Appointment
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="py-4 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="fullname"
              >
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your Fullname"
              />
              <ErrorMessage
                name="fullname"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                type="date"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="time"
              >
                Time
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                name="time"
                type="time"
                value={values.time || ""}
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="serviceCategory"
              >
                Service Category
              </label>
              <Field
                as="select"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                id="serviceCategory"
                name="serviceCategory"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCategory(e.target.value)
                }
              >
                <option value="">Select a service category</option>
                {services
                  .filter(
                    (value, index, self) =>
                      index ===
                      self.findIndex(
                        (t) => t.category?.name === value.category?.name
                      )
                  )
                  .map((service) => (
                    <option
                      key={service.category?.id}
                      value={service.category?.id}
                    >
                      {service.category?.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="serviceCategory"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {selectedCategory && filteredServices.length > 0 && (
              <div className="mb-4 col-span-2">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="service"
                >
                  Service Name - Price
                </label>
                <div role="group" aria-labelledby="service">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="flex items-center mb-2">
                      <Field
                        type="radio"
                        name="serviceId"
                        value={service.id}
                        id={`service-${service.id}`}
                        className="mr-2"
                        checked={values.serviceId === service.id}
                        onChange={() => setFieldValue("serviceId", service.id)}
                      />
                      <label
                        htmlFor={`service-${service.id}`}
                        className="text-gray-700"
                      >
                        {service.name} -{" "}
                        {new Intl.NumberFormat("en-PH", {
                          style: "currency",
                          currency: "PHP",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(service.price)}
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="serviceId"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}

            <div className="mb-4 col-span-2">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <Field
                as="textarea"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                rows={4}
                placeholder="Enter any additional information"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex items-center justify-center mb-4 col-span-2">
              <Button
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                type="submit"
                isLoading={isSubmitting}
              >
                Book Appointment
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
