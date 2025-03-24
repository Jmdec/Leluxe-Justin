import React from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import Image from "next/image";

interface PreviewModalProps {
    isOpen: boolean;
    imageUrl: string;
    onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, imageUrl, onClose }) => {

    if (!isOpen) return null;

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <Image
                                    src={imageUrl}
                                    alt="Image Preview"
                                    width={500}
                                    height={500}
                                    className="object-contain"
                                />
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PreviewModal;
