"use client";

import AllInfoTab from "@/admin-pages/product-database/create-edit/components/AllInfoTab";
import FormRightSection from "@/admin-pages/product-database/create-edit/components/FormRightSection";
import { PageRoutes } from "@/admin-pages/routes";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import MyTabs from "@/components/Tab/Tab";
import {
  STATUS_FORM_FIELD,
  STATUS_OPTIONS,
} from "@/constants/product-database/fields.constant";
import {
  IAllProductData,
  IEditProductProps,
} from "@/types/product/product.type";
import {
  PRODUCT_FEEDS,
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
  () =>
    import("@/admin-pages/product-database/create-edit/components/GeneralForm"),
  { loading: () => <Loader /> }
);

const PricingFormTab = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/PricingFormTab"
    ),
  { loading: () => <Loader /> }
);

const AttributesTab = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/AttributesTab"
    ),
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

const SizeChartTab = dynamic(
  () => import("@/components/common/product/SizeChart"),
  { loading: () => <Loader /> }
);

/**
 * EditProduct Component - Handles the editing of products in both core and regular product feeds
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
const EditProduct = ({ type, initialData, productId }: IEditProductProps) => {
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
    if (type === PRODUCT_FEEDS.CORE_PRODUCT_FEED) {
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
  }, [type]);

  /**
   * Handles tab changes with validation and unsaved changes check
   * @param {number} tabId - The ID of the tab to switch to
   */
  const handleTabChange = useCallback(
    async (tabId: number) => {
      if (activeTab === 2 || activeTab === 3 || activeTab === 7) {
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
            type={type}
          />
        ),
      },
      {
        id: 2,
        label: "Basic Information",
        component: (
          <GeneralForm
            type={type}
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
            type={type}
            initialData={getSelectedInitialValues(initialData, [
              "msrp",
              "ourCost",
              "salePrice",
              "imap",
              "isImapEnabled",
            ])}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 4,
        label: "Attributes",
        component: <AttributesTab type={type} productId={productId} />,
      },
      {
        id: 5,
        label: "Vendor SKU Mapping",
        component: <VendorSkuMapping productId={productId} />,
      },
    ];
    if (type === PRODUCT_FEEDS.CORE_PRODUCT_FEED) {
      return [
        ...commonTabs,
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
              type={type}
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
          id: 12,
          label: "SKU Swap",
          component: (
            <SkuSwapTab
              initialData={initialData}
              productId={productId}
              onFormChange={handleFormChange}
              setIsFormValid={setIsFormValid}
              setIsDirty={setIsDirty}
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
          label: "Life Cycle",
          component: <LifeCycle productId={productId} />,
        },
      ];
    }
    return [...commonTabs];
  }, [type, initialData, handleFormChange]);

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
        activeComponent.id === 7)
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
        navigateUrl={
          type === PRODUCT_FEEDS.CORE_PRODUCT_FEED
            ? PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.LIST
            : PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.LIST
        }
        module={`Edit ${type === PRODUCT_FEEDS.CORE_PRODUCT_FEED ? "Core Product" : "Product"}`}
        onSubmit={
          activeTab === 2 ||
          activeTab === 3 ||
          activeTab === 12 ||
          activeTab === 7
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
        <div className="w-full lg:w-7/12 xl:w-9/12" id="mainFormSection">
          {ActiveTabComponent}
        </div>
        <div className="w-full lg:w-5/12 xl:w-3/12 border rounded-none border-gray-light dark:border-gray-dark">
          <FormRightSection
            statusFormField={statusFormField}
            statusInitialValue={initialData.status}
            rightSectionFields={getFieldsInOrder(statusFormField)}
            handleStatusDropdownChange={handleStatusDropdownChange}
            productDetails={{
              productId: initialData.productId,
              productName: initialData.productName,
              vendorSku: initialData.vendorSku,
              sku: initialData.sku,
              imageUrl: initialData.imageUrl,
              updatedAt: initialData.updatedAt,
              updatedBy: initialData.updatedBy,
              productReadiness: initialData.productReadiness,
              seoReadiness: initialData.seoReadiness,
            }}
            feedType={type}
          />
        </div>
      </div>
    </>
  );
};

export default EditProduct;
