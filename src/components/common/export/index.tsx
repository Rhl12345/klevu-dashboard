"use client";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import FeedsExport from "@/components/common/export/components/feeds";
import StoreExport from "@/components/common/export/components/store";

const Export = ({
  type,
  storeName,
}: {
  type: PRODUCT_FEEDS | STORE_TYPES;
  storeName?: string;
}) => {
  const ExportComponent = useMemo(() => {
    switch (type) {
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return FeedsExport;
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return FeedsExport;
      case STORE_TYPES.ECOMMERCE:
        return StoreExport;
      case STORE_TYPES.CORPORATE:
        return StoreExport;
      default:
        return notFound();
    }
  }, [type]);

  const getListRoute = useMemo(() => {
    switch (type) {
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.LIST;
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.LIST;
      case STORE_TYPES.ECOMMERCE:
        return `${PageRoutes.STORE.STORE}/${type}/${storeName}/products`;
      case STORE_TYPES.CORPORATE:
        return `${PageRoutes.STORE.STORE}/${type}/${storeName}/products`;
      default:
        return notFound();
    }
  }, [type, storeName]);

  return (
    <>
      <ListPageHeader
        moduleName="Export"
        navigateUrl={getListRoute}
        showBackButton
      />

      <ExportComponent type={type as PRODUCT_FEEDS} storeName={storeName} />
    </>
  );
};

export default Export;
