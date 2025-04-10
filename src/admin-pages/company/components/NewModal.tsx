import React from "react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";

const NewModal = ({ isOpen, onClose, title,message }: { isOpen: boolean, onClose: () => void, title: string,message:string }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={title}
        size="xl"
        content={<div className="mb-2">{message}</div>}
        footer={
          <>
            <Button variant="outline-primary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" size="sm" onClick={onClose}>
              Save Changes
            </Button>
          </>
        }
      />
    </>
  );
};

export default NewModal;
