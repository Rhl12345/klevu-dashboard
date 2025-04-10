async function getAllShippingCharges(payload = {}) {
  const response = await import("@/mock-data/ShippingCharges.json");

  return { ...response.default, items: [...response.default.items] };
}

export { getAllShippingCharges };
