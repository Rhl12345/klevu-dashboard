import React, { memo, useCallback, useState } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import { IDeleteModalProps } from "@/components/Modal/types";

/**
 * DeleteModal - A reusable confirmation modal for delete operations
 *
 * @component
 * @param {DeleteModalProps} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function when modal closes
 * @param {Function} props.onDelete - Callback function when delete is confirmed
 * @param {string} [props.title="Delete"] - Modal title
 * @param {string} [props.itemName="record"] - Name of the item being deleted
 */
const DeleteModal: React.FC<IDeleteModalProps> = memo(
  ({
    isOpen,
    onClose,
    onDelete,
    // Default props for flexibility
    title = "Delete",
    itemName = "record",
  }) => {
    // State for delete confirmation text
    const [deleteText, setDeleteText] = useState("");
    // Check if delete should be enabled
    const isDeleteEnabled = deleteText.toLowerCase() === "delete";
    // Handle delete action
    const handleDelete = useCallback(() => {
      if (isDeleteEnabled) {
        onDelete();
        onClose();
        setDeleteText(""); // Reset input after deletion
      }
    }, [isDeleteEnabled, onDelete, onClose]);
    // Handle input change
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteText(e.target.value);
      },
      []
    );
    // Handle modal close
    const handleClose = useCallback(() => {
      onClose();
      setDeleteText(""); // Reset input when modal closes
    }, [onClose]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        // Modal styling
        header={title}
        content={
          <>
            {/* Warning message */}
            <div className="mb-2">
              Deleting this {itemName} will permanently remove this record from
              your account. This can&apos;t be undone.
            </div>
            {/* Instructions */}
            <div className="mb-2">
              Type &quot;delete&quot; below to verify that you want to delete
              this record.
            </div>
            {/* Verification input field */}
            <div className="pb-3">
              <Input
                type="text"
                name="deleteText"
                value={deleteText}
                onChange={handleInputChange}
                placeholder="delete"
                aria-label="Type delete to confirm"
                autoComplete="off"
                formik={false}
              />
            </div>
            {/* Verification message */}
            {!deleteText && (
              <p className="mb-2 text-rose-500">
                Please Type &quot;delete&quot; to verify that you want to delete
                this record.
              </p>
            )}
          </>
        }
        footer={
          <>
            {/* Cancel button */}
            <Button
              size="sm"
              onClick={handleClose}
              type="button"
              variant="outline-primary"
            >
              Cancel
            </Button>
            {/* Delete button */}
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={!isDeleteEnabled}
              type="button"
              variant="primary"
            >
              Delete
            </Button>
          </>
        }
      />
    );
  }
);
// Display name for debugging purposes
DeleteModal.displayName = "DeleteModal";
export default DeleteModal;
