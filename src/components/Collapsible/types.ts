import { ReactNode } from 'react';

export interface iCollapsibleProps {
  trigger?: ReactNode; // Button or element that toggles the dropdown
  children?: ReactNode; // Content to display inside the dropdown
  className?: string; // Custom class for the outer wrapper
  triggerClassName?: string; // Custom class for the trigger button
  contentClassName?: string; // Custom class for the dropdown content
  initialOpen?: boolean; // Whether the dropdown should be open by default
}
