import React from "react";
import PieChart from "@/components/charts/pie-chart/PieChart";
import { STORE_TYPE_TOTAL_ORDER } from "@/mock-data/order-deshboard/orderDeshboardChartData";
import { IStoreNameProps } from "@/types/order-deshboard/orderByCustomerAndEmployee.type";

const StoreTypeTotalOrder = ({ storeName }: IStoreNameProps) => {
  return (
    <PieChart
      title="Store Type Total Order"
      data={STORE_TYPE_TOTAL_ORDER}
      storeName={storeName}
      showTooltip={true}
      showLabels={false}
      centerLabel={{
        text: "Total Order",
        value: "4",
      }}
      className="h-full"
      tooltipFormatter={(value, name) => [`${value} reviews`, name]}
    />
  );
};

export default StoreTypeTotalOrder;
