export interface IThirdPartyServiceFormProps {
  serviceId?: string | number;
  initialValues?: IThirdPartyService;
}

export interface IThirdPartyService {
  name: string;
  thirdPartyServiceId: string;
  storeId: string;
  url?: string;
  username?: string;
  password?: string;
  key?: string;
  secretkey?: string;
  redirectUrlToSite?: string;
  thankYouPageUrl?: string;
  source?: string;
  certificate?: string;
  description?: string;
  recStatus: string;
}

export interface IThirdPartyServiceData {
  id: number;
  name: string;
  serviceName: string;
  storeName: string;
  createdDate: string;
  createdTime: string;
  createdBy: string;
  updatedDate: string | null;
  updatedTime: string | null;
  updatedBy: string | null;
  recStatus: string;
}
