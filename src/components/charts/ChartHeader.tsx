import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { ICommonChartProps } from "@/types/charts/charts.type";
import { useCallback } from "react";
import Text from "@/components/Text/Text";

const ChartHeader = ({
  title,
  dateFilter,
  dropdownFilter,
  dateRange,
  storeName,
}: Omit<ICommonChartProps, "children" | "className" | "showTooltip">) => {
  const handleStoreChange = useCallback(
    (selected: any) => {
      if (!dropdownFilter?.onStoreChange) return;

      if (selected) {
        dropdownFilter.onStoreChange({
          label: selected.label,
          value: selected.value,
        });
      } else {
        dropdownFilter.onStoreChange(
          {} as { label: string; value: string | number }
        );
      }
    },
    [dropdownFilter?.onStoreChange]
  );
  return (
    <div className="p-4 lg:p-6 border-b border-gray-light dark:border-gray-dark">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Label size="large">{title}</Label>
        <div className="flex items-center gap-2">
          {dateFilter?.showDateFilter && (
            <div className="flex max-md:flex-col max-md:w-full items-center gap-2">
              <Input
                type="date"
                name="startDate"
                formik={false}
                value={dateFilter?.startDate?.toISOString().split("T")[0]}
                onChange={(e) =>
                  dateFilter?.onStartDateChange(new Date(e.target.value))
                }
              />
              <Text size="sm">to</Text>
              <Input
                type="date"
                name="endDate"
                formik={false}
                value={dateFilter?.endDate?.toISOString().split("T")[0]}
                onChange={(e) =>
                  dateFilter?.onEndDateChange(new Date(e.target.value))
                }
              />
            </div>
          )}
          {dropdownFilter?.showDropdown && dropdownFilter?.dropdownOptions && (
            <Dropdown
              id="store-selector"
              options={dropdownFilter.dropdownOptions}
              onChange={handleStoreChange}
              value={
                dropdownFilter.dropdownOptions.find(
                  (item) => item.value === dropdownFilter.selectedOption
                ) || null
              }
              className="w-64"
              isMulti={false}
              isClearable={false}
            />
          )}
        </div>
      </div>
      {(storeName || dateRange) && (
        <div className="text-sm text-left">
          {storeName && (
            <Label size="small" className="mr-2">
              {`Store: ${storeName}`}
            </Label>
          )}
          {dateRange && (
            <Label size="small">
              <span className="text-cyan-600">({dateRange})</span>
            </Label>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartHeader;
