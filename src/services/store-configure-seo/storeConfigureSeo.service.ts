import storeConfigureSeo from "@/mock-data/storeConfigureSeo.json";
import { IStoreConfigureSeo } from "@/types/store-configure-seo/storeConfigureSeo.type";

export const getStoreConfigureSeo = async () => {
  try {
    return storeConfigureSeo;
    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "GET",
    //     url: "/api/seo-configuration",
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};

export const saveStoreConfigureSeo = async (data: IStoreConfigureSeo) => {
  try {
    return data;

    // TODO: Implement actual API call
    // const response = await AsyncFetch({
    //     method: "POST",
    //     url: "/api/seo-configuration",
    //     data: { data },
    // });
    // return response;
  } catch (error) {
    throw error;
  }
};
