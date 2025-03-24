"use client";

import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { update } from "./Action";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import toast from "react-hot-toast";

type Props = {
    record: { id: number; status: string };
    action: "accept" | "decline";
};

const UpdateModal = ({ record, action }: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const initialValues = {
        id: record.id,
        status: record.status,
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number().required("ID is required"),
        status: Yup.string().required("Status is required"),
    });

    const onSubmit = async (
        values: { id: number; status: string },
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const newStatus = action === "accept" ? "Accepted" : "Declined";

            const formattedValues = {
                id: Number(values.id),
                status: newStatus,
            };

            const response = await update(formattedValues);
            if (newStatus === "Accepted") {
                toast.success("Testimonial has been accepted!");
            } else {
                toast.success("Testimonial has been declined.");
            }
            resetForm();
            onClose();
        } catch (error) {
            console.error("Error updating appointment:", error);
            toast.error("An error occurred while updating the appointment.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {action === "accept" ? (
                <Button size="sm" color="success" isIconOnly title="Accept" onPress={onOpen}>
                    <FaCheckCircle size={14} className="text-white"/>
                </Button>
            ) : (
                <Button size="sm" color="danger" isIconOnly title="Decline" onPress={onOpen}>
                    <FaWindowClose size={14} />
                </Button>
            )}

            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting }: FormikProps<{ id: number; status: string }>) => (
                            <Form>
                                <ModalHeader>{action === "accept" ? "Accept Appointment" : "Decline Appointment"}</ModalHeader>
                                <ModalBody>
                                    <p>
                                        {action === "accept"
                                            ? "Are you sure you want to accept this appointment?"
                                            : "Are you sure you want to decline this appointment?"}
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color={action === "accept" ? "primary" : "warning"} type="submit" isLoading={isSubmitting}>
                                        {action === "accept" ? "Accept" : "Decline"}
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
