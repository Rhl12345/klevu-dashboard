"use client";

// Components
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import CommonStoreListTable from "@/admin-pages/store-list/components/CommonStoreListTable";

// Types
import { IStoreListPageProps } from "@/types/store-product-list/storePorductList";
import { useRouter } from "next/navigation";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

/**
 * EcommerceStoreListPage component displays the product list for ecommerce stores
 * @param {IStoreListPageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */

const EcommerceStoreListPage = ({ storeDetails }: IStoreListPageProps) => {
  const router = useRouter();

  const handleExport = () => {
    router.push(
      `/admin/stores/${STORE_TYPES.ECOMMERCE}/${storeDetails.storeName}/products/export`
    );
  };

  const handleImport = () => {
    router.push(
      `/admin/stores/${STORE_TYPES.ECOMMERCE}/${storeDetails.storeName}/products/import`
    );
  };

  return (
    <>
      <ListPageHeader moduleName="Product" name="Product">
        <div className="flex gap-2">
          <Button onClick={handleExport}>Export</Button>
          <Button onClick={handleImport}>Import</Button>
          <Button variant="primary" size="sm">
            Sync With BC
          </Button>
        </div>
      </ListPageHeader>

      <CommonStoreListTable storeDetails={storeDetails} />
    </>
  );
};

export default EcommerceStoreListPage;
