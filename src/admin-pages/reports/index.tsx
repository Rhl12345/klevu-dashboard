"use client";

import Dropdown from "@/components/DropDown/DropDown";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import ReportsData from "@/mock-data/reports.json";
import { IReportsStore } from "@/types/reports/reports";
import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import CommonBarChart from "@/admin-pages/reports/components/CommonBarChart";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
/**
 * Reports dashboard component that displays various store metrics and reports
 * including product status, sync status, orders, and customer data
 */
const Reports = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const storeData = useMemo(() => ReportsData.storeData, []);
  const productSyncStatusReport = useMemo(
    () => ReportsData.productSyncStatusReport,
    []
  );
  const productStatusReport = useMemo(
    () => ReportsData.productStatusReport,
    []
  );

  const orderReport = useMemo(() => ReportsData.orderReport, []);

  const customerOrderReport = useMemo(
    () => ReportsData.customerOrderReport,
    []
  );

  const productReadyScore = useMemo(() => ReportsData.productReadyScore, []);

  const topTenBrands = useMemo(() => ReportsData.topTenBrands, []);

  const handleStoreChange = (newStore: unknown) => {
    if (newStore as IReportsStore) {
      setStore((prev) => ({
        ...prev,
        label: (newStore as IReportsStore).label,
        value: (newStore as IReportsStore).value,
      }));
    } else {
      setStore({ label: "", value: "" });
    }
  };

  useEffect(() => {
    if (storeData.length > 0) {
      handleStoreChange(storeData[0]);
    }
  }, [storeData]);

  return (
    <>
      <ListPageHeader moduleName="Klevu Reports" name="Klevu Reports">
      </ListPageHeader>

      {/* Circle Chart AND Bar Chart */}
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonPieChart
              store={store}
              title="Product Status Report"
              centerLabelText="Total"
              centerLabelValue={productStatusReport.total}
              data={productStatusReport.data}
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonPieChart
              store={store}
              title="Product Sync Status Report"
              centerLabelText="Total"
              centerLabelValue={productSyncStatusReport.total}
              data={productSyncStatusReport.data}
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>

          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonBarChart
              store={store}
              title="Product Ready Score"
              xAxisLabel=""
              yAxisLabel="Number of Products"
              data={productReadyScore.data}
              showTooltip={true}
              showDateFilter={false}
            />
          </div>
          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonPieChart
              store={store}
              title="Order Report"
              centerLabelText="Total"
              centerLabelValue={orderReport.total}
              data={orderReport.data}
              showTooltip={true}
              showLabels={false}
              showDateFilter={true}
            />
          </div>
          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonPieChart
              store={store}
              title="Customer Order Report"
              centerLabelText="Total"
              centerLabelValue={customerOrderReport.total}
              data={customerOrderReport.data}
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
            <CommonBarChart
              store={store}
              title="Top Ten Brands"
              xAxisLabel="Brand"
              yAxisLabel="Number of Products"
              data={topTenBrands.data}
              showTooltip={true}
              showDateFilter={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
