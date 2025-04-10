import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import Loader from "@/components/common/Loader";
import LifeCycleSection from "@/components/common/product/LifeCycleSection";
import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import ReactTable from "@/components/Table/ReactTable";
import Text from "@/components/Text/Text";
import PricingList from "@/mock-data/PricingList.json";
import SeoTabView from "@/components/common/product/seo/SeoTabView";
import RenderImageCell from "@/components/common/RenderImageCell";

import { getErrorMessage } from "@/utils/common.util";

import { getBundleList } from "@/services/bundle/bundle.service";

import { IBundleItem } from "@/types/bundle/bundle.type";
import {
  IAllProductData,
  IPricingDiscount,
} from "@/types/product/product.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { ITableColumn } from "@/components/Table/types";

const AttributeViewSection = dynamic(
  () => import("@/components/common/product/view-tab/AttributeViewSection"),
  {
    loading: () => <Loader />,
  }
);

const VendorSkuViewSection = dynamic(
  () => import("@/components/common/product/view-tab/VendorSkuViewSection"),
  {
    loading: () => <Loader />,
  }
);

const InventoryViewSection = dynamic(
  () => import("@/components/common/product/view-tab/InventoryViewSection"),
  {
    loading: () => <Loader />,
  }
);

const LogoLocation = dynamic(
  () => import("@/components/common/product/LogoLocation"),
  {
    ssr: false,
  }
);

const SizeChartViewSection = dynamic(
  () => import("@/components/common/product/view-tab/SizeChartViewSection"),
  {
    ssr: false,
  }
);

const ProductAdditionalPriceViewSection = dynamic(
  () =>
    import(
      "@/components/common/product/view-tab/ProductAdditionalPriceViewSection"
    ),
  {
    loading: () => <Loader />,
  }
);

const ProductCustomFieldsViewSection = dynamic(
  () =>
    import("@/components/common/product/view-tab/ProductCustomFieldsSection"),
  {
    loading: () => <Loader />,
  }
);

const OrderHistory = dynamic(
  () => import("@/components/common/product/OrderHistory"),
  {
    loading: () => <Loader />,
  }
);

