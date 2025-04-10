import { ReactNode } from "react";
export type ModalSize =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl";
export interface IModalProps {
  isOpen: boolean; // Boolean flag to control modal visibility
  onClose: () => void; // Callback for closing the modal
  header?: ReactNode; // React node for modal header
  content?: ReactNode; // React node for modal content
  footer?: ReactNode; // React node for modal footer
  parentContainerClassName?: string; // Additional classes for the modal's parent container
  overlayContainerClassName?: string; // Additional classes for the modal's overlay container
  wrapperClassName?: string; // Additional classes for the modal wrapper
  contentClassName?: string; // Additional classes for the content section
  headerClassName?: string; // Additional classes for the header section
  footerClassName?: string; // Additional classes for the footer section
  closeButtonClassName?: string; // Additional classes for the close button
  closeButtonIcon?: ReactNode; // Custom close button icon
  size?: ModalSize; // Size of the modal
}

// Define prop types for better type safety and documentation
export interface IDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  itemName?: string;
}

// Define the shape of row data for better type checking
export interface IRowData {
  recStatus: "active" | "inactive";
  recordName: string;
  [key: string]: any; // For any additional properties
}

// Props interface with proper types
export interface IStatusChangeModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
  currentRowData: IRowData;
}
