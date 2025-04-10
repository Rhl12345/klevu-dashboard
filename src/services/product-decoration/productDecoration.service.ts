async function getAllProductDecoration(payload = {}) {
  const response = await import("@/mock-data/ProductDecoration.json");

  return { ...response.default, items: [...response.default.items] };
}

export default getAllProductDecoration;
