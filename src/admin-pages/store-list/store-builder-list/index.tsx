"use client";

// Components
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import CommonStoreListTable from "@/admin-pages/store-list/components/CommonStoreListTable";

// Types
import { IStoreListPageProps } from "@/types/store-product-list/storePorductList";

/**
 * StoreBuilderListPage component displays the product list for store builders
 * @param {IStoreListPageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */

const StoreBuilderListPage = ({ storeDetails }: IStoreListPageProps) => {
  return (
    <>
      <ListPageHeader moduleName="Product" name="Product" />
      <CommonStoreListTable storeDetails={storeDetails} />
    </>
  );
};
export default StoreBuilderListPage;