const AllInfoTab = ({
  handleTabChange,
  productData,
  type,
  productId,
  storeName,
}: {
  handleTabChange: (tabId: number) => void;
  productData: IAllProductData;
  type: PRODUCT_FEEDS | STORE_TYPES;
  productId: string;
  storeName?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bundleData, setBundleData] = useState<IBundleItem[]>([]);

  const renderField = useCallback(
    (
      label: string,
      value: string | number,
      asterisk?: boolean,
      isPrice?: boolean
    ) => (
      <div className="grid grid-cols-3 gap-4 items-center w-full">
        <Text size="sm" className="col-span-1">
          {label}
          {asterisk && <span className="text-red-500">*</span>}:
        </Text>
        <Text size="sm" className="col-span-2">
          {isPrice && typeof value === "number"
            ? `$${value?.toFixed(2)}`
            : value || ""}
        </Text>
      </div>
    ),
    []
  );

  const [tableData, setTableData] = useState<IPricingDiscount[]>(
    PricingList["adidas - Adidas Golf - Discount"].items
  );
  const COLUMNS: ITableColumn[] = [
    {
      header: "Low Quantity",
      accessorKey: "lowQuantity",
      id: "lowQuantity",
      enableSorting: false,
    },
    {
      header: "High Quantity",
      accessorKey: "highQuantity",
      id: "highQuantity",
      enableSorting: false,
    },
    {
      header: "Discount Percent",
      accessorKey: "discountPercent",
      id: "discountPercent",
      enableSorting: false,
    },
  ];

  const bundleColumns: ITableColumn<IBundleItem>[] = useMemo(() => {
    return [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "store",
        accessorKey: "storeImage",
        header: "Store",
        cell: (props) => <RenderImageCell path={props.getValue()} />,
      },
      {
        id: "ourSKU",
        accessorKey: "ourSKU",
        header: "SKU",
      },
      {
        id: "salePrice",
        accessorKey: "salePrice",
        header: "Sale Price",
      },
      {
        id: "msrp",
        accessorKey: "msrp",
        header: "MSRP",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        id: "color",
        accessorKey: "color",
        header: "Color",
      },
    ];
  }, []);

  const fetchBundleList = async () => {
    try {
      setIsLoading(true);
      const response = await getBundleList();
      setBundleData(response.items as IBundleItem[]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBundleList();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              Basic Information
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(2)}
            >
              Edit
            </Button>
          </div>

          {renderField("Brand Or Manufacturer Name", productData?.brand, true)}
          {renderField("Vendor Name", productData?.vendor, true)}
          {renderField("Product Name", productData?.productName, true)}
          {renderField("ERP Name / BC Name", productData?.differentErpName)}
          {renderField("ERP / BC Item Id", productData?.erpItemId)}
          {renderField(
            "Vendor SKU / Manufacturer / Brand Part Number",
            productData?.vendorSku,
            true
          )}
          {renderField("Our SKU", productData?.sku, true)}
          {renderField("Product Type", productData?.productType)}
          {renderField("Companion Product", productData?.companionProduct)}
          {renderField("Tax Code", productData?.taxCode, true)}

          {renderField("Gender", productData?.gender)}
          {renderField("Category", productData?.category, true)}
          {renderField("Page Redirection URL", productData?.pageRedirectionUrl)}

          {renderField("Description", productData?.description, true)}
          {renderField("Weight (LBS)", productData?.weight)}
          {renderField("Ship Weight", productData?.shipWeight)}
          {renderField("Volume", productData?.volume)}
        </div>
      </div>

      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              Pricing Information
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(3)}
            >
              Edit
            </Button>
          </div>

          {renderField("Our Cost", +productData?.ourCost, true, true)}
          {renderField("MSRP", +productData?.msrp, true, true)}
          {renderField("Sale Price", +productData?.salePrice, true, true)}
          {renderField("IMAP", +productData?.imap, true, true)}
          {renderField(
            "Enable (MAP)Minimum Advertised Price",
            productData?.isImapEnabled ? "Yes" : "NO"
          )}
          {renderField("Gift Wrap Price", 0, false, true)}
          {renderField(
            "Call for Price",
            productData?.callForPrice ? "Yes" : "No",
            false,
            true
          )}

          <div className="flex flex-col gap-4">
            <Label>Quantity Discount Template</Label>
            <Dropdown
              options={[]}
              value={{
                value: "122",
                label: "adidas - Adidas Golf - Discount",
              }}
              isDisabled={true}
            />

            <ReactTable
              COLUMNS={COLUMNS}
              DATA={tableData}
              isListPage={true}
              showFilter={false}
              usedInsideModal={true}
              showPagination={false}
              loading={false}
              showEditColumns={false}
              showMoreFilters={false}
              displaySearch={false}
            />
          </div>
        </div>
      </div>

      <AttributeViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <VendorSkuViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <InventoryViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <SizeChartViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <LogoLocation
        isEditPage={false}
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              SKU Swap
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(2)}
            >
              Edit
            </Button>
          </div>

          {renderField("OLD SKU", "3PMPROMOST-rd", true)}
          {renderField("NEW SKU", "0911-18-BLK", true)}
        </div>
      </div>

      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              Bundle
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(2)}
            >
              Edit
            </Button>
          </div>

          <ReactTable
            COLUMNS={bundleColumns}
            DATA={bundleData}
            fetchData={fetchBundleList}
            isListPage={true}
            showFilter={false}
            usedInsideModal={true}
            showPagination={false}
            loading={isLoading}
            showEditColumns={false}
            showMoreFilters={false}
            displaySearch={false}
          />
        </div>
      </div>

      <SeoTabView productId={productId} handleTabChange={handleTabChange} />

      <OrderHistory />
      <LifeCycleSection />

      <ProductAdditionalPriceViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />

      <ProductCustomFieldsViewSection
        productId={productId}
        handleTabChange={handleTabChange}
      />
    </div>
  );
};

export default AllInfoTab;
