"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { sendReply } from "./Action"; 

interface ReplyModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReplyModal: React.FC<ReplyModalProps> = ({ id, isOpen, onClose }) => {
  const [reply, setReply] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!reply.trim()) {
        setError("Reply cannot be empty.");
        return;
    }

    setSubmitting(true);
    setError(null);

    const payload = { id, reply };

    try {
        const response = await sendReply(payload);

        if (response?.code === 200) {
            console.log("Reply was successful!"); 
            setReply("");
            onClose();
        } else {
            setError(response?.message || "An error occurred.");
        }
    } catch (err) {
        console.error("Error sending reply:", err);
        setError("Failed to send reply.");
    } finally {
        setSubmitting(false);
    }
};

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
      <ModalContent>
        <ModalHeader>Send Reply</ModalHeader>
        <ModalBody>
          <Textarea
            placeholder="Enter your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" isLoading={submitting} onPress={handleSend}>
            Save
          </Button>
          <Button color="danger" onPress={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReplyModal;
