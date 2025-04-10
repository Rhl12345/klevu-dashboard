interface IManualBrandInventoryResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IManualBrandInventoryItem[];
}

interface IManualBrandInventoryItem {
  brandId: number;
  combinationId: number;
  systemSKU: string;
  style: string;
  size: string;
  color: string;
  actualInventory: number;
  bufferInventory: number;
  inventory: number;
  navInventory: number;
  totalInventory: number;
  updateOn: string;
  log: string;
  productAttributeOptionId: number;
  productAttributeId: number;
  productId: number;
  createdName: string;
  modifiedName: string;
  modifiedDate: string;
  createdDate: string;
  recStatus: string;
  brand: string;
  vendor: string;
}

interface IModalOpen {
  isOpen: boolean;
  type: "uploadBrandInventory" | "importExportManualBrandInventory" | null;
}

export type {
  IManualBrandInventoryResponse,
  IManualBrandInventoryItem,
  IModalOpen,
};
