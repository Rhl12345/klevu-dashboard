import {
  IDimensionDropDownDataResponse,
  IDimensionResponse,
} from "@/types/dimensions/dimension.type";

async function getAllDimensions(payload?: {}): Promise<IDimensionResponse> {
  // const url = "Dimension/list.json";
  // const res = await AsyncFetchh({
  //   url: url,
  //   method: "POST",
  //   data: payload,
  // });
  const response = await import("@/mock-data/DimensionList.json");
  return { ...response.default, items: response.default.items };
}

async function getAllDimensionsDropDownData(payload?: {}): Promise<
  IDimensionDropDownDataResponse[]
> {
  // const url = "Dimension/table.json";
  // const res = await AsyncFetchh({
  //   url: url,
  //   method: "POST",
  //   data: payload,
  // });

  const response = await import("@/mock-data/DimensionDropDownData.json");
  return [...response.default];
}

export { getAllDimensions, getAllDimensionsDropDownData };
