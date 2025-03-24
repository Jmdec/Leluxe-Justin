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
import { create as validationSchema } from "./schema";
import { Formik, Form, Field, FieldProps } from "formik";
import { create as action } from "./Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";


const CreateModal = () => {
  const [submitting, setSubmitting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const initialValues = {
    question: "",
    answer: "",
  };

  const onSubmit = async (
    values: Prisma.FaqsCreateInput,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    action(values).then((response) => {
      setSubmitting(false);
      onPostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add FAQs
      </Button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <ModalHeader>Add FAQs</ModalHeader>
                <ModalBody>
                  <Field name="question">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Type question"
                          labelPlacement="outside"
                          placeholder="Enter Type question"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="answer">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Textarea
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Answer"
                          labelPlacement="outside"
                          placeholder="Enter Answer"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={submitting}>
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
