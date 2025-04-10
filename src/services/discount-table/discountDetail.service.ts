import { IDiscountDetail } from "@/types/discount-table/discountDetail.type";

export const getDiscountsDetail = async (
  quantityId: string | number,
  params: any
): Promise<IDiscountDetail[]> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/discount-tables/DiscountDetailList.json"
    );
    return response.default.items.map((item: any) => item) as IDiscountDetail[];

    //TODO: fetch the discount details from the backend once the API is ready
    // const response = await axios.post(`api/admin/DiscountDetail/getAll/${quantityId}`, params);
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDiscountsDetailById = async (
  id: string
): Promise<IDiscountDetail> => {
  try {
    // For now using mock data, replace with actual API call
    const response = await import(
      "@/mock-data/discount-tables/DiscountDetailList.json"
    );
    const detail = response.default.items.find((item: any) => item.id === id);
    if (!detail) {
      throw new Error("Discount detail not found");
    }
    return detail as IDiscountDetail;

    //TODO: fetch the discount detail by id from the backend once the API is ready
    // const response = await axios.get(`api/admin/DiscountDetail/getById/${id}`);
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDiscountsDetail = async (data: {
  quantityDiscountDetailModel: IDiscountDetail;
}): Promise<IDiscountDetail> => {
  try {
    // For now using mock data, replace with actual API call
    return {
      ...data.quantityDiscountDetailModel,
      id: "1",
      createdDate: "",
      createdBy: "System",
      modifiedDate: null,
      modifiedBy: null,
      recStatus: "active",
    };

    //TODO: create the discount detail from the backend once the API is ready
    // const response = await axios.post("api/admin/DiscountDetail/create", data);
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDiscountsDetail = async (data: {
  quantityDiscountDetailModel: IDiscountDetail;
}): Promise<IDiscountDetail> => {
  try {
    // For now using mock data, replace with actual API call
    return {
      ...data.quantityDiscountDetailModel,
      modifiedDate: "",
      modifiedBy: "System",
      recStatus: "active",
    };

    //TODO: update the discount detail from the backend once the API is ready
    // const response = await axios.put("api/admin/DiscountDetail/update", data);
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMultipleStatus = async (data: {
  args: {
    idsRowVersion: Array<{ item1: string; item2: string }>;
    status: string;
  };
}): Promise<boolean> => {
  try {
    // For now using mock data, replace with actual API call
    return true;

    //TODO: update multiple status from the backend once the API is ready
    // const response = await axios.put("api/admin/DiscountDetail/updateStatus", data);
    // return response.data;
  } catch (error) {
    throw error;
  }
};
