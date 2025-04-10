import React, { useMemo } from "react";
import MyTabs from "@/components/Tab/Tab";

import {
  FORM_TYPE,
  IFormBuilderTabsProps,
} from "@/types/form-builder/formBuilder.type";
import { DISABLED_TABS } from "@/mock-data/setUpTabData";
import { formBuilderTabItems } from "@/mock-data/form-builder/setupForm";

const FIRST_TAB = 0;

const FormBuilderTabs = ({
  activeTab,
  tabContent,
  setActiveTab,
  formType,
  id,
}: IFormBuilderTabsProps) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const formBuilderTabItemsOptions = useMemo(() => {
    if (formType === FORM_TYPE.FILLED_UP) {
      // Show items with IDs 1, 2, and 3 along with other items
      return formBuilderTabItems.filter((item) => item.id !== undefined);
    } else {
      // Hide items with IDs 1, 2, and 3 and show default items for FORM_TYPE.REQUEST
      return formBuilderTabItems.filter(
        (item) => item.id !== undefined && ![1, 2, 3].includes(item.id)
      );
    }
  }, [activeTab, formType]);

  return (
    <>
      <MyTabs
        options={formBuilderTabItemsOptions}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        toDisable={id ? [] : DISABLED_TABS}
      />
      <div
        className={`${activeTab == FIRST_TAB ? "w-full flex flex-col gap-4 lg:gap-8 lg:py-8 xl:px-8 px-4 py-4" : ""}`}
      >
        <div
          className="w-full bg-body-light dark:bg-body-dark"
          id="mainFormSection"
        >
          {tabContent[activeTab]}
        </div>
      </div>
    </>
  );
};
export default FormBuilderTabs;
