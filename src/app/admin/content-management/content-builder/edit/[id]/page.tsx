import React from "react";
import CreateEditContentBuilder from "@/admin-pages/content-builder/create-edit-content-builder/index";

export const metadata = {
  title: "Edit Content Builder",
  description: "Edit Content Builder",
};

const ContentBuilderEditPage = ({params}:{params: {id: string}}) => {
  return <CreateEditContentBuilder id={params.id} />;
};

export default ContentBuilderEditPage;
