import Button from "@/components/Button/Button";
import Loader from "@/components/common/Loader";
import BundleSection from "@/components/common/product/BundleSection";
import RenderImageCell from "@/components/common/RenderImageCell";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { getBundleList } from "@/services/bundle/bundle.service";
import { IBundleItem } from "@/types/bundle/bundle.type";
import { IAllProductData } from "@/types/product/product.type";
import { PRODUCT_FEEDS } from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

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

const LifeCycleSection = dynamic(
  () => import("@/components/common/product/view-tab/LifeCycleViewSection"),
  {
    loading: () => <Loader />,
  }
);

const AllInfoTab = ({
  handleTabChange,
  productData,
  type,
  productId,
}: {
  handleTabChange: (tabId: number) => void;
  productData: IAllProductData;
  type: PRODUCT_FEEDS;
  productId: string;
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
      <div className="flex flex-col md:flex-row justify-start text-left gap-2 w-full">
        <Text size="sm" className="md:w-1/3">
          {label}
          {asterisk && <span className="text-red-500">*</span>}:
        </Text>
        <Text size="sm" className="md:w-1/3">
          {isPrice && typeof value === "number"
            ? `$${value?.toFixed(2)}`
            : value || ""}
        </Text>
      </div>
    ),
    []
  );

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

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Basic Information
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(2)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          {renderField("Brand / Manufacturer Name", productData?.brand, true)}
          {renderField("Vendor Name", productData?.vendor, true)}
          {renderField("Product Name", productData?.productName, true)}
          {renderField("ERP Name / BC Name", productData?.differentErpName)}
          {renderField("ERP / BC Item ID", productData?.erpItemId)}
          {renderField(
            "Vendor SKU / Manufacturer / Brand Part Number",
            productData?.vendorSku,
            true
          )}
          {renderField("Our SKU", productData?.sku, true)}
          {renderField("Product Type", productData?.productType)}
          {renderField("Companion Product", productData?.companionProduct)}
          {renderField("Tax Code", productData?.taxCode, true)}
          {type === PRODUCT_FEEDS.CORE_PRODUCT_FEED && (
            <>
              {renderField("Gender", productData?.gender)}
              {renderField("Category", productData?.category, true)}
            </>
          )}
          {renderField("Description", productData?.description, true)}
          {renderField("Weight (LBS)", productData?.weight)}
          {renderField("Ship Weight", productData?.shipWeight)}
          {renderField("Volume", productData?.volume)}
        </div>
      </div>

      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Pricing Information
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(3)}
              className="underline"
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
      {type === PRODUCT_FEEDS.CORE_PRODUCT_FEED && (
        <>
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
            <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
              <div className="flex justify-between items-center">
                <Text size="lg" className="font-semibold">
                  SKU Swap
                </Text>

                <Button
                  variant="default"
                  size="md"
                  onClick={() => handleTabChange(9)}
                  className="underline"
                >
                  Edit
                </Button>
              </div>

              {renderField("OLD SKU", "3PMPROMOST-rd", true)}
              {renderField("NEW SKU", "0911-18-BLK", true)}
            </div>
          </div>

          <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
            <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
              <div className="flex justify-between items-center">
                <Text size="lg" className="font-semibold">
                  Bundle
                </Text>

                <Button
                  variant="default"
                  size="md"
                  onClick={() => handleTabChange(10)}
                  className="underline"
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

          <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
            <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
              <div className="flex justify-between items-center">
                <Text size="lg" className="font-semibold">
                  Life Cycle
                </Text>

                <Button
                  variant="default"
                  size="md"
                  onClick={() => handleTabChange(11)}
                  className="underline"
                >
                  Edit
                </Button>
              </div>

              <LifeCycleSection
                productId={productId}
                handleTabChange={handleTabChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllInfoTab;
