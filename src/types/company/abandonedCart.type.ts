export interface IAbandonedCartItem {
  id: number;
  customerId: string;
  shoppingCartId: string;
  subTotal: string;  // Keep as string since it comes as "$249.99" format
  name: string;
  email: string;
  storeLogoUrl: string;
  storeName: string;
  date: string;
  vc: string;
  sendMail: string;
  recStatus: "active" | "inactive";
}

export interface IModalState {
  isOpen: boolean;
  type: "delete" | "activeInactive" | "viewHistory" | null;
  selectedCart: IAbandonedCartItem | null;
}

export interface ITableColumn {
  id: string;
  accessorKey: string;
  header: string;
  cell?: (props: ITableCellProps) => React.ReactNode;
  enableSorting?: boolean;
}

export interface ITableCellProps {
  row: {
    original: IAbandonedCartItem;
  };
} 