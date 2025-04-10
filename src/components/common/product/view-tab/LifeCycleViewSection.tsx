"use client";

import React, { useMemo, useState } from "react";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { IReportsStore } from "@/types/reports/reports";
import ReportsData from "@/mock-data/reports.json";
import CommonLineChart from "@/admin-pages/reports/components/CommonLineChart";
import lifeCycle from "@/mock-data/lifeCycle.json";
import { IDropdownOption } from "@/components/Table/types";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";

const LifeCycleViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tabId: number) => void;
}) => {
  const [value, setValue] = useState("");
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);

  return (
    <>
      <div className="border rounded-none border-gray-light dark:border-gray-dark">
        <ContentPageHeader name="">
          <div className="flex flex-wrap gap-2 mb-4">
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
              defaultValue={lifeCycle.productData[1].value}
              onChange={(event) => {
                setValue(String((event as IDropdownOption).value));
              }}
              className="w-[250px]"
              isClearable
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

export default LifeCycleViewSection;
