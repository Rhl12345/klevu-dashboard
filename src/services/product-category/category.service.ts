import CategoryList from "@/mock-data/CategoryList.json";
import {
  ICategory,
  IProductWithCategoryList,
} from "@/types/product-category/productCategory.type";

export const getCategoryDetails = async (id: string): Promise<ICategory> => {
  try {
    // For now using mock data, replace with actual API call
    const category = CategoryList.items.find((item) => item.id === +id);
    if (!category) {
      throw new Error("Category not found");
    }
    return {
      categoryName: category?.name,
      parentCategory: category?.parentCategoryId?.toString(),
      description: category?.description || "",
      status: category?.recStatus === "A" ? "active" : "inactive",
    };

    //TODO: fetch the category details from the backend once the API is ready
    // const response = await AsyncFetch<ICategory>({
    //   method: "GET",
    //   url: `/api/categories/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data: any) => {
  try {
    return {
      ...data,
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    //TODO: create the category details from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "POST",
    //   url: `/api/categories`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    return {
      ...data,
      id: id,
    };

    //TODO: update the category details from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PUT",
    //   url: `/api/categories/${id}`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const getProductsWithCategories = async (payload: {
  pageIndex: number;
  pageSize: number;
  categoryId: string;
  sortingOptions: any;
}): Promise<IProductWithCategoryList> => {
  try {
    //TODO: fetch the products with category ID from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "POST",
    //   url: `/api/products/categories/${id}`,
    //   data: payload,
    // });
    // return response;

    // For now using mock data, replace with actual API call
    const response = await import("@/mock-data/productWithCategoriesList.json");
    return { ...response.default, items: response.default.items?.slice(0, 25) };
  } catch (error) {
    throw error;
  }
};

export const getCategoryList = async ({
  pageIndex = 1,
  pageSize = 25,
  sortingOptions = [],
  filteringOptions = [],
}: {
  pageIndex?: number;
  pageSize?: number;
  sortingOptions?: Array<{
    field: string;
    direction: number;
    priority: number;
  }>;
  filteringOptions?: Array<any>;
}) => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import("@/mock-data/CategoryList.json");
    return { ...response.default, items: response.default.items?.slice(0, 25) };

    //TODO: fetch the category list from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "POST",
    //   url: `/api/categories`,
    //   data: payload,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    // For now using mock data, replace with actual API call
    return { id: id };

    //TODO: delete the category from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "DELETE",
    //   url: `/api/categories/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const activeInactiveCategory = async (id: number, status: string) => {
  try {
    // For now using mock data, replace with actual API call
    return { id: id, status: status };

    //TODO: active/inactive the category from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PUT",
    //   url: `/api/categories/${id}`,
    //   data: { status: status },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
