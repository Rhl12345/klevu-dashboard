"use client";
import MyTabs from "@/components/Tab/Tab";
import { IMPORT_TABS } from "@/utils/constants";
import React, { useMemo, useState } from "react";
import HistoryList from "@/components/common/import/components/history-list";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import CreateImport from "@/components/common/import/components/feeds/create";

const FeedsImport = (props: { type: PRODUCT_FEEDS | STORE_TYPES }) => {
  const [activeTab, setActiveTab] = useState(0);

  const RenderComponent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return <CreateImport type={props.type as PRODUCT_FEEDS} />;
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
        options={IMPORT_TABS}
        activeTab={IMPORT_TABS.findIndex((tab) => tab.id === activeTab)}
        onTabClick={handleTab}
      />
      {RenderComponent}
    </>
  );
};

export default FeedsImport;
