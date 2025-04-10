"use client";

import { Formik, Form as FormikForm, FormikHelpers } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BrandInformation from "@/admin-pages/vendor/components/BrandInformation";
import ContactInformation from "@/admin-pages/vendor/components/ContactInformation";
import VendorCatalog from "@/admin-pages/vendor/components/VendorCatalog";
import VendorSidebar from "@/admin-pages/vendor/components/VendorSidebar";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";

import {
  createVendor,
  getVendorById,
  updateVendor,
} from "@/services/vendor/vendor.service";

import { PageRoutes } from "@/admin-pages/routes";
import { IVendorFormValues } from "@/types/Vendor/vendor.type";
import { getErrorMessage } from "@/utils/common.util";
import { VendorSchema } from "@/utils/validations/vendor.validation";
import vendorMockData from "@/mock-data/Vendor.json";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  { ssr: false }
);

const CreateVendorPage = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [vendor, setVendor] = useState<IVendorFormValues | null>(null);
  // Add loading states for better UX
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: IVendorFormValues = {
    id: vendor?.id || 0,
    vendorName: vendor?.vendorName || "",
    vendorBCID: vendor?.vendorBCID || "",
    contactName: vendor?.contactName || "",
    contactPhone: vendor?.contactPhone || "",
    contactEmail: vendor?.contactEmail || "",
    address: vendor?.address || "",
    website: vendor?.website || "",
    loginName: vendor?.loginName || "",
    password: vendor?.password || "",
    imagePortalWebsite: vendor?.imagePortalWebsite || "",
    imagePortalLogin: vendor?.imagePortalLogin || "",
    imagePortalPassword: vendor?.imagePortalPassword || "",
    notes: vendor?.notes || "",
    vendorStatus: vendor?.vendorStatus || "A",
    isInventoryAvailable: vendor?.isInventoryAvailable || false,
    isAPIAvailable: vendor?.isAPIAvailable || false,
    isFTPAvailable: vendor?.isFTPAvailable || false,
    apiUrl: vendor?.apiUrl || "",
    apiUsername: vendor?.apiUsername || "",
    apiPassword: vendor?.apiPassword || "",
    ftpUrl: vendor?.ftpUrl || "",
    ftpUsername: vendor?.ftpUsername || "",
    ftpPassword: vendor?.ftpPassword || "",
  };

  const handleSubmit = async (
    values: IVendorFormValues,
    formikHelpers: FormikHelpers<IVendorFormValues>
  ) => {
    if (isLoading) return; // Prevent double submission

    if (!id) {
      await handleCreateVendor(values, formikHelpers.resetForm);
    } else {
      handleUpdateVendor(values);
    }
  };

  const handleCreateVendor = async (
    values: IVendorFormValues,
    resetForm: () => void
  ) => {
    try {
      setIsLoading(true);
      // const response = await createVendor(values);
      // router.push(`${PageRoutes.VENDOR.EDIT}${response.id}`);
      toast.success("Vendor created successfully");
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVendor = async (values: IVendorFormValues) => {
    if (!id) return;
    setIsLoading(true);
    try {
      // const response = await updateVendor(Number(id), values);
      toast.success("Vendor updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
    // updateVendor(Number(id), values)
    //   .then((response) => {
    //     fetchVendorById();
    //     toast.success("Vendor updated successfully");
    //   })
    //   .catch((error) => {
    //     toast.error(getErrorMessage(error));
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const fetchVendorById = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setVendor(
        vendorMockData.vendorList.filter(
          (vendor: IVendorFormValues) => vendor.id === Number(id)
        )[0] || null
      );
      // const response = await getVendorById(id.toString());
      // if (response) {
      //   setVendor(response);
      // }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVendorById();
    }
  }, [id]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={(
          values: IVendorFormValues,
          formikHelpers: FormikHelpers<IVendorFormValues>
        ) => handleSubmit(values, formikHelpers)}
        initialValues={initialValues}
        validationSchema={VendorSchema}
      >
        {({ values, setFieldValue, validateForm }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                navigateUrl={PageRoutes.VENDOR.LIST}
                module={`${id ? "Edit" : "Add"} Vendor`}
                validateForm={validateForm}
                buttonType="submit"
              />

              <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
                <div className="w-full lg:w-7/12 xl:w-10/12">
                  <div className="flex flex-wrap gap-4 lg:gap-8">
                    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                      <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                        <div className="gap-4 lg:gap-6 grid grid-cols-1">
                          <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                            <div className="lg:w-6/12">
                              <div>
                                <Input
                                  asterisk={true}
                                  label="Vendor Name"
                                  name="vendorName"
                                  onChange={(e) => {
                                    setFieldValue("vendorName", e.target.value);
                                  }}
                                  value={values.vendorName}
                                />
                              </div>
                            </div>
                            <div className="lg:w-6/12">
                              <div>
                                <Input
                                  asterisk={true}
                                  label="Vendor BC ID"
                                  name="vendorBCID"
                                  onChange={(e) => {
                                    setFieldValue("vendorBCID", e.target.value);
                                  }}
                                  value={values.vendorBCID}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {id ? (
                      <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                        <BrandInformation />
                      </div>
                    ) : null}

                    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                      <ContactInformation />
                    </div>

                    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                      <div className="text-xl font-semibold text-secondary-dark dark:text-secondary-light">
                        <div className="grid grid-cols-1">
                          <div className="flex flex-wrap gap-4 lg:gap-6 lg:space-y-0 space-y-6 p-4 lg:p-6">
                            <div className="w-full relative md:w-full">
                              <div className="relative">
                                <RichTextEditor
                                  initialData={values.notes}
                                  label="Notes"
                                  onChange={(e) => {
                                    setFieldValue("notes", e);
                                  }}
                                  placeholder="Type your content here..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <VendorCatalog />
                  </div>
                </div>

                <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                  <VendorSidebar />
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateVendorPage;
