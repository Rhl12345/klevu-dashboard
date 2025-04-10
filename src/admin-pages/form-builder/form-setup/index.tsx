"use client";
import React, { useRef, useState, useEffect } from "react";
import { Form as FormikForm, Formik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Dropdown from "@/components/DropDown/DropDown";
import Checkbox from "@/components/Checkbox/Checkbox";
import UploadImage from "@/components/UploadImage/UploadImage";
import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { setupFormValidationSchema } from "@/utils/validations/form-builder-validation/setupForm.validation";
import {
  FORM_TYPE,
  IFormBuilderValues,
  IFormSetupProps,
} from "@/types/form-builder/formBuilder.type";
import {
  IPaymentInfoData,
  IShippingMethod,
} from "@/types/form-builder/formBuilder.type";
import { ISetupFormValues } from "@/types/form-builder/formBuilder.type";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

import {
  formLengthOptions,
  importProductSkuOptions,
  payBusinessMethodIdStringOptions,
  storeBuildernavlocationcodeOptions,
} from "@/mock-data/form-builder/setupForm";
import formBuilderList from "@/mock-data/formBuilderList.json";

import FormTypeSection from "@/admin-pages/form-builder/form-setup/components/FormTypeSection";
import ShipBySection from "@/admin-pages/form-builder/form-setup/components/ShipBySection";
import { PageRoutes } from "@/admin-pages/routes";

const FormBuilderList = formBuilderList.data as IFormBuilderValues[];

const FormSetup = ({
  activeTab,
  setActiveTab,
  index,
  setFormSubmit,
  setFormType,
  id,
  storeName,
}: IFormSetupProps) => {
  const editId = id ? Number(id) : null;
  const formRef = useRef<any>();
  const router = useRouter();

  const [SpecificFormData, setSpecificFormData] =
    useState<ISetupFormValues | null>(null);

  const [paymentInfoData, setPaymentInfoData] =
    useState<IPaymentInfoData | null>(null);

  const [initialShippingMethod, setInitialShippingMethod] = useState<
    IShippingMethod[]
  >([]);

  const [showType, setShowType] = useState<"password" | "text">("password");

  const initialValues: ISetupFormValues = {
    id: SpecificFormData?.id || 0,
    rowVersion: SpecificFormData?.rowVersion || "",
    name: SpecificFormData?.name || "",
    parentStoreId: SpecificFormData?.parentStoreId || 0,
    parentStore: SpecificFormData?.parentStore || "PKForms",
    url: SpecificFormData?.url || "",
    programId: SpecificFormData?.programId || "PKF",
    email: SpecificFormData?.email || "",
    storeCode: SpecificFormData?.storeCode || "",
    formLength: SpecificFormData?.formLength || 1,
    formType: SpecificFormData?.formType || "requestForm",
    payBusinessMethodId: SpecificFormData?.payBusinessMethodId || "0",
    ccEmail: SpecificFormData?.ccEmail || "",
    bccEmail: SpecificFormData?.bccEmail || "",
    isReceiveEmail: SpecificFormData?.isReceiveEmail || false,
    openDate: SpecificFormData?.openDate || "",
    closeDate: SpecificFormData?.closeDate || "",
    pdfPath: SpecificFormData?.pdfPath || "",
    imagePath: SpecificFormData?.imagePath || "",
    embroideryPDF: SpecificFormData?.embroideryPDF || "",
    laserFile: SpecificFormData?.laserFile || "",
    screenPrint: SpecificFormData?.screenPrint || "",
    golfBallsLogo: SpecificFormData?.golfBallsLogo || "",
    embroideryDSTFile: SpecificFormData?.embroideryDSTFile || "",
    isUseTemplate: SpecificFormData?.isUseTemplate || false,
    formLogoPath: SpecificFormData?.formLogoPath || "",
    emailLogo: SpecificFormData?.emailLogo || "",
    navCustomerId: SpecificFormData?.navCustomerId || "",
    navLocationCode: SpecificFormData?.navLocationCode || "",
    protectedPassword: SpecificFormData?.protectedPassword || "",
    isPasswordProtected: SpecificFormData?.isPasswordProtected || false,
    isSubmitOrder: SpecificFormData?.isSubmitOrder || false,
    showPrice: SpecificFormData?.showPrice || false,
    formProductId: SpecificFormData?.formProductId || "",
    publishDate: SpecificFormData?.publishDate || new Date().toISOString(),
    importProductSku: SpecificFormData?.importProductSku || "",
    BCCustomerID: SpecificFormData?.BCCustomerID || "",
    shippingAddresses: SpecificFormData?.shippingAddresses?.length
      ? SpecificFormData?.shippingAddresses.map((allProp) => ({
          ...allProp,
          addressTitle: allProp?.addressTitle || "",
          formType: SpecificFormData?.formType || "requestForm",
          payBusinessMethodId: SpecificFormData?.payBusinessMethodId || "",
        }))
      : [
          {
            formType: SpecificFormData?.formType || "requestForm",
            payBusinessMethodId: SpecificFormData?.payBusinessMethodId || "",
            addressTitle: "",
            shipFirstName: "",
            shipLastName: "",
            shipCompany: "",
            shipAddress1: "",
            shipAddress2: "",
            shipCity: "",
            shipState: "",
            shipZipcode: "",
            shipCountry: "",
            shipPhone: "",
            shipEmail: "",
            id: 0,
          },
        ],

    // Payment Information Initialvalues
    shippingMethodId: paymentInfoData?.shippingMethodId || 0,
    shippingCharges: paymentInfoData?.shippingCharges || 0,
    shippingServiceId: paymentInfoData?.shippingServiceId || [],
    ExtraShippingMethodId:
      initialShippingMethod.map((shippingId) => shippingId.id) || [],
    // end

    shipSameasBilling: SpecificFormData?.shipSameasBilling || false,
    noEndDate: SpecificFormData?.noEndDate || false,
    productLimitCount: SpecificFormData?.productLimitCount || 1,
  };

  useEffect(() => {
    if (editId) {
      const editData = FormBuilderList?.find(
        (item) => item.id === Number(editId)
      ) as ISetupFormValues | undefined;

      if (editData) {
        setSpecificFormData(editData);
      
        setShowType(editData.isPasswordProtected ? "password" : "text");
        setFormType((editData.formType as FORM_TYPE) || FORM_TYPE.REQUEST);
      } else {
        setSpecificFormData(null);
      }
    } else {
      setSpecificFormData(null);
    }
  }, [editId]);

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [activeTab]);

  const onSubmit = (values: ISetupFormValues) => {
    if (!editId) {
      toast.success("Form created successfully");
      router.push(
        `${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/180/edit`
      );
    } else {
      toast.success("Form updated successfully");
      setActiveTab(1);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={editId ? true : false}
        initialValues={initialValues}
        validationSchema={setupFormValidationSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <FormikForm>
              <>
                <div className="flex flex-wrap gap-4 lg:gap-8 pb-6">
                  <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-6">
                          <Input
                            name="parentStore"
                            label="Parent Store"
                            asterisk
                            disabled
                            value={values?.parentStore || ""}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Input
                            name="name"
                            label="Name"
                            asterisk
                            placeholder="Enter Name"
                            value={values.name || ""}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <div
                            className={`flex ${errors.url ? "items-center" : "items-end"} gap-2`}
                          >
                            <div className="w-full">
                              <Input
                                name="url"
                                label="URL"
                                asterisk
                                placeholder="Enter URL"
                                value={values?.url || ""}
                              />
                            </div>

                            <Label size="small" className="leading-10">
                              .pkhealthgear.online
                            </Label>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <div className="flex max-lg:flex-wrap gap-4">
                            <div className="w-full lg:w-1/2">
                              <div className="flex flex-col gap-2 justify-start">
                                <label>&nbsp;</label>

                                <Button
                                  type="button"
                                  variant="primary"
                                  size="sm"
                                  className="w-32"
                                >
                                  View Form
                                </Button>
                              </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <ToggleButton
                                name="isReceiveEmail"
                                label="Receive Email"
                                onChange={(e) =>
                                  setFieldValue("isReceiveEmail", e)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {values.isReceiveEmail === true && (
                          <>
                            <div className="col-span-12 lg:col-span-6">
                              <Input
                                asterisk
                                name="email"
                                label="Email"
                                placeholder="Enter Email"
                                value={values?.email || ""}
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                              <Input
                                name="ccEmail"
                                label="CC Email"
                                placeholder="Enter CC Email"
                                value={values?.ccEmail || ""}
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                              <Input
                                name="bccEmail"
                                label="BCC Email"
                                placeholder="Enter BCC Email"
                                value={values?.bccEmail || ""}
                              />
                            </div>
                          </>
                        )}
                        <div className="col-span-12 lg:col-span-6">
                          <Input
                            asterisk
                            type="datetime-local"
                            name="openDate"
                            label="Start Date"
                            placeholder="Select Start Date"
                            value={values?.openDate || ""}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <div className="flex items-center gap-4">
                            <Checkbox name="noEndDate" id="noEndDate" />
                            <Label size="small">No End Date</Label>

                            <div className="w-full">
                              <Input
                                asterisk
                                type="datetime-local"
                                name="closeDate"
                                label="End Date"
                                placeholder="Select End Date"
                                value={values?.closeDate || ""}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Input
                            name="programId"
                            label="Program Id"
                            placeholder="Enter Program Id"
                            value="PKF"
                            disabled
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Dropdown
                            name="formLength"
                            label="Form Length"
                            asterisk
                            placeholder="Select Form Length"
                            isClearable
                            options={formLengthOptions}
                            value={formLengthOptions.find(
                              (option: { value: string; label: string }) =>
                                Number(option.value) === values.formLength
                            )}
                            onChange={(selectedOption: any) =>
                              setFieldValue(
                                "formLength",
                                Number(selectedOption?.value) || 1
                              )
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Input
                            name="BCCustomerID"
                            label="BC Customer Id"
                            placeholder="Enter BC Customer Id"
                            value={values?.BCCustomerID || ""}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <Dropdown
                            isClearable
                            name="navLocationCode"
                            label="BC Location Code"
                            placeholder="Select BC Location Code"
                            options={storeBuildernavlocationcodeOptions}
                            value={
                              storeBuildernavlocationcodeOptions.find(
                                (option: { value: string; label: string }) =>
                                  option.value === values.navLocationCode
                              ) || null
                            }
                            onChange={(selectedOption: any) =>
                              setFieldValue(
                                "navLocationCode",
                                selectedOption?.value || ""
                              )
                            }
                          />
                        </div>

                        <div className="col-span-12 lg:col-span-6">
                          <Dropdown
                            isClearable
                            name="importProductSku"
                            label="Import Product As"
                            placeholder="Select Import Product As"
                            options={importProductSkuOptions}
                            value={
                              importProductSkuOptions.find(
                                (option: { value: string; label: string }) =>
                                  option.value === values.importProductSku
                              ) || null
                            }
                            onChange={(selectedOption: any) =>
                              setFieldValue(
                                "importProductSku",
                                selectedOption?.value || ""
                              )
                            }
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <ToggleButton
                            name="isPasswordProtected"
                            label="Is Password Protected"
                            defaultValue={values.isPasswordProtected}
                            onChange={(e) => {
                              setFieldValue("isPasswordProtected", e);
                              if (!e) {
                                setFieldValue("protectedPassword", "");
                              };
                              setShowType(e ? "password" : "text");
                            }}
                          />
                          {values.isPasswordProtected && (
                            <>
                              <div className="relative pt-4">
                                <Input
                                  name="protectedPassword"
                                  placeholder="Add Your Password"
                                  type={showType}
                                  asterisk
                                  value={values.protectedPassword || ""}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "protectedPassword",
                                      e.target.value
                                    );
                                  }}
                                />
                                <Button
                                  type="button"
                                  size="none"
                                  variant="default"
                                  onClick={() => {
                                    setShowType((prev) =>
                                      prev === "password" ? "text" : "password"
                                    );
                                  }}
                                  className="absolute right-3 top-6 !p-0 min-w-0"
                                  aria-label={
                                    showType === "password"
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                >
                                  {showType !== "password" ? (
                                    <SvgIcon name="EyeOpen" />
                                  ) : (
                                    <SvgIcon name="EyeClosed" />
                                  )}
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <ToggleButton
                            name="isSubmitOrder"
                            label="Start Import BC Orders"
                            defaultValue={values.isSubmitOrder}
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <ToggleButton
                            name="showPrice"
                            label="Show Price"
                            defaultValue={values.showPrice}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* form type section */}
                <FormTypeSection setFormType={setFormType} />

                {/* ship by section */}
                <ShipBySection
                  payBusinessMethodIdStringOptions={
                    payBusinessMethodIdStringOptions
                  }
                />

                <div className="w-full bg-body-light dark:bg-body-dark p-6 mb-6 border border-gray-light dark:border-gray-dark">
                  <div className="flex pb-6">
                    <Label size="large">Form Logo</Label>
                  </div>
                  <div className="flex flex-wrap gap-4 lg:gap-8 pb-6">
                    <div className="gap-6 grid grid-cols-2 w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <UploadImage
                          asterisk
                          label="Form Logo"
                          minImages={1}
                          maxImages={1}
                          onUpload={(files) => {
                            setFieldValue("formLogoPath", files[0]?.name);
                          }}
                          errorMessage={errors.formLogoPath}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <UploadImage
                          label="Email Logo"
                          maxImages={1}
                          minImages={1}
                          onUpload={(files) => {
                            setFieldValue("emailLogo", files[0]?.name);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default FormSetup;
