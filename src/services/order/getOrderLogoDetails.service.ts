import { orderCustomerLogoMockData as mockData } from "@/mock-data/orderCustomerLogo.mock";

const url = "order/get-logo-details";

export interface IGetOrderLogoDetailsOutput {
  data: ICustomerLogo[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const getOrderLogoDetails = async (
  orderId: string
): Promise<IGetOrderLogoDetailsOutput> => {
  try {
    const response: IGetOrderLogoDetailsOutput = {
      data: mockData,
      pageIndex: 1,
      pageSize: 25,
      totalCount: mockData.length,
      totalPages: Math.ceil(mockData.length / 25),
      hasPreviousPage: false,
      hasNextPage: false
    };

    return response;
  } catch (error) {
    console.log("API URL: ", url);
    console.log("API error: ", error);
    throw error;
  }
};

export interface ICustomerLogo {
  status: string;
  logo: string;
  logoNumber: string;
  logoLocation: string;
  notes: string;
  prodUrl: string;
  sewOutUrl: string;
  runSheetUrl: string;
  logoStatus: string;
  uploadDate: string;
  approvedDate: string;
}
