import { twMerge } from "tailwind-merge";

const FormErrorMessage = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge(`text-danger font-normal`, className)}>
      {children}
    </div>
  );
};
export default FormErrorMessage;
