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
import { Service as Record } from "@/components/admin/services/Types";
import { update as validationSchema } from "@/components/admin/services/schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateService } from "@/components/admin/services/Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaPenToSquare } from "react-icons/fa6";
import { Category } from "../service_category/Types";
import { Types } from "../service_types/Types";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Input, Textarea } from "@heroui/input";
import Image from "next/image";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";

type Props = {
  record: Record;
  category: Category[];
  type: Types[] | null;
};

const UpdateModal = ({ record, category, type }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  const initialValues = {
    id: record.id,
    categoryId: record.categoryId,
    typeId: record.typeId,
    name: record.name,
    description: record.description,
    price: record.price,
    duration: record.duration,
    durationUnit: record.durationUnit,
    imageUrl: record.imageUrl,
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFieldValue("imageUrl", null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      console.log("Uploading file:", file.name);
      const response = await uploadFileToVercelBlob(file);
      console.log("Upload response:", response);

      if (response.error) throw new Error(response.error);

      setFieldValue("imageUrl", response.url);
      console.log("Image URL set in form:", response.url);
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
        console.warn("Image URL missing, waiting...");
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!values.imageUrl) {
          console.error("Image URL is still missing after delay!");
          setSubmitting(false);
          return;
        }
      }

      const formattedValues: Omit<Prisma.ServiceCreateInput, "category" | "type"> & {
        id: number;
        categoryId: number;
        typeId?: number;
      } = {
        id: Number(values.id),
        name: values.name,
        description: values.description,
        price: Number(values.price),
        duration: Number(values.duration),
        durationUnit: values.durationUnit,
        categoryId: Number(values.categoryId),
        imageUrl: String(values.imageUrl),
        ...(values.typeId != null ? { typeId: Number(values.typeId) } : {}),
      };

      console.log("Submitting request:", formattedValues);
      const response = await updateService(formattedValues);
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
                <ModalHeader>Edit Service</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-3">
                    <Field name="name">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input {...field} type="text" size="md" variant="bordered" label="Service Name" placeholder="Enter Service Name" />
                          {meta.touched && meta.error && <small className="text-red-500">{meta.error}</small>}
                        </div>
                      )}
                    </Field>

                    <Field name="price">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input {...field} type="number" size="md" variant="bordered" label="Price" placeholder="Enter Service Price" />
                          {meta.touched && meta.error && <small className="text-red-500">{meta.error}</small>}
                        </div>
                      )}
                    </Field>
                  </div>

                  <Field name="description">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Textarea {...field} type="text" size="md" variant="bordered" label="Description" placeholder="Enter Service Description" />
                        {meta.touched && meta.error && <small className="text-red-500">{meta.error}</small>}
                      </div>
                    )}
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field name="duration">
                      {({ field, meta }: FieldProps) => (
                        <div>
                          <Input
                            {...field}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Duration"
                            labelPlacement="outside"
                            placeholder="Enter Duration"
                            className="w-full"
                          />
                          {meta.touched && meta.error && (
                            <small className="text-red-500">{meta.error}</small>
                          )}
                        </div>
                      )}
                    </Field>

                    <Field name="durationUnit">
                      {({ field, form }: FieldProps) => (
                        <div>
                          <Select
                            selectedKeys={field.value ? [String(field.value)] : []}
                            size="md"
                            variant="bordered"
                            label="Duration Unit"
                            labelPlacement="outside"
                            placeholder="Select Duration Unit"
                            onChange={(event) => {
                              const selectedValue = event.target.value;
                              console.log("Selected Duration Unit:", selectedValue);
                              form.setFieldValue("durationUnit", selectedValue);
                            }}
                            className="w-full"
                          >
                            <SelectItem key="minutes">Minute/s</SelectItem>
                            <SelectItem key="hours">Hour/s</SelectItem>
                          </Select>
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">

                    <Field name="categoryId">
                      {({ field, form, meta }: FieldProps) => (
                        <div>
                          <Select
                            selectedKeys={field.value ? [String(field.value)] : []}
                            size="md"
                            variant="bordered"
                            label="Category"
                            labelPlacement="outside"
                            placeholder="Select Category"
                            onChange={(event) => {
                              const selectedValue = event.target.value;
                              console.log("Selected Category ID:", selectedValue);
                              form.setFieldValue("categoryId", Number(selectedValue));
                            }}
                          >
                            {category.map((cat) => (
                              <SelectItem key={String(cat.id)}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </Select>
                          {meta.touched && meta.error && <small className="text-red-500">{meta.error}</small>}
                        </div>
                      )}
                    </Field>

                    <Field name="typeId">
                      {({ field, form }: FieldProps) => (
                        <div>
                          <Select
                            selectedKeys={field.value ? [String(field.value)] : []}
                            size="md"
                            variant="bordered"
                            label="Type"
                            labelPlacement="outside"
                            placeholder="Select Type"
                            onChange={(event) => {
                              const selectedValue = event.target.value;
                              const value = selectedValue ? Number(selectedValue) : null;
                              form.setFieldValue("typeId", value);
                            }}
                          >
                            {type && type.length > 0 ? (
                              type.map((t) => (
                                <SelectItem key={t.id}>
                                  {t.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key="no-types">No types available</SelectItem>
                            )}
                          </Select>
                        </div>
                      )}
                    </Field>
                  </div>
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

export default UpdateModal;
