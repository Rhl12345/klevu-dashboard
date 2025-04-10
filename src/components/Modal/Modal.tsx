import Button from "@/components/Button/Button";
import { IModalProps, ModalSize } from "@/components/Modal/types";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { Description, Dialog, DialogTitle } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const sizeStyles: Record<ModalSize, string> = {
  none: "",
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  "8xl": "max-w-8xl",
  "9xl": "max-w-9xl",
  "10xl": "max-w-10xl",
};

const baseContentClasses = [
  "p-4 md:p-5",
  "space-y-4",
  "bg-body-light dark:bg-body-dark",
  "min-h-20",
  "xl:text-md text-sm",
  "text-quaternary-dark dark:text-quaternary-light",
];

const baseFooterClasses = [
  "flex justify-end items-center",
  "p-4 md:p-5",
  "border-t border-gray-light dark:border-gray-dark",
  "sticky bottom-0",
  "bg-body-light dark:bg-secondary-dark",
  "gap-2",
];

const Modal = ({
  isOpen,
  onClose,
  header,
  content,
  footer,
  parentContainerClassName = "fixed inset-0 z-50 overflow-y-auto p-10 flex items-center justify-center min-h-screen",
  wrapperClassName = "relative rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark w-full flex flex-col max-h-[90vh]",
  contentClassName = "",
  headerClassName = "flex items-center justify-between p-4 md:p-5 border-b border-gray-light dark:border-gray-dark sticky top-0 bg-body-light dark:bg-secondary-dark z-10",
  footerClassName = "",
  overlayContainerClassName = "fixed inset-0 bg-black/50",
  closeButtonIcon,
  size = "lg",
}: IModalProps) => {
  const defaultContentClassName = twMerge(
    ...baseContentClasses,
    contentClassName || "overflow-y-auto"
  );

  const defaultFooterClassName = twMerge(
    ...baseFooterClasses,
    footerClassName || "z-10"
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={parentContainerClassName}
    >
      {/* Overlay */}
      <div
        className={twMerge("fixed inset-0", overlayContainerClassName)}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className={twMerge(wrapperClassName, sizeStyles[size as ModalSize])}>
        {/* Modal Header */}
        {header && (
          <DialogTitle as="div" className={headerClassName}>
            <div className="flex gap-2 items-center lg:text-md text-sm text-primary-light dark:text-primary-dark font-semibold">
              {header}
            </div>
            {/* Close Button */}
            <Button
              type="button"
              onClick={onClose}
              variant="default"
              icon={closeButtonIcon || <SvgIcon name="CrossIcon" />}
            />
          </DialogTitle>
        )}

        {/* Modal Content */}
        {content && (
          <Description as="div" className={defaultContentClassName}>
            {content}
          </Description>
        )}

        {/* Modal Footer */}
        {footer && <div className={defaultFooterClassName}>{footer}</div>}
      </div>
    </Dialog>
  );
};

export default Modal;
