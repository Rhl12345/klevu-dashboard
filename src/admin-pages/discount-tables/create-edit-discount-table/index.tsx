"use client";
import DiscountDetail from "@/admin-pages/discount-tables/components/DiscountDetail";
import { PageRoutes } from "@/admin-pages/routes";
import Loading from "@/app/loading";
import Checkbox from "@/components/Checkbox/Checkbox";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  createDiscountTable,
  getDiscountTableDetails,
  updateDiscountTable,
} from "@/services/discount-table/discountTable.service";
import {
  IDiscountTableFormValues,
  IDropdownOption,
} from "@/types/discount-table/discountTable.type";
import { getErrorMessage } from "@/utils/common.util";
import { discountTableValidationSchema } from "@/utils/validations/discountTable.validation";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ActionMeta } from "react-select";

const INITIAL_VALUES: IDiscountTableFormValues = {
  storeId: 0,
  brandId: 0,
  vendorId: 0,
  quantityName: "",
  recStatus: "A",
  isBundle: false,
  default: false,
};

const CreateEditDiscountTable = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] =
    useState<IDiscountTableFormValues>(INITIAL_VALUES);
  const [stores, setStores] = useState<IDropdownOption[]>([]);
  const [brands, setBrands] = useState<IDropdownOption[]>([]);
  const [vendors, setVendors] = useState<IDropdownOption[]>([]);
  const formikRef = useRef<FormikProps<IDiscountTableFormValues>>(null);

  const fetchDiscountTableDetails = useCallback(
    async (tableId: string) => {
      setIsLoading(true);
      try {
        const response = await getDiscountTableDetails(tableId);
        setFormData({
          storeId: response.storeId || 0,
          brandId: response.brandId || 0,
          vendorId: response.vendorId || 0,
          quantityName: response.quantityName || "",
          recStatus: response.recStatus || "A",
          isBundle: response.isBundle || false,
          default: response.default || false,
        });

        // Load all required dropdowns
        await Promise.all([
          getStoreDropdownData(),
          response.storeId && getBrandDropdownData(response.storeId),
          response.brandId && getVendorDropdownData(response.brandId),
        ]);
      } catch (error) {
        toast.error(getErrorMessage(error));
        router.push(PageRoutes.DISCOUNT_TABLES.LIST);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const getStoreDropdownData = async () => {
    try {
      // Replace with actual API call
      setStores([
        { value: 1, label: "Driving Impressions" },
        { value: 2, label: "Bacardi-GREY GOOSE" },
        { value: 3, label: "Gameday Gear" },
        { value: 4, label: "Corporate Gear" },
        { value: 5, label: "Cyxtera" },
        { value: 6, label: "Boston Beer" },
        { value: 7, label: "Bacardi" },
        { value: 8, label: "Corporate Gear" },
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setStores([]);
    }
  };

  const getBrandDropdownData = async (storeId: number) => {
    try {
      // Replace with actual API call using storeId
      setBrands([
        { value: 1, label: "Brand 1" },
        { value: 2, label: "Brand 2" },
        { value: 3, label: "Brand 3" },
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setBrands([]);
    }
  };

  const getVendorDropdownData = async (brandId: number) => {
    try {
      // Replace with actual API call using brandId
      setVendors([
        { value: 1, label: "Vendor 1" },
        { value: 2, label: "Vendor 2" },
        { value: 3, label: "Vendor 3" },
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setVendors([]);
    }
  };

  const generateName = useCallback(
    (brandId: number, vendorId: number) => {
      const brand = brands.find((b) => b.value === brandId);
      const vendor = vendors.find((v) => v.value === vendorId);
      if (!brand && !vendor) return "";
      return [brand?.label, vendor?.label].filter(Boolean).join(" - ");
    },
    [brands, vendors]
  );

  useEffect(() => {
    if (id) {
      fetchDiscountTableDetails(id);
    } else {
      getStoreDropdownData();
    }
  }, [id, fetchDiscountTableDetails]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={discountTableValidationSchema}
        innerRef={formikRef}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setIsLoading(true);
            if (id) {
              await updateDiscountTable(id, values);
              toast.success("Discount table updated successfully");
            } else {
              const response = await createDiscountTable(values);
              toast.success("Discount table created successfully");
              router.push(`${PageRoutes.DISCOUNT_TABLES.EDIT}/${response.id}`);
            }
          } catch (error) {
            toast.error(getErrorMessage(error));
          } finally {
            setIsLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          setFieldValue,
          validateForm,
          handleBlur,
        }) => (
          <Form className="h-full">
            <CreatePageHeader
              module={`${id ? "Edit" : "Create"} Discount Table`}
              navigateUrl={PageRoutes.DISCOUNT_TABLES.LIST}
              buttonType="submit"
              validateForm={validateForm}
            />

            <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
              <div className="w-full lg:w-7/12 xl:w-10/12">
                <div className="flex flex-wrap gap-4 lg:gap-8">
                  <div className="w-full flex flex-wrap gap-6 bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark p-6">
                    <div className="gap-4 lg:gap-6 grid grid-cols-1 w-full">
                      {/* Store Selection and Bundle Options */}
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="lg:w-6/12">
                          <Dropdown
                            asterisk
                            label="Store"
                            name="storeId"
                            options={stores}
                            defaultValue={values.storeId}
                            onBlur={handleBlur}
                            onChange={(
                              newValue: unknown,
                              _: ActionMeta<unknown>
                            ) => {
                              const storeId =
                                (newValue as { value: number })?.value || 0;
                              setFieldValue("storeId", storeId, false);
                              setFieldValue("brandId", 0, false);
                              setFieldValue("vendorId", 0, false);
                              setFieldValue("quantityName", "", false);
                              if (storeId) {
                                getBrandDropdownData(storeId);
                              } else {
                                setBrands([]);
                                setVendors([]);
                              }
                            }}
                            error={!!errors.storeId && !!touched.storeId}
                            errorMessage={errors.storeId}
                          />
                        </div>

                        <div className="lg:w-6/12 flex flex-col lg:flex-row items-center">
                          <div className="w-full flex items-center justify-start gap-4 lg:gap-6">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="isBundle"
                                name="isBundle"
                                checked={values.isBundle}
                                onChange={(e) => {
                                  setFieldValue("isBundle", e.target.checked);
                                  if (e.target.checked) {
                                    setFieldValue("brandId", 0);
                                    setFieldValue("vendorId", 0);
                                    setFieldValue("quantityName", "");
                                  }
                                }}
                              />
                              <Label>Bundle Discount</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <ToggleButton
                                label="Default"
                                name="default"
                                isInline={true}
                                onChange={(checked) =>
                                  setFieldValue("default", checked)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Brand and Vendor Selection */}
                      {!values.isBundle && (
                        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                          <div className="lg:w-6/12">
                            <Dropdown
                              asterisk
                              label="Brand"
                              name="brandId"
                              options={brands}
                              defaultValue={values.brandId}
                              onBlur={handleBlur}
                              onChange={(
                                newValue: unknown,
                                _: ActionMeta<unknown>
                              ) => {
                                const brandId =
                                  (newValue as { value: number })?.value || 0;

                                // Batch all setFieldValue calls
                                formikRef.current?.setValues(
                                  {
                                    ...values,
                                    brandId,
                                    vendorId: 0,
                                    quantityName: generateName(brandId, 0),
                                  },
                                  false
                                ); // false prevents validation

                                if (brandId) {
                                  getVendorDropdownData(brandId);
                                } else {
                                  setVendors([]);
                                }

                                // Reset touched state for dependent fields
                                formikRef.current?.setTouched(
                                  {
                                    ...touched,
                                    brandId: false,
                                    vendorId: false,
                                  },
                                  false
                                );
                              }}
                              error={!!touched.brandId && !!errors.brandId}
                              errorMessage={
                                touched.brandId ? errors.brandId : undefined
                              }
                            />
                          </div>

                          <div className="lg:w-6/12">
                            <Dropdown
                              asterisk
                              label="Vendor"
                              name="vendorId"
                              options={vendors}
                              defaultValue={values.vendorId}
                              onBlur={handleBlur}
                              onChange={(
                                newValue: unknown,
                                _: ActionMeta<unknown>
                              ) => {
                                const vendorId =
                                  (newValue as { value: number })?.value || 0;

                                // Batch the setFieldValue calls
                                formikRef.current?.setValues(
                                  {
                                    ...values,
                                    vendorId,
                                    quantityName: generateName(
                                      values.brandId,
                                      vendorId
                                    ),
                                  },
                                  false
                                ); // false prevents validation

                                // Reset touched state
                                formikRef.current?.setTouched(
                                  {
                                    ...touched,
                                    vendorId: false,
                                  },
                                  false
                                );
                              }}
                              error={!!touched.vendorId && !!errors.vendorId}
                              errorMessage={
                                touched.vendorId ? errors.vendorId : undefined
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Name Input */}
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="lg:w-6/12">
                          <Input
                            asterisk
                            name="quantityName"
                            label="Name"
                            value={values.quantityName}
                            onChange={handleChange}
                            maxLength={200}
                            error={
                              !!errors.quantityName && !!touched.quantityName
                            }
                            errorMessage={errors.quantityName}
                          />
                        </div>
                        <div className="lg:w-6/12"></div>
                      </div>
                    </div>
                  </div>
                  {id && (
                    <div className="w-full rounded-none content  bg-body-light dark:bg-body-dark">
                      <DiscountDetail quantityId={id} isAddMode={false} />
                    </div>
                  )}
                </div>
              </div>

              {/* Status Selection */}
              <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border border-gray-light dark:border-gray-dark">
                <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                  <Dropdown
                    asterisk
                    label="Discount Table Status"
                    name="recStatus"
                    defaultValue={values.recStatus}
                    options={[
                      { value: "A", label: "Active" },
                      { value: "I", label: "Inactive" },
                    ]}
                    error={!!errors.recStatus && !!touched.recStatus}
                    errorMessage={errors.recStatus}
                    onChange={(newValue: unknown, _: ActionMeta<unknown>) => {
                      setFieldValue(
                        "recStatus",
                        (newValue as { value: string })?.value,
                        false
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateEditDiscountTable;
