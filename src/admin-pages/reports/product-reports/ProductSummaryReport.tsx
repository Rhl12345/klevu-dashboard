"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReportsData from "@/mock-data/reports.json";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import Dropdown from "@/components/DropDown/DropDown";
import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import Button from "@/components/Button/Button";
import { IChartData, IReportsStore } from "@/types/reports/reports";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
const ProductSummary = () => {
  // Strongly typed state
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const [chartData, setChartData] = useState<IChartData>(
    ReportsData.productSummaryReport
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Memoized values with proper typing
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);

  // Properly typed handler
  const handleStoreChange = (newStore: unknown) => {
    if (newStore as IReportsStore) {
      setStore({
        label: (newStore as IReportsStore).label,
        value: (newStore as IReportsStore).value,
      });
      // Add API call to fetch new data
      fetchProductData((newStore as IReportsStore).value);
    } else {
      setStore({ label: "", value: "" });
    }
  };

  // Add API integration
  const fetchProductData = async (storeId: string) => {
    setLoading(true);
    try {
      // Replace with actual API call
      //   const response = await fetch(`/api/products/summary/${storeId}`);
      //   const data = await response.json();
      setChartData(ReportsData.productSummaryReport);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = {
        data: { success: true, data: "https://www.google.com" },
      };

      if (response.data.success) {
        toast.success("Exported successfully");
        window.open(response.data.data, "_blank");
      } else {
        toast.error(getErrorMessage("Export failed"));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeData.length > 0) {
      handleStoreChange(storeData[0] as IReportsStore);
    }
  }, [storeData]);

  return (
    <div>
      <ListPageHeader
        moduleName="Product Summary Report"
        showBackButton={false}
      >
        <Button
          onClick={() => {
            toast.success("Exported successfully");
          }}
        >
          Export
        </Button>
        <Dropdown
          name="storeName"
          id="storeName"
          options={storeData}
          className="lg:w-48"
        />
      </ListPageHeader>
      <div className=" xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent  ">
        <CommonPieChart
          store={store}
          title="Product Summary Report"
          centerLabelText="Total Products"
          centerLabelValue={chartData.total}
          data={chartData.data}
          showTooltip={true}
          showLabels={false}
          showDateFilter={false}
        />
      </div>
    </div>
  );
};

export default ProductSummary;
