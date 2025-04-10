

export interface IMasterProductInventoryItem  {
    systemsku: string;
    brand: string;
    vendor: string;
    style: string;
    color: string;
    size: string;
    vendor_inv: number;
    buffer_inv: number;
    bc_inv: number;
    inventory: number;
    date_time_of_update: string;
  };

  export interface IFilterOption {
    filter: string;
    name: string;
  }