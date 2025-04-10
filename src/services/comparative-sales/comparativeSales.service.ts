async function getComparativeSalesReport() {
  const response = await import("@/mock-data/comparativeSalesReport.json");
  return { ...response.default, items: response.default.items };
}

export { getComparativeSalesReport };
