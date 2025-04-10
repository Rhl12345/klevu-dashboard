import CreateRole from "@/admin-pages/roles/create";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Roles Permissions",
  description: "Edit Roles Permissions",
};
const CreateRolePage = () => {
  return <CreateRole id={25} />;
};

export default CreateRolePage;
