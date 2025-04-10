import Tabing from "@/admin-pages/company/edit";
import React from "react";
export const metadata = {
  title: "Edit Company",
  description: "Edit Company",
};
const EditCompanyPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return <Tabing id={id} />;
};

export default EditCompanyPage;
