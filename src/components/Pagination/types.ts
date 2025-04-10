import { ReactNode } from "react";

export interface IPaginationProps {
  leftIcon?: ReactNode; // Custom left icon
  rightIcon?: ReactNode; // Custom right icon
  children?: ReactNode; // Content between pagination buttons
  className?: string; // Custom class for the wrapper
  prevButtonClassName?: string; // Custom class for prev button
  nextButtonClassName?: string; // Custom class for next button
  onPreviousClick?: () => void; // Callback for the previous button
  onNextClick?: () => void; // Callback for the next button
  isPrevButtonDisabled?: boolean;
  isNextButtonDisabled?: boolean;
  totalPages?: number;
  pageIndex?: number;
  fetchData?: Function; // Function to fetch data for a specific page
  onGotoPage?: boolean;
}
