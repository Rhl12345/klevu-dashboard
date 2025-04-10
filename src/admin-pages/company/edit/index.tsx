"use client";
import React, { useState } from "react";
import Tab from "@/components/Tab/Tab";
import CompanyDetails from "@/admin-pages/company/components/CompanyDetails";
import Notes from "@/admin-pages/company/components/Notes";
import Products from "@/admin-pages/company/components/Products";
import Orders from "@/admin-pages/company/components/Orders";
import AbandondedCart from "@/admin-pages/company/components/AboundedCart";
import ConsultationRequest from "@/admin-pages/company/components/ConsultationRequest";
import User from "@/admin-pages/company/components/User";
import Lifecycle from "@/admin-pages/company/components/LifeCycle";
import CustomLogo from "@/admin-pages/company/components/CustomLogo";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { companyEditTabs } from "@/utils/constants";

const Tabing = ({ id }: { id: number }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabClick = (index: number) => {
    if (id) {
      setActiveTab(index);
    }
  };

  const tabComponents = [
    <CompanyDetails />,
    <Orders />,
    <Products />,
    <Notes />,
    <CustomLogo />,
    <User />,
    <AbandondedCart />,
    <ConsultationRequest />,
    <Lifecycle />,
  ];

  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
        <CreatePageHeader
          module="Edit Company"
          navigateUrl="/admin/customer/company"
        />
        <Tab
          options={companyEditTabs}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />

      {ActiveComponent}
    </>
  );
};

export default Tabing;
