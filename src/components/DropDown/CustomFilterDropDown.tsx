import React, { Fragment, useState } from "react";
import { IDropdownProps } from "./types";
import { ActionMeta } from "react-select";
import Checkbox from "@/components/Checkbox/Checkbox";

const CustomFilterSelectBox: React.FC<IDropdownProps> = ({
  options,
  placeholder,
  onChange,
  showDropdown = true,
  ...props
}: IDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkBoxState, setCheckBoxState] = useState(() => {
    return props?.defaultValue?.reduce(
      (acc: { [key: string]: boolean }, curr: string) => {
        acc[curr] = true;
        return acc;
      },
      {}
    ) as Record<string, boolean>;
  });
  const [DropdownOptions, setDropdownOptions] = useState(options || []);

  const searchDropdown = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredOptions = options?.filter((option) =>
      option.label?.toLowerCase().includes(searchTerm)
    );
    setDropdownOptions(filteredOptions || []);
    setSearchTerm(e.target.value);
  };

  const checkboxHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCheckBoxState((prev) => ({ ...prev, [key]: event.target.checked }));
  };

  const applyMoreFilter = () => {
    onChange?.(checkBoxState, {} as ActionMeta<unknown>);
  };

  const clearMainFilter = () => {
    setCheckBoxState({});
    setSearchTerm("");
    setDropdownOptions(options || []);
  };

  return (
    <div className="relative">
      {/* Your custom dropdown UI */}
      <div className={`${!showDropdown && "hidden"}`}>
        <div className="origin-top-left z-30 absolute top-full max-h-96 w-full overflow-y-auto left-0 min-w-72 bg-white border border-neutral-200 rounded shadow-lg overflow-hidden mt-1">
          <ul className="relative h-full">
            {/* Search Input */}
            <li className="py-1 px-3 sticky top-0 bg-white border-b border-neutral-200">
              <div className="relative w-full">
                <div className="absolute h-10 mt-0 left-0 top-0 flex items-center z-10">
                  <svg
                    className="h-4 pl-4 fill-current text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                  </svg>
                </div>
                <input
                  type="input"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={searchDropdown}
                  className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-10 pr-2 py-2 rounded-md"
                />
              </div>
            </li>

            {/* Options List */}
            <li className="py-1 px-3 select-none cursor-pointer min-h-[250px] max-h-[250px] overflow-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300">
              {DropdownOptions.length > 0 ? (
                DropdownOptions?.map((option, index) => {
                  const optionName = `_${option.label?.toLowerCase().replaceAll(" ", "_")}_${option.value}`;

                  return (
                    <Fragment key={index}>
                      <Checkbox
                        id={optionName}
                        name={optionName}
                        label={option?.label}
                        value={option.value}
                        checked={checkBoxState?.[option?.value] || false}
                        inputSize="small"
                        wrapperClassName="items-center"
                        labelClassName="font-medium text-gray-900 cursor-pointer"
                        onChange={(e) =>
                          checkboxHandler(e, String(option.value || ""))
                        }
                      />
                    </Fragment>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-2/3">
                  <div>No Option Found.</div>
                </div>
              )}
            </li>

            {/* Footer Actions */}
            <li className="py-2 px-3 absolute inset-x-0 bottom-0 border-l border-t border-neutral-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <button
                  className="btn bg-white border-neutral-200 !text-gray-500 hover:text-gray-700"
                  onClick={clearMainFilter}
                >
                  Clear
                </button>
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={applyMoreFilter}
                >
                  Apply
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomFilterSelectBox;
