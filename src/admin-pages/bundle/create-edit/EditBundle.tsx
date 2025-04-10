"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import AllInfoTab from "@/admin-pages/bundle/components/AllInfo";
import FormRightSection from "@/admin-pages/product-database/create-edit/components/FormRightSection";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import MyTabs from "@/components/Tab/Tab";

import {
  STATUS_FORM_FIELD,
  STATUS_OPTIONS,
} from "@/constants/product-database/fields.constant";
import { getErrorMessage } from "@/utils/common.util";
import {
  getFieldsInOrder,
  updateFieldsWithCustomOptions,
} from "@/utils/forms.util";

import { IEditBundleProps } from "@/types/bundle/bundle.type";
import { TDynamicFields } from "@/types/products-database/productDatabase.type";

const GeneralForm = dynamic(
  () => import("@/admin-pages/bundle/components/GeneralForm"),
  { loading: () => <Loader /> }
);

const BundlePricingFormTab = dynamic(
  () => import("@/admin-pages/bundle/components/PricingForm"),
  { loading: () => <Loader /> }
);

const BundleAttributeImagesSection = dynamic(
  () => import("@/admin-pages/bundle/components/AttributeImage"),
  { loading: () => <Loader /> }
);

const ProductTab = dynamic(
  () => import("@/admin-pages/bundle/components/ProductTab"),
  { loading: () => <Loader /> }
);

const LifeCycle = dynamic(
  () =>
    import(
      "@/admin-pages/product-database/create-edit/components/LifeCycleTab"
    ),
  { loading: () => <Loader /> }
);

const CustomerReview = dynamic(
  () => import("@/components/common/product/CustomerReview"),
  { loading: () => <Loader /> }
);

const CustomerFAQ = dynamic(
  () => import("@/components/common/product/customer-faq-tab/CustomerFAQTab"),
  { loading: () => <Loader /> }
);

const SeoTab = dynamic(() => import("@/components/common/product/seo/SeoTab"), {
  loading: () => <Loader />,
});

const OrderHistory = dynamic(
  () => import("@/components/common/product/OrderHistory"),
  {
    loading: () => <Loader />,
  }
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
const EditBundle = ({
  storeType,
  storeName,
  bundleId,
  initialData,
}: IEditBundleProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const [statusFormField, setStatusFormField] =
    useState<TDynamicFields>(STATUS_FORM_FIELD);
  const [isDirty, setIsDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Handles tab changes with validation and unsaved changes check
   * @param {number} tabId - The ID of the tab to switch to
   */
  const handleTabChange = useCallback(
    async (tabId: number) => {
      if (activeTab === 2 || activeTab === 4) {
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
    },
    [activeTab, isDirty, isFormValid]
  );

  /**
   * Marks the form as dirty when changes are made
   */
  const handleFormChange = () => {
    setIsDirty(true);
  };

  const constructStatusFormField = () => {
    setStatusFormField(
      updateFieldsWithCustomOptions(STATUS_FORM_FIELD, {
        status: STATUS_OPTIONS,
      })
    );
  };

  useEffect(() => {
    constructStatusFormField();
  }, []);

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
            bundleData={initialData}
            bundleId={bundleId}
          />
        ),
      },
      {
        id: 2,
        label: "Basic Information",
        component: (
          <GeneralForm
            initialData={initialData}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            storeType={storeType}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 3,
        label: "Product",
        component: <ProductTab />,
      },
      {
        id: 4,
        label: "Pricing",
        component: (
          <BundlePricingFormTab
            initialData={initialData}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            setIsDirty={setIsDirty}
          />
        ),
      },
      {
        id: 5,
        label: "Images",
        component: (
          <BundleAttributeImagesSection
            bundleId={bundleId}
            handleTabChange={handleTabChange}
            isEditPage={true}
          />
        ),
      },
      {
        id: 6,
        label: "SEO",
        component: (
          <SeoTab
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            initialData={initialData}
          />
        ),
      },
      {
        id: 7,
        label: "Order History",
        component: <OrderHistory />,
      },
      {
        id: 8,
        label: "Customer Reviews",
        component: <CustomerReview />,
      },
      {
        id: 9,
        label: "Customer FAQ",
        component: <CustomerFAQ />,
      },
      {
        id: 10,
        label: "Life Cycle",
        component: <LifeCycle productId={bundleId} />,
      },
    ];

    return [...commonTabs];
  }, [initialData, handleFormChange]);

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
      (activeComponent.id === 2 || activeComponent.id === 4)
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
        module={`Edit Bundle`}
        navigateUrl={`/admin/stores/${storeType}/${storeName}/bundle`}
        onSubmit={
          activeTab === 2 || activeTab === 4 || activeTab === 6
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
          <FormRightSection
            statusFormField={statusFormField}
            statusInitialValue={initialData.recStatus}
            rightSectionFields={getFieldsInOrder(statusFormField)}
            handleStatusDropdownChange={handleStatusDropdownChange}
            productDetails={{
              productId: "1",
              productName: initialData.name,
              vendorSku: initialData.vendorSKU || "",
              sku: initialData.ourSKU,
              imageUrl: "",
              updatedAt: initialData.modifiedDate || "",
              updatedBy: initialData.modifiedBy?.toString() || "",
              productReadiness: 80,
              seoReadiness: 90,
            }}
            feedType={storeType}
          />
        </div>
      </div>
    </>
  );
};

export default EditBundle;
