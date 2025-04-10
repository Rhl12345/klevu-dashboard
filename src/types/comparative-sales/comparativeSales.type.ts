interface IComparativeSalesReportItem {
  p1Daterange: string;
  p1From: string;
  p1To: string;
  p2Daterange: string;
  p2From: string;
  p2To: string;
  storeName: string;
  p1Sales: number;
  p2Sales: number;
  p1Orders: number;
  p2Orders: number;
  p2VsP1Sales: number;
  p2VsP1Orders: number;
}

interface IComparativeSalesReportResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IComparativeSalesReportItem[];
}

export type { IComparativeSalesReportItem, IComparativeSalesReportResponse };
