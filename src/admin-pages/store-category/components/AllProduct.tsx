"use client";
import Image from "@/components/Image/Image";
import Checkbox from "@/components/Checkbox/Checkbox";
import Text from "@/components/Text/Text";
import {
  IAllProductsTabProps,
  IcategoryProductModalProps,
} from "@/types/store-category/storeCategory.type";

const AllProductsTab = ({
  AllProductsData,
  selectedRows,
  setSelectedRows,
}: IAllProductsTabProps) => {
  // Handle checkbox selection
  const handleCheckboxChange = (product: IcategoryProductModalProps) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((item) => item.sku === product.sku);
      if (isSelected) {
        return prev.filter((item) => item.sku !== product.sku);
      } else {
        if (prev.length >= 10) {
          alert("You can select up to 10 products only");
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  // Check if a product is selected
  const isProductSelected = (product: IcategoryProductModalProps) => {
    return selectedRows.some((item) => item.sku === product.sku);
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-6 bg-body-light dark:bg-body-dark relative h-[calc(100vh-10rem)] overflow-hidden overflow-y-auto">
      <div className="border border-gray-light dark:border-gray-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 lg:p-6 gap-4 lg:gap-6 overflow-hidden">
          {AllProductsData.map((product: IcategoryProductModalProps) => (
            <div key={product.sku} className="flex items-center px-6 py-4 border border-gray-light dark:border-gray-dark rounded-none">
              <div className="w-8">
                <Checkbox
                  id={product.sku}
                  checked={isProductSelected(product)}
                  onChange={() => handleCheckboxChange(product)}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-16 h-16">
                    <Image
                      src={product.imageUrl}
                      alt={`${product.name}'s image`}
                      height={10}
                      width={10}
                      aspectRatio="landscape"
                      objectFit="contain"
                      rounded="sm"
                      variant="next"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4">
                    <Text>{product.name}</Text>
                    <Text size="sm">SKU: {product.sku}</Text>
                    <Text size="sm">MSRP: ${product.msrp}</Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsTab;
