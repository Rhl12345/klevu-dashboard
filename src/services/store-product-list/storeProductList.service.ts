import { IStoreProductList } from "@/types/store-product-list/storePorductList";

import StoreList from "@/mock-data/StoreProductList.json";

// Add type for the response structure
// Add at the top with other imports
type StoreListKey = "all" | "active" | "inactive" | "draft" | "bundle";

export const getStoreProductList = async ({
  args: {
    storeId,
    storeType,
    storeName,
    pageIndex = 1,
    pageSize = 25,
    sortingOptions = [],
    filteringOptions = [
      {
        field: "status",
        operator: 0,
        value: "all",
        type: "moreFilter",
      },
    ],
  },
}: {
  args: {
    storeId: string;
    storeType: string;
    storeName: string;
    pageIndex?: number;
    pageSize?: number;
    sortingOptions?: Array<{
      field: string;
      direction: number;
      priority: number;
    }>;
    filteringOptions: Array<{
      field: string;
      operator: number;
      value: any;
      type: string;
    }>;
  };
}) => {
  try {
    // For now using mock data, replace with actual API call

    const items = StoreList[filteringOptions[0].value as StoreListKey].items
      ?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      .map((item) => item as IStoreProductList);

    console.log(
      Math.ceil(
        StoreList[filteringOptions[0].value as StoreListKey].totalCount /
          pageSize
      )
    );

    return {
      items,
      pageIndex,
      pageSize,
      totalCount:
        StoreList[filteringOptions[0].value as StoreListKey].totalCount,
      totalPages: Math.ceil(
        StoreList[filteringOptions[0].value as StoreListKey].totalCount /
          pageSize
      ),
      hasNextPage:
        pageIndex * pageSize <
        StoreList[filteringOptions[0].value as StoreListKey].totalCount,
      hasPreviousPage: pageIndex > 1,
    };

    //TODO: fetch the product list from the backend once the API is ready
    // const response = await AsyncFetch<ProductListResponse>({
    //   method: "POST",
    //   url: `/api/products`,
    //   data: {
    //     pageIndex,
    //     pageSize,
    //     sortingOptions,
    //     filteringOptions
    //   },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
