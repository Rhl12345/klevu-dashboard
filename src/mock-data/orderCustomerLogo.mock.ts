import { ICustomerLogo } from "@/services/order/getOrderLogoDetails.service";

export const orderCustomerLogoMockData: ICustomerLogo[] = [
  {
    status: "Active",
    logo: "Logo 1",
    logoNumber: "L001",
    logoLocation:
      "https://redefinecommerce.blob.core.windows.net/storagemedia/1/logolocation/1/details/Right-Chest-70-191.jpgs",
    notes: "Sample notes",
    prodUrl: "https://example.com/prod1",
    sewOutUrl: "https://example.com/sewout1",
    runSheetUrl: "https://example.com/runsheet1",
    logoStatus: "Approved",
    uploadDate: "2024-01-01",
    approvedDate: "2024-01-02",
  },
  {
    status: "Pending",
    logo: "Logo 2",
    logoNumber: "L002",
    logoLocation:
      "https://redefinecommerce.blob.core.windows.net/storagemedia/1/logolocation/2/details/Left-Sleeve-80-192.jpgs",
    notes: "Awaiting approval",
    prodUrl: "https://example.com/prod2",
    sewOutUrl: "https://example.com/sewout2",
    runSheetUrl: "https://example.com/runsheet2",
    logoStatus: "Under Review",
    uploadDate: "2024-01-03",
    approvedDate: "",
  },
  {
    status: "Active",
    logo: "Logo 3",
    logoNumber: "L003",
    logoLocation:
      "https://redefinecommerce.blob.core.windows.net/storagemedia/1/logolocation/3/details/Back-Center-90-193.jpgs",
    notes: "High resolution required",
    prodUrl: "https://example.com/prod3",
    sewOutUrl: "https://example.com/sewout3",
    runSheetUrl: "https://example.com/runsheet3",
    logoStatus: "Approved",
    uploadDate: "2024-01-04",
    approvedDate: "2024-01-05",
  },
  {
    status: "Inactive",
    logo: "Logo 4",
    logoNumber: "L004",
    logoLocation:
      "https://redefinecommerce.blob.core.windows.net/storagemedia/1/logolocation/4/details/Front-Chest-75-194.jpgs",
    notes: "Rejected due to low quality",
    prodUrl: "https://example.com/prod4",
    sewOutUrl: "https://example.com/sewout4",
    runSheetUrl: "https://example.com/runsheet4",
    logoStatus: "Rejected",
    uploadDate: "2024-01-06",
    approvedDate: "",
  },
  {
    status: "Active",
    logo: "Logo 5",
    logoNumber: "L005",
    logoLocation:
      "https://redefinecommerce.blob.core.windows.net/storagemedia/1/logolocation/5/details/Left-Chest-85-195.jpgs",
    notes: "Premium quality logo",
    prodUrl: "https://example.com/prod5",
    sewOutUrl: "https://example.com/sewout5",
    runSheetUrl: "https://example.com/runsheet5",
    logoStatus: "Approved",
    uploadDate: "2024-01-07",
    approvedDate: "2024-01-08",
  },
];
