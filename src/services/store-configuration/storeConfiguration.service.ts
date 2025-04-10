class StoreConfiguration {
  async getAll(payload = {}) {
    try {
      //   const url = "Store/list.json";
      //   const res = await AsyncFetch({
      //     url: url,
      //     method: "POST",
      //     data: payload,
      //   });

      const response = await import("@/mock-data/StoreConfiguration.json");

      return { ...response.default, items: response.default.items };
    } catch (error) {
      throw error;
    }
  }

  async getDropDownValues(payload = {}) {
    // const url = "dropdown/table.json";
    // const res = await AsyncFetch({
    //   url,
    //   method: "POST",
    //   data: payload,
    // });

    const response = await import(
      "@/mock-data/StoreConfigurationDropDownData.json"
    );

    return [...response.default];
  }
}

const storeConfiguration = new StoreConfiguration();

export default storeConfiguration;
