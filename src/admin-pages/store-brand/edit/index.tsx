"use client";

import { useMemo, useState } from "react";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { STATUS_VALUES, STORE_BRAND_TABS } from "@/utils/constants";
import { Formik, Form as FormikForm } from "formik";
import storeBrandData from "@/mock-data/storeBrandData.json";
import Checkbox from "@/components/Checkbox/Checkbox";
import { Textarea } from "@/components/Textarea/Textarea";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import InputNumber from "@/components/Input/InputNumber";
import { validationSchema } from "@/utils/validations/storeBrand.validation";
import { IDropdownOption } from "@/components/Table/types";
import Catalog from "@/admin-pages/store-brand/components/Catalog";
import dynamic from "next/dynamic";
import Tooltip from "@/components/Tooltip/Tooltip";
import MyTabs from "@/components/Tab/Tab";
import GeneralTab from "@/admin-pages/store-brand/components/GeneralTab";
import PromotionalProductsTab from "@/admin-pages/store-brand/components/PromotionalProductsTab";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

const EditBrandMasterPage = ({
  storeName,
  storeType,
  brandId,
  backUrl,
}: {
  storeName: string;
  storeType: string;
  brandId: number;
  backUrl: string;
}) => {
  const data = storeBrandData.dummyData.find((item) => item.id == brandId);
  const [activeTab, setActiveTab] = useState(0);

  const RenderComponent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return <GeneralTab />;
      case 1:
        return <PromotionalProductsTab />;
      default:
        break;
    }
  }, [activeTab]);

  const handleTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          name: data?.brandName || "",
          vendorName: data?.vendorName?.split(",") || [],
          seTitle: data?.seTitle || "",
          seKeyWord: data?.seKeyWord || "",
          seDescription: data?.seDescription || "",
          storeID: data?.storeID || 1,
          colorLogoUrl: `${data?.brandLogoUrl}` || "",
          bandWLogoUrl: `${data?.brandLogoUrl}` || "",
          displayOrder: data?.displayOrder || 0,
          productBrandLogo: `${data?.brandLogoUrl}` || "",
          bannerImagePath: `${data?.brandLogoUrl}` || "",
          notes: data?.description || "",
          policyWithCheckBox: data?.policyWithCheckBox || false,
          policyMessage: data?.policyMessage || "",
          recStatus: data?.recStatus,
          allowDiscountForVerifyUser: data?.allowDiscountForVerifyUser || false,
          isEndUserDisplay: data?.isEndUserDisplay || false,
          onlineBrand: data?.onlineBrand || false,
          customSEName: data?.customSEName || "",
          seName: data?.seName || "",
          isCallUsForPriceManufacture:
            data?.isCallUsForPriceManufacture || false,
          isShowavailability: data?.isShowavailability || false,
          brandH1: data?.brandH1 || "",
          brandH2: data?.brandH2 || "",
          discountPercentage: data?.discountPercentage || 0,
          isMinQuantity: data?.isMinQuantity || false,
          minQuantity: data?.minQuantity || 0,
          isBrandPersonalization: data?.isBrandPersonalization || false,
          isShowInMenu: data?.isShowInMenu || false,
          isnotification: data?.isnotification || false,
          notificationDescription: data?.notificationDescription || "",
          isChangeDisplayOrderForBrand:
            data?.isChangeDisplayOrderForBrand || false,
          showBorder: data?.showBorder || false,
          showProductName: data?.showProductName || false,
          showSplitProducts: data?.showSplitProducts || false,
          showButton: data?.showButton || false,
          showPrice: data?.showPrice || false,
          showBrandLogo: data?.showBrandLogo || false,
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue, validateForm, errors, touched }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                module="Edit Brand"
                navigateUrl={backUrl}
                buttonType="submit"
                validateForm={validateForm}
              />

              <MyTabs
                options={STORE_BRAND_TABS}
                activeTab={STORE_BRAND_TABS.findIndex(
                  (tab) => tab.id === activeTab
                )}
                onTabClick={handleTab}
              />

              <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-6">
                <div className="w-full lg:w-7/12 xl:w-10/12">
                  {RenderComponent}
                  <div className="flex flex-wrap gap-4 lg:gap-8 py-8">
                    <div className="w-full rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="w-full flex flex-col gap-4 py-4 px-6">
                          <Label>Cart Page Policy</Label>
                          <div className="w-full">
                            <Checkbox
                              name="policyWithCheckBox"
                              label="With Checkbox"
                              id="policyWithCheckBox"
                              checked={values?.policyWithCheckBox}
                              onChange={(e) => {
                                setFieldValue(
                                  "policyWithCheckBox",
                                  e.target.checked
                                );
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <Textarea
                              rows={3}
                              label="Message :"
                              name={"policyMessage"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="w-full flex flex-col gap-4 py-4 px-6">
                          <Label className="my-2">SEO</Label>
                          <div className="w-full">
                            <Input
                              name="seTitle"
                              id="seTitle"
                              type="text"
                              label="Meta Title :"
                              asterisk
                            />
                          </div>
                          <div className="w-full">
                            <Input
                              name="seKeyWord"
                              id="seKeyWord"
                              type="text"
                              label="Meta Keywords :"
                            />
                          </div>
                          <div className="w-full">
                            <Input
                              name="seDescription"
                              id="seDescription"
                              type="text"
                              label="Meta Description :"
                            />
                          </div>
                          <div className="w-full">
                            <Input
                              name="brandH1"
                              id="brandH1"
                              type="text"
                              label="H1 Tag :"
                            />
                          </div>
                          <div className="w-full">
                            <Input
                              name="brandH2"
                              id="brandH2"
                              type="text"
                              label="H2 Tag :"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6 w-full rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                      <div className="w-full flex flex-col gap-4 py-4 px-6">
                        <RichTextEditor
                          label="Description"
                          initialData={values.notes}
                          onChange={(e) => {
                            setFieldValue("notes", e);
                          }}
                          placeholder="Type your content here..."
                        />
                      </div>
                    </div>

                    <div className="w-full rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                      <Catalog brandId={brandId} />
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                  <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                    <div className="flex flex-col gap-2 max-w-sm mx-auto">
                      <Dropdown
                        label="Brand Status"
                        asterisk
                        defaultValue={
                          values.recStatus === "I" ? "inactive" : "active"
                        }
                        name="recStatus"
                        id="recStatus"
                        isFormikField
                        options={STATUS_VALUES}
                        onChange={(event) => {
                          setFieldValue(
                            "recStatus",
                            (event as IDropdownOption).value
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="pb-6 py-4 px-4 flex flex-wrap flex-col gap-4">
                    <ToggleButton
                      label="Show discount with login"
                      id={"allowDiscountForVerifyUser"}
                      name={"allowDiscountForVerifyUser"}
                      defaultValue={values?.allowDiscountForVerifyUser}
                    />
                    <ToggleButton
                      label="End User Display"
                      id={"isEndUserDisplay"}
                      name={"isEndUserDisplay"}
                      defaultValue={values?.isEndUserDisplay}
                    />
                    <ToggleButton
                      label="Online Brand"
                      id={"onlineBrand"}
                      name={"onlineBrand"}
                      defaultValue={values?.onlineBrand}
                    />
                    <ToggleButton
                      label="Call Us For Price Manufacture"
                      id={"isCallUsForPriceManufacture"}
                      name={"isCallUsForPriceManufacture"}
                      defaultValue={values?.isCallUsForPriceManufacture}
                    />
                    <ToggleButton
                      label="Personalization"
                      id={"isBrandPersonalization"}
                      name={"isBrandPersonalization"}
                      defaultValue={values?.isBrandPersonalization}
                    />
                    <ToggleButton
                      label="Notification Banner"
                      id="isnotification"
                      name="isnotification"
                      defaultValue={values?.isnotification}
                      onChange={(e: boolean) => {
                        setFieldValue("isnotification", e);
                      }}
                      on="Active"
                      off="Inactive"
                    />
                    {values.isnotification && (
                      <div className="">
                        <Textarea
                          label={
                            <>
                              <div className="flex">
                                Notification Description
                                <Tooltip id="openGraphTitle">
                                  <p>
                                    This will be displayed on front side product
                                    detail page
                                  </p>
                                </Tooltip>
                              </div>
                            </>
                          }
                          rows={3}
                          name={"notificationDescription"}
                        />
                      </div>
                    )}
                    <ToggleButton
                      label="Change Display Order Logic"
                      id="isChangeDisplayOrderForBrand"
                      name="isChangeDisplayOrderForBrand"
                      defaultValue={values.isChangeDisplayOrderForBrand}
                    />
                    <InputNumber
                      label="Discount Percentage (%)"
                      name="discountPercentage"
                      value={values.discountPercentage}
                      displayError={true}
                      onChange={(e) =>
                        setFieldValue("discountPercentage", e.target.value)
                      }
                    />
                    <Checkbox
                      inputSize="small"
                      name="isMinQuantity"
                      id="isMinQuantity"
                      checked={values?.isMinQuantity}
                      label="Allow Minimum Quantity"
                      onChange={(e) => {
                        setFieldValue(
                          "isMinQuantity",
                          e ? e.target.checked : false
                        );
                        if (e.target.checked === false) {
                          setFieldValue("minQuantity", "0");
                        }
                      }}
                    />
                    {values.isMinQuantity && (
                      <div className="w-full">
                        <InputNumber
                          name="minQuantity"
                          defaultValue={values.minQuantity || 0}
                          displayError={true}
                          onChange={(e) =>
                            setFieldValue("minQuantity", e ? e.target.value : 0)
                          }
                        />
                      </div>
                    )}
                    <Input
                      id={"customSEName"}
                      name={"customSEName"}
                      label="Collection URL"
                    />
                    <Input
                      id={"seName"}
                      name={"seName"}
                      disabled={true}
                      label="SE Name"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-12 gap-6 pt-8"></div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default EditBrandMasterPage;
