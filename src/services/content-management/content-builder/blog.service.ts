import mockData from "@/mock-data/blog.json";
import { IContentPageListRequest, IContentPageResponse } from "@/types/content-management/content-builder/contentBuilder.type";

export const fetchBlogList = async (
    request: IContentPageListRequest
  ): Promise<IContentPageResponse> => {
    try {
      const response = mockData as IContentPageResponse;
  
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
      console.error("Error in fetchBlogList:", error);
      throw error;
    }
  };