import { useState, useEffect, useCallback, Fragment, ChangeEvent } from "react";

import Transition from "@/utils/Transition";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";

import { ICheckboxGroupProps, IDropdownOption } from "@/components/Table/types";

const CheckboxGroup = ({
  options,
  name,
  type,
  mainFilter,
  setMainFilter,
  columnName = name?.toLowerCase().replaceAll(" ", "_"),
  conditionalSearch = false,
  setmainColumnFilter,
  openDropdown,
  setShow,
  applyMoreFilter,
  ...rest
}: ICheckboxGroupProps) => {
  const [checkboxButtonValue, setCheckboxButtonValue] = useState<string[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([]);

  useEffect(() => {
    setCheckboxButtonValue(() => {
      const temp = mainFilter.filter((value: any) => {
        return value.field === columnName;
      });
      if (temp.length > 0) {
        return temp[0].value.split(",");
      } else {
        return [];
      }
    });
  }, [mainFilter, columnName]);

  useEffect(() => {
    setDropdownOptions(options || []);
  }, [options]);

  const checkboxHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setmainColumnFilter({
          field: columnName,
          operator: 1,
          value: [...checkboxButtonValue, e.target.value].join(","),
        });
      } else {
        const checkboxValues = [...checkboxButtonValue];
        const index = checkboxValues.indexOf(e.target.value);
        if (index > -1) {
          checkboxValues.splice(index, 1);
        }
        setmainColumnFilter({
          field: columnName,
          operator: 1,
          value: checkboxValues.join(","),
        });
      }
    },
    [checkboxButtonValue, columnName, setmainColumnFilter]
  );

  const searchDropdown = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDropdownOptions(() => {
        return (
          options?.filter((option: IDropdownOption) => {
            return (
              e.target.value === "" ||
              option?.label
                ?.toLowerCase()
                .includes(e.target?.value.toLowerCase())
            );
          }) || []
        );
      });
    },
    [options]
  );

  const clearCurrentFilter = () => {
    applyMoreFilter(columnName);
  };

  return (
    <Transition
      appear
      className={`bg-body-light dark:bg-secondary-dark border-y border-b-0 border-gray-light dark:border-gray-dark max-h-96 overflow-y-auto overflow-hidden relative`}
      show={openDropdown}
      enter="transition ease-out duration-200 transform"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0"
    >
      <ul>
        {/* dropdownOptions.length > 5 */}
        {(!conditionalSearch || conditionalSearch) &&
          options &&
          options.length > 5 && (
            <li className="py-2 px-3 sticky top-0 bg-body-light dark:bg-secondary-dark border-b border-gray-light dark:border-gray-dark overflow-hidden">
              <div className="relative w-full">
                <Input
                  formik={false}
                  onKeyUp={searchDropdown}
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search"
                  className="pl-8 rounded-none fill-quaternary-dark dark:fill-quaternary-light"
                />
                <div className="absolute inset-y-0 start-2 h-10 flex items-center pointer-events-none">
                  <SvgIcon name="SearchIcon" />
                </div>
              </div>
            </li>
          )}
        {dropdownOptions?.map((option, index) => {
          const optionName = `${columnName}_${
            option.label
              ? option?.label?.toLowerCase().replaceAll(" ", "_")
              : ""
          }_${option.value}`;
          return (
            <Fragment key={index}>
              <li
                className="py-2 px-3 bg-body-light dark:bg-body-dark overflow-hidden"
                key={index}
              >
                <Label className="flex items-center">
                  <Checkbox
                    onChange={checkboxHandler}
                    type={"checkbox"}
                    name={optionName}
                    id={optionName}
                    // className={`form-checkbox`}
                    value={option.value}
                    checked={checkboxButtonValue.includes(
                      option.value.toString()
                    )}
                  />
                  <span className="text-sm text-quaternary-dark dark:text-quaternary-light font-medium ml-2">
                    {option?.label}
                  </span>
                </Label>
              </li>
            </Fragment>
          );
        })}

        {dropdownOptions?.length === 0 ? (
          <li className="text-center py-2 text-sm">No record found.</li>
        ) : (
          <li className="py-2 px-3 sticky bottom-0 border-y border-t mt-px bg-body-light dark:bg-body-dark border-b border-gray-light dark:border-gray-dark z-10">
            <Button variant="outline-secondary" onClick={clearCurrentFilter}>
              Clear
            </Button>
          </li>
        )}
      </ul>
    </Transition>
  );
};

export default CheckboxGroup;
