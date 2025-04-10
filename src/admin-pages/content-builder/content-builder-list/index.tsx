"use client";
import { contentBuilderTab } from "@/utils/constants";
import Tab from "@/components/Tab/Tab";
import { useMemo, useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { storeWisePages } from "@/utils/Dummy";
import Button from "@/components/Button/Button";
import Collapsible from "@/components/Collapsible/Collapsible";
import CreatePageModal from "@/admin-pages/content-builder/content-builder-list/components/CreatePageModal";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

//Lazy loading components
const WebsitePage = dynamic(
  () =>
    import("@/admin-pages/content-builder/content-builder-list/WebsitePage"),
  { loading: () => <Loader /> }
);
const LandingPage = dynamic(
  () =>
    import("@/admin-pages/content-builder/content-builder-list/LandingPage"),
  { loading: () => <Loader /> }
);
const Blog = dynamic(
  () => import("@/admin-pages/content-builder/content-builder-list/Blog"),
  { loading: () => <Loader /> }
);

const ContentBuilder = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [isCreatePageModalOpen, setIsCreatePageModalOpen] =
    useState<boolean>(false);
  const [selectedPageType, setSelectedPageType] = useState<string>("website");

  const tabs = [
    { id: 0, label: "Website Page", component: () => <WebsitePage /> },
    { id: 1, label: "Landing Page", component: () => <LandingPage /> },
    { id: 2, label: "Blog Post", component: () => <Blog /> },
  ];

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const handleStoreChange = (value: any) => {
    setSelectedStore(value.value);
  };

  const ActiveTabComponent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.component,
    [activeTab]
  );

  const handlePageTypeChange = (pageType: string) => {
    setSelectedPageType(pageType);
    setIsCreatePageModalOpen(true);
  };

  return (
    <div>
      <ListPageHeader moduleName={"Content Builder"}>
        <Dropdown
          className="w-60"
          options={storeWisePages}
          value={storeWisePages.find(
            (option) => option.value === selectedStore
          )}
          placeholder="All Website Pages"
          onChange={handleStoreChange}
        />
        {selectedStore !== "all" && selectedStore !== "" && (
          <Button variant="outline-primary" size="md" rounded="full">
            Edit Theme Configuration
          </Button>
        )}
        {selectedStore !== "all" && selectedStore !== "" && (
          <Collapsible
            trigger={
              <Button
                variant="primary"
                size="md"
                rounded="full"
                icon={<SvgIcon name="ArrowDown" />}
                iconPosition="right"
              >
                Create Page
              </Button>
            }
          >
            <ul className="p-2 flex flex-col gap-2 bg-body-light dark:bg-body-dark absolute right-0 mt-2 w-48 shadow-xl z-50">
              <li className="cursor-pointer relative overflow-hidden">
                <button
                  className="w-full text-quaternary-dark dark:text-quaternary-light"
                  onClick={() => handlePageTypeChange("website")}
                >
                  <span>Website page</span>
                </button>
              </li>
              <li className="cursor-pointer relative overflow-hidden">
                <button
                  className="w-full text-quaternary-dark dark:text-quaternary-light"
                  onClick={() => handlePageTypeChange("landing")}
                >
                  <span>Landing page</span>
                </button>
              </li>
              <li className="cursor-pointer relative overflow-hidden">
                <button
                  className="w-full text-quaternary-dark dark:text-quaternary-light"
                  onClick={() => handlePageTypeChange("blog")}
                >
                  <span>Blog Post</span>
                </button>
              </li>
            </ul>
          </Collapsible>
        )}
      </ListPageHeader>

      <Tab
        options={contentBuilderTab}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />

      <div>{ActiveTabComponent ? <ActiveTabComponent /> : null}</div>

      {isCreatePageModalOpen && (
        <CreatePageModal
          pageType={selectedPageType}
          isOpen={isCreatePageModalOpen}
          onClose={() => setIsCreatePageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ContentBuilder;
