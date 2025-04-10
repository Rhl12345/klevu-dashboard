class ColorsService {
  async getAll(payload = {}) {
    // const url = "Color/list.json";
    // const res = await AsyncFetchh({
    //   url: url,
    //   method: "POST",
    //   data: payload,
    // });

    const response = await import("@/mock-data/Colors.json");

    return { ...response.default, items: [...response.default.items] };
  }
}

const colorsService = new ColorsService();

export default colorsService;
