import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { TTooltipProps } from "@/components/Tooltip/types";
import React from "react";
import { twMerge } from "tailwind-merge";

const Tooltip: React.FC<TTooltipProps> = ({
  size = "md",
  position = "top",
  children,
  disabled,
  icon,
}) => {
  // Tooltip positioning styles
  const positionStyles = {
    top: "bottom-full hidden group-hover:block left-1/2 mb-3 -translate-x-1/2  shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);]",
    right:
      "left-full hidden group-hover:block top-1/2 ml-3 -translate-y-1/2  shadow-[-12px_0px_30px_-4px_rgba(16,24,40,0.08)]",
    bottom:
      "top-full hidden group-hover:block left-1/2 mt-3  -translate-x-1/2 shadow-[0px_-12px_30px_-4px_rgba(16,24,40,0.08)]",
    left: "right-full hidden group-hover:block top-1/2 mr-3 -translate-y-1/2 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]",
  }[position];

  const positionspanStyles = {
    top: "-bottom-1.5 left-1/2 border-b border-r -translate-x-1/2 rotate-45 ",
    right: "-left-1.5 top-1/2 border-b border-l -translate-y-1/2 rotate-45 ",
    bottom: "-top-1.5 left-1/2 -translate-x-1/2 border-t border-l rotate-45 ",
    left: "-right-1.5 top-1/2 -translate-y-1/2 border-t border-r rotate-45",
  }[position];

  const sizeStyles = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  const tooltipClassName = twMerge(
    "absolute z-20 whitespace-nowrap bg-body-light dark:bg-body-dark text-tertiary-dark dark:text-tertiary-light font-medium transition-opacity duration-300 border border-gray-light dark:border-gray-dark py-2 px-4 text-xs",
    sizeStyles,
    positionStyles
  );

  const tooltipSpanClassName = twMerge(
    "absolute h-3 w-3 bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark rounded-none -z-10",
    positionspanStyles
  );

  const iconClassName = twMerge(
    "text-tertiary-dark dark:text-tertiary-light text-sm tracking-wider font-semibold outline-none",
    disabled ? "opacity-50 !cursor-not-allowed" : ""
  );

  return (
    <div className="relative group mx-2 flex items-center" role="tooltip">
      <div
        className={iconClassName}
        data-tooltip-target={`${position}-tooltip`}
      >
        {icon || (
          <SvgIcon
            name="CircleInfo"
            className="w-4 h-4 text-quaternary-dark dark:text-quaternary-light fill-default-light dark:fill-default-dark"
          />
        )}
      </div>
      <div
        className={tooltipClassName}
        data-testid={`${position}-${size}-tooltip`}
      >
        <span className={tooltipSpanClassName}></span>
        <div className="text-quaternary-dark dark:text-quaternary-light">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
