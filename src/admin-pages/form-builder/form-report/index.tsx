import React, { useState } from "react";

import MyTabs from "@/components/Tab/Tab";

import OrderReport from "@/admin-pages/form-builder/form-report/components/order-report/OrderReport";
import ProductReport from "@/admin-pages/form-builder/form-report/components/product-report/ProductReport";
import CustomerReport from "@/admin-pages/form-builder/form-report/components/customer-report/CustomerReport";
import SyncWithBc from "@/admin-pages/form-builder/form-report/components/sync-with-bc/SyncWithBc";

const FormReport = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabOptions = [
    {
      id: 0,
      label: "Order Report",
      content: OrderReport,
    },
    {
      id: 1,
      label: "Product Report",
      content: ProductReport,
    },
    {
      id: 2,
      label: "Customer Report",
      content: CustomerReport,
    },

    {
      id: 3,
      label: "Sync With BC",
      content: SyncWithBc,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-6 lg:py-4 xl:px-8 px-4 py-4">
      <div className="border border-gray-light dark:border-gray-dark">
        <div className="">
          <MyTabs
            options={tabOptions}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            variant="scrollable"
            isListPage={false}
          />
        </div>
        {/* Render active tab content */}
        <div>
          {React.createElement(tabOptions[activeTab].content as React.FC, {
            key: activeTab,
          })}
        </div>
      </div>
    </div>
  );
};

export default FormReport;
