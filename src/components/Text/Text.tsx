import React from "react";
import { twMerge } from "tailwind-merge";
import { ITextProps } from "@/components/Text/types";

const Text: React.FC<ITextProps> = ({
  size = "base",
  align = "left",
  children,
  className,
  disabled = false,
  weight = "font-semibold",
  innerClass,
  ...props
}) => {
  // Base styles
  const baseStyles =
    "flex items-center text-quaternary-dark dark:text-quaternary-light";

  // Size styles for the text
  const sizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }[size];

  // Alignment styles
  const alignClass = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  }[align];

  const weightClasses = {
    "font-normal": "font-normal",
    "font-semibold": "font-semibold",
    "font-bold": "font-bold",
  }[weight];

  return (
    <div
      className={twMerge(
        baseStyles,
        alignClass,
        weightClasses,
        disabled ? "opacity-50 !cursor-not-allowed" : "",
        className
      )}
      aria-disabled={disabled}
      {...props} // Spread additional div props
    >
      <span className={twMerge(sizeClass, innerClass)}>{children}</span>
    </div>
  );
};

export default Text;
