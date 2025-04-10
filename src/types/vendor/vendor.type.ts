/** Supported vendor status options */
export enum IVendorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

/** Main form values for vendor creation/editing */
export interface IVendorFormValues {
  /** Unique identifier for the vendor */
  id?: number;
  /** Unique name of the vendor */
  vendorName: string;
  /** Business Central ID for the vendor */
  vendorBCID: string | number;
  /** Primary contact person's name */
  contactName: string;
  /** Contact phone number */
  contactPhone: string;
  /** Contact email address */
  contactEmail: string;
  /** Vendor's physical address */
  address: string;
  /** Vendor's website URL */
  website: string;
  /** Login username for vendor portal */
  loginName: string;
  /** Password for vendor portal */
  password: string;
  /** URL for image portal */
  imagePortalWebsite: string;
  /** Login username for image portal */
  imagePortalLogin: string;
  /** Password for image portal */
  imagePortalPassword: string;
  /** Additional notes about the vendor */
  notes: string;
  /** Current vendor status */
  vendorStatus: string;
  /** Whether inventory management is available */
  isInventoryAvailable: boolean;
  /** API configuration */
  isAPIAvailable: boolean;
  apiUrl: string;
  apiUsername: string;
  apiPassword: string;
  /** FTP configuration */
  isFTPAvailable: boolean;
  ftpUrl: string;
  ftpUsername: string;
  ftpPassword: string;
}

/** Paginated response structure for vendor data */
export interface IPaginatedVendorResponse {
  /** Current page number (1-based) */
  pageIndex: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items across all pages */
  totalCount: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a previous page available */
  hasPreviousPage: boolean;
  /** Whether there is a next page available */
  hasNextPage: boolean;
  /** Array of vendor items for the current page */
  items: IVendorItem[];
}

/** Individual vendor item in the response */
export interface IVendorItem extends IVendorFormValues {
  /** Creation timestamp */
  createddate: string;
  /** User who created the record */
  createdby: string | null;
  /** Last modification timestamp */
  modifieddate: string;
  /** User who last modified the record */
  modifiedby: string | null;
  /** Row version for concurrency control */
  rowversion: string | null;
}

export interface IVendorListPayload {
  args: {
    pageSize: number;
    pageIndex: number;
    sortingOptions: any[];
    filteringOptions: any[];
  };
}

export interface IVendor {
  /** Unique identifier for the vendor */
  id: number;
  /** Business Central ID for the vendor */
  vendorBCID: number;
  /** Name of the vendor */
  vendorName: string;
  /** Name of the primary contact person */
  contactName: string;
  /** Phone number for the contact */
  contactPhone: string;
  /** Email address for the contact */
  contactEmail: string;
  /** Physical address of the vendor */
  address: string;
  /** Vendor's website URL */
  website: string;
  /** Username for vendor login */
  loginName: string;
  /** Password for vendor login */
  password: string;
  /** URL for the vendor's image portal */
  imagePortalWebsite: string;
  /** Login username for image portal */
  imagePortalLogin: string;
  /** Password for image portal */
  imagePortalPassword: string;
  /** Additional notes about the vendor */
  notes: string;
  /** Vendor's status (e.g., 'A' for Active) */
  vendorStatus: string;
  /** Whether inventory functionality is available */
  isInventoryAvailable: boolean;
  /** Whether API access is available */
  isAPIAvailable: boolean;
  /** Whether FTP access is available */
  isFTPAvailable: boolean;
  /** URL for API access */
  apiUrl: string;
  /** Username for API access */
  apiUsername: string;
  /** Password for API access */
  apiPassword: string;
  /** URL for FTP access */
  ftpUrl: string;
  /** Username for FTP access */
  ftpUsername: string;
  /** Password for FTP access */
  ftpPassword: string;
  /** Creation timestamp */
  createddate: string;
  /** User who created the record */
  createdby: string | null;
  /** Last modification timestamp */
  modifieddate: string;
  /** User who last modified the record */
  modifiedby: string | null;
  /** Row version for concurrency control */
  rowversion: string | null;
}

export interface IViewHistory {
  id: number;
  updatedBy: string;
  updatedDate: string;
  property: string;
  oldValue: string;
  newValue: string;
}

export type IVendorModalType = "delete" | "activeInactive" | "viewHistory";

export interface IBrand {
  id: string;
  name: string;
  count: number;
}

export interface IContactInformation {
  name: keyof IVendorFormValues;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: (value: string) => string;
  inputMode?: string;
  ariaDescription?: string;
  minLength?: number;
}
