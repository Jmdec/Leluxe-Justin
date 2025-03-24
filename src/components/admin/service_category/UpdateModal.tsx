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
import { Category as Record } from "@/components/admin/service_category/Types";
import { update as validationSchema } from "@/components/admin/service_category/schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateData } from "@/components/admin/service_category/Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type Props = {
  record: Record;
}

const UpdateModal = ({record} : Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: record.id,
    name: record.name,
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const formattedValues: Prisma.CategoryCreateInput & {
        id: number;
      } = {
        id: Number(values.id),
        name: values.name,
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

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, setFieldValue }: FormikProps<typeof initialValues>) => (
              <Form>
                <ModalHeader>Edit Category</ModalHeader>
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
