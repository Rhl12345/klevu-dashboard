"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Button from "@/components/Button/Button";
import {
  FORM_TYPE,
  IFormSetupRef,
} from "@/types/form-builder/formBuilder.type";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

import { PageRoutes } from "@/admin-pages/routes";
import FormBuilderTabs from "@/admin-pages/form-builder/create-edit-form-builder/components/FormBuilderTabs";
import FormSetup from "@/admin-pages/form-builder/form-setup";
import PrimarySelectionGroup from "@/admin-pages/form-builder/primary-selection-group";
import FormBuilderConfiguration from "@/admin-pages/form-builder/form-builder-configuration";
import FixedProducts from "@/admin-pages/form-builder/fixed-products";
import FormThemeConfiguration from "@/admin-pages/form-builder/form-theme-configuration";
import FormShareReport from "@/admin-pages/form-builder/form-share-report";
import AdditionalSelectionGroup from "@/admin-pages/form-builder/additional-selection-group";
import FormReport from "@/admin-pages/form-builder/form-report";
import FormProductSequence from "@/admin-pages/form-builder/form-product-sequence";
import FormSaveConfiguration from "@/admin-pages/form-builder/form-save-configuration";

const CreateEditFormBuilder = ({
  id,
  storeName,
}: {
  id?: string;
  storeName?: string;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formSubmit, setFormSubmit] = useState<IFormSetupRef | null>(null);
  const [useHandleSubmit, setUseHandleSubmit] = useState(true);
  const [formType, setFormType] = useState<string>(FORM_TYPE.REQUEST);

  const isAddMode = !id;
  const router = useRouter();
  const TAB_CONFIG = [
    { id: 1, key: "setup", title: "Setup", component: FormSetup },
    {
      id: 2,
      key: "primarySelection",
      title: "Primary Selection Group",
      component: PrimarySelectionGroup,
    },
    {
      id: 3,
      key: "additionalSelection",
      title: "Additional Selection Group",
      component: AdditionalSelectionGroup,
    },
    {
      id: 4,
      key: "fixedProducts",
      title: "Fixed Products",
      component: FixedProducts,
    },
    {
      id: 5,
      key: "saveConfigureForm",
      title: "Save & Configure Form",
      component: FormSaveConfiguration,
    },
    {
      id: 6,
      key: "configuration",
      title: "Configuration",
      component: FormBuilderConfiguration,
    },
    {
      id: 7,
      key: "theme",
      title: "Form Theme Configuration",
      component: FormThemeConfiguration,
    },
    {
      id: 8,
      key: "report",
      title: "Report",
      component: FormReport,
    },
    {
      id: 9,
      key: "shareReport",
      title: "Share Report",
      component: FormShareReport,
    },
    {
      id: 10,
      key: "productSequence",
      title: "Product Sequence",
      component: FormProductSequence,
    },
  ];

  const tabContent = useMemo(() => {
    return TAB_CONFIG.map((tab) => {
      const Component = tab.component; // Get the component for the tab
      return (
        <Component
          key={tab.key}
          isAddMode={isAddMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setFormSubmit={setFormSubmit}
          setUseHandleSubmit={setUseHandleSubmit}
          setFormType={setFormType}
          id={id ?? ""}
          storeName={storeName ?? ""}
          index={tab.id - 1}
        />
      ); // Render the component
    });
  }, []);

  const getButtonText = (): string => {
    if (isAddMode) return "Create & Next";
    return useHandleSubmit ? "Update & Next" : "Next";
  };

  const handleSubmit = useCallback(async () => {
    const form = document
      .querySelector("#mainFormSection")
      ?.querySelector("form");
    form?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }, [activeTab, formSubmit]);

  const goToNextTab = () => {
    if (activeTab < TAB_CONFIG.length - 1) {
      setActiveTab((prev) => prev + 1);
    } else {
      router.push(
        `${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store`
      );
    }
  };

  const goToPreviousTab = () => {
    if (activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }
  };

  return (
    <div>
      <CreatePageHeader
        module={`${isAddMode ? "Add" : "Edit"} Form`}
        navigateUrl={PageRoutes.FORM_BUILDER.LIST}
        showCancelButton={activeTab === 0 ? true : false}
      >
        {activeTab === 0 && (
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            {getButtonText()}
          </Button>
        )}
        {activeTab !== 0 && (
          <>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={goToPreviousTab}
              disabled={activeTab === 0}
            >
              Previous
            </Button>
            <Button type="button" variant="primary" onClick={goToNextTab}>
              {activeTab === TAB_CONFIG.length - 1 ? "Publish" : "Next"}
            </Button>
          </>
        )}
      </CreatePageHeader>
      <FormBuilderTabs
        tabContent={tabContent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formType={formType}
        id={id ?? ""}
      />
    </div>
  );
};

export default CreateEditFormBuilder;
