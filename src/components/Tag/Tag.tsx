import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { iTagProps } from "./types";

const Tag: React.FC<iTagProps> = ({
  size = "base",
  align = "left",
  children,
  className,
  disabled = false,
  removable = false,
  onRemove,
  link,
  ...props
}) => {
  const baseStyles = "px-2 py-1 text-xs rounded-lg inline-flex items-center";

  const sizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }[size];

  const alignClass = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  }[align];

  const disabledClass = disabled
    ? "opacity-50 !cursor-not-allowed"
    : "hover:bg-gray-300";

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  return (
    <div
      className={twMerge(
        baseStyles,
        sizeClass,
        alignClass,
        disabledClass,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {link ? (
        <a href={link} className="hover:underline flex-grow">
          {children}
        </a>
      ) : (
        <span className="flex-grow">{children}</span>
      )}
      {removable && !disabled && (
        <Button
          onClick={handleRemove}
          className="ml-2 flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-400"
          aria-label="Remove Tag"
        >
          <SvgIcon name="CrossIcon" />
        </Button>
      )}
    </div>
  );
};

export default Tag;
