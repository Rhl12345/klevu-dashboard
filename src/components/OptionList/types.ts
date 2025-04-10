/**
 * Represents an item in the option list
 * @interface itemsArray
 */
interface itemsArray {
  /** Unique identifier for the item */
  id: string;
  /** Display text for the item */
  label?: string;
  /** Value associated with the item */
  value?: string | number;
  /** Flag to disable the item */
  isDisabled?: boolean;
  /** Title for section headers (used in withSections type) */
  title?: string;
  /** Nested items for sections (used in withSections type) */
  items?: Array<{
    /** Unique identifier for the nested item */
    id: string;
    /** Display text for the nested item */
    label: string;
    /** Value associated with the nested item */
    value: string | number;
  }>;
}

/**
 * Props for the OptionList component
 * @interface iOptionListProps
 */
export interface iOptionListProps {
  /** Array of items to display in the option list */
  itemsArray: Array<itemsArray>;
  /** Custom class name for the wrapper element */
  wrapperClassName?: string;
  /** Custom class name for the option text */
  optionTextClassName?: string;
  /** Custom class name for the button elements */
  buttonClassName?: string;
  /** Type of option list to render ('default', 'multiple', 'multipleWithDisabledOption', 'withSections', 'inAPopover') */
  type?:
    | 'default'
    | 'multiple'
    | 'multipleWithDisabledOption'
    | 'withSections'
    | 'inAPopover';
  /** Custom class name for the checkbox input */
  inputCheckBoxClassName?: string;
  /** Custom class name for the input labels */
  inputLabelClassName?: string;
  /** Custom class name for the sections items wrapper */
  wrapperSectionsItemsClassName?: string;
  /** Custom class name for section titles */
  withSectionsTitleClassName?: string;
  /** Custom class name for the popup wrapper */
  popUpWrapperClassName?: string;
  /** Title text for the popup */
  popUpTitle?: string;
  /** Custom class name for the popup title */
  popUpTitleClassName?: string;
  /** Custom class name for the popup options wrapper */
  popUpOptionsWrapperClassName?: string;
  /** Title text for the popup option */
  popUpOptionTitle?: string;
  /** Custom class name for the popup option title */
  popUpOptionTitleClassName?: string;
}
