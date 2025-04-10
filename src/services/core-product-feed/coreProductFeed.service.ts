import {
  IMasterProduct,
  IProductListResponse,
} from "@/types/core-product-feed/coreProductFeed.type";
import { IProductVariant } from "@/types/core-product-feed/productVariant.type";
import dayjs from "dayjs";

export const getCoreProductDetails = async (id: string) => {
  try {
    // For now using mock data, replace with actual API call
    return {
      productId: "1",
      productName: "Peter Millar Men's Gingham Performance Jersey Polo",
      description: `Men's 92% polyester / 8% spandex polo
Four-way stretch, wicking, easy-care and odor-resistant properties
UPF 50+ sun protection
Sean self-fabric collar, three-button placket
Custom-designed print inspired by the seventies
Machine wash with like colors; Tumble dry low
Do not iron
Do not dry clean`,
      status: "active",
      vendorSku: "MS25EK15S",
      sku: "MS25EK15S",
      brand: "5", // Brand ID
      vendor: "4", // Vendor ID
      productType: "fg",
      shortDescription: "Short description here",
      longDescription: "Long description here",
      specifications: "Product specifications",
      features: "Product features",
      msrp: 100,
      ourCost: 50,
      salePrice: 75,
      isImapEnabled: false,
      imap: 0,
      volume: 100,
      length: 10,
      width: 5,
      height: 2,
      category: "32", // Category ID
      gender: "male",
      taxCode: "US-TAX",
      searchDimensionTemplate: "5",
      companionProduct: "1",
      weight: 10,
      shipWeight: 12,
      hasDifferentErpName: true,
      differentErpName: "Different ERP Name",
      pageRedirectionUrl: "",
      hasExistingErpId: true,
      erpItemId: "1234567890",
      imageUrl:
        "https://storagemedia.corporategear.com/betastoragemedia/1/mastercatalog/attributeimages/ms25ek15s-bsea_1.jpg?0.623088943273957",
      updatedBy: "John Doe",
      updatedAt: dayjs().subtract(2, "day").toISOString(),
      productReadiness: 70,
      seoReadiness: 80,
    };

    //TODO: fetch the product details from the backend once the API is ready
    // const response = await AsyncFetch<Product>({
    //   method: "GET",
    //   url: `/api/products/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data: Omit<IMasterProduct, "id">) => {
  try {
    return {
      ...data,
      id: Math.floor(Math.random() * 1000),
    };

    //TODO: create the product from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "POST",
    //   url: `/api/products`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  data: Partial<IMasterProduct>
) => {
  try {
    return {
      ...data,
      id: parseInt(id),
    };

    //TODO: update the product from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PUT",
    //   url: `/api/products/${id}`,
    //   data: data,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const getProductList = async ({
  args: {
    pageIndex = 1,
    pageSize = 25,
    sortingOptions = [],
    filteringOptions = [],
  },
}: {
  args: {
    pageIndex?: number;
    pageSize?: number;
    sortingOptions?: Array<{
      field: string;
      direction: number;
      priority: number;
    }>;
    filteringOptions?: Array<any>;
  };
}): Promise<IProductListResponse> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/core-product-feed/coreProductFeed.json"
    );

    const items = response.default.data.items
      ?.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      .map((item) => item as IMasterProduct);

    return {
      items,
      pageIndex,
      pageSize,
      totalCount: response.default.data.items.length,
      totalPages: Math.ceil(response.default.data.items.length / pageSize),
      hasNextPage: pageIndex * pageSize < response.default.data.items.length,
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

export const deleteProduct = async (id: number) => {
  try {
    // For now using mock data, replace with actual API call
    return { id };

    //TODO: delete the product from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "DELETE",
    //   url: `/api/products/${id}`,
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const updateProductStatus = async (id: number, status: string) => {
  try {
    // For now using mock data, replace with actual API call
    return { id, status };

    //TODO: active/inactive the product from the backend once the API is ready
    // const response = await AsyncFetch({
    //   method: "PUT",
    //   url: `/api/products/${id}`,
    //   data: { status: status },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const getProductVariantList = async (): Promise<IProductVariant[]> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/core-product-feed/productVariantData.json"
    );

    const items = response.default.data.map((item) => item as IProductVariant);

    return items;

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
