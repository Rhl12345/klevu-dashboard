async function getExportHistoryList() {
  const response = await import("@/mock-data/historyList.json");
  return { ...response.default, items: response.default.items };
}

export { getExportHistoryList };
