import { ICouponCodePayload } from "@/types/promotions/promotions.type";

export const getCouponCodeList = async (payload: ICouponCodePayload) => {
  try {
    //TODO: fetch the coupon code data from the backend once the API is ready
    // const response = await AsyncFetch<any>({
    //   method: "GET",
    //   url: `/api/coupon-code`,
    //   data: payload,
    // });
    // return response;

    // For now using mock data, replace with actual API call
    const response = await import("@/mock-data/couponCode");
    const { couponCode } = response;

    let filteredData = [...couponCode];

    // Filter based on status
    if (payload.status) {
      filteredData = filteredData.filter(
        (item) => item.status?.toLowerCase() === payload.status?.toLowerCase()
      );
    }

    // Filter based on store
    // if (payload.store) {
    //   filteredData = filteredData.filter(
    //     (item) => item.storeName === payload.store
    //   );
    // }

    // Simulate pagination
    const startIndex = (payload.pageIndex - 1) * payload.pageSize;
    const endIndex = startIndex + payload.pageSize;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize,
      totalCount: filteredData.length,
      totalPages: Math.ceil(filteredData.length / payload.pageSize),
      hasPreviousPage: payload.pageIndex > 1,
      hasNextPage: endIndex < filteredData.length,
    };
  } catch (error) {
    throw error;
  }
};  

export const getCouponCodeById = async (id: string) => {
  try {
    // Simulate fetching a single size master item by ID
    const response = await import("@/mock-data/couponCode");
    const { couponCode } = response;

    // Find the item by ID (assuming each item has an 'id' property)
    const item = couponCode.find((item: any) => item.id == id);

    if (!item) {
      throw new Error("Size master not found");
    }

    return item;
  } catch (error) {
    console.error("Error fetching size master by ID:", error);
    throw error;
  }
};


const updateStatus = async (id: number, status: string) => {
  try {
    //TODO: Update status via API once ready
    // const response = await axios.put(`/api/coupon-code/status/${id}/${status}`);
    // return response.data;
    return { id, status };
  } catch (error) {
    throw error;
  }
};

const deleteCouponCode = async (id: number) => {
  try {
    //TODO: Delete via API once ready
    // const response = await axios.delete(`/api/coupon-code/${id}`);
    // return response.data;
    return { id };
  } catch (error) {
    throw error;
  }
};

export const CouponCodeService = {
  getCouponCodeList,
  updateStatus,
  deleteCouponCode,
};
