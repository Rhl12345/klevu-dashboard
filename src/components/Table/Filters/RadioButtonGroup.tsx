import React, { useState, useEffect, useCallback } from "react";
import Transition from "@/utils/Transition";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Button from "@/components/Button/Button";
import RadioGroup from "@/components/RadioGroup/RadioGroup";

const RadioButtonGroup = ({
  options,
  name,
  type,
  mainFilter,
  setMainFilter,
  columnName = name.toLowerCase().replaceAll(" ", "_"),
  conditionalSearch = false,
  setmainColumnFilter,
  setColumnFilteringOptions,
  openDropdown,
  setShow,
  applyMoreFilter,
  ...rest
}: any) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [radioButtonValue, setRadioButtonvalue] = useState("");
  const radioButtonHandleChange = (e: any) => {
    setmainColumnFilter({
      field: columnName,
      operator: 0,
      value: e.target.value,
    });
  };
  useEffect(() => {
    setRadioButtonvalue(() => {
      var temp = mainFilter.filter((value: any) => {
        return value.field === columnName;
      });
      if (temp.length > 0) {
        return temp[0].value;
      } else {
        return "";
      }
    });
  }, [mainFilter, columnName, setRadioButtonvalue]);
  useEffect(() => {
    setDropdownOptions(options);
  }, [options]);

  // useEffect(() => {
  //   setRadioButtonvalue(mainFilter[columnName]);
  // }, [mainFilter, columnName]);

  const searchDropdown = useCallback(
    (e: any) => {
      setDropdownOptions(() => {
        return options.filter((option: any, index: any) => {
          return (
            e.target.value === "" ||
            option?.label?.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
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
        {(!conditionalSearch || conditionalSearch) && options.length > 5 && (
          <li className="py-2 px-3 sticky top-0 bg-body-light dark:bg-secondary-dark border-b border-gray-light dark:border-gray-dark overflow-hidden">
            <div className="relative flex-grow">
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
        {dropdownOptions.map((option: any, index: any) => {
          var optionName =
            columnName +
            "_" +
            (option.label
              ? option.label.toLowerCase().replaceAll(" ", "_")
              : "") +
            "_" +
            option.value;
          return (
            <li className="py-1 px-3" key={index}>
              <label className="flex items-center">
                <RadioGroup
                  onChange={radioButtonHandleChange}
                  type={"radio"}
                  name={columnName}
                  id={optionName}
                  value={option.value}
                  checked={radioButtonValue === option.value}
                />
                <span className="text-sm font-medium ml-2">
                  {option?.label}
                </span>
              </label>
            </li>
          );
        })}

        {dropdownOptions?.length === 0 ? (
          <li className="text-center">No record found.</li>
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
export default React.memo(RadioButtonGroup);
