import { ISortingOption } from "@/components/Table/types";
import { ordersData } from "@/mock-data/ordersList.mock";
import { ColumnFiltersState } from "@tanstack/react-table";

const url = "order/get-orders";

export const getOrders = async (
  payload: IGetOrdersInput
): Promise<IGetOrdersOutput> => {
  try {
    const response: IGetOrdersOutput = {
      pageIndex: 1,
      pageSize: 25,
      items: ordersData,
      totalCount: 0,

      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
    return response;
  } catch (error) {
    console.log("API URL: ", url);
    console.log("API error: ", error);
    throw error;
  }
};

export interface IGetOrdersOutput {
  pageIndex: number;
  pageSize: number;
  items: IGetOrdersItem[];
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IGetOrdersItem {
  orderStatus: string;
  bcStatus: string;
  order: string;
  storeName: string;
  date: string;
  customerBillingInfo: {
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    pincode: string;
    streetAddress1: string;
    streetAddress2: string;
  };
  items: {
    productName: string;
    productPrice: number;
    productStatus: string;
    productQuantity: number;
    productImage: string;
    productSku: string;
    productColor: string;
    productTotal: number;
  }[];
  total: number;
  paymentType: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  shippingMethod: string;

  storeLogoUrl: string;
  name: string;
  createdDate: string;
  createdName: string;
  modifiedDate: string;
  modifiedName: string;
  email: string;
  customerId: string;
  shoppingCartId: string;
  subTotal: number;
}

export interface IGetOrdersInput {
  pageIndex: number;
  pageSize: number;
  activeSort: ISortingOption[];
  activeFilters: ColumnFiltersState;
}
