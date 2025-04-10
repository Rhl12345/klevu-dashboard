import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iBadgeProps } from './types';

const Badge: React.FC<iBadgeProps> = ({
  size = 'medium',
  variant = 'red',
  className = 'rounded-full px-3 py-1 text-xs border text-center block font-medium tracking-widest',
  children,
  ...props
}) => {
  const baseStyles = 'rounded';

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size];

  const variantStyles = {
    red: 'border-red-600 bg-red-100 text-red-900',
    green: 'border-green-600 bg-green-100 text-green-900',
    blue: 'border-blue-600 bg-blue-100 text-blue-900',
  }[variant];

  const combinedStyles = twMerge(
    baseStyles,
    sizeStyles,
    variantStyles,
    className
  );

  return (
    <span className={combinedStyles} {...props}>
      {children}
    </span>
  );
};

export default Badge;
