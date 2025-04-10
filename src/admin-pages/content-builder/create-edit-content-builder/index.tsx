"use client";
import { contentBuilderEditTabs } from "@/utils/constants";
import Tab from "@/components/Tab/Tab";
import { useMemo, useState } from "react";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

//Lazy loading components
const ContentBuilderSettings = dynamic(
  () =>
    import(
      "@/admin-pages/content-builder/create-edit-content-builder/settings"
    ),
  { loading: () => <Loader /> }
);

const CreateEditContentBuilder = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const tabs = [
    {
      id: 0,
      label: "General",
      component: () => (
        <h1 className="text-2xl font-bold p-6 lg:p-8text-quaternary-dark dark:text-quaternary-light">
          Content Builder
        </h1>
      ),
    },
    { id: 1, label: "Settings", component: ContentBuilderSettings },
    {
      id: 2,
      label: "Publishing Options",
      component: () => (
        <h1 className="text-2xl font-bold p-6 lg:p-8 text-quaternary-dark dark:text-quaternary-light">
          Publishing Options
        </h1>
      ),
    },
  ];

  const ActiveTabComponent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.component,
    [activeTab]
  );

  return (
    <div>
      <CreatePageHeader
        module={`${id ? "Edit" : "Add"} Content Builder`}
        navigateUrl={PageRoutes.CONTENT_MANAGEMENT.LIST}
        buttonType="submit"
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="">
          <Tab
            options={contentBuilderEditTabs}
            activeTab={activeTab}
            onTabClick={onTabClick}
          />
        </div>
        <div>{ActiveTabComponent && <ActiveTabComponent id={id} />}</div>
      </div>
    </div>
  );
};

export default CreateEditContentBuilder;
