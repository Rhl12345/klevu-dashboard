import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IAccordionProps } from "@/components/Accordion/types";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const Accordion = ({
  items,
  className = "w-full flex flex-col bg-body-light dark:bg-body-dark rounded-none shadow-none gap-4",
  itemClassName = "w-full border border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark flex flex-wrap",
  disclousreButtonClassName = "w-full text-left focus:outline-none items-center justify-between cursor-pointer px-4 lg:px-6 py-3 xl:text-md text-sm text-primary-light dark:text-primary-dark font-semibold",
  disclousrePanelClassName = "w-full border-t border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark p-4 lg:p-6 text-sm text-quaternary-dark dark:text-quaternary-light",
  iconVariant = "plusMinus",
}: IAccordionProps) => {
  const getIcon = (isExpanded: boolean, index: number) => {
    const iconProps = {
      "data-testid": isExpanded
        ? `icon-${index}-expanded`
        : `icon-${index}-not-expanded`,
    };

    if (iconVariant === "plusMinus") {
      return (
        <SvgIcon
          {...iconProps}
          name={
            isExpanded
              ? "MinusIconWithRoundedCircle"
              : "PlusIconWithRoundedCircle"
          }
        />
      );
    }

    return (
      <SvgIcon {...iconProps} name={isExpanded ? "ArrowUp" : "ArrowDown"} />
    );
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <Disclosure key={item.id}>
          {({ open }) => (
            <div className={itemClassName}>
              <DisclosureButton className={disclousreButtonClassName}>
                <div className="flex items-center justify-between cursor-pointer">
                  <span>{item.title}</span>
                  {getIcon(open, index)}
                </div>
              </DisclosureButton>

              <DisclosurePanel className={disclousrePanelClassName}>
                <div>{item.content}</div>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
