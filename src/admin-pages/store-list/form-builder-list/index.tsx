"use client";

// Components
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import CommonStoreListTable from "@/admin-pages/store-list/components/CommonStoreListTable";

// Types
import { IStoreListPageProps } from "@/types/store-product-list/storePorductList";

/**
 * FormBuilderListPage component displays the product list for form builders
 * @param {IStoreListPageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const FormBuilderListPage = ({ storeDetails }: IStoreListPageProps) => {
  return (
    <>
      <ListPageHeader moduleName="Product" name="Product">
        <Button variant="primary" size="sm">
          Sync With BC
        </Button>
      </ListPageHeader>

      <CommonStoreListTable storeDetails={storeDetails} />
    </>
  );
};

export default FormBuilderListPage;
