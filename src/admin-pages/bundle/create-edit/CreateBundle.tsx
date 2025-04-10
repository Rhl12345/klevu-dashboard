"use client";
import FormRightSection from "@/admin-pages/product-database/create-edit/components/FormRightSection";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import MyTabs from "@/components/Tab/Tab";
import {
  STATUS_FORM_FIELD,
  STATUS_OPTIONS,
} from "@/constants/product-database/fields.constant";
import {
  STORE_TYPES,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  getFieldsInOrder,
  updateFieldsWithCustomOptions,
} from "@/utils/forms.util";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const GeneralForm = dynamic(
  () => import("@/admin-pages/bundle/components/GeneralForm"),
  { loading: () => <Loader /> }
);

/**
 * Component for creating/editing core and product feed products
 * @component
 * @param {PRODUCT_FEEDS} props.type - Type of product feed
 * @returns {JSX.Element} Rendered component
 */
const CreateBundle = ({
  storeType,
  storeName,
}: {
  storeType: STORE_TYPES;
  storeName: string;
}) => {
  /** Current active tab ID */
  const [activeTab, setActiveTab] = useState(1);

  /** Form fields for the status section */
  const [statusFormField, setStatusFormField] =
    useState<TDynamicFields>(STATUS_FORM_FIELD);

  useEffect(() => {
    contructFormFieldWithOptions();
  }, []);

  /**
   * Constructs form fields with appropriate status options based on product feed type
   */
  const contructFormFieldWithOptions = () => {
    try {
      setStatusFormField(
        updateFieldsWithCustomOptions(STATUS_FORM_FIELD, {
          status: STATUS_OPTIONS,
        })
      );
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Something went while fetching form fields")
      );
    }
  };

  /**
   * Memoized tabs configuration based on product feed type
   */
  const tabs = useMemo(() => {
    const commonTabs = [
      {
        id: 1,
        label: "Basic Information",
        component: <GeneralForm />,
      },
      { id: 2, label: "Pricing", component: null },
      { id: 3, label: "Attributes", component: null },
      { id: 4, label: "Vendor SKU Mapping", component: null },
      { id: 5, label: "Inventory", component: null },
      { id: 6, label: "Size Chart", component: null },
      { id: 7, label: "Logo Location", component: null },
      { id: 8, label: "SKU Swap", component: null },
      { id: 9, label: "Bundle", component: null },
      { id: 10, label: "Life Cycle", component: null },
    ];

    return commonTabs;
  }, []);

  /**
   * Memoized active tab component
   */
  const ActiveTabComponent = useMemo(
    () =>
      tabs.find((tab) => tab.id === activeTab)?.component || (
        <div>No component</div>
      ),
    [activeTab, tabs]
  );

  /**
   * Handles tab change
   * @param {number} tabId - ID of the tab to switch to
   */
  const handleTabChange = useCallback(
    async (tabId: number) => {
      setActiveTab(tabId);
    },
    [activeTab]
  );

  /**
   * Handles form submission
   * Triggers submit event on the form if active tab is the first tab
   */
  const handleSubmit = useCallback(async () => {
    const activeComponent = tabs.find((tab) => tab.id === activeTab);
    if (activeComponent && activeComponent.id === 1) {
      const form = document
        .querySelector("#mainFormSection")
        ?.querySelector("form");
      form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }, [activeTab, tabs]);

  /**
   * Handles status dropdown change
   * @param {string} value - New status value
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
        navigateUrl={`/admin/stores/${storeType}/${storeName}/bundle`}
        module={"Create Bundle"}
        onSubmit={handleSubmit}
        buttonType="submit"
      />

      <MyTabs
        options={tabs}
        activeTab={activeTab}
        toDisable={Array.from({ length: tabs.length }, (_, index) => index + 1)}
        onTabClick={(id) => handleTabChange(id)}
      />
      <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
        <div className="w-full lg:w-7/12 xl:w-10/12" id="mainFormSection">
          {ActiveTabComponent}
        </div>
        <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
          <div className="relative flex flex-col gap-4">
            <FormRightSection
              statusFormField={statusFormField}
              statusInitialValue={"draft"}
              rightSectionFields={getFieldsInOrder({
                status: { ...statusFormField?.status, disabled: true },
              })}
              handleStatusDropdownChange={handleStatusDropdownChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBundle;
