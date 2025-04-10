import React, { useState } from "react";

import Collapsible from "@/components/Collapsible/Collapsible";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { IDropdownProps } from "@/components/Table/types";

const TablePaginationDropdown = ({
  options,
  onChangeHandler,
  value,
}: IDropdownProps) => {
  const [selected, setSelected] = useState(
    value === 100 ? 2 : value === 50 ? 1 : 0
  );

  return (
    <div className="mt-2 grid grid-cols-1">
      <Collapsible
        trigger={
          <div className="flex items-center gap-4 py-2 px-4 bg-white border rounded-none border-neutral-200 hover:border-neutral-300 text-gray-500 hover:text-gray-600 cursor-pointer">
            <span className="flex items-center">
              <span>{options[selected]?.period}</span>
            </span>
            <SvgIcon name="ArrowDown" />
          </div>
        }
        triggerClassName="cursor-pointer focus:outline-none"
        contentClassName="absolute bottom-full left-0 w-full bg-white border border-neutral-200 py-1 rounded-none shadow-lg overflow-hidden mb-1 font-medium text-sm text-gray-500 divide-y divide-slate-200"
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center justify-between w-full hover:text-primary-light dark:hover:text-quaternary-dark hover:bg-gray-pointer py-2 px-3 cursor-pointer ${
              selected === option.id
                ? "[&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white active  dark:border-gray-dark leading-tight text-quaternary-dark dark:text-quaternary-light"
                : ""
            }`}
            onClick={() => {
              setSelected(option.id);
              onChangeHandler(option.value);
            }}
          >
            <span>{option.period}</span>
          </div>
        ))}
      </Collapsible>
    </div>
  );
};

export default TablePaginationDropdown;
