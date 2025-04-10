"use client";

import React, { Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { IReportsStore } from "@/types/reports/reports";
import ReportsData from "@/mock-data/reports.json";
import { getErrorMessage } from "@/utils/common.util";
import MyTabs from "@/components/Tab/Tab";
import {
  CONSULTATION_REQUEST_TABS,
  CONSULTATION_REQUEST_TABS_ID,
} from "@/utils/constants";
import All from "@/admin-pages/consultation-request/components/All";

const ConsultationRequestList = () => {
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);
  const [activeTab, setActiveTab] = useState<CONSULTATION_REQUEST_TABS_ID>(0);

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };
  const handleExport = async () => {
    try {
      const response = {
        data: { success: true, data: "https://www.google.com" },
      };
      if (response.data.success) {
        toast.success("Exported successfully");
      } else {
        toast.error(getErrorMessage("Export failed"));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <ListPageHeader
        name="Consultation Request"
        moduleName="Consultation Request"
      >
        <Button variant="primary" size="sm" onClick={handleExport}>
          Export
        </Button>
        <Dropdown options={storeData} className="lg:w-48" />
      </ListPageHeader>
      <MyTabs
        options={CONSULTATION_REQUEST_TABS}
        activeTab={activeTab}
        onTabClick={onTabClick}
        variant="scrollable"
      />

      {CONSULTATION_REQUEST_TABS.map((value, index) => {
        if (index === activeTab) {
          return (
            <Fragment key={value.id}>
              <All activeTab={activeTab} tab={value.value} />
            </Fragment>
          );
        }
      })}
    </>
  );
};

export default ConsultationRequestList;
