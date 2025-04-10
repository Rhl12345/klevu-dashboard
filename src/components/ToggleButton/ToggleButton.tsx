import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { iToggleButtonProps } from "./types";

const ToggleButton: React.FC<iToggleButtonProps> = ({
  size = "medium",
  defaultValue = false,
  disabled,
  name,
  id,
  onChange,
  on,
  off,
  className = "",
  label = "",
  asterisk = false,
  isInline = false,
  labelClassName = "inline-flex pr-2 text-quaternary-dark dark:text-quaternary-light align-middle font-semibold text-base",
  wrapperClassName = "",
}) => {
  const [toggle, setToggle] = useState(defaultValue);

  const displayText = toggle ? on || "ON" : off || "OFF";

  const onChangeHandler = () => {
    setToggle(!toggle);
    if (onChange) {
      onChange(!toggle);
    }
  };

  useEffect(() => {
    setToggle(defaultValue);
  }, [defaultValue]);

  return (
    <div
      className={`flex ${isInline ? "lg:flex-row flex-col" : "flex-col"} gap-2 ${wrapperClassName}`}
    >
      {label && (
        <label htmlFor={id || name} className={labelClassName}>
          {label}
          {asterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`relative ${size === "medium" ? "w-24" : "w-20"} ${className}`}
      >
        <input
          type="checkbox"
          id={id || name}
          className="sr-only"
          checked={toggle}
          onChange={onChangeHandler}
          name={name}
          disabled={disabled}
          data-testid="toggle-input"
        />
        <label
          className={twMerge(
            "text-gray-500 text-center h-7 cursor-pointer flex items-center justify-center rounded-none leading-5 overflow-hidden",
            disabled && "opacity-30",
            toggle ? "bg-green-600" : "bg-slate-600"
          )}
          htmlFor={id || name}
          data-testid="toggle-label"
        >
          <span
            className={`bg-white shadow-sm w-6 h-6 transition-all absolute rounded-none ${
              toggle
                ? size === "medium"
                  ? "left-[4.4rem]"
                  : "left-[3.25rem]"
                : "left-0.5"
            }`}
            aria-hidden="true"
            data-testid="toggle-handle"
          ></span>
          <span
            className={`text-white text-[12px] inline-block absolute right-1.5 truncate max-w-[calc(100%-32px)] ${
              toggle ? "opacity-0" : "opacity-100"
            }`}
            data-testid="toggle-text-right"
          >
            {displayText}
          </span>
          <span
            className={`text-white text-[12px] inline-block absolute left-1.5 truncate max-w-[calc(100%-32px)] ${
              toggle ? "opacity-1" : "opacity-0"
            }`}
            data-testid="toggle-text-left"
          >
            {displayText}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
