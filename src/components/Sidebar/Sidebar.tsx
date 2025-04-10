import React from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import { iSidebarProps } from "./types";

export const Sidebar: React.FC<iSidebarProps> = ({
  isSideBarOpen,
  setSideBarOpen,
  content,
  contentWrapperClassName = "fixed h-screen left-0 top-0",
  transitionClasses = {
    enter: "transition-transform ease-out duration-300",
    enterFrom: "-translate-x-full",
    enterTo: "translate-x-0",
    leave: "transition-transform ease-in duration-200",
    leaveFrom: "translate-x-0",
    leaveTo: "-translate-x-full",
  },
  menuItems = [],
}) => {
  return (
    <Transition show={isSideBarOpen}>
      <TransitionChild
        enter={transitionClasses.enter}
        enterFrom={transitionClasses.enterFrom}
        enterTo={transitionClasses.enterTo}
        leave={transitionClasses.leave}
        leaveFrom={transitionClasses.leaveFrom}
        leaveTo={transitionClasses.leaveTo}
      >
        <div id="LeftContent" className={contentWrapperClassName}>{content(menuItems)}</div>
      </TransitionChild>
    </Transition>
  );
};
