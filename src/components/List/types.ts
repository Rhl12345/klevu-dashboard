export interface iListProps {
  /** The type of the list: "ul" for unordered or "ol" for ordered */
  type: 'ul' | 'ol';
  /** Additional class names for customization */
  className?: string;
  /** The list items as an array of strings */
  items: string[];
}
