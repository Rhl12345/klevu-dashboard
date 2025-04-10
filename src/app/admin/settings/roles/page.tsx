import RolesList from "@/admin-pages/roles/list";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Roles Permissions",
  description: "Roles Permissions",
};
const RolesListPage = () => {
  return <RolesList />;
};

export default RolesListPage;
