"use client";
import MyTabs from "@/components/Tab/Tab";
import { EXPORT_TABS } from "@/utils/constants";
import React, { useMemo, useState } from "react";
import HistoryList from "@/components/common/export/components/history-list";
import { PRODUCT_FEEDS } from "@/types/products-database/productDatabase.type";
import CreateExport from "@/components/common/export/components/feeds/create";

const FeedsExport = (props: { type: PRODUCT_FEEDS }) => {
  const [activeTab, setActiveTab] = useState(0);

  const RenderComponent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return <CreateExport type={props.type} />;
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

export default FeedsExport;
