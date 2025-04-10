import { sizeMaster } from "@/mock-data/sizeMaster";
import { ISizeMasterPayload } from "@/types/sizemaster/sizemaster.type";

export const fetchSizeMasterList = async (payload: ISizeMasterPayload) => {
  try {
    //TODO: fetch the size master data from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "GET",
    //   url: `/api/size-master`,
    //   data: payload,
    // });
    // return response;

    // For now using mock data, replace with actual API call
    const response = sizeMaster;

    // Simulate pagination
    const startIndex = (payload.pageIndex - 1) * payload.pageSize;
    const endIndex = startIndex + payload.pageSize;
    const paginatedItems = response.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: response.length,
      totalPages: Math.ceil(response.length / payload.pageSize),
      hasPreviousPage: payload.pageIndex > 1,
      hasNextPage: endIndex < response.length,
    };
  } catch (error) {
    console.error("Error fetching size master data:", error);
    throw error;
  }
};

export const getSizeMasterById = async (id: string) => {
  try {
    // Simulate fetching a single size master item by ID
    const response = sizeMaster;

    // Find the item by ID (assuming each item has an 'id' property)
    const item = response.find((item: any) => item.id == id);

    if (!item) {
      throw new Error("Size master not found");
    }

    return item;
  } catch (error) {
    console.error("Error fetching size master by ID:", error);
    throw error;
  }
};
