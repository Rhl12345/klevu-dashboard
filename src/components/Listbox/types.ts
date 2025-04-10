export interface iListboxItem {
  /** The content of the item */
  content: React.ReactNode;
  /** Indicates if the item is disabled */
  disabled?: boolean;
  /** Additional class names for the item */
  itemClassName?: string;
  /** Optional action or icon to render alongside the item */
  action?: React.ReactNode;
}

export interface iListboxProps {
  /** The list items to display */
  items: iListboxItem[];
  /** Additional class names for the outermost container */
  containerClassName?: string;
  /** Additional class names for the search bar container */
  searchContainerClassName?: string;
  /** Additional class names for the `<ul>` element */
  listClassName?: string;
  /** Indicates whether the listbox is scrollable */
  scrollable?: boolean;
  /** Optional search component to render above the list */
  searchComponent?: React.ReactNode;
}
