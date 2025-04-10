export interface IBrand {
    label: string;
    value: string;
  }

  export interface IMerchantService {
    storeName: string;
    serviceName: string;
    serviceStatus: string;
    updatedDate: string;
    updatedBy: string;
    recStatus: string;
  }

  export interface IFilteringOption {
    value: string;
    label: string;
  }
  export interface IHomeCacheManagerProps {
    onClearCache?: () => Promise<void>;
  }
  export interface IPaginationData {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  
 

