import React, { useState, useMemo, FC } from "react";

import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Loader from "@/components/common/Loader";

import vendorMockData from "@/mock-data/Vendor.json";

import { IBrand } from "@/types/vendor/vendor.type";
import { useDebounce } from "@/utils/helpers";

// Memoize SearchSection
const SearchSection = React.memo<{
  value: string;
  onChange: (value: string) => void;
}>(({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent special characters in search
    const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    onChange(sanitizedValue);
  };

  return (
    <div className="flex flex-wrap gap-2 lg:space-y-0 space-y-6 p-4 lg:p-6">
      <h2 className="w-full text-base font-semibold text-quaternary-dark dark:text-quaternary-light">
        Brands
      </h2>
      <div className="w-full relative md:w-full flex flex-col gap-2">
        <label className="sr-only" htmlFor="searchBrand">
          Search
        </label>
        <Input
          id="searchBrand"
          name="searchBrand"
          value={value}
          onChange={handleChange}
          placeholder="Search"
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <SvgIcon name="SearchIcon" />
        </div>
      </div>
    </div>
  );
});

// Memoize BrandItem
const BrandItem = React.memo<{ brand: IBrand }>(({ brand }) => (
  <div className="px-2 py-3 border-b border-gray-light dark:border-gray-dark text-quaternary-dark dark:text-quaternary-light text-xs">
    <div className="flex items-center justify-between">
      <div className="mr-2">{brand.name}</div>
      <div>{brand.count}</div>
    </div>
  </div>
));

const BrandInformation: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery);

  // Update filteredBrands to use debouncedSearchQuery
  const filteredBrands = useMemo(() => {
    return vendorMockData.brands.filter((brand) =>
      brand.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery]); // Changed dependency to debouncedSearchQuery

  if (isLoading) return <Loader />;

  return (
    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
      <div className="grid grid-cols-1">
        {/* Search Section */}
        <SearchSection value={searchQuery} onChange={setSearchQuery} />

        {/* Brands List Section */}
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6 p-4 lg:p-6 border-t border-gray-light dark:border-gray-dark">
          <div className="lg:w-6/12">
            {filteredBrands.length === 0 ? (
              <div className="text-center py-4 text-quaternary-dark dark:text-quaternary-light">
                No brands found
              </div>
            ) : (
              filteredBrands.map((brand) => (
                <BrandItem key={brand.id} brand={brand} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInformation;
