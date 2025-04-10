"use client";

import React, { useCallback, useState } from "react";

import MyTabs from "@/components/Tab/Tab";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";

import { STORE_TYPES } from "@/types/products-database/productDatabase.type";
import { ITabOption } from "@/components/Tab/types";
import { IFormBuilderValues } from "@/types/form-builder/formBuilder.type";

import { PageRoutes } from "@/admin-pages/routes";
import FormBuilderListPage from "@/admin-pages/form-builder/form-builder-list/components/FormBuilderList";
import formBuilderList from "@/mock-data/formBuilderList.json";

const FORM_BUILDER_LIST_TABS: ITabOption[] = [
  { id: 0, label: "All" },
  { id: 1, label: "Active" },
  { id: 2, label: "Inactive" },
] as const;

const FormBuilderMockData = formBuilderList.data as IFormBuilderValues[];
const FormBuilderList = ({ storeName }: { storeName: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formbuilderData, setFormbuilderData] =
    useState<IFormBuilderValues[]>(FormBuilderMockData);

  const handleTabClick = useCallback(
    (tabId: number) => {
      setActiveTab(FORM_BUILDER_LIST_TABS[tabId].id || 0);
      const productMap: any = {
        0: FormBuilderMockData,
        1: FormBuilderMockData.filter((item) => item.recStatus === "A"),
        2: FormBuilderMockData.filter((item) => item.recStatus === "I"),
      } as const;

      setFormbuilderData(productMap[tabId]);
    },
    [FormBuilderMockData]
  );
  return (
    <div>
      <ListPageHeader
        moduleName="Forms"
        name="Add Form Builder"
        navigateUrl={`${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/create`}
      />

      <MyTabs
        options={FORM_BUILDER_LIST_TABS}
        activeTab={FORM_BUILDER_LIST_TABS.findIndex(
          (tab) => tab.id === activeTab
        )}
        onTabClick={(index: number) => handleTabClick(index)}
      />

      <FormBuilderListPage
        storeName={storeName}
        formbuilderData={formbuilderData}
      />
    </div>
  );
};

export default FormBuilderList;
