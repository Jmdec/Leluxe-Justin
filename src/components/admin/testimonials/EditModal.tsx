"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Testimonial as Record } from "@/components/admin/testimonials/Types";
import { update as validationSchema } from "@/components/admin/testimonials/schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { edit as updateData } from "@/components/admin/testimonials/Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";
import Image from "next/image";

type Props = {
  record: Record;
};

const EditModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(record.imageUrl);

  useEffect(() => {
    setPreviewImage(record.imageUrl);
  }, [record.imageUrl]);

  const initialValues = {
    id: record.id,
    name: record.name,
    message: record.message,
    imageUrl: record.imageUrl,
    status: record.status,
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
      const formattedValues: Prisma.TestimonialsCreateInput & { id: number } = {
        id: Number(values.id),
        name: values.name,
        message: values.message,
        imageUrl: values.imageUrl,
        status: values.status,
      };

      console.log("Submitting request:", formattedValues);
      const response = await updateData(formattedValues);
      console.log("Response:", response);

      onPostSubmit(response, { resetForm }, onClose);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button size="sm" color="primary" isIconOnly title="Edit" onPress={onOpen}>
        <FaPenToSquare size={14} />
      </Button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <ModalHeader>Add Testimonial Type</ModalHeader>
                <ModalBody>
                  <div >
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
                    <Field name="message">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Textarea
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
      </Modal>
    </>
  );
};

export default EditModal;
