/**
 * Interface defining the structure of each tab option
 */
export interface ITabOption {
  /** Unique identifier for the tab */
  id?: number;
  /** Display text for the tab */
  label: string;
  /** Component name to render as the tab */
  componentName?: string;
  /** Optional icon name/class for the tab */
  icon?: string;
  /** Optional count to display as badge */
  recordCount?: number;
  /** Any react component to render as the tab */
  renderAs?: string | React.ReactNode; // any react component
  /** Link to navigate to */
  href?: string;
  /** Optional content to render as the tab */
  content?: string | React.ReactNode;
  /** Optional component to render as the tab */
  component?: JSX.Element | null;
}

/**
 * Interface defining all props for the Tabs component

 */
export interface ITabsProps {
  /** Array of tab options to display */
  options?: ITabOption[] | any;
  /** Currently active tab index/id */
  activeTab?: number;
  /** Click handler for tabs */
  onTabClick?: (index: number) => void;
  /** If true, disables all tabs except first */
  isAddMode?: boolean;
  /** Array of tab indices to disable */
  toDisable?: number[];
  /** Parent container custom class */
  pClassName?: string;
  /** Base tab class */
  baseTabClassName?: string;
  /** Active tab class */
  activeTabClassName?: string;
  /** Whether to show count badges */
  isCount?: boolean;
  /** Custom scroll amount in pixels */
  scrollAmount?: number;
  /** Left arrow icon name */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon name */
  rightArrowIcon?: React.ReactNode;
  /** Custom class for scroll buttons */
  scrollButtonClassName?: string;
  /** Tab variant - 'row-wise' or 'scrollable' */
  variant?: "row-wise" | "scrollable";
  /** Custom class for the wrapper */
  wrapperClassName?: string;
  /** If true, the tabs are used inside a modal */
  usedInsideModal?: boolean;
  /** If true, the tabs are used inside a list page */
  isListPage?: boolean;
}
