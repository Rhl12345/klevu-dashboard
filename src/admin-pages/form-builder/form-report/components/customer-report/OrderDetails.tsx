import React from "react";

import Text from "@/components/Text/Text";
import { Label } from "@/components/Label/Label";

import CustomerReportList from "@/admin-pages/form-builder/form-report/components/customer-report/CustomerReportList";
import { IOrder, IOrderProduct } from "@/types/form-builder/formReport.type";

const OrderDetails = ({ order }: { order: IOrder }) => {
  const DATA_FLAT_PRODUCTS: IOrderProduct[] = order.products.map((product) => ({
    productName: product.productName,
    size: product.size,
    color: product.color,
    quantity: product.quantity,
    paid: Number(product.paid.toFixed(2)),
  }));

  return (
    <>
      <div className="bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark p-4 lg:p-6">
        <Label>{order.orderId}</Label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          <Label>Billing Name:</Label> <Text>{order.billingName}</Text>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Label>Billing Email:</Label> <Text>{order.billingEmail}</Text>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Label>Payment Method:</Label>{" "}
          <Text>{order.paymentMethod.toLowerCase()}</Text>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Label>Order Date:</Label> <Text>{order.orderDate}</Text>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Label>Shipping Address:</Label> <Text>{order.shippingAddress}</Text>
        </div>
      </div>

      <CustomerReportList data={DATA_FLAT_PRODUCTS} />
    </>
  );
};

export default OrderDetails;
