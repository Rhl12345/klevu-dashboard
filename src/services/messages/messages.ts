import { IMessageFormValues } from "@/types/global-messages/messages.type";
import { AsyncFetch } from "../axios.util";

export const addMessage = async (data: IMessageFormValues) => {
  try {
    const response = await AsyncFetch({
      url: "/api/messages",
      method: "POST",
      data: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMessage = async (data: IMessageFormValues) => {
  try {
    const response = await AsyncFetch({
      url: "/api/messages",
      method: "PUT",
      data: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await AsyncFetch({
      url: "/api/messages",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMessageById = async (id: number) => {
  try {
    const response = await AsyncFetch({
      url: `/api/messages/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteMessage = async (id: number) => {
  try {
    const response = await AsyncFetch({
      url: `/api/messages/${id}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
