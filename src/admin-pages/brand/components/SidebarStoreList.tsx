import React, { useState, useCallback, useMemo } from "react";
import Image from "@/components/Image/Image";
import {
  ISidebarStoreListProps,
  IStoreSearchEvent,
} from "@/types/brand/brand.types";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { debounce } from "@/utils/helpers";

/**
 * SidebarStoreList Component
 * Displays a searchable list of stores grouped by store type in a sidebar
 *
 * @param {ISidebarStoreListProps} props - Component props
 * @param {Array} props.storeType - Array of store types with their associated stores
 */
const SidebarStoreList = ({ storeType }: ISidebarStoreListProps) => {
  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Memoized computation of filtered store list based on search term
   * - If searchTerm exists, filters stores by name
   * - If no searchTerm, returns original store list
   * - Removes store types with no matching stores
   */
  const filteredStoreList = useMemo(
    () =>
      searchTerm
        ? storeType
            .map((value) => ({
              ...value,
              storeList: value.storeList.filter((store) =>
                store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
              ),
            }))
            .filter((value) => value.storeList.length > 0)
        : storeType,
    [storeType, searchTerm]
  );

  // Debounced search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  const handleSearch = useCallback(
    (e: IStoreSearchEvent) => {
      debouncedSetSearch(e.target.value.trim());
    },
    [debouncedSetSearch]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="bg-body-light dark:bg-body-dark">
        <div className="py-2 mb-2">
          <Input
            label="Sales Channels and Stores"
            type="text"
            onChange={handleSearch}
            formik={false}
            placeholder="Search Store"
          />
        </div>
      </div>

      {filteredStoreList.map((store) => (
        <div className="flex flex-col gap-2 mb-2" key={store.storeType}>
          <Label>{store.storeType}</Label>
          <ul className="flex flex-col gap-2">
            {store.storeList.map((str, index) => (
              <li key={index} className="">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex w-full gap-2 relative items-center overflow-hidden">
                    <span className="absolute top-0 bottom-0 my-auto left-0 bg-green-500 text-white rounded-full text-center w-2 h-2 items-center inline-flex mr-1">
                      &nbsp;
                    </span>
                    <div className="h-12 w-16 flex items-center justify-center overflow-hidden rounded-none pl-4">
                      <div className="h-12 w-16 p-2 flex justify-center items-center border border-gray-light dark:border-gray-dark bg-white dark:bg-body-dark">
                        <div className="flex justify-center items-center">
                          <Image
                            variant="next"
                            className="max-w-full max-h-full rounded-none"
                            src={str.storeImagePath}
                            alt={`${str.storeName} logo`}
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-[calc(100%-5rem)] overflow-hidden truncate">
                      <Label weight="font-normal">{str.storeName}</Label>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SidebarStoreList;
