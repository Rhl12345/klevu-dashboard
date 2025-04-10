import { ReactNode } from "react";

export type TAccordionIconVariant = "plusMinus" | "arrow";

export interface IAccordionItem {
  id: string; // Unique ID for each accordion item
  title: ReactNode; // Dynamic title content as ReactNode
  content: ReactNode; // Dynamic content as ReactNode
}

export interface IAccordionProps {
  items: IAccordionItem[]; // Array of items for the accordion
  className?: string; // Custom class for the accordion container
  itemClassName?: string; // Custom class for each accordion item
  disclousreButtonClassName?: string; // Custom class for the disclosure button
  disclousrePanelClassName?: string; // Custom class for the disclosure panel
  iconVariant?: TAccordionIconVariant; // icon variant
}
