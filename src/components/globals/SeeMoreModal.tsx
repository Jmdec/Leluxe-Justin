import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";

type Props = {
  title: string;
  content: string;
};

const SeeMoreModal: React.FC<Props> = ({ title, content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span className="text-blue-500 cursor-pointer" onClick={onOpen}>
        See more
      </span>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" className="w-full max-w-[90%] sm:max-w-[600px]">
        <ModalContent>
          <ModalHeader className="text-wrap break-words">{title}</ModalHeader>
          <ModalBody>
            <p className="text-gray-700 break-words text-wrap">{content}</p>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default SeeMoreModal;
