export interface IPageRedirect {
  id: number;
  name: string;
  oldUrl: string;
  newUrl: string;
  createdDate: string;
  createdBy: string;
}

export interface IPageRedirectFormProps {
  onSubmit: (values: IPageRedirectFormValues) => Promise<void>;
}

export interface IPageRedirectFormValues {
  storeId: string;
  oldUrl: string;
  newUrl: string;
}

export interface IPageRedirectListPayload {
  storeId: string;
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export interface IPageRedirectListResponse {
  data: IPageRedirect[];
  total: number;
}

export type TPageRedirectModalType =
  | "delete"
  | "edit"
  | "status"
  | "create"
  | null;

export interface IEditPageRedirectProps {
  id?: string;
}
