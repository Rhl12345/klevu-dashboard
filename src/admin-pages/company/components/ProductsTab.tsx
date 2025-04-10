"use client";
import Tab from "@/components/Tab/Tab";
import { customerProductTab } from "@/utils/constants";
import React, { useState } from "react";
import Viewed from "@/admin-pages/company/components/Viewed";
import Wishlist from "@/admin-pages/company/components/Wishlist";
import Purchased from "@/admin-pages/company/components/Purchased";
import AllProducts from "@/admin-pages/company/components/AllProducts";
import Carts from "@/admin-pages/company/components/Cart";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const tabComponents = [
    <Purchased />,
    <Carts />,
    <Viewed />,
    <AllProducts />,
    <Wishlist />,
  ];

  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="border border-gray-light dark:border-gray-dark">
            <Tab
              options={customerProductTab}
              activeTab={activeTab}
              onTabClick={onTabClick}
              isListPage={false}
            />
            <div>{ActiveComponent}</div>
          </div>
      </div>
    </>
  );
};

export default ProductTab;
