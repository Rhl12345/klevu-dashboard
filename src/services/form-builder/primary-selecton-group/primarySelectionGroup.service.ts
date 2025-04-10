
import mockData from "@/mock-data/primarySelectionGroup.json";
import { IPrimarySelectGroupListRequest, IPrimarySelectGroupProduct } from "@/types/primary-selection-group/primarySelectionGroup.type";
import { IPrimarySelectGroupResponse } from "@/types/primary-selection-group/primarySelectionGroup.type";

export const fetchPrimarySelectGroupList = async (
  request: IPrimarySelectGroupListRequest
): Promise<IPrimarySelectGroupResponse> => {
  try {
    // TODO: Replace with actual API call
    const response = mockData as IPrimarySelectGroupResponse;

    // Correct startIndex calculation
    const startIndex = ((request.pageIndex || 1) - 1) * (request.pageSize || 25);
    const endIndex = startIndex + (request.pageSize || 25);
    const paginatedItems = response.items.slice(startIndex, endIndex);

    const totalCount = response.items.length;
    const pageSize = request.pageSize || 25;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      items: paginatedItems,
      pageIndex: request.pageIndex || 1,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPages: totalPages,
      hasPreviousPage: (request.pageIndex || 1) > 1,
      hasNextPage: endIndex < totalCount
    };
  } catch (error) {
    console.error("Error in fetchPrimarySelectGroupList:", error);
    throw error;
  }
};

export const addSelectedBrand = async (
  request: IPrimarySelectGroupListRequest, 
  selectedRows?: IPrimarySelectGroupProduct[]
) => {
  try {
    // TODO: Replace with actual API call
    const response = mockData as IPrimarySelectGroupResponse;
    
    // Combine existing items with selected rows
    const allItems = [...response.items, ...(selectedRows || [])];
    const totalCount = allItems.length;
    const pageSize = request.pageSize || 25;
    
    // Calculate correct page index based on total items
    const maxPageIndex = Math.ceil(totalCount / pageSize);
    const pageIndex = Math.min(request.pageIndex || 1, maxPageIndex);
    
    // Calculate correct start and end indices
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = allItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPages: maxPageIndex,
      hasPreviousPage: pageIndex > 1,
      hasNextPage: endIndex < totalCount
    };
  } catch (error) {
    console.error("Error in addSelectedBrand:", error);
    throw error;
  }
};

