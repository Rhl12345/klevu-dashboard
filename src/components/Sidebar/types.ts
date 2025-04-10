import { ReactNode } from "react";

// Define the interface for the Sidebar props
export interface iSidebarProps {
  /**
   * Controls whether the sidebar is visible.
   */
  isSideBarOpen: boolean;

  /**
   * Function to update the visibility state of the sidebar.
   */
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Content to be displayed inside the sidebar, passed as a React node.
   */
  content: (menuItems: MenuItem[]) => ReactNode;

  /**
   * Custom classnames for content wrapper div.
   */
  contentWrapperClassName?: string;

  /**
   * Custom classnames for the transition component.
   */
  transitionClasses?: {
    enter: string;
    enterFrom: string;
    enterTo: string;
    leave: string;
    leaveFrom: string;
    leaveTo: string;
  };
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  isHeader?: boolean;
  subItems?: MenuItem[];
}
