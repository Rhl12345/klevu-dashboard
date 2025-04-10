"use client";
import React from "react";
import PageRedirectForm from "@/admin-pages/page-redirect/components/PageRedirectForm";
import { IEditPageRedirectProps } from "@/types/page-redirect/pageRedirect.type";
/**
 * CreatePageRedirect Component
 * @component
 * @description Handles the creation of page redirects
 * @returns {React.ReactElement} Rendered form component
 */

const CreateEditPageRedirect = ({ id }: IEditPageRedirectProps) => {
  return <PageRedirectForm id={id} />;
};

export default CreateEditPageRedirect;
