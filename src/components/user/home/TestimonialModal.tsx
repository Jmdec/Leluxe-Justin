"use client"
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { create as validationSchema } from "@/components/admin/testimonials/schema";
import { Formik, Form, Field, FieldProps } from "formik";
import { create as action } from "@/components/admin/testimonials/Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";
import Image from "next/image";


const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const initialValues = {
    name: "",
    message: "",
    imageUrl: "",
    status: "",
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return setFieldValue("imageUrl", null);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFileToVercelBlob(file);
      if (response.error) throw new Error(response.error);

      setFieldValue("imageUrl", response.url);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {

      if (!values.imageUrl) {
        console.error("Image URL is missing");
        setSubmitting(false);
        return;
      }

      const formattedValues: Prisma.TestimonialsCreateInput = {
        name: values.name,
        message: values.message,
        imageUrl: values.imageUrl,
        status: "Pending",
      };

      console.log("Submitting request:", formattedValues);
      const response = await action(formattedValues);

      if (response.code !== 200) {
        throw new Error(response.message || "Submission failed.");
      }

      console.log("Response:", response);
      onPostSubmit(response, { resetForm }, onClose);
      setPreviewImage(null)
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <div className="text-base sm:text-lg text-gray-600">
        Hear directly from those who’ve experienced our service.{" "}
        <div className="text-yellow-600 cursor-pointer font-semibold underline" role="button" onClick={onOpen}>
          Share Feedback
        </div>
      </div>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <ModalHeader>Share Your Insight</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field name="name">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input
                            {...field}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Enter Name"
                          />
                          {meta.touched && meta.error && (
                            <small className="text-red-500">{meta.error}</small>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="imageUrl">
                      {({ meta }: FieldProps) => (
                        <div>
                          <Input
                            type="file"
                            size="md"
                            variant="bordered"
                            label="Image"
                            labelPlacement="outside"
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                          />
                          {meta.touched && meta.error && (
                            <small className="text-red-500">{meta.error}</small>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name="message">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input
                            {...field}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Message"
                            labelPlacement="outside"
                            placeholder="Enter message"
                          />
                          {meta.touched && meta.error && (
                            <small className="text-red-500">{meta.error}</small>
                          )}
                        </div>
                      )}
                    </Field>
                    {previewImage && (
                      <Image
                        src={previewImage}
                        alt="Preview Image"
                        className="w-32 h-32 object-cover rounded-md mt-2"
                        height={100}
                        width={100}
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={isSubmitting}>
                    Save
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal >
    </>
  );
};

export default CreateModal;
