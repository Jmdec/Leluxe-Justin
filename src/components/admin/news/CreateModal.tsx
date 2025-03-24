"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { create as validationSchema } from "./schema";
import { create as action } from "./Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";
import Image from "next/image";

const CreateModal = () => {
  const [submitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    date: "",
    title: "",
    description: "",
    link: "",
    imageUrl: "",
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

      const formattedValues: Prisma.NewsCreateInput = {
        date: new Date(values.date),
        title: values.title,
        description: values.description,
        link: values.link,
        imageUrl: values.imageUrl,

      };

      const response = await action(formattedValues);
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
      <Button color="primary" onPress={onOpen}>
        Add News
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (<Form>
              <ModalHeader>Add News</ModalHeader>
              <ModalBody>
                <div className="space-y-3">
                  <Field name="title">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Title"
                          labelPlacement="outside"
                          placeholder="Enter News Title"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Textarea
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Description"
                          labelPlacement="outside"
                          className="mb-2"
                          placeholder="Enter News Description"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="link">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="url"
                          size="md"
                          variant="bordered"
                          label="Link"
                          labelPlacement="outside"
                          placeholder="Enter News Link"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Field name="date">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input
                            {...field}
                            type="date"
                            size="md"
                            variant="bordered"
                            label="Date"
                            labelPlacement="outside"
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
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
                  Save
                </Button>
                <Button color="danger" onClick={onClose}>
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

export default CreateModal;
