import CreateCompanyConfiguration from "@/admin-pages/company-configuration/create";
import React from "react";

export const metadata = {
  title: "Edit Company Configuration",
  description: "Edit Company Configuration",
};

const EditCompanyConfiguratorPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  return <CreateCompanyConfiguration id={id} />;
};

export default EditCompanyConfiguratorPage;
