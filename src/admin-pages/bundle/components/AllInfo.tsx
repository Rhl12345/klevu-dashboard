import { useCallback } from "react";
import dynamic from "next/dynamic";

import Button from "@/components/Button/Button";
import Loader from "@/components/common/Loader";
import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import ReactTable from "@/components/Table/ReactTable";
import Text from "@/components/Text/Text";

import BundleList from "@/mock-data/BundleList.json";
import PricingList from "@/mock-data/PricingList.json";

import { ITableColumn } from "@/components/Table/types";
import { IBundleDetails } from "@/types/bundle/bundle.type";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

const ProductTab = dynamic(
  () => import("@/admin-pages/bundle/components/AvailableProducts"),
  {
    loading: () => <Loader />,
  }
);

const BundleAttributeImagesSection = dynamic(
  () => import("@/admin-pages/bundle/components/AttributeImage"),
  {
    loading: () => <Loader />,
  }
);

const LifeCycleSection = dynamic(
  () => import("@/components/common/product/view-tab/LifeCycleViewSection"),
  {
    ssr: false,
  }
);

const SeoTabView = dynamic(
  () => import("@/components/common/product/seo/SeoTabView"),
  {
    loading: () => <Loader />,
  }
);

const OrderHistoryView = dynamic(
  () => import("@/components/common/product/view-tab/OrderHistoryViewSection"),
  {
    loading: () => <Loader />,
  }
);

const CustomerFAQViewSection = dynamic(
  () => import("@/components/common/product/view-tab/CustomerFAQViewSection"),
  {
    loading: () => <Loader />,
  }
);

const CustomerReviewViewSection = dynamic(
  () =>
    import("@/components/common/product/view-tab/CustomerReviewViewSection"),
  {
    loading: () => <Loader />,
  }
);

const AllInfoTab = ({
  handleTabChange,
  bundleData,
  bundleId,
  storeType,
}: {
  handleTabChange: (tabId: number) => void;
  bundleData: IBundleDetails;
  bundleId: string;
  storeType?: string;
}) => {
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
        <Text size="sm" className="md:w-2/3">
          {isPrice && typeof value === "number"
            ? `$${value?.toFixed(2)}`
            : value || ""}
        </Text>
      </div>
    ),
    []
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

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
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

          {renderField("Bundle Name", bundleData?.name, true)}
          {renderField("ERP Name / BC Name", bundleData?.nameInERP)}
          {renderField("ERP / BC Item ID", bundleData?.erpItemId)}
          {renderField("Our SKU", bundleData?.ourSKU, true)}
          {renderField("Tax Code", bundleData?.taxCode, true)}
          {renderField("Gender", "")}
          {renderField("Category", bundleData?.category, true)}
          {renderField("Page Redirect URL", bundleData?.newUrl)}
          <div className="grid grid-cols-3 gap-4 items-center w-full">
            <Text size="sm" className="col-span-1">
              Description <span className="text-red-500">*</span>:
            </Text>
            <div
              className="col-span-2"
              dangerouslySetInnerHTML={{
                __html: bundleData?.description,
              }}
            />
          </div>
          {renderField("Weight (LBS)", bundleData?.weightInLBS)}
          {renderField("Ship Weight", bundleData?.shipWeightinLBS)}
          {renderField("Volume", bundleData?.volume)}
        </div>
      </div>

      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Products
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
          <ProductTab
            bundleProducts={BundleList.bundleList.items[1].subRows}
            setBundleProducts={() => {}}
            isEditPage={false}
          />
        </div>
      </div>

      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 lg:gap-6 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Pricing Information
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(4)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          {renderField("Our Cost", bundleData?.ourCost, true, true)}
          {renderField("MSRP", bundleData?.msrp, true, true)}
          {renderField("Sale Price", bundleData?.salePrice, true, true)}
          {renderField("IMAP", bundleData?.imap, true, true)}
          {renderField(
            "Enable (MAP)Minimum Advertised Price",
            bundleData?.isEnableMAP ? "Yes" : "NO"
          )}
          {renderField("Gift Wrap Price", 0, false, true)}
          {renderField(
            "Call for Price",
            bundleData?.callForPrice ? "Yes" : "No",
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
              DATA={PricingList["adidas - Adidas Golf - Discount"].items}
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

      <BundleAttributeImagesSection
        bundleId={bundleId}
        handleTabChange={handleTabChange}
        isEditPage={false}
      />

      <SeoTabView productId={bundleId} handleTabChange={handleTabChange} />

      <OrderHistoryView
        productId={bundleId}
        handleTabChange={handleTabChange}
      />

      <CustomerReviewViewSection
        productId={bundleId}
        handleTabChange={handleTabChange}
      />

      <CustomerFAQViewSection
        productId={bundleId}
        handleTabChange={handleTabChange}
      />

      {storeType !== STORE_TYPES.FORM_BUILDER && (
        <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="flex flex-col gap-4 dark:border-gray-dark">
            <div className="flex justify-between items-center">
              <Text size="lg" className="font-semibold">
                Life Cycle
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

            <LifeCycleSection
              productId={bundleId}
              handleTabChange={handleTabChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInfoTab;
