import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

import { IPaginationProps } from "./types";

const Pagination: React.FC<IPaginationProps> = ({
  leftIcon,
  rightIcon,
  children,
  className = "",
  prevButtonClassName = "",
  nextButtonClassName = "",
  onPreviousClick,
  onNextClick,
  isPrevButtonDisabled = false,
  isNextButtonDisabled = false,
  totalPages,
  pageIndex,
  fetchData,
  onGotoPage,
}) => {
  const [inputPage, setInputPage] = useState<string>("");

  return (
    <div className={twMerge("flex items-center", className)}>
      {onGotoPage && totalPages && totalPages > 1 && (
        <div className="flex items-center gap-2 mr-2">
          <Input
            formik={false}
            name="gotoPage"
            type="number"
            min={1}
            max={totalPages}
            className="py-1"
            value={inputPage}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "0" || Number(value) > totalPages) return;
              setInputPage(value);
            }}
            placeholder={`${pageIndex}`}
          />

          <Button
            variant="primary"
            onClick={() => inputPage && fetchData?.(Number(inputPage))}
          >
            Go To Page
          </Button>
        </div>
      )}

      {/* Previous Button */}
      <Button
        type="button"
        onClick={onPreviousClick}
        disabled={isPrevButtonDisabled}
        className={prevButtonClassName}
      >
        <span className="sr-only">Previous</span>
        {leftIcon || <span>&larr;</span>}
      </Button>

      {/* Content/Label */}
      {children ? children : null}

      {/* Next Button */}
      <Button
        type="button"
        disabled={isNextButtonDisabled}
        onClick={onNextClick}
        className={nextButtonClassName}
      >
        <span className="sr-only">Next</span>
        {rightIcon || <span>&rarr;</span>}
      </Button>
    </div>
  );
};

export default Pagination;
