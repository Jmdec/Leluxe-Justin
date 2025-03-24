"use client"
import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    data: any | null;  
    onDelete: () => void;  
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, data, onDelete }) => {
    
    if (!isOpen || !data) return null;

    const renderBody = () => {
        if (data.deleteWarning) {
            return (
                <div>
                    <p>Are you sure you want to delete this appointment?</p>
                </div>
            );
        }
        return Object.entries(data).map(([key, value]) => (
            <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
            </p>
        ));
    };

    return (
        <Modal isDismissable={true} isKeyboardDismissDisabled={true} isOpen={isOpen}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{data.deleteWarning ? "Delete Confirmation" : "Details"}</ModalHeader>
                <ModalBody>
                    {renderBody()}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    {data.deleteWarning ? (
                        <>
                            <Button color="danger" onPress={onDelete}>
                                Delete
                            </Button>
                        </>
                    ):(
                        <Button color="primary" onPress={onClose}>
                            Close
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
