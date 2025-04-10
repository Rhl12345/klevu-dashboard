import { AsyncFetch } from "@/services/axios.util";
import {
  IPageRedirect,
  IPageRedirectFormValues,
  IPageRedirectListPayload,
  IPageRedirectListResponse,
} from "@/types/page-redirect/pageRedirect.type";

export const getPageRedirectList = async (
  payload: IPageRedirectListPayload
): Promise<IPageRedirectListResponse> => {
  try {
    const url = "page-redirect/getall";
    const response: IPageRedirectListResponse =
      await AsyncFetch<IPageRedirectListResponse>({
        url: url,
        method: "POST",
        data: payload,
      });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPageRedirectById = async (
  id: string
): Promise<IPageRedirect> => {
  try {
    const url = `/page-redirect/getbyid/${id}`;
    const response = await AsyncFetch<IPageRedirect>({
      url: url,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createPageRedirect = async (
  payload: IPageRedirectFormValues
): Promise<IPageRedirect> => {
  try {
    const url = `/page-redirect/create`;
    const response = await AsyncFetch<IPageRedirect>({
      url: url,
      method: "POST",
      data: payload,
    });
    return response;
  } catch (errors) {
    throw errors;
  }
};

export const updatePageRedirect = async (
  id: number,
  payload: IPageRedirect
) => {
  try {
    const url = `/page-redirect/update/${id}`;
    const res = await AsyncFetch({
      url: url,
      method: "PUT",
      data: payload,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePageRedirect = async (
  id: number
): Promise<IPageRedirect> => {
  try {
    const url = `/page-redirect/delete/${id}`;
    const res: IPageRedirect = await AsyncFetch({
      url: url,
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw error;
  }
};
