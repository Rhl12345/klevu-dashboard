async function getMailLogs() {
  const response = await import("@/mock-data/mailLog.json");
  return { ...response.default, items: response.default.items };
}

export { getMailLogs };
