interface IDimensionItem {
  id: number;
  name: string;
  gender: string;
  productType: string;
  subProductType: string;
  length: number;
  width: number;
  height: number;
  volume: number;
  createdName: string;
  modifiedName: string | null;
  categoryId: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

interface IDimensionResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IDimensionItem[];
}

interface IDimensionDropDownDataResponse {
  value: string;
  label: string;
}

interface IDimenSionsProps {
  id?: string;
}

interface IDimenSionsPayload {
  name: string;
  categoryId: string;
  length: number | null;
  width: number | null;
  height: number | null;
  recStatus: string;
}

export type {
  IDimensionItem,
  IDimenSionsProps,
  IDimenSionsPayload,
  IDimensionResponse,
  IDimensionDropDownDataResponse,
};
