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
import { ActionResponse } from "@/components/globals/types";
import { destroy as validationSchema } from "@/components/globals/schema";
import { Formik, Form, Field, FieldProps } from "formik";
import { onPostSubmit } from "@/components/globals/Utils";
import { FaTrash } from "react-icons/fa6";
import { Destroy } from "@/components/globals/types";
import { Button } from "@heroui/button";

type Props = {
  title: string;
  action: (values: Destroy) => Promise<ActionResponse>;
  id: string;
};

const DestroyModal = ({ title, action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const [opening, setOpening] = useState(false);

  const initialValues = {
    id: id,
  };

  const onSubmit = async (
    values: Destroy,
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
      <Button
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Delete"
        onPress={onOpen}
        isLoading={opening}
      >
        <FaTrash />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Delete {title}</ModalHeader>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={submitting}
                      >
                        Delete
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DestroyModal;