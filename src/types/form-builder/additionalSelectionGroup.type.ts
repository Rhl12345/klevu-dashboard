export interface IAdditionalSelectionGroupRowData {
  id: number;
  productImage: string | string[];
  name: string;
  ourSKU: string;
  upc: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  category: string;
  createdDate: string;
  createdName: string;
  modifiedDate: string;
  modifiedName: string;
  recStatus: string;
  subRows?: IAdditionalSelectionGroupRowData[];
}
