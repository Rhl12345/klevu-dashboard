async function getAll(payload = {}) {
  // const url = "LogoLocation/list.json";
  // const res = await AsyncFetchh({
  //   url: url,
  //   method: "POST",
  //   data: payload,
  // });

  const response = await import("@/mock-data/LogoLocation.json");
  return { ...response.default, items: [...response.default.items] };
}

async function logoLocationDetails(payload = {}) {
  const response = await import("@/mock-data/LogoLocationDetail.json");
  return { ...response.default, items: [...response.default.items] };
}

async function manageLogoLocation(payload = {}) {
  // const url = `/dropdown/table.json`;
  // const res = await AsyncFetch({
  //   url: url,
  //   method: "POST",
  //   data: payload,
  // });

  const response = await import("@/mock-data/ManageLogoLocation.json");
  return [...response.default];
}

export { getAll, logoLocationDetails, manageLogoLocation };
