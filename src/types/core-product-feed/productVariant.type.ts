export interface IProductVariant {
  productImage: string;
  productId: number;
  ourSKU: string;
  name: string;
  recStatus: "active" | "inactive" | "draft";

  upc: string;
  price: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  lastNavSyncDate: string;
  navSyncStatus: string | null;
  isCloned: boolean;
  rowVersion: string;
  quantity: number;
  storeLogoUrl: string | null;
  displayOrderSize: number;
  displayOrderColor: number;
  attributeOptionColor: string;
}
  