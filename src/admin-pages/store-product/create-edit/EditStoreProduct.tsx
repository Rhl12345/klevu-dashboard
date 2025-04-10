"use client";

import AllInfoTab from "@/admin-pages/store-product/components/AllInfoTab";
import FormRightSection from "@/admin-pages/product-database/create-edit/components/FormRightSection";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import MyTabs from "@/components/Tab/Tab";
import {
  STATUS_FORM_FIELD,
  STATUS_OPTIONS,
} from "@/constants/product-database/fields.constant";
import {
  IAllProductData,
  IEditStoreProductProps,
} from "@/types/product/product.type";
import {
  STORE_TYPES,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  getFieldsInOrder,
  getSelectedInitialValues,
  updateFieldsWithCustomOptions,
} from "@/utils/forms.util";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const GeneralForm = dynamic(
  () => import("@/admin-pages/store-product/components/GeneralForm"),
  { loading: () => <Loader /> }
);

const PricingFormTab = dynamic(
  () => import("@/admin-pages/store-product/components/PricingFormTab"),
  { loading: () => <Loader /> }
);

const AttributesTab = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/AttributesTab"
    ),
  { loading: () => <Loader /> }
);

const LifeCycle = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/LifeCycleTab"
    ),
  { loading: () => <Loader /> }
);

const InventoryTab = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/InventoryTab"
    ),
  { loading: () => <Loader /> }
);

const VendorSkuMapping = dynamic(
  () => import("@/components/common/product/VendorSkuMapping"),
  { loading: () => <Loader /> }
);

const LogoLocation = dynamic(
  () => import("@/components/common/product/LogoLocation"),
  { loading: () => <Loader /> }
);

const CustomerFAQ = dynamic(
  () => import("@/components/common/product/customer-faq-tab/CustomerFAQTab"),
  { loading: () => <Loader /> }
);

const SeoTab = dynamic(() => import("@/components/common/product/seo/SeoTab"), {
  loading: () => <Loader />,
});

const SizeChartTab = dynamic(
  () => import("@/admin-pages/store-product/components/SizeChartTab"),
  { loading: () => <Loader /> }
);

const CustomerReview = dynamic(
  () => import("@/components/common/product/CustomerReview"),
  { loading: () => <Loader /> }
);

const ProductCustomFields = dynamic(
  () => import("@/components/common/product/ProductCustomFields"),
  { loading: () => <Loader /> }
);

const ProductAdditionalPrice = dynamic(
  () => import("@/components/common/product/ProductAdditionalPrice"),
  { loading: () => <Loader /> }
);

const SkuSwapTab = dynamic(
  () =>
    import("@/admin-pages/product-database/create-edit/components/SkuSwapTab"),
  { loading: () => <Loader /> }
);

const BundleTab = dynamic(
  () =>
    import("@/admin-pages/product-database/create-edit/components/BundleTab"),
  { loading: () => <Loader /> }
);

const OrderHistory = dynamic(
  () => import("@/components/common/product/OrderHistory"),
  { loading: () => <Loader /> }
);

/**
 * EditProduct Component - Handles the editing of products in all store types
 *
 * This component provides a tabbed interface for editing different aspects of a product:
 * - All Info (overview)
 * - Basic Information
 * - Pricing
 * - Attributes
 * - Vendor SKU Mapping
 *
 * @component
 * @param {IEditProductProps} props - Component props
 * @returns {JSX.Element} Rendered EditProduct component
 */
