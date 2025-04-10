import StoreBundleList from "@/components/common/product/StoreBundleList";
import MyTabs from "@/components/Tab/Tab";
import storeBundleListData from "@/mock-data/product-database/storeBundleList.json";
import { useState } from "react";

const SingleBundleSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const options = [
    { id: 0, label: "Single" },
    { id: 1, label: "Bundle" },
  ];

  return (
    <div className="p-4 flex flex-col gap-2">
      <MyTabs
        options={options}
        activeTab={activeTab}
        onTabClick={(index) => setActiveTab(index)}
        usedInsideModal
      />

      <StoreBundleList
        key={activeTab}
        data={
          activeTab === 0
            ? storeBundleListData.store
            : storeBundleListData.bundle
        }
        type={activeTab === 0 ? "Store" : "Bundle"}
      />
    </div>
  );
};

export default SingleBundleSection;
