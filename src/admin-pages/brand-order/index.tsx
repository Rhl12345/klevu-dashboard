"use client";
import React, { useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import DndGrid from "@/components/DndGrid/DndGrid";
import brandList from "@/mock-data/brandOrder.json";        
import ProductItem from "@/components/common/ProductItem";
import { Label } from "@/components/Label/Label";   

const BrandOrder = () => {
  const [items, setItems] = useState(brandList.subRow);         

  return (
    <div>
      <ListPageHeader moduleName={"Brand Order"} />

      <div className={`relative w-full lg:px-8 px-4 pt-4 lg:pt-8`}>
        <div className="w-full flex flex-wrap bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark p-2 relative">
          <div className="w-full flex flex-wrap justify-between gap-2">
            <div className="flex items-center">
              <Label>Total Brand : {items.length}</Label>
            </div>
          </div>
        </div>
      </div>

      <DndGrid
        items={items}
        sortableKey={`productId`}
        setItems={setItems}
        renderItem={(item: any, index: number) => {
          return <ProductItem product={item} index={index} />;
        }}
      />    
    </div>
  );
};

export default BrandOrder;
