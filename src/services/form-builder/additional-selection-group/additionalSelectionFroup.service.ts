import mockData from "@/mock-data/form-builder/additionalSelectionGroup.json";

export const fetchAdditionalSelectionGroupList = async (
  request: any
): Promise<any> => {
  try {
    // TODO: Replace with actual API call
    const response = mockData;

    // Correct startIndex calculation
    const startIndex =
      ((request.pageIndex || 1) - 1) * (request.pageSize || 25);
    const endIndex = startIndex + (request.pageSize || 25);
    const paginatedItems = response.data.items.slice(startIndex, endIndex);

    const totalCount = response.data.items.length;
    const pageSize = request.pageSize || 25;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      items: paginatedItems,
      pageIndex: request.pageIndex || 1,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPages: totalPages,
      hasPreviousPage: (request.pageIndex || 1) > 1,
      hasNextPage: endIndex < totalCount,
    };
  } catch (error) {
    console.error("Error in fetchPrimarySelectGroupList:", error);
    throw error;
  }
};
