import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { update } from "./Action";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import toast from "react-hot-toast";

type Props = {
    record: { id: number; status: string };
    action: "approve" | "decline" | "reschedule";
};

const UpdateModal = ({ record, action }: Props) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [declineReason, setDeclineReason] = useState("");
    const [rescheduledDate, setRescheduledDate] = useState("");

    const initialValues = {
        id: record.id,
        status: record.status,
        rescheduledDate: rescheduledDate,
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number().required("ID is required"),
        status: Yup.string().required("Status is required"),
        rescheduledDate: action === "reschedule" ? Yup.date().required("Rescheduled date is required") : Yup.date().nullable(),
    });

    const onSubmit = async (
        values: { id: number; status: string; rescheduledDate: string },
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const newStatus = action === "approve" ? "Accepted" : action === "decline" ? "Declined" : "Rescheduled";

            const formattedValues = {
                id: Number(values.id),
                status: newStatus,
                declineReason: action === "decline" ? declineReason : undefined,
                rescheduledDate: action === "reschedule" ? new Date(rescheduledDate) : undefined,
            };

            const response = await update(formattedValues);
            if (newStatus === "Accepted") {
                toast.success("Appointment has been approved!");
            } else if (newStatus === "Declined") {
                toast.success("Appointment has been declined.");
            } else if (newStatus === "Rescheduled") {
                toast.success("Appointment has been rescheduled.");
            }
            resetForm();
            setDeclineReason("");
            setRescheduledDate(""); 
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
            {action === "approve" ? (
                <Button size="sm" color="primary" isIconOnly title="Approve" onPress={onOpen}>
                    <FaCheckCircle size={14} />
                </Button>
            ) : action === "decline" ? (
                <Button size="sm" color="danger" isIconOnly title="Decline" onPress={onOpen}>
                    <FaWindowClose size={14} />
                </Button>
            ) : (
                <Button size="sm" color="secondary" isIconOnly title="Reschedule" onPress={onOpen}>
                   <RiCalendarScheduleFill size={14} />
                </Button>
            )}

            <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting }: FormikProps<{ id: number; status: string; rescheduledDate: string }>) => (
                            <Form>
                                <ModalHeader>{action === "approve" ? "Approve Appointment" : action === "decline" ? "Decline Appointment" : "Reschedule Appointment"}</ModalHeader>
                                <ModalBody>
                                    <p>
                                        {action === "approve"
                                            ? "Are you sure you want to approve this appointment?"
                                            : action === "decline"
                                                ? "Are you sure you want to decline this appointment?"
                                                : "Please enter the new date to reschedule the appointment:"}
                                    </p>
                                    {action === "decline" && (
                                        <Field
                                            as="textarea"
                                            name="declineReason"
                                            placeholder="Enter decline reason"
                                            value={declineReason}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDeclineReason(e.target.value)}
                                            className="w-full border rounded p-2 mt-2"
                                        />
                                    )}
                                    {action === "reschedule" && (
                                        <Field
                                            as="input"
                                            name="rescheduledDate"
                                            type="date"
                                            value={rescheduledDate}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRescheduledDate(e.target.value)}
                                            className="w-full border rounded p-2 mt-2"
                                        />
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color={action === "approve" ? "primary" : action === "decline" ? "warning" : "secondary"} type="submit" isLoading={isSubmitting}>
                                        {action === "approve" ? "Approve" : action === "decline" ? "Decline" : "Reschedule"}
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
