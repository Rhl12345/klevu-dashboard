import { memo, useState } from "react";

import SvgIcon from "@/components/SvgIcons/SvgIcon";
import DatePicker from "@/components/Table/Filters/DatePicker";
import CheckboxGroup from "@/components/Table/Filters/CheckboxGroup";

import { IDropdownCustomFilterProps } from "@/components/Table/types";
import RadioButtonGroup from "@/components/Table/Filters/RadioButtonGroup";

const Dropdown = ({ name, type, ...rest }: IDropdownCustomFilterProps) => {
  const [open, setOpen] = useState(false);

  let dropdownComponent;

  switch (type) {
    case "checkbox":
      dropdownComponent = (
        <CheckboxGroup name={name} type={type} openDropdown={open} {...rest} />
      );
      break;
    case "radio":
      dropdownComponent = (
        <RadioButtonGroup
          name={name}
          type={type}
          openDropdown={open}
          {...rest}
        />
      );
      break;
    case "date":
      dropdownComponent = (
        <DatePicker name={name} type={type} openDropdown={open} {...rest} />
      );
      break;
    default:
      dropdownComponent = (
        <div className="w-full text-sm px-3 py-2 border-t border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark text-danger">
          please include proper type
        </div>
      );
  }

  return (
    <>
      <div className="relative border-b border-gray-light dark:border-gray-dark text-quaternary-dark dark:text-quaternary-light">
        <div
          className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-2 border-0 border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark text-quaternary-dark dark:text-quaternary-light fill-quaternary-dark dark:fill-quaternary-light hover:cursor-pointer"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          <span className="ml-1">{name}</span>

          {open ? <SvgIcon name="ArrowUp" /> : <SvgIcon name="ArrowDown" />}
        </div>
        {dropdownComponent}
      </div>
    </>
  );
};

export default memo(Dropdown);
