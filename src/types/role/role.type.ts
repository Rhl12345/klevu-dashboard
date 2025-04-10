export interface IRoleData {
  id: number;
  roleName: string;
  createdDate: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  updatedDate: string | null;
  status: "A" | "I";
}
