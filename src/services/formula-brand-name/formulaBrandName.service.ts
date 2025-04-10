import { IFormulaBrandNamePaginatedResponse } from "@/types/formula-brand-names/formulaBrandName.type";
import { IFormulaBrandNameForm } from "@/types/formula-brand-names/formulaBrandName.type";
import { AsyncFetch } from "../axios.util";

export const getFormulaBrandNameList = async (
  payload: IFormulaBrandNameForm
): Promise<IFormulaBrandNamePaginatedResponse> => {
  try {
    const url = "formula-brand-names/getall";
    const response: any = await AsyncFetch<IFormulaBrandNamePaginatedResponse>({
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
    const url = `/formula-brand-names/getbyid/${id}`;
    const res: any = await AsyncFetch({
      url: url,
      method: "GET",
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const createFormulaBrandName = async (
  payload: IFormulaBrandNameForm
) => {
  try {
    const url = `/formula-brand-names/create`;
    const res: any = await AsyncFetch({
      url: url,
      method: "POST",
      data: payload,
    });
    return res;
  } catch (errors) {
    throw errors;
  }
};

export const updateFormulaBrandName = async (
  id: string,
  payload: IFormulaBrandNameForm
) => {
  try {
    const url = `/formula-brand-names/update/${id}`;
    const res: any = await AsyncFetch({
      url: url,
      method: "PUT",
      data: payload,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteFormulaBrandName = async (id: number) => {
  const url = `/formula-brand-names/delete/${id}`;
  const res: any = await AsyncFetch({
    url: url,
    method: "DELETE",
  });
  return res;
};
