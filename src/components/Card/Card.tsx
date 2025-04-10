import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iCardProps } from './types';

const Card: React.FC<iCardProps> = ({ children, className = '' }) => {
  return <div className={twMerge(className)}>{children}</div>;
};

export default Card;
