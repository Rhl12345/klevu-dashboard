export interface IRevenueSummary {
    srno: number | string;
    month: string;
    total_orders: number;
    subtotal: number;
    tax: number;
    shipping: number;
    refund: number;
    discount: number;
    adj_amount: number;
    total: number;
  }
  
  export interface ISortingOption {
    field: string;
    direction: number;
    priority: number;
  }
  
  export interface IFilteringOption {
    field: string;
    operator: string;
    value: string | number | boolean;
  }
  
  export interface IFooterData {
    srno: string;
    total_orders: string | number;
    subtotal: string;
    tax: string;
    shipping: string;
    refund: string;
    discount: string;
    adj_amount: string;
    total: string;
  }
  