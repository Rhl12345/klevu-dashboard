"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { PageRoutes } from "@/admin-pages/routes";
import { Formik, Form as FormikForm, FormikHelpers } from "formik";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import SidebarStoreList from "@/admin-pages/brand/components/SidebarStoreList";
import {
  IBrandFormValues,
  IBrandStatistics,
  IStoreType,
  IVendorItem,
} from "@/types/brand/brand.types";
import UploadImage from "@/components/UploadImage/UploadImage";
import Catalog from "@/admin-pages/brand/components/Catalog";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { Label } from "@/components/Label/Label";
import storesList from "@/mock-data/stores-list.json";
import { BrandSchema } from "@/utils/validations/brand.validation";
import commonListData from "@/mock-data/CommonListData.json";
import LoadingSpinner from "@/components/common/Loader";
import { getErrorMessage } from "@/utils/common.util";
import ImageInstructionsComponent from "@/admin-pages/brand/components/ImageUploadInstructions";
import { STATUS_VALUES } from "@/utils/constants";
import brandsData from "@/mock-data/BrandData.json";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

// Custom hook for brand management`
const useBrandManagement = (id: string | null) => {
  const router = useRouter();

  const params = useParams();
  const editId = params.id;

  const [brandData, setBrandData] = useState<IBrandFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState<IBrandStatistics>({
    activeUPC: 0,
    missingUPC: 0,
    drafts: 0,
    totalProduct: 0,
  });
  const [vendorOptions] = useState<IVendorItem[]>(
    commonListData.vendorOptions.map((item) => ({
      label: item.label,
      value: Number(item.value),
    }))
  );

  useEffect(() => {
    if (editId) {
      const editData = brandsData.brandListData?.find(
        (item) => item.id === Number(editId)
      );
      setBrandData(
        editData
          ? ({
              ...editData,
              vendorId: editData.vendorId || [],
              vendorName: editData.vendorName || [],
              resStatus: editData.recStatus === "I" ? "inactive" : "active",
              productBrandLogo: editData.productBrandLogo || "",
              colorLogoUrl: editData.colorLogoUrl || "",
              bandWLogoUrl: editData.bandWLogoUrl || "",
              colorLogoInitialFiles: editData.colorLogoUrl
                ? [editData.colorLogoUrl]
                : [],
              bandWLogoInitialFiles: editData.bandWLogoUrl
                ? [editData.bandWLogoUrl]
                : [],
              productBrandLogoInitialFiles: editData.productBrandLogo
                ? [editData.productBrandLogo]
                : [],
            } as IBrandFormValues)
          : null
      );
    } else {
      setBrandData(null);
    }
  }, [editId]);

  const handleBrandOperation = async (
    values: IBrandFormValues,
    resetForm?: () => void
  ) => {
    try {
      setIsLoading(true);
      if (!id) {
        // await createBrand(values);
        resetForm?.();
        toast.success("Brand created successfully");
        router.push(`${PageRoutes.BRAND.EDIT}/${id}`);
      } else {
        // await updateBrand(values);
        toast.success("Brand updated successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    brandData,
    statistics,
    isLoading,
    vendorOptions,
    handleBrandOperation,
  };
};

const CreateBrandPage = ({ id }: { id: string | null }) => {
  const {
    brandData,
    statistics,
    isLoading,
    vendorOptions,
    handleBrandOperation,
  } = useBrandManagement(id);

  const initialValues = useMemo(
    () => ({
      id: brandData?.id || 0,
      name: brandData?.name || "",
      colorLogoUrl: brandData?.colorLogoUrl || "",
      bandWLogoUrl: brandData?.bandWLogoUrl || "",
      productBrandLogo: brandData?.productBrandLogo || "",
      notes: brandData?.notes || "",
      vendorId: brandData?.vendorId || "",
      resStatus: brandData?.resStatus === "I" ? "inactive" : "active",
      colorLogoInitialFiles: brandData?.colorLogoInitialFiles[0] || "",
      bandWLogoInitialFiles: brandData?.bandWLogoInitialFiles[0] || "",
      productBrandLogoInitialFiles:
        brandData?.productBrandLogoInitialFiles[0] || "",
    }),
    [brandData]
  );
  const handleSubmit = useCallback(
    async (
      values: IBrandFormValues,
      { resetForm }: FormikHelpers<IBrandFormValues>
    ) => {
      try {
        await handleBrandOperation(values, resetForm);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [handleBrandOperation]
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initialValues as unknown as IBrandFormValues}
        validationSchema={BrandSchema}
      >
        {({ errors, values, touched, setFieldValue, validateForm }) => (
          <FormikForm>
            <CreatePageHeader
              navigateUrl={PageRoutes.BRAND.LIST}
              module={`${id ? "Edit" : "Add"} Brand Master`}
              validateForm={validateForm}
              buttonType="submit"
            />

            <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
              <div className="w-full lg:w-7/12 xl:w-10/12">
                <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark p-5 lg:p-6 mb-4 lg:mb-8">
                  <div className="w-full mb-6 last:mb-0">
                    <Input
                      asterisk
                      label="Brand Name"
                      name="name"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                      maxLength={60}
                      defaultValue={brandData?.name}
                      error={!!errors.name && touched.name}
                      errorMessage={errors.name}
                    />
                  </div>
                  <div className="w-full mb-6 last:mb-0">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-full lg:col-span-6">
                        <div className="grid grid-cols-1 gap-6 w-full">
                          <UploadImage
                            label="Color Logo"
                            className="w-full"
                            maxImages={1}
                            onUpload={(files) => {
                              setFieldValue("colorLogoUrl", files);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-span-full lg:col-span-6">
                        <div className="w-full">
                          <UploadImage
                            label="Black & White Logo"
                            maxImages={1}
                            onUpload={(files) => {
                              setFieldValue("bandWLogoUrl", files);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <ImageInstructionsComponent imageSize="350 x 220" />
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-2">
                    <div className="col-span-6">
                      <div className="w-full">
                        <UploadImage
                          label="Brand Logo"
                          maxImages={1}
                          onUpload={(files) => {
                            setFieldValue("productBrandLogo", files);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <ImageInstructionsComponent imageSize="200 x 35" />
                  <div className="grid grid-cols-12 gap-6 mb-6"></div>

                  <div className="w-full mb-6 last:mb-0">
                    <Dropdown
                      label="Select Vendor"
                      asterisk
                      isMulti
                      defaultValue={values.vendorId}
                      name={"vendorId"}
                      options={vendorOptions}
                      error={!!errors.vendorId && touched.vendorId}
                      errorMessage={
                        Array.isArray(errors.vendorId)
                          ? errors.vendorId[0]
                          : errors.vendorId || ""
                      }
                    />
                  </div>
                </div>

                <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark p-5 lg:p-6 mb-4 lg:mb-8">
                  <div className="w-full mb-6 last:mb-0">
                    <RichTextEditor
                      label="Notes"
                      initialData={values.notes}
                      onChange={(e) => {
                        setFieldValue("notes", e);
                      }}
                      placeholder="Type your content here..."
                    />
                  </div>
                </div>
                {/* Catalog */}
                <Catalog
                  isAddMode={!id}
                  id={Number(id)}
                  brandId={brandData?.id}
                  
                  vendorId={brandData?.vendorId?.map(Number) || []}
                />
              </div>

              <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                  <Dropdown
                    label="Brand Status"
                    asterisk
                    defaultValue={
                      values.resStatus === "I" ? "inactive" : "active"
                    }
                    name="resStatus"
                    id="resStatus"
                    options={STATUS_VALUES}
                    error={!!errors.resStatus && touched.resStatus}
                    errorMessage={errors.resStatus}
                    onChange={(e: any) => {
                      setFieldValue("resStatus", e.value);
                    }}
                  />
                </div>

                <div className="py-4 px-4 flex gap-2 flex-col">
                  <Label>Statistics</Label>

                  <div className="flex flex-wrap items-center justify-between border-b last:border-b-0 border-gray-light dark:border-gray-dark pb-2 last:pb-0">
                    <Label weight="font-normal">Active Products</Label>
                    <Label weight="font-normal">{statistics.activeUPC}</Label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between border-b last:border-b-0 border-gray-light dark:border-gray-dark pb-2 last:pb-0">
                    <Label weight="font-normal">Inactive Products</Label>
                    <Label weight="font-normal">{statistics.missingUPC}</Label>
                  </div>
                  <div className="flex flex-wrap items-center justify-between border-b last:border-b-0 border-gray-light dark:border-gray-dark pb-2 last:pb-0">
                    <Label weight="font-normal">Draft Products</Label>
                    <Label weight="font-normal">{statistics.drafts}</Label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between border-b last:border-b-0 border-gray-light dark:border-gray-dark pb-2 last:pb-0">
                    <Label weight="font-normal">Total Products</Label>
                    <Label weight="font-normal">
                      {statistics.totalProduct}
                    </Label>
                  </div>

                  <SidebarStoreList
                    storeType={storesList as unknown as IStoreType[]}
                  />
                </div>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default CreateBrandPage;
