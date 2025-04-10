import productRequirementList from "@/mock-data/product-requirement/productRequirement.json";
import {
  IProductSeoRequirement,
  IProductSeoRequirementFilter,
  IProductSeoRequirementFormValues,
  IProductSeoRequirementList,
} from "@/types/product-seo-requirement/productSeoRequirement.type";

export const getProductRequirementList = async ({
  pageIndex = 1,
  pageSize = 25,
  sortingOptions = [],
  filteringOptions = [],
}: IProductSeoRequirementFilter): Promise<IProductSeoRequirementList> => {
  try {
    // For now using mock data
    const response = await import(
      "@/mock-data/product-requirement/productRequirement.json"
    );
    return response.default;

    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "POST",
    //     url: "/api/product-requirements",
    //     data: { pageIndex, pageSize, sortingOptions, filteringOptions },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProductRequirement = async (
  id: number
): Promise<{ id: number }> => {
  try {
    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "DELETE",
    //     url: `/api/product-requirements/${id}`,
    // });
    // return response;
    return { id };
  } catch (error) {
    throw error;
  }
};

export const activeInactiveProductRequirement = async (
  id: number,
  status: string
): Promise<{ id: number; status: string }> => {
  try {
    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "PUT",
    //     url: `/api/product-requirements/${id}/status`,
    //     data: { status },
    // });
    // return response;
    return { id, status };
  } catch (error) {
    throw error;
  }
};

export const createProductRequirement = async (
  paload: Omit<IProductSeoRequirementFormValues, "id">
): Promise<IProductSeoRequirement> => {
  try {
    return productRequirementList?.items[0];
    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "POST",
    //     url: `/api/product-requirements`,
    //     data: payload,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateProductRequirement = async (
  payload: IProductSeoRequirementFormValues
): Promise<IProductSeoRequirement> => {
  try {
    return productRequirementList?.items[0];

    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "PUT",
    //     url: `/api/product-requirements/${id}`,
    //     data: payload,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const getProductRequirement = async (
  id: number
): Promise<IProductSeoRequirement | null> => {
  try {
    return productRequirementList?.items.find((item) => item.id === id) || null;

    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "GET",
    //     url: `/api/product-requirements/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
