"use client";

import CommonLineChart from "@/admin-pages/reports/components/CommonLineChart";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { IDropdownOption } from "@/components/Table/types";
import lifeCycle from "@/mock-data/lifeCycle.json";
import ReportsData from "@/mock-data/reports.json";
import { IReportsStore } from "@/types/reports/reports";
import { useMemo, useState } from "react";

const LifeCycleSection = () => {
  const [value, setValue] = useState("");
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);

  return (
    <>
      <div className="border rounded-none border-gray-light dark:border-gray-dark">
        <ContentPageHeader name="Life Cycle">
          <div className="flex flex-wrap gap-2">
            <Dropdown
              id="store"
              name="Store"
              options={storeData}
              className="w-[250px]"
              isClearable
            />
            <Dropdown
              id="product"
              name="Product"
              options={lifeCycle.productData}
              defaultValue={lifeCycle.productData[0].value}
              onChange={(event) => {
                setValue(String((event as IDropdownOption).value));
              }}
              className="w-[250px]"
            />
          </div>
        </ContentPageHeader>

        <CommonLineChart
          className="m-6 mt-2 !w-auto"
          title=""
          data={lifeCycle.lifeTabData}
          showTooltip={true}
          xAxisLabel={`${value === "product Order" ? "Orders Quantity" : "Inventory"} `}
          yAxisLabel=""
          showDateFilter={true}
        />
      </div>
    </>
  );
};

export default LifeCycleSection;
