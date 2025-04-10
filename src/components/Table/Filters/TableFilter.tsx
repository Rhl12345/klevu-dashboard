import React, { FC, useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from "formik";

import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Dropdown from "@/components/Table/Filters/Dropdown";
import Transition from "@/utils/Transition";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { IFilteringOption, IMoreFilterProps } from "@/components/Table/types";
import { Label } from "@/components/Label/Label";

const TableFilter = ({
  filteringOptions,
  setColumnFilteringOptions,
  moreFilterOption,
}: IMoreFilterProps) => {
  const [show, setShow] = useState(false);
  const [filter, setFilterOptions] = useState<any[]>([]);
  const [mainFilter, setMainFilter] = useState<IFilteringOption[]>([]);

  useEffect(() => {
    setMainFilter(() => {
      return (filteringOptions ? filteringOptions : []).filter((value) => {
        return value.type === "moreFilter";
      });
    });
  }, [filteringOptions, show]);

  useEffect(() => {
    setFilterOptions(moreFilterOption || []);
  }, [moreFilterOption]);

  const setmainColumnFilter = useCallback((filter: IFilteringOption) => {
    setMainFilter((prev: IFilteringOption[]) => {
      const existingItem = prev.find((value) => filter.field === value.field);
      if (!existingItem && filter.value !== "") {
        return [...prev, { ...filter, type: "moreFilter" }];
      } else {
        return prev
          .map((value) => {
            if (value.field === filter.field && filter.value === "") {
              return { ...value, value: filter.value, field: "" };
            } else if (value.field === filter.field) {
              return { ...value, value: filter.value };
            }
            return value;
          })
          .filter((value) => value.field !== "");
      }
    });
  }, []);

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFilterOptions(() => {
      return (moreFilterOption || [])?.filter((option: any) => {
        return (
          !target.value ||
          option.name.toLowerCase().includes(target.value.toLowerCase())
        );
      });
    });
  };

  const clearMainFilter = () => {
    setMainFilter([]);
    if (setColumnFilteringOptions) {
      // setColumnFilteringOptions((prev: FilteringOption[]) => {
      setColumnFilteringOptions((prev: any) => {
        return prev ? prev.filter((val: any) => val.type !== "moreFilter") : [];
      });
    }
    setShow(false);
  };

  const applyMoreFilter = () => {
    if (setColumnFilteringOptions) {
      // setColumnFilteringOptions((prev: FilteringOption[]) => {
      setColumnFilteringOptions((prev: any) => {
        return prev
          ? [
              ...prev.filter((value: any) => value.type !== "moreFilter"),
              ...mainFilter,
            ]
          : mainFilter;
      });
    }
    setShow(false);
  };

  const clearSubFilter = (filter: string) => {
    if (setColumnFilteringOptions) {
      // setColumnFilteringOptions((prev: FilteringOption[]) => {
      setColumnFilteringOptions((prev: any) => {
        return prev ? prev.filter((val: any) => val.field !== filter) : [];
      });
    }
    setShow(false);
  };

  let filterLength = filteringOptions
    ? filteringOptions.filter((value: any) => {
        return value.type === "moreFilter";
      })
    : [];

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <div className="relative inline-flex">
        <Button
          variant="outline-secondary"
          gap={1}
          onClick={() => setShow(true)}
          icon={<SvgIcon name="TableFilter" className="w-5 h-5" />}
        >
          <span className="ml-1">Filters</span>
          <span>({filterLength?.length})</span>
        </Button>

        <Transition
          appear
          show={show}
          className={`fixed h-screen right-80 left-0 top-0 bg-black opacity-60 z-50 ${
            !show && "hidden"
          }`}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
          onClick={() => setShow(false)}
        />
        <Transition
          appear
          show={show}
          className="origin-top-right z-50 fixed top-0 h-screen right-0 w-full max-w-xs bg-body-light dark:bg-secondary-dark border-l border-gray-light dark:border-gray-dark overflow-hidden overflow-y-auto"
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div className="flex flex-wrap justify-between items-center p-3 border-b border-gray-light dark:border-gray-dark">
            <div className="font-medium text-primary-light dark:text-primary-dark">
              More Filters (
              {filterLength.length > 0 && filterLength[0]?.field
                ? filterLength?.length
                : 0}
              )
            </div>
            <Button
              variant="default"
              onClick={() => setShow(false)}
              icon={<SvgIcon name="CrossIcon" className="w-5 h-5" />}
            />
          </div>
          <div>
            <div className="py-4 px-3 border-b border-gray-light dark:border-gray-dark">
              <div className="relative w-full">
                <Label htmlFor="table-search" className="sr-only">
                  Search
                </Label>
                <Input
                  id="table-search"
                  formik={false}
                  onKeyUp={search}
                  type="input"
                  placeholder="Search"
                  className="pl-8 rounded-none fill-quaternary-dark dark:fill-quaternary-light"
                />
                <div className="absolute inset-y-0 start-2 h-10 flex items-center pointer-events-none">
                  <SvgIcon name="SearchIcon" />
                </div>
              </div>
            </div>

            {filter &&
              filter.length > 0 &&
              filter.map((value, index) => {
                return (
                  <Dropdown
                    {...value}
                    key={index}
                    setShow={setShow}
                    mainFilter={mainFilter}
                    setMainFilter={setMainFilter}
                    setmainColumnFilter={setmainColumnFilter}
                    applyMoreFilter={clearSubFilter}
                  />
                );
              })}
          </div>
          <div className="py-2 px-3 border-0 border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark sticky inset-0 top-auto">
            <ul className="flex items-center justify-between">
              <li>
                <Button variant="outline-secondary" onClick={clearMainFilter}>
                  Clear
                </Button>
              </li>
              <li>
                <Button variant="primary" onClick={applyMoreFilter}>
                  Apply
                </Button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </Formik>
  );
};

export default React.memo(TableFilter);
