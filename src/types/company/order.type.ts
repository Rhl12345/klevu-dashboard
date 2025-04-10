export interface IOrderProductVariant {
  productImage: string;
  name: string;
  price: number;
  totalAmount: number;
  items: number;
  recStatus: "active" | "inactive" | "draft";
}
