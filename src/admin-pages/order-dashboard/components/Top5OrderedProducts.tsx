import React from "react";
import PieChart from "@/components/charts/pie-chart/PieChart";
import { TOP_5_ORDERED_PRODUCTS } from "@/mock-data/order-deshboard/orderDeshboardChartData";
import { IStoreNameProps } from "@/types/order-deshboard/orderByCustomerAndEmployee.type";

const Top5OrderedProducts = ({ storeName }: IStoreNameProps) => {
  return (
    <PieChart
      title="Top 5 Ordered Products"
      data={TOP_5_ORDERED_PRODUCTS}
      storeName={storeName}
      showTooltip={true}
      showLabels={false}
      className="h-full"
      tooltipFormatter={(value, name) => [`${value} reviews`, name]}
    />
  );
};

export default Top5OrderedProducts;
