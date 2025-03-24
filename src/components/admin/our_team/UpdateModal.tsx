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
import { OurTeam as Record } from "@/components/admin/our_team/Types";
import { update as validationSchema } from "@/components/admin/our_team/schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateData } from "@/components/admin/our_team/Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";
import Image from "next/image";

type Props = {
  record: Record;
}
const UpdateModal = ({ record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const initialValues = {
    id: record.id,
    name: record.name,
    position: record.position,
    imageUrl: record.imageUrl,
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return setFieldValue("imageUrl", null);

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    
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
    try {
      if (!values.imageUrl) {
        console.error("Image URL is missing.");
        return;
      }

      const formattedValues: Prisma.OurTeamCreateInput & {
        id: number;
      } = {
        id: Number(values.id),
        name: values.name,
        position: values.position,
        imageUrl: values.imageUrl,
      };

      const response = await updateData(formattedValues);
      onPostSubmit(response, { resetForm }, onClose);
      setPreviewImage(null);

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

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, setFieldValue }: FormikProps<typeof initialValues>) => (
              <Form>
                <ModalHeader>Edit Service</ModalHeader>
                <ModalBody>
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
                  <Field name="position">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Position"
                          labelPlacement="outside"
                          placeholder="Enter position"
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

export default UpdateModal;

