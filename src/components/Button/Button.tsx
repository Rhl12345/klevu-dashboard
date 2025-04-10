import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iButtonProps } from './types';

const Button: React.FC<iButtonProps> = ({
  size = 'sm',
  variant = 'primary',
  gap = 2,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  scale,
  id,
  rounded = 'none',
  'aria-label': ariaLabel,
  ...props
}) => {
  // Base styles for all buttons
  const baseStyles = 'btn';

  // Size styles with specific dimensions and padding
  const sizeStyles = {
    none: '',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
    full: 'btn-full',
  };
  // Icon styles
  const baseIconStyles = `flex items-center ${gap ? `gap-${gap}` : 'gap-2'}`;
  // Scale styles
  const baseScaleStyles =
    'transition-all transform hover:scale-x-105 hover:scale-y-105';
  // Core styles for variants
  const variantStyles = {
    default: 'btn-default dark:btn-dark-default',
    primary: 'btn-primary dark:btn-dark-primary',
    'outline-primary': 'btn-outline-primary dark:btn-outline-dark-primary',
    'rounded-primary': `btn-primary dark:btn-dark-primary !rounded-${rounded}`,
    'rounded-outline-primary': `btn-outline-primary dark:btn-outline-dark-primary !rounded-${rounded}`,
    secondary: 'btn-secondary dark:btn-dark-secondary',
    'outline-secondary':
      'btn-outline-secondary dark:btn-outline-dark-secondary',
    'rounded-secondary': `btn-secondary dark:btn-dark-secondary !rounded-${rounded}`,
    'rounded-outline-secondary': `btn-outline-secondary dark:btn-outline-dark-secondary !rounded-${rounded}`,
  };

  const getVariantStyles = (variant: string) => {
    const variants = variant.split(' ');
    return variants
      .map((v) => variantStyles[v as keyof typeof variantStyles])
      .join(' ');
  };

  const combinedStyles = twMerge(
    baseStyles,
    sizeStyles[size as keyof typeof sizeStyles],
    icon ? baseIconStyles : '',
    scale ? baseScaleStyles : '',
    getVariantStyles(variant),
    disabled && 'opacity-50 !cursor-not-allowed',
    props.className || ''
  );

  return (
    <button
      {...(id && {
        id: id,
        'data-testid': id,
      })}
      {...(ariaLabel && {
        'aria-label': ariaLabel,
      })}
      disabled={disabled}
      {...props}
      className={combinedStyles}
    >
      {icon && iconPosition === 'left' && <span className="block">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && (
        <span className="block">{icon}</span>
      )}
    </button>
  );
};

export default Button;
