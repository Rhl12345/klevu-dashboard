import CreateRole from "@/admin-pages/roles/create";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Roles Permissions",
  description: "Create Roles Permissions",
};
const CreateRolePage = () => {
  return <CreateRole />;
};

export default CreateRolePage;
