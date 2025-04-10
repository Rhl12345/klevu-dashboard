// For now using mock data, replace with actual API call later
import mockData from "@/mock-data/vendorWiseProductReport.json";
import { IVendorWiseProductReportRequest, IVendorWiseProductReportResponse } from "@/types/vendorwise-product-report/vendorwiseProductReport.type";

export const fetchVendorWiseProductReport = async (
  payload: IVendorWiseProductReportRequest
): Promise<IVendorWiseProductReportResponse> => {
  try {
    //TODO: fetch the vendor wise product report data from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "GET",
    //   url: `/api/vendor-wise-product-report`,
    //   data: payload,
    // });
    // return response;

    const vendorWiseProductReport = mockData;

    // Simulate pagination
    const startIndex = (payload.pageIndex - 1) * payload.pageSize;
    const endIndex = startIndex + payload.pageSize;
    const paginatedItems = vendorWiseProductReport.items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: vendorWiseProductReport.totalCount,
      totalPages: Math.ceil(vendorWiseProductReport.totalCount / payload.pageSize),
      hasPreviousPage: payload.pageIndex > 1,
      hasNextPage: endIndex < vendorWiseProductReport.totalCount,
    };
  } catch (error) {
    console.error("Error fetching vendor-wise product report data:", error);
    throw error;
  }
};
