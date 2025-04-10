import StoreBundleList from "@/components/common/product/StoreBundleList";
import storeBrandList from "@/mock-data/product-database/storeBundleList.json";
import { memo } from "react";

const CategoryStoresList = () => {
  return (
    <div className="pb-6 px-4 pt-6">
      <StoreBundleList data={storeBrandList.bundle} type="Store" />
    </div>
  );
};

export default memo(CategoryStoresList);
