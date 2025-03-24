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
import { create as validationSchema } from "./schema";
import { Formik, Form, Field, FieldProps } from "formik";
import { create as action, uploadVideo as upload } from "./Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { uploadFileToVercelBlob } from "@/components/globals/uploads";
import toast from "react-hot-toast";

const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const initialValues = {
    title: "",
    videoPath: "",
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Selected File:", file.name, "Size:", file.size, "Type:", file.type);

    if (file.size > 1048576) {
      toast.error("Error: File size exceeds 1 MB. Please upload a smaller video.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewVideo(objectUrl);

    try {
      const response = await uploadFileToVercelBlob(file);

      console.log("Upload Response:", response);

      if (response.error) {
        console.error("Error during file upload:", response.error);
        throw new Error(response.error);
      }

      if (!response.url) {
        console.error("Upload function returned null URL");
        throw new Error("Upload failed - No URL received");
      }

      console.log("Setting videoPath:", response.url);
      setFieldValue("videoPath", response.url);
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Video upload failed. Please try again.");
    }
  };

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {
      if (!values.videoPath) {
        console.error("Video URL is missing");
        setSubmitting(false);
        return;
      }

      const formattedValues: Prisma.VideosCreateInput = {
        title: values.title,
        videoPath: values.videoPath,
      };
      const response = await action(formattedValues);
      if (response.code !== 200) {
        throw new Error(response.message || "Submission failed.");
      }
      onPostSubmit(response, { resetForm }, onClose);
      setPreviewVideo(null)
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Video
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
                <ModalHeader>Add Video</ModalHeader>
                <ModalBody>
                  <Field name="title">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Type title"
                          labelPlacement="outside"
                          placeholder="Enter title"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="videoPath">
                    {({ meta }: FieldProps) => (
                      <div>
                        <Input
                          type="file"
                          size="md"
                          variant="bordered"
                          label="Video"
                          labelPlacement="outside"
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>

                  {previewVideo ? (
                    <video
                      controls
                      className="rounded-md object-cover"
                      height={200}
                      width={150}
                    >
                      <source src={previewVideo ?? ""} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}

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

export default CreateModal;
