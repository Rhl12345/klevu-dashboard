async function getManualBrandInventoryList() {
  const response = await import("@/mock-data/manualBrandInventory.json");
  return { ...response.default, items: response.default.items };
}

export { getManualBrandInventoryList };
