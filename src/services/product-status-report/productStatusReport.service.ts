// For now using mock data, replace with actual API call later
import mockData from "@/mock-data/productStatusReport.json";
import { IProductStatusReportRequest, IProductStatusReportResponse } from "@/types/product-status-report/productStatusReport.type";

export const fetchProductStatusReport = async (
  payload: IProductStatusReportRequest
): Promise<IProductStatusReportResponse> => {
  try {
    //TODO: fetch the product status report data from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "GET",
    //   url: `/api/product-status-report`,
    //   data: payload,
    // });
    // return response;

    const productStatusReport = mockData;

    // Simulate pagination
    const startIndex = (payload.pageIndex - 1) * payload.pageSize;
    const endIndex = startIndex + payload.pageSize;
    const paginatedItems = productStatusReport.items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: productStatusReport.totalCount,
      totalPages: Math.ceil(productStatusReport.totalCount / payload.pageSize),
      hasPreviousPage: payload.pageIndex > 1,
      hasNextPage: endIndex < productStatusReport.totalCount,
    };
  } catch (error) {
    console.error("Error fetching product status report data:", error);
    throw error;
  }
};
