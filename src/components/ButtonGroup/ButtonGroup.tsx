import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iButtonGroupProps } from './types';

const ButtonGroup: React.FC<iButtonGroupProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'isolate inline-flex rounded-md shadow-sm',
    'with-gap': 'flex gap-4',
  }[variant];

  return (
    <div className={twMerge(variantStyles, className)} {...props}>
      {children}
    </div>
  );
};

export default ButtonGroup;
