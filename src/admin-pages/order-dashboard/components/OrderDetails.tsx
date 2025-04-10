import React from "react";
import PieChart from "@/components/charts/pie-chart/PieChart";
import { ORDER_DETAILS } from "@/mock-data/order-deshboard/orderDeshboardChartData";
import { IStoreNameProps } from "@/types/order-deshboard/orderByCustomerAndEmployee.type";
const OrderDetails = ({ storeName }: IStoreNameProps) => {
  return (
    <PieChart
      title="Order Details"
      data={ORDER_DETAILS}
      storeName={storeName}
      showTooltip={true}
      showLabels={false}
      centerLabel={{
        text: "Order Total",
        value: "4",
      }}
      className="h-full"
      tooltipFormatter={(value, name) => [`${value} reviews`, name]}
    />
  );
};

export default OrderDetails;
