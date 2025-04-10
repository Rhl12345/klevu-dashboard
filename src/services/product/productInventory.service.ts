import { IProductInventoryData } from "@/types/product/product.type";
import dayjs from "dayjs";
export const getProductInventoryData = async (
  productId: string,
  variantId: string
): Promise<IProductInventoryData[]> => {
  try {
    const response = await import(
      "@/mock-data/product-database/attributeCombinationData.json"
    );
    const data = response.default?.map((item, index) => ({
      imageUrl: item.varientImagePath,
      variant: item.varientName,
      sku: item.sku,
      quantity: 0,
      vendor: index === 0 ? "974" : "1100",
      id: item.id,
      subRows: item.subRows.map((subRow) => ({
        imageUrl: subRow.varientImagePath,
        variant: subRow.varientName,
        sku: subRow.sku,
        quantity: Math.floor(Math.random() * 100),
        parent: item.id,
        vendor: index === 0 ? "974" : "1100",
        id: subRow.id,
        futureInventory: [
          {
            date: dayjs()
              .add(Math.floor(Math.random() * 100), "day")
              ?.toISOString(),
            quantity: Math.floor(Math.random() * 100),
          },
          {
            date: dayjs()
              .add(Math.floor(Math.random() * 100), "day")
              ?.toISOString(),
            quantity: Math.floor(Math.random() * 100),
          },
        ],
      })),
    }));
    if (variantId === "all") {
      return data;
    }
    return data.filter((item) => item.vendor === variantId);
  } catch (error) {
    throw error;
  }
};
