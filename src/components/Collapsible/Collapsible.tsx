import React from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "@/components/Button/Button";
import { iCollapsibleProps } from "@/components/Collapsible/types";

const Collapsible: React.FC<iCollapsibleProps> = ({
  trigger,
  children,
  className = "",
  triggerClassName = "",
  contentClassName = "",
  initialOpen = false,
}) => {
  return (
    <Menu as="div" className={twMerge("relative", className)} {...(initialOpen && { __demoMode: true })}>
      {/* Trigger */}
      <MenuButton className={triggerClassName}>
        {trigger || <Button variant="primary">Click Me</Button>}
      </MenuButton>

      {/* Dropdown Content */}
      <MenuItems className={contentClassName}>
        {children || <p className="p-4">This is some dropdown content.</p>}
      </MenuItems>
    </Menu>
  );
};

export default Collapsible;
