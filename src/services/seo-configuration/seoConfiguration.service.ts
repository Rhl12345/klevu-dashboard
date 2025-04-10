import seoConfiguration from "@/mock-data/seoConfiguration.json";
import { ISeoConfiguration } from "@/types/seo-configuration/seoConfiguration.type";

export const getSeoConfiguration = async () => {
  try {
    return seoConfiguration;
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

export const saveSeoConfiguration = async (data: ISeoConfiguration) => {
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
