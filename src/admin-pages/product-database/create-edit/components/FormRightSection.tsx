import DynamicField from "@/components/common/DynamicField";
import ProductFlags from "@/components/common/product/ProductFlags";
import ReadinessCard from "@/components/common/product/ReadinessCard";
import SingleBundleSection from "@/components/common/product/SingleBundleSection";
import Image from "@/components/Image/Image";
import Text from "@/components/Text/Text";
import { IProductSideBar } from "@/types/product/product.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { DEFAULT_NOT_FOUND_IMAGE } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { getValidationSchema } from "@/utils/forms.util";
import { Form, Formik } from "formik";

const FormRightSection = ({
  rightSectionFields,
  otherChildrens,
  statusFormField,
  statusInitialValue,
  handleStatusDropdownChange,
  productDetails,
  feedType,
}: {
  rightSectionFields: TDynamicFields;
  otherChildrens?: React.ReactNode;
  statusFormField: TDynamicFields;
  statusInitialValue: string;
  handleStatusDropdownChange?: (value: string) => void;
  productDetails?: IProductSideBar;
  feedType?: PRODUCT_FEEDS | STORE_TYPES;
}) => {
  const lastSavedDate = getFormatDate(productDetails?.updatedAt, {
    dateFormat: "MMM DD, YYYY",
  });

  return (
    <>
      <div className="relative border-b border-gray-light dark:border-gray-dark p-4">
        <Formik
          initialValues={{ status: statusInitialValue }}
          validationSchema={getValidationSchema([statusFormField])}
          onSubmit={() => {}}
          validateOnBlur
          enableReinitialize
        >
          {() => (
            <Form>
              {Object.entries(rightSectionFields).map(([key, field]) => (
                <DynamicField
                  key={key}
                  fieldConfig={field}
                  handleStatusDropdownChange={handleStatusDropdownChange}
                />
              ))}
            </Form>
          )}
        </Formik>
      </div>

      {productDetails && (
        <>
          {productDetails.productId && (
            <div className="border-b border-gray-light dark:border-gray-dark">
              <div className="w-full flex flex-col items-center gap-4 lg:gap-6 p-4">
                <div className="grow flex items-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg justify-center p-1 h-40 w-40">
                  <Image
                    className="max-h-full mx-auto"
                    src={productDetails.imageUrl || DEFAULT_NOT_FOUND_IMAGE}
                    alt={productDetails.productName}
                    objectFit="contain"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-wrap gap-2">
                    <Text>Product Name :</Text>
                    <Text className="font-normal">
                      {productDetails.productName}
                    </Text>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Text>Vendor SKU :</Text>
                    <Text className="font-normal">
                      {productDetails.vendorSku}
                    </Text>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Text className="!font-semibold">Our SKU :</Text>{" "}
                    <Text className="font-normal">{productDetails.sku}</Text>
                  </div>
                </div>
              </div>
            </div>
          )}

          {[STORE_TYPES.ECOMMERCE].includes(feedType as STORE_TYPES) &&
          productDetails?.updatedAt &&
          productDetails?.updatedBy ? (
            <div className="border-b border-gray-light dark:border-gray-dark">
              <div className="flex flex-col gap-2 p-4">
                <Text size="lg">Last Save Details</Text>
                <div className="flex flex-col gap-1">
                  <Text weight="font-normal">
                    Last Saved on {lastSavedDate.date} - {lastSavedDate.time}
                  </Text>
                  <Text weight="font-normal">
                    Last Saved by {productDetails.updatedBy}
                  </Text>
                </div>
              </div>
            </div>
          ) : null}

          {![PRODUCT_FEEDS.PRODUCT_FEED].includes(feedType as PRODUCT_FEEDS) &&
          productDetails?.productReadiness ? (
            <div className="border-b border-gray-light dark:border-gray-dark">
              <ReadinessCard
                readinessPercentage={productDetails.productReadiness}
                readinessTitle="Product Readiness"
              />
            </div>
          ) : null}

          {[STORE_TYPES.ECOMMERCE].includes(feedType as STORE_TYPES) &&
          productDetails?.seoReadiness ? (
            <div className="border-b border-gray-light dark:border-gray-dark">
              <ReadinessCard
                readinessPercentage={productDetails.seoReadiness}
                readinessTitle="SEO Readiness"
              />
            </div>
          ) : null}

          {[PRODUCT_FEEDS.CORE_PRODUCT_FEED].includes(
            feedType as PRODUCT_FEEDS
          ) && (
            <div className="border-b border-gray-light dark:border-gray-dark">
              <SingleBundleSection />
            </div>
          )}
          {feedType &&
            ![PRODUCT_FEEDS.PRODUCT_FEED].includes(feedType as PRODUCT_FEEDS) &&
            productDetails?.productId && (
              <div className="border-b border-gray-light dark:border-gray-dark">
                <ProductFlags
                  productId={productDetails.productId}
                  feedType={feedType}
                />
              </div>
            )}
        </>
      )}

      {otherChildrens}
    </>
  );
};

export default FormRightSection;
