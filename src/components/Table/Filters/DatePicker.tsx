import { useState, useEffect, FC } from "react";

import Transition from "@/utils/Transition";
import RangeDatePicker from "@/components/DatePicker/RangeDatePicker";
import Button from "@/components/Button/Button";

import { IDatePickerMoreFilterProps } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";

const DatePicker = ({
  name,
  mainFilter,
  columnName = name?.toLowerCase().replaceAll(" ", "_"),
  setmainColumnFilter,
  openDropdown,
  applyMoreFilter,
}: IDatePickerMoreFilterProps) => {
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [tempdateValue, setTempDateValue] = useState<any>([null, null]);

  useEffect(() => {
    setDateValue(() => {
      var temp = mainFilter?.filter((value: any) => {
        return value.field === columnName;
      });
      if (temp && temp?.length > 0) {
        return temp[0].value.split(",") as [Date | null, Date | null];
      } else {
        return [null, null];
      }
    });
  }, [mainFilter, columnName]);

  useEffect(() => {
    if (
      tempdateValue[0] !== "" &&
      tempdateValue[1] !== "" &&
      tempdateValue[1] !== null &&
      tempdateValue[0] !== null
    ) {
      setmainColumnFilter?.({
        field: columnName,
        operator: 1,
        value: [
          getFormatDate(tempdateValue[0]).date,
          getFormatDate(tempdateValue[1]).date,
        ].join(","),
      });
    } else {
      setmainColumnFilter?.({
        field: columnName,
        operator: 1,
        value: "",
      });
    }
  }, [tempdateValue, columnName, setmainColumnFilter]);

  const onChangeHandler = (date: [Date | null, Date | null]) => {
    setTempDateValue(date);
  };

  const clearCurrentFilter = () => {
    applyMoreFilter?.(columnName);
  };

  return (
    <>
      <Transition
        appear
        className={`bg-body-light dark:bg-body-dark border-y border-b-0 border-gray-light dark:border-gray-dark max-h-96 overflow-y-auto md:overflow-visible`}
        show={openDropdown}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div className="py-5 px-3">
          <RangeDatePicker
            name={name}
            defaultStartDate={dateValue[0]}
            defaultEndDate={dateValue[1]}
            onChange={onChangeHandler}
          />
          <Button
            variant="outline-secondary"
            onClick={clearCurrentFilter}
            size="sm"
          >
            Clear
          </Button>
        </div>
      </Transition>
    </>
  );
};

export default DatePicker;
