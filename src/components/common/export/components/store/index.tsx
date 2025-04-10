"use client";
import MyTabs from "@/components/Tab/Tab";
import { EXPORT_TABS } from "@/utils/constants";
import React, { useMemo, useState } from "react";
import HistoryList from "@/components/common/export/components/history-list";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import CreateStoreExport from "@/components/common/export/components/store/create";

const StoreExport = (props: {
  type: PRODUCT_FEEDS | STORE_TYPES;
  storeName?: string;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const RenderComponent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return <CreateStoreExport type={props.type as STORE_TYPES} />;
      case 1:
        return <HistoryList />;
      default:
        break;
    }
  }, [activeTab, props.type]);

  const handleTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <MyTabs
        options={EXPORT_TABS}
        activeTab={EXPORT_TABS.findIndex((tab) => tab.id === activeTab)}
        onTabClick={handleTab}
      />
      {RenderComponent}
    </>
  );
};

export default StoreExport;
