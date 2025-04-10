interface IRenderImageProps {
  imagePath: string;
}

interface ILogoLocationDetailsProps {
  id: string;
  locationId: string | null;
  setLocationId: (val: string | null) => void;
  getLogoLocationData: () => void;
  fetchLogoLocationDetails: () => void;
  logoLocationsDetails: unknown[];
  createAndUpdateLogoLocationBrandField: (
    fields: unknown[],
    resetForm: object
  ) => void;
  setOldBrands: (val: TLogoLocationResponse[]) => void;
  oldBrands: unknown[];
  openCreateLogoLocationModal: (id?: string) => void;
  setLogoLocationDetail: (val: ILogoLocationItem) => void;
}

interface IManageLogoLocationProps {
  locationId: string;
  handleClose: () => void;
}

interface IBrands {
  brandId: number[] & string;
}

interface IBrandsDropDownData {
  value: string;
  label: string;
}
interface ILogoLocationItem {
  brands: number[];
  createdName: string;
  modifiedName: string;
  id: number;
  name: string;
  imageUrl: string;
  threeDImageURL: string;
  threeDLogoLocationClass: string;
  price: number;
  cost: number;
  logoLocationId: number;
  brandGuidelines: boolean;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}

interface PaginatedResponse<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}

interface ILogoLocationListItem {
  id: number;
  gender: string;
  productType: string;
  subProductType: string;
  logoLocations: number;
  createdName: string;
  modifiedName: string;
  recStatus: string; // Seems to be either Active or Inactive
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

type TLogoLocationResponse = PaginatedResponse<ILogoLocationItem>;
type TLogoLocationListResponse = PaginatedResponse<ILogoLocationListItem>;

interface ILogoLocationCreateEditProps {
  id?: string | null;
  locationId: string | null;
  editId: string | null;
  handleClose: () => void;
  logoLocationDetail: ILogoLocationItem;
}

interface ILogoLocationPayload {
  categoryId: string;
}

interface ILogoLocationFormValues {
  name: string;
  threeDLogoLocationClass: string;
  imageUrl: string;
  threeDImageURL: string;
  price: string;
  cost: string;
  brandGuidelines: boolean;
}

interface ILogoLocationBrand {
  logoLocationDetailsId: string | null;
  selectedBrands?: number[];
}

export type {
  IBrands,
  IRenderImageProps,
  ILogoLocationItem,
  IBrandsDropDownData,
  TLogoLocationResponse,
  TLogoLocationListResponse,
  ILogoLocationDetailsProps,
  ILogoLocationFormValues,
  ILogoLocationListItem,
  ILogoLocationPayload,
  IManageLogoLocationProps,
  ILogoLocationBrand,
  ILogoLocationCreateEditProps,
};
