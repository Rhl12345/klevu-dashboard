import {
  IFormBuilderStoreDetails,
  IStoreBuilderStoreDetails,
  IStoreDetail,
} from "@/types/products-database/productDatabase.type";

export const getStoreDetails = async (
  storeType: string,
  storeName: string
): Promise<IStoreDetail | null> => {
  try {
    const response = await import(
      "@/mock-data/product-database/storeListData.json"
    );
    const storeDetails = response.default.find(
      (item) => item.storeType === storeType && item.storeName === storeName
    );
    return storeDetails ? (storeDetails as IStoreDetail) : null;
  } catch (error) {
    throw new Error("Failed to fetch store details");
  }
};

export const getStoreBuilderStoreDetails = async (
  storeId: string,
  storeType: string,
  storeName: string
): Promise<IStoreBuilderStoreDetails> => {
  try {
    const response = await import(
      "@/mock-data/product-database/storeBuilderStore.json"
    );
    const storeDetails = response.default.find((item) => item.id === storeId);
    if (!storeDetails) {
      throw new Error("Store not found");
    }
    return storeDetails as IStoreBuilderStoreDetails;
  } catch (error) {
    throw new Error("Failed to fetch store details");
  }
};

export const getFormBuilderStoreDetails = async (
  storeId: string,
  storeType: string,
  storeName: string
): Promise<IFormBuilderStoreDetails> => {
  try {
    const response = await import(
      "@/mock-data/product-database/formBuilderStore.json"
    );
    const storeDetails = response.default.find((item) => item.id === storeId);
    if (!storeDetails) {
      throw new Error("Store not found");
    }
    return storeDetails as IFormBuilderStoreDetails;
  } catch (error) {
    throw new Error("Failed to fetch store details");
  }
};
