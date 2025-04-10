import { FC } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { IStatusChangeModelProps } from "@/components/Modal/types";

/**
 * StatusChangeModel - A reusable modal component for handling status changes
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Handler for modal close action
 * @param onConfirm - Handler for confirmation action
 * @param title - Modal title (defaults to "Change Status")
 * @param message - Custom message to display
 * @param isLoading - Loading state for buttons
 * @param currentRowData - Current row data containing status and name
 */
const StatusChangeModel = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Change Status",
  message,
  isLoading = false,
  currentRowData,
}: IStatusChangeModelProps) => {
  // Determine if the action is to activate or deactivate
  const isActivating = currentRowData?.recStatus.toLowerCase() === "inactive";

  // Generate default message if none provided
  const getDefaultMessage = () =>
    `Do you want to ${isActivating ? "active" : "inactive"} this ${currentRowData?.recordName} ?`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={title}
      content={<div className="mb-2">{message || getDefaultMessage()}</div>}
      footer={
        <>
          {/* Cancel Button */}
          <Button
            type="button"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            variant="outline-primary"
          >
            Cancel
          </Button>

          {/* Confirm Button */}
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            variant="primary"
          >
            {isActivating ? "Active" : "Inactive"}
          </Button>
        </>
      }
    />
  );
};

export default StatusChangeModel;
