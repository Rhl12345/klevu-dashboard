import React from "react";
import { LabelProps } from "@/components/Label/type";
import { twMerge } from "tailwind-merge";

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className = "",
      required,
      disabled,
      size = "medium",
      asterisk = false,
      weight = "font-semibold",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex pr-2 text-quaternary-dark dark:text-quaternary-light align-middle";

    const sizeClasses = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }[size];

    const weightClasses = {
      "font-normal": "font-normal",
      "font-semibold": "font-semibold",
      "font-bold": "font-bold",
    }[weight];

    const stateClasses = `
      ${disabled ? "cursor-not-allowed" : ""}
      ${required ? 'after:content-["*"] after:text-danger' : ""}
      ${asterisk ? 'after:content-["*"] after:text-danger' : ""}
    `;

    const labelClasses = twMerge(
      baseClasses,
      sizeClasses,
      stateClasses,
      weightClasses,
      className
    );

    return (
      <label ref={ref} className={labelClasses} {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
