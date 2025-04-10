import Inventory from "@/components/common/product/Inventory";

const InventoryTab = ({ productId }: { productId: string }) => {
  const vendorOptions = [
    { label: "All Vendors", value: "all" },
    { label: "Peter Millar", value: "974" },
    { label: "Hudson Sutler", value: "1100" },
  ];

  return (
    <Inventory
      vendorOptions={vendorOptions}
      ecomSafetyQty={0}
      productId={productId}
    />
  );
};

export default InventoryTab;
