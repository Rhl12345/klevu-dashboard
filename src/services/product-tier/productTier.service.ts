
// For now using mock data, replace with actual API call later
import mockData from "@/mock-data/productTier.json";
import { IProductTierListRequest, IProductTierListResponse } from "@/types/product-tier/productTier.type";

export const fetchProductTierList = async (
  request: IProductTierListRequest
): Promise<IProductTierListResponse> => {
  // TODO: Replace with actual API call
  return mockData as IProductTierListResponse;
};

export const updateProductTierStatus = async (
  id: number,
  status: "A" | "I"
): Promise<boolean> => {
  // TODO: Replace with actual API call

  return true;
};


export const getProductTierById = async (id: string) => {
  try {
    // Simulate fetching a single size master item by ID
    const response = mockData;

    // Find the item by ID (assuming each item has an 'id' property)
    const item = response.items.find((item: any) => item.id == id);

    if (!item) {
      throw new Error("Product tier not found");
    }

    return item;
  } catch (error) {
    console.error("Error fetching product tier by ID:", error);
    throw error;
  }
};
