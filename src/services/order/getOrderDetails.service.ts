import { IGetOrdersItem } from "./getOrders.service"; // Importing the item interface
import { ordersData } from "@/mock-data/ordersList.mock"; // Assuming this contains order details

const url = "order/get-order-details";

export const getOrderDetails = async (
  orderId: string
): Promise<IGetOrdersItem> => {
  debugger;

  try {
    const orderDetails = ordersData.find((order) => order.order === orderId);

    if (!orderDetails) {
      throw new Error("Order not found");
    }

    return orderDetails;
  } catch (error) {
    console.log("API URL: ", url);
    console.log("API error: ", error);
    throw error;
  }
};
