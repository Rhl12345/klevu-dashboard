import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iInlineErrorProps } from './types';

const InlineError: React.FC<iInlineErrorProps> = ({
  message,
  icon,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'grow flex items-center gap-x-2 text-rose-600',
        className
      )}
    >
      {icon && <div>{icon}</div>}
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default InlineError;
