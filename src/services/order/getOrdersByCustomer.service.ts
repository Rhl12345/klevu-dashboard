import { IGetOrdersOutput } from "./getOrders.service"; // Importing the output interface
import { ordersData } from "@/mock-data/ordersList.mock"; // Assuming this contains order details

const url = "order/get-orders-by-customer";

export const getOrdersByCustomer = async (
  customerId: string
): Promise<IGetOrdersOutput> => {
  try {
    // Filter orders based on the customer ID
    const customerOrders = ordersData.filter((order) => order.customerId === customerId);

    if (!customerOrders.length) {
      throw new Error("No orders found for this customer");
    }

    // Return the orders in the expected format
    return {
      pageIndex: 1,
      pageSize: customerOrders.length,
      totalCount: customerOrders.length,
      items: customerOrders,
      totalPages: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  } catch (error) {
    console.log("API URL: ", url);
    console.log("API error: ", error);
    throw error;
  }
}; 