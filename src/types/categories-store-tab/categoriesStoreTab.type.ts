export interface ICategoriesStoreTabData {
  id: string;
  title: string;
  products: number;
  created_date: string;
  created_by: string;
  updated_date: string | null;
  updated_by: string | null;
  status: "active" | "inactive";
  hasChildren: boolean;
  subRows?: ICategoriesStoreTabData[];
}

export interface ISubCategoriesStoreTabData extends ICategoriesStoreTabData {
  subRows?: ICategoriesStoreTabData[];
}
