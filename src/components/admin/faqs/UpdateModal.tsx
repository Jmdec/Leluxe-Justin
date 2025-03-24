"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { FAQs as Record } from "./Types";
import { update as validationSchema } from "./schema";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateData } from "./Action";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

type Props = {
  record: Record;
}

const UpdateModal = ({record} : Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: record.id,
    question: record.question,
    answer: record.answer,
  };

  console.log("Initial Values", initialValues)
  const onSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const formattedValues: Prisma.FaqsCreateInput & {
        id: number;
      } = {
        id: Number(values.id),
        question: values.question,
        answer: values.answer,
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
                  <Field name="question">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          size="md"
                          variant="bordered"
                          label="Question"
                          labelPlacement="outside"
                          placeholder="Enter Question"
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
