import {
  IPaginatedVendorResponse,
  IVendorFormValues,
  IVendorListPayload,
} from "@/types/Vendor/vendor.type";
import { AsyncFetch } from "../axios.util";

export const getVendorList = async (
  payload: IVendorListPayload
): Promise<IPaginatedVendorResponse> => {
  try {
    const url = "vendors/getall";
    const response: any = await AsyncFetch<IPaginatedVendorResponse>({
      url: url,
      method: "POST",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVendorById = async (id: string) => {
  try {
    const url = `/vendors/getbyvendorid/${id}`;
    const response: any = await AsyncFetch({
      url: url,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createVendor = async (payload: IVendorFormValues) => {
  try {
    const url = `/vendors/create`;
    const response: any = await AsyncFetch({
      url: url,
      method: "POST",
      data: payload,
    });
    return response;
  } catch (errors) {
    throw errors;
  }
};

export const updateVendor = async (id: number, payload: IVendorFormValues) => {
  try {
    const url = `/vendors/update/${id}`;
    const response: any = await AsyncFetch({
      url: url,
      method: "PUT",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteVendor = async (id: number) => {
  try {
    const url = `/vendors/delete/${id}`;
    const response: any = await AsyncFetch({
      url: url,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