const EditStoreProduct = ({
  storeType,
  storeName,
  initialData,
  productId,
}: IEditStoreProductProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const [statusFormField, setStatusFormField] =
    useState<TDynamicFields>(STATUS_FORM_FIELD);
  const [isDirty, setIsDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Constructs the status form field based on product feed type
   * Adds 'Staging' option for non-core product feeds
   */
  const constructStatusFormField = () => {
    if (storeType === STORE_TYPES.CORPORATE) {
      setStatusFormField(
        updateFieldsWithCustomOptions(STATUS_FORM_FIELD, {
          status: STATUS_OPTIONS,
        })
      );
    } else {
      setStatusFormField(
        updateFieldsWithCustomOptions(STATUS_FORM_FIELD, {
          status: [...STATUS_OPTIONS, { label: "Staging", value: "staging" }],
        })
      );
    }
  };

  useEffect(() => {
    constructStatusFormField();
  }, [storeType]);

  /**
   * Handles tab changes with validation and unsaved changes check
   * @param {number} tabId - The ID of the tab to switch to
   */
  const handleTabChange = useCallback(
    async (tabId: number) => {
      if (
        activeTab === 2 ||
        activeTab === 3 ||
        activeTab === 7 ||
        activeTab === 11
      ) {
        if (!isFormValid) {
          toast.error("Please fill in all required fields");
          return;
        }
        if (isDirty) {
          const confirmChange = window.confirm(
            "You have unsaved changes. Are you sure you want to leave this tab?"
          );
          if (!confirmChange) {
            return;
          }
        }
      }
      setIsDirty(false);
      setActiveTab(tabId);
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [activeTab, isDirty, isFormValid]
  );

  /**
   * Marks the form as dirty when changes are made
   */
  const handleFormChange = () => {
    setIsDirty(true);
  };

  /**
   * Defines the tab configuration and their corresponding components
   */
  const tabs = useMemo(() => {
    const commonTabs = [
      {
        id: 1,
        label: "All",
        component: (
          <AllInfoTab
            handleTabChange={handleTabChange}
            productData={initialData as IAllProductData}
            productId={productId}
            type={storeType}
            storeName={storeName}
          />
        ),
      },
      {
        id: 2,
        label: "Basic Information",
        component: (
          <GeneralForm
            storeName={storeName}
            type={storeType}
            initialData={initialData}
            statusFormField={statusFormField}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 3,
        label: "Pricing",
        component: (
          <PricingFormTab
            type={storeType}
            initialData={getSelectedInitialValues(initialData, [
              "msrp",
              "ourCost",
              "salePrice",
              "imap",
              "isImapEnabled",
              "isGiftWrapEnabled",
              "callForPrice",
            ])}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            storeName={storeName}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 4,
        label: "Attributes",
        component: <AttributesTab type={storeType} productId={productId} />,
      },
      {
        id: 5,
        label: "Vendor SKU Mapping",
        component: <VendorSkuMapping productId={productId} />,
      },
      {
        id: 6,
        label: "Inventory",
        component: <InventoryTab productId={productId} />,
      },
      {
        id: 7,
        label: "Size Chart",
        component: (
          <SizeChartTab
            storeName={storeName}
            type={storeType}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 8,
        label: "Logo Location",
        component: <LogoLocation isEditPage={true} productId={productId} />,
      },
      {
        id: 9,
        label: "SKU Swap",
        component: (
          <SkuSwapTab
            initialData={initialData}
            productId={productId}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
          />
        ),
      },
      {
        id: 10,
        label: "Bundle",
        component: <BundleTab productId={productId} />,
      },
      {
        id: 11,
        label: "SEO",
        component: (
          <SeoTab
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            initialData={initialData}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 12,
        label: "Order History",
        component: <OrderHistory />,
      },
      {
        id: 13,
        label: "Customer Review",
        component: <CustomerReview />,
      },
      {
        id: 14,
        label: "Customer FAQ",
        component: <CustomerFAQ />,
      },
      {
        id: 15,
        label: "Life Cycle",
        component: <LifeCycle productId={productId} />,
      },
    ];
    if (storeType === STORE_TYPES.CORPORATE) {
      // add decoration mapping tab here for corporate store
      return [...commonTabs];
    }

    if (storeType === STORE_TYPES.STORE_BUILDER) {
      return [
        ...commonTabs,
        {
          id: 16,
          label: " Product Additional Price",
          component: <ProductAdditionalPrice />,
        },
        {
          id: 17,
          label: "Product Custom Fields",
          component: <ProductCustomFields />,
        },
      ];
    }
    return [...commonTabs];
  }, [storeType, initialData, handleFormChange]);

  /**
   * Gets the active tab component based on current tab selection
   */
  const ActiveTabComponent = useMemo(
    () =>
      tabs.find((tab) => tab.id === activeTab)?.component || (
        <div>No component</div>
      ),
    [activeTab, tabs]
  );

  /**
   * Handles form submission for Basic Information and Pricing tabs
   */
  const handleSubmit = useCallback(async () => {
    const activeComponent = tabs.find((tab) => tab.id === activeTab);
    if (
      activeComponent &&
      (activeComponent.id === 2 ||
        activeComponent.id === 3 ||
        activeComponent.id === 7 ||
        activeComponent.id === 11)
    ) {
      const form = document
        .querySelector("#mainFormSection")
        ?.querySelector("form");
      form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      setIsDirty(false);
    }
  }, [activeTab, tabs]);

  /**
   * Handles status dropdown changes and shows success/error toast
   * @param {string} value - The new status value
   */
  const handleStatusDropdownChange = (value: string) => {
    try {
      toast.success(`Status updated to ${value}`);
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Something went wrong while updating status")
      );
    }
  };

  return (
    <>
      <CreatePageHeader
        navigateUrl={`/admin/stores/${storeType}/${storeName}/products`}
        module={`Edit Product`}
        onSubmit={
          activeTab === 2 ||
          activeTab === 3 ||
          activeTab === 7 ||
          activeTab === 11
            ? handleSubmit
            : undefined
        }
        buttonType="submit"
      />
      <MyTabs
        options={tabs}
        activeTab={activeTab}
        onTabClick={(id) => handleTabChange(id)}
      />
      <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
        <div className="w-full lg:w-7/12 xl:w-10/12" id="mainFormSection">
          {ActiveTabComponent}
        </div>
        <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
          <div className="flex flex-col gap-4">
            <FormRightSection
              statusFormField={statusFormField}
              statusInitialValue={initialData.status}
              rightSectionFields={getFieldsInOrder(statusFormField)}
              handleStatusDropdownChange={handleStatusDropdownChange}
              productDetails={{
                productId: productId,
                productName: initialData.productName,
                vendorSku: initialData.vendorSku,
                sku: initialData.sku,
                imageUrl: initialData.imageUrl,
                updatedAt: initialData.modifiedDate,
                updatedBy: initialData.modifiedBy?.toString(),
                productReadiness: initialData.productReadiness,
                seoReadiness: initialData.seoReadiness,
              }}
              feedType={storeType}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStoreProduct;
