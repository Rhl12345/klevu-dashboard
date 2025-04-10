import React, { useCallback } from "react";

import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { Label } from "@/components/Label/Label";

import { debounce } from "@/utils/helpers";
import { DEBOUNCE_DELAY } from "@/utils/constants";

import { ITableSearchProps } from "@/components/Table/types";

export const TableSearch = ({
  setGlobalFilter,
  globalFilter,
  setColumnFilteringOptions,
}: ITableSearchProps) => {
  const debouncedFetchData = useCallback(
    debounce((value: string) => {
      setColumnFilteringOptions?.((prev: any) => {
        // Remove any existing global filter
        const filteredOptions = prev.filter(
          (filter: any) => filter.field !== "global"
        );

        // Add new global filter if value exists
        if (value) {
          return [
            ...filteredOptions,
            {
              field: "global",
              operator: 0,
              value: value,
            },
          ];
        }

        return filteredOptions;
      });
    }, DEBOUNCE_DELAY),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilter?.(value);
    debouncedFetchData(value);
  };

  return (
    <div className="relative flex-grow">
      <Label htmlFor="table-search" className="sr-only">
        Search
      </Label>
      <Input
        id="table-search"
        name="search"
        type="text"
        placeholder="Search..."
        formik={false}
        value={globalFilter || ""}
        onChange={handleInputChange}
        className="p-2"
      />
      <div className="absolute inset-y-0 end-2 h-10 flex items-center pe-3 pointer-events-none">
        <SvgIcon name="SearchIcon" />
      </div>
    </div>
  );
};
