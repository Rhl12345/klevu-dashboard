"use client";
import { ICreateImportProps } from "@/types/export/export.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { useMemo } from "react";
import ProductFeedImport from "@/components/common/import/components/create/product-feed";
import CoreProductFeedImport from "@/components/common/import/components/create/core-product-feed";
import EcommerceImport from "@/components/common/import/components/create/ecommerce";
import CorporateImport from "@/components/common/import/components/create/corporate";

const CommonCreateImport = (props: ICreateImportProps) => {
  const RenderComponent = useMemo(() => {
    switch (props.type) {
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return <ProductFeedImport {...props} />;
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return <CoreProductFeedImport {...props} />;
      case STORE_TYPES.ECOMMERCE:
        return <EcommerceImport {...props} />;
      case STORE_TYPES.CORPORATE:
        return <CorporateImport {...props} />;
      default:
        break;
    }
  }, [props.type]);
  return RenderComponent;
};

export default CommonCreateImport;
