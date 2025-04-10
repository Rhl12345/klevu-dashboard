import { ReactNode } from 'react';

export interface iCardProps {
  /** Children to render the card's content */
  children: ReactNode;
  /** Additional classes for the card container */
  className?: string;
}
