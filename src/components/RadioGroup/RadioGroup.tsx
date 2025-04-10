import React from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../Label/Label";
import { iRadioGroupProps } from "./types";

const RadioGroup: React.FC<iRadioGroupProps> = ({
  label,
  description,
  wrapperClassName,
  labelDescriptionWrapperClassName,
  labelClassName,
  descriptionClassName,
  radioClassName,
  ...props
}) => {
  return (
    <div className={twMerge("flex items-center", wrapperClassName)}>
      <input
        type="radio"
        id={props.name}
        className={twMerge(
          "cursor-pointer w-5 h-5 text-secondary bg-gray-100 border-gray-300 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 accent-black dark:accent-white",
          radioClassName
        )}
        {...props}
      />
      {/* Done : As discussed with Vishal Bhai */}
      <div
        className={twMerge(
          "ml-3 inline-flex gap-2",
          labelDescriptionWrapperClassName
        )}
      >
        {label && <Label htmlFor={props.name}>{label}</Label>}
        {description && (
          <p className={twMerge("text-sm text-gray-500", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioGroup;
