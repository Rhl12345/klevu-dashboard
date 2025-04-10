"use client";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import FeedsImport from "@/components/common/import/components/feeds";
import StoreImport from "@/components/common/import/components/store";

const Import = ({
  type,
  storeName,
}: {
  type: PRODUCT_FEEDS | STORE_TYPES;
  storeName?: string;
}) => {
  const ImportComponent = useMemo(() => {
    switch (type) {
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return FeedsImport;
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return FeedsImport;
      case STORE_TYPES.ECOMMERCE:
        return StoreImport;
      case STORE_TYPES.CORPORATE:
        return StoreImport;
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
        moduleName="Import"
        navigateUrl={getListRoute}
        showBackButton
      />

      <ImportComponent type={type as STORE_TYPES} storeName={storeName} />
    </>
  );
};

export default Import;
