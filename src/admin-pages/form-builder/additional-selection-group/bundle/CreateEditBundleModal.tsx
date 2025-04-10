import AllInfoTab from "@/admin-pages/bundle/components/AllInfo";
import BundleAttributeImagesSection from "@/admin-pages/bundle/components/AttributeImage";
import GeneralForm from "@/admin-pages/bundle/components/GeneralForm";
import BundlePricingFormTab from "@/admin-pages/bundle/components/PricingForm";
import ProductTab from "@/admin-pages/bundle/components/ProductTab";
import FormRightSection from "@/admin-pages/product-database/create-edit/components/FormRightSection";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import MyTabs from "@/components/Tab/Tab";
import {
  STATUS_FORM_FIELD,
  STATUS_OPTIONS,
} from "@/constants/product-database/fields.constant";
import { getBundleDetails } from "@/services/bundle/bundle.service";
import { IBundleDetails } from "@/types/bundle/bundle.type";
import {
  STORE_TYPES,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  getFieldsInOrder,
  updateFieldsWithCustomOptions,
} from "@/utils/forms.util";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const CreateEditBundleModal = ({
  bundleId,
  isOpen,
  onClose,
}: {
  bundleId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [statusFormField, setStatusFormField] =
    useState<TDynamicFields>(STATUS_FORM_FIELD);

  const [initialData, setInitialData] = useState<IBundleDetails | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBundleDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getBundleDetails(bundleId!);
      setInitialData(response);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Something went wrong while fetching bundle details"
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bundleId) {
      fetchBundleDetails();
    }
    setStatusFormField(
      updateFieldsWithCustomOptions(
        bundleId
          ? STATUS_FORM_FIELD
          : { status: { ...STATUS_FORM_FIELD.status, disabled: true } },
        {
          status: [
            ...STATUS_OPTIONS,
            { label: "Out of Stock", value: "out-of-stock" },
            { label: "Discontinued", value: "discontinued" },
            { label: "Back order", value: "back-order" },
          ],
        }
      )
    );
    setActiveTab(bundleId ? 1 : 2);
  }, [bundleId]);

  /**
   * Marks the form as dirty when changes are made
   */
  const handleFormChange = () => {
    setIsDirty(true);
  };

  /**
   * Handles form submission for Basic Information and Pricing tabs
   */
  const handleSubmit = useCallback(async () => {
    if (activeTab === 2 || activeTab === 3 || activeTab === 7) {
      const form = document
        .querySelector("#mainFormSection")
        ?.querySelector("form");
      form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      setIsDirty(false);
    }
  }, [activeTab]);

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
   * Defines the tab configuration and their corresponding components
   */
  const tabs = useMemo(() => {
    if (bundleId) {
      return [
        {
          id: 1,
          label: "All",
          component: (
            <AllInfoTab
              handleTabChange={handleTabChange}
              bundleData={initialData!}
              bundleId={bundleId}
              storeType={STORE_TYPES.FORM_BUILDER}
            />
          ),
        },
        {
          id: 2,
          label: "Basic Information",
          component: (
            <GeneralForm
              initialData={initialData}
              storeType={STORE_TYPES.FORM_BUILDER}
              onFormChange={handleFormChange}
              setIsFormValid={setIsFormValid}
              onClose={onClose}
            />
          ),
        },
        {
          id: 3,
          label: "Products",
          component: <ProductTab />,
        },
        {
          id: 4,
          label: "Pricing",
          component: (
            <BundlePricingFormTab
              initialData={initialData}
              onClose={onClose}
              onFormChange={handleFormChange}
              setIsFormValid={setIsFormValid}
              storeType={STORE_TYPES.FORM_BUILDER}
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
      ];
    }
    return [
      {
        id: 2,
        label: "Basic Information",
        component: (
          <GeneralForm
            storeType={STORE_TYPES.FORM_BUILDER}
            onFormChange={handleFormChange}
            setIsFormValid={setIsFormValid}
            onClose={onClose}
          />
        ),
      },
      {
        id: 3,
        label: "Products",
        component: null,
      },
      {
        id: 4,
        label: "Pricing",
        component: null,
      },
      {
        id: 5,
        label: "Images",
        component: null,
      },
    ];
  }, [bundleId, initialData]);

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

  return (
    <Modal
      size="9xl"
      header={`${bundleId ? "Edit" : "Create"} Bundle For Form Builder`}
      onClose={onClose}
      isOpen={isOpen}
      content={
        <div className="flex flex-col gap-4 lg:gap-8">
          <MyTabs
            options={tabs}
            activeTab={activeTab}
            onTabClick={(id) => handleTabChange(id)}
            toDisable={
              !bundleId
                ? Array.from({ length: tabs.length }, (_, i) => i + 1)
                : []
            }
            usedInsideModal
          />
          <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-6">
            <div className="w-full lg:w-7/12 xl:w-9/12" id="mainFormSection">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                ActiveTabComponent
              )}
            </div>
            <div className="w-full lg:w-5/12 xl:w-3/12 border rounded-none border-gray-light dark:border-gray-dark">
              <FormRightSection
                feedType={STORE_TYPES.FORM_BUILDER}
                statusFormField={statusFormField}
                statusInitialValue={
                  bundleId && initialData?.recStatus
                    ? initialData?.recStatus
                    : "draft"
                }
                rightSectionFields={getFieldsInOrder(statusFormField)}
                handleStatusDropdownChange={handleStatusDropdownChange}
                productDetails={{
                  productId: initialData?.brandId?.toString() || "",
                  productName: initialData?.name || "",
                  vendorSku: initialData?.vendorSKU || "",
                  sku: initialData?.ourSKU || "",
                  imageUrl: "",
                  updatedAt: initialData?.modifiedDate || "",
                  updatedBy: initialData?.modifiedBy || "",
                }}
              />
            </div>
          </div>
        </div>
      }
      footer={
        <div className="flex gap-2">
          <Button
            variant="outline-secondary"
            type="button"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>

          {(activeTab === 2 || activeTab === 4) && (
            <Button onClick={handleSubmit} size="sm" type="button">
              Save
            </Button>
          )}
        </div>
      }
    />
  );
};

export default CreateEditBundleModal;
