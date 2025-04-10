export interface IPhoneOrder {
  id: number;
  logoUrl: string;
  name: string;
  storeTypeName: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: "active" | "inactive";
}

export interface IPhoneOrderListProps {
  data: IPhoneOrder[];
  isLoading?: boolean;
  error?: Error | null;
  onSort?: (field: string, direction: "asc" | "desc") => void;
  onLogin?: (url: string) => void;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  };
}
