import React from "react";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { IInquiriesListReplyModalModalProps } from "@/types/reports/reports";
import { Label } from "@/components/Label/Label";

/**
 * Modal component for replying to inquiries in the admin panel
 * @component
 * @param {boolean} showModal - Controls the visibility of the modal
 * @param {Function} setShowModal - Function to update modal visibility
 * @param {Object} modalInformation - Contains email and subject information
 */
const InquiriesListReplyModal = ({
  showModal,
  setShowModal,
  modalInformation,
}: IInquiriesListReplyModalModalProps) => {
  const handleClose = () => setShowModal(false);
  
  const handleSend = () => {
    // Add send logic here
    setShowModal(false);
  };

  const handleContentChange = (content: string) => {
    // Handle content change here
  };

  return (
    <Modal
      size="2xl"
      isOpen={showModal}
      onClose={handleClose}
      header="Reply Email"
      footer={
        <>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSend}
          >
            Send
          </Button>
          <Button
            size="sm"
             variant="outline-secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </>
      }
      content={
        <>
            <Input
              label="From"
              value={modalInformation?.email || ""}
              disabled
              required
              asterisk={true}
              formik={false}
            />
            <Input
              label="Reply To"
              value={modalInformation?.email || ""}
              required
              asterisk={true}
              formik={false}
            />
            <Input
              label="Subject"
              placeholder="Enter subject"
              value={modalInformation?.subject || ""}
              required={true}
              asterisk={true}
              formik={false}
            />
            <div>
              <Label asterisk={true}>
                Body
              </Label>
              <RichTextEditor
                placeholder="Enter your message"
                onChange={handleContentChange}
              />
            </div>
            <div className="col-span-2">
              <Label asterisk={true}>
                Attachments
              </Label>
              <div className="">
                <Input type="file" name="" formik={false} />
              </div>
            </div>
          </>
      }
    />
  );
};

export default InquiriesListReplyModal;
