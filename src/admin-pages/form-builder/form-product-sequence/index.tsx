"use client";
import React, { useState } from "react";
import sequenceList from "@/mock-data/sequence.json";
import { Label } from "@/components/Label/Label";
import DndGrid from "@/components/DndGrid/DndGrid";
import ProductSequenceItem from "@/admin-pages/form-builder/form-product-sequence/components/ProductSequenceItem";

const FormProductSequence = () => {
  const [items, setItems] = useState(sequenceList.subRow);

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:py-8 xl:px-8 px-4 py-4">
      <div className="bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark flex flex-wrap justify-between gap-2 p-4">
        <div className="flex items-center">
          <Label>Total Products : {items.length}</Label>
        </div>
      </div>

      <div className="w-full border border-gray-light dark:border-gray-dark">
        <DndGrid
          items={items}
          sortableKey={`productId`}
          setItems={setItems}
          className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4"
          renderItem={(item: any, index: number) => {
            return (
              <ProductSequenceItem
                product={item}
                index={index}
                key={item?.productId}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default FormProductSequence;
