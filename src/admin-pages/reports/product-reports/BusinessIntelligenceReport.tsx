"use client";
import React, { useEffect, useMemo, useState } from "react";
import CommonBarChart from "@/admin-pages/reports/components/CommonBarChart";
import ReportsData from "@/mock-data/reports.json";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import CommonScatterChart from "@/admin-pages/reports/components/CommonScatterChart";
import { IReportsStore } from "@/types/reports/reports";
import CommonLineChart from "@/admin-pages/reports/components/CommonLineChart";
import { PageRoutes } from "@/admin-pages/routes";

const BusinessIntelligenceReports = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });

  const memoizedData = useMemo(
    () => ({
      allTimeCustomers: ReportsData.allTimeCustomers,
      allTimeRevenueReport: ReportsData.allTimeRevenueReport,
      allTimeNumberofOrders: ReportsData.allTimeNumberofOrders,
      top10CategoryByQuantity: ReportsData.top10CategoryByQuantity,
      top10BrandsByQuantity: ReportsData.top10BrandsByQuantity,
      top10ProductsByQuantity: ReportsData.top10ProductsByQuantity,
      top10SellingDaysByRevenue: ReportsData.top10SellingDaysByRevenue,
      top10SellingDaysByQuantity: ReportsData.top10SellingDaysByQuantity,
      top10SellingDaysByOrder: ReportsData.top10SellingDaysByOrder,
      top10SellingDaysByOrderQuantity:
        ReportsData.top10SellingDaysByOrderQuantity,
      top3SellingMonthByOrder: ReportsData.top3SellingMonthByOrder,
      allTimeAverageOrders: ReportsData.allTimeAverageOrders,
      top3SellingMonthByRevenue: ReportsData.top3SellingMonthByRevenue,
      allTimeAverageCustomers: ReportsData.allTimeAverageCustomers,
      allTimeAverageRevenue: ReportsData.allTimeAverageRevenue,
      storeData: ReportsData.storeData,
    }),
    []
  );

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
    if (memoizedData.storeData.length > 0) {
      handleStoreChange(memoizedData.storeData[0]);
    }
  }, [memoizedData.storeData]);

  return (
    <>
      <ListPageHeader
        moduleName="Business Intelligence"
        navigateUrl={PageRoutes.REPORTS.LIST}
      >
        <Dropdown
          onChange={handleStoreChange}
          isClearable={false}
          defaultValue={store?.value}
          options={memoizedData.storeData}
          className="lg:w-48"
        />
      </ListPageHeader>

      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/*All Time Revenue*/}
          <div className="flex">
            <CommonBarChart
              store={store}
              title="All Time Revenue "
              data={memoizedData.allTimeRevenueReport.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Order Revenue"
              showDateFilter={false}
            />
          </div>
          {/*All Time Number of Orders*/}
          <div className="flex">
            <CommonBarChart
              store={store}
              title="All Time Number of Orders"
              data={memoizedData.allTimeNumberofOrders.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Total Orders"
              showDateFilter={false}
            />
          </div>
          {/*All Time Customers*/}
          <div className="flex">
            <CommonBarChart
              store={store}
              title="All Time Customers"
              data={memoizedData.allTimeCustomers.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Total Customers"
              showDateFilter={false}
            />
          </div>
          {/*All Time Average Revenue*/}
          <div className="flex">
            <CommonLineChart
              store={store}
              title="All Time Average Revenue"
              data={memoizedData.allTimeAverageRevenue.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Total Customers"
            />
          </div>
          {/*All Time Average Orders*/}
          <div className="flex">
            <CommonLineChart
              store={store}
              title="All Time Average Orders"
              data={memoizedData.allTimeAverageOrders.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Total Orders"
            />
          </div>
          {/*All Time Average Customers*/}
          <div className="flex">
            <CommonLineChart
              store={store}
              title="All Time Average Customers"
              data={memoizedData.allTimeAverageCustomers.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel=""
              yAxisLabel="Total Orders"
            />
          </div>
          {/*Top 10 Category by Quantity*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Category by Quantity"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10CategoryByQuantity.total}
              data={memoizedData.top10CategoryByQuantity.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Brands by Quantity*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Brands by Quantity"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10BrandsByQuantity.total}
              data={memoizedData.top10BrandsByQuantity.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Products by Quantity*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Products by Quantity"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10ProductsByQuantity.total}
              data={memoizedData.top10ProductsByQuantity.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 3 Selling Month by Revenue*/}
          <div className="flex">
            <CommonScatterChart
              store={store}
              title="Top 3 Selling Month by Revenue"
              data={memoizedData.top3SellingMonthByRevenue.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel="Orders"
              yAxisLabel="Total Orders"
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Selling Days by Revenue*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Selling Days by Revenue"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10SellingDaysByRevenue.total}
              data={memoizedData.top10SellingDaysByRevenue.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Selling Days by Quantity*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Selling Days by Revenue"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10SellingDaysByQuantity.total}
              data={memoizedData.top10SellingDaysByQuantity.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 3 Selling Month by Order*/}
          <div className="flex">
            <CommonScatterChart
              store={store}
              title="Top 3 Selling Month by Order"
              data={memoizedData.top3SellingMonthByOrder.data} // Add your chart data here
              showTooltip={true}
              xAxisLabel="Orders"
              yAxisLabel="Total Orders"
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Selling Days by Order*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Selling Days by Order"
              centerLabelText="Total"
              centerLabelValue={memoizedData.top10SellingDaysByOrder.total}
              data={memoizedData.top10SellingDaysByOrder.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
          {/*Top 10 Selling Days by Order Quantity*/}
          <div className="flex">
            <CommonPieChart
              store={store}
              title="Top 10 Selling Days by Order"
              centerLabelText="Total"
              centerLabelValue={
                memoizedData.top10SellingDaysByOrderQuantity.total
              }
              data={memoizedData.top10SellingDaysByOrderQuantity.data} // Add your chart data here
              showTooltip={true}
              showLabels={false}
              showDateFilter={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessIntelligenceReports;
