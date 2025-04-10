export interface ITrashListData {
  name: string;
  domain: string;
  contact: string;
  openDate: {
    date: string;
    time: string;
  };
  closeDate: {
    date: string;
    time: string;
  };
  storeId: string;
  orders: string;
  products: string;
  createdDate: {
    date: string;
    time: string;
  };
  createdBy: string;
  updatedDate: {
    date: string;
    time: string;
  };
  updatedBy: string;
  status: string;
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}
