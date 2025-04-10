import React from "react";
import PieChart from "@/components/charts/pie-chart/PieChart";
import { ORDER_SYNCED_DETAILS } from "@/mock-data/order-deshboard/orderDeshboardChartData";
import { IStoreNameProps } from "@/types/order-deshboard/orderByCustomerAndEmployee.type";

const OrderSyncedDetails = ({ storeName }: IStoreNameProps) => {
  return (
    <PieChart
      title="Order Synced Details"
      data={ORDER_SYNCED_DETAILS}
      storeName={storeName}
      showTooltip={true}
      showLabels={false}
      className="h-full"
      tooltipFormatter={(value, name) => [`${value} reviews`, name]}
    />
  );
};

export default OrderSyncedDetails;
