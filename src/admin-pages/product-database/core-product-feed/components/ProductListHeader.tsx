import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { IProductListHeaderProps } from "@/types/core-product-feed/coreProductFeed.type";

export const ProductListHeader = ({
  onExport,
  onImport,
  onManualBrand,
  onClone,
  onCreateListing,
  onAdd,
  onSync,
  inventoryOptions,
  setSelectedStoreInventory,
}: IProductListHeaderProps) => {
  const renderActionButtons = () => (
    <>
      <Button onClick={onExport}>Export</Button>

      <Button onClick={onImport}>Import</Button>

      <Button
        onClick={onManualBrand}
        variant="primary"
        aria-label="Manual Brand"
      >
        Manual Brand Inventory
      </Button>

      <Button onClick={onClone} variant="primary" aria-label="Clone">
        Clone
      </Button>

      <Button
        onClick={onCreateListing}
        variant="primary"
        aria-label="Create Listing"
      >
        Create Listing
      </Button>

      <Button onClick={onAdd} variant="primary" aria-label="Add">
        Add Product
      </Button>
    </>
  );

  const renderInventoryControls = () => (
    <>
      <div className="lg:w-48">
        <Dropdown
          id="inventoryFeed"
          name="inventoryFeed"
          isClearable
          options={inventoryOptions}
          onChange={(selected: any) => {
            setSelectedStoreInventory(selected?.value || "");
          }}
          defaultValue="Select inventory feed"
          aria-label="Select inventory feed"
        />
      </div>

      <Button onClick={onSync} variant="primary" aria-label="Sync Inventory">
        Sync Inventory
      </Button>
    </>
  );

  return (
    <ListPageHeader moduleName="Core Product Feed" name="Core Product Feed">
      {renderActionButtons()}
      {renderInventoryControls()}
    </ListPageHeader>
  );
};
