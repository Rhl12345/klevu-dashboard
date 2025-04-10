import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import React from "react";

const tierDiscountOptions = [
  { label: "Tier 1", value: "tier1" },
  { label: "Tier 2", value: "tier2" },
  { label: "Tier 3", value: "tier3" },
];

const TierDiscount = () => {
  return (
    <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
          <div className="lg:w-full">
            <Dropdown
              label="Tier"
              name="tierDiscount"
              id="tierDiscount"
              options={tierDiscountOptions}
              onChange={(value) => {}}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline-secondary"
            size="sm"
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {}}
            form="catalog-form"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TierDiscount;
