import {
  IDiscountTable,
  IDiscountTableList,
  IDiscountTableFormValues,
  ISortingOption,
  IFilterOption,
} from "@/types/discount-table/discountTable.type";

export const getDiscountTableDetails = async (
  id: string
): Promise<IDiscountTable> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/discount-tables/DiscountTableList.json"
    );
    const items = response.default.items as IDiscountTable[];
    const discountTable = items.find((item) => item.id === id);
    if (!discountTable) {
      throw new Error("Discount table not found");
    }
    return discountTable;

    //TODO: fetch the discount table details from the backend once the API is ready
    // const response = await AsyncFetch<IDiscountTable>({
    //   method: "GET",
    //   url: `/api/discount-tables/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const createDiscountTable = async (
  data: IDiscountTableFormValues
): Promise<IDiscountTable> => {
  try {
    // For now using mock data, replace with actual API call
    return {
      ...data,
      id: "1",
      storeName: "",
      brandName: "",
      vendorName: "",
      createdDate: "",
      createdName: "System",
      modifiedDate: null,
      modifiedName: null,
      recStatus: "A",
      default: false,
    };

    //TODO: create the discount table from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "POST",
    //   url: `/api/discount-tables`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateDiscountTable = async (
  id: string,
  data: IDiscountTableFormValues
): Promise<IDiscountTable> => {
  try {
    // For now using mock data, replace with actual API call
    return {
      ...data,
      id,
      storeName: "",
      brandName: "",
      vendorName: "",
      createdDate: "",
      createdName: "System",
      modifiedDate: "",
      modifiedName: "System",
      recStatus: "A",
      default: false,
    };

    //TODO: update the discount table from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PUT",
    //   url: `/api/discount-tables/${id}`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const getDiscountTableList = async ({
  pageIndex = 1,
  pageSize = 25,
  sortingOptions = [],
  filteringOptions = [],
}: {
  pageIndex?: number;
  pageSize?: number;
  sortingOptions?: ISortingOption[];
  filteringOptions?: IFilterOption[];
}): Promise<IDiscountTableList> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/discount-tables/DiscountTableList.json"
    );
    const items = response.default.items?.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    ) as IDiscountTable[];
    return {
      ...response.default,
      items,
      pageIndex,
      pageSize,
      totalPages: Math.ceil(response.default.items.length / pageSize),
      hasNextPage: pageIndex * pageSize < response.default.items.length,
      hasPreviousPage: pageIndex > 1,
    };

    //TODO: fetch the discount table list from the backend once the API is ready
    // const response = await AsyncFetch<IDiscountTableList>({
    //   method: "POST",
    //   url: `/api/discount-tables`,
    //   data: {
    //     pageIndex,
    //     pageSize,
    //     sortingOptions,
    //     filteringOptions,
    //   },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDiscountTable = async (
  id: string
): Promise<{ id: string }> => {
  try {
    // For now using mock data, replace with actual API call
    return { id };

    //TODO: delete the discount table from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "DELETE",
    //   url: `/api/discount-tables/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateDiscountTableStatus = async (
  id: string,
  status: "A" | "I"
): Promise<{ id: string; status: "A" | "I" }> => {
  try {
    // For now using mock data, replace with actual API call
    return { id, status };

    //TODO: update the discount table status from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PATCH",
    //   url: `/api/discount-tables/${id}/status`,
    //   data: { status },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const cloneDiscountTable = async (
  id: string,
  data: IDiscountTableFormValues
): Promise<IDiscountTable> => {
  try {
    // For now using mock data, replace with actual API call
    return {
      ...data,
      id: "1",
      storeName: "",
      brandName: "",
      vendorName: "",
      createdDate: "",
      createdName: "System",
      modifiedDate: null,
      modifiedName: null,
      recStatus: "A",
      default: false,
    };

    //TODO: clone the discount table from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "POST",
    //   url: `/api/discount-tables/${id}/clone`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
