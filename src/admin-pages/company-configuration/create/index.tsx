"use client";
import React, { useCallback, useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { Formik, Form as FormikForm } from "formik";
import Dropdown from "@/components/DropDown/DropDown";
import UploadImage from "@/components/UploadImage/UploadImage";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import { Label } from "@/components/Label/Label";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import { ICompanyConfigurationFormValues } from "@/types/company-configuration/companyConfiguration.type";
import { CompanyConfigurationSchema } from "@/utils/validations/companyConfiguration.validation";
import ModuleRights from "@/admin-pages/company-configuration/create/components/ModuleRights";
import {
  AUTO_LOGOUT_TIME_OPTIONS,
  companyConfigurationData,
} from "@/mock-data/companyConfiguration.json";
import { LOGIN_TYPES } from "@/utils/Dummy";
import { useRouter } from "next/navigation";

const CreateCompanyConfiguration = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [initialValues, setInitialValues] =
    useState<ICompanyConfigurationFormValues>({
      id: null,
      fullName: "",
      shortName: "",
      email: "",
      phone: "",
      companyLogo: "",
      logout: "",
      login_type: LOGIN_TYPES.DEFAULT,
    });
  const fetchCompanyData = useCallback(async () => {
    if (!id) return;

    try {
      // For now, using mock data - replace with actual API call
      const companyData = companyConfigurationData.find(
        (item) => item.id === parseInt(id) // Convert string id to number since mock data uses number ids
      );

      if (companyData) {
        setInitialValues({
          id: companyData.id,
          fullName: companyData.full_name,
          shortName: companyData.company_name,
          email: companyData.email || "",
          phone: companyData.phone || "",
          companyLogo: companyData.logo || "", // Handle null/undefined logo
          logout: companyData.logout || "",
          login_type: companyData.login_type as "default" | "sso",
        });
      } else {
        toast.error("Company configuration not found");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [id]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  const handleSubmit = useCallback(
    async (values: ICompanyConfigurationFormValues) => {
      try {
        toast.success(
          `Company configuration ${id ? "updated" : "created"} successfully`
        );
        router.push(PageRoutes.COMPANY_CONFIGURATION.LIST);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [id]
  );
  return (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={CompanyConfigurationSchema}
    >
      {({ errors, setFieldValue, validateForm, values }) => {
        return (
          <FormikForm>
            <CreatePageHeader
              navigateUrl={PageRoutes.COMPANY_CONFIGURATION.LIST}
              module={`${id ? "Edit" : "Add"} Company Configuration`}
              validateForm={validateForm}
              buttonType="submit"
            />
            <div className="w-full flex gap-4 lg:gap-8 lg:p-8 p-4">
              <div className=" w-full">
                <div className="flex flex-col gap-4 lg:gap-6">
                  <div className="w-full">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-6 border border-gray-light dark:border-gray-dark">
                      <div className="w-full ">
                        <Input
                          asterisk
                          placeholder="Enter your full name"
                          label="Full Name"
                          name="fullName"
                          maxLength={60}
                        />
                      </div>
                      <div className="w-full ">
                        <Input
                          asterisk
                          placeholder="Enter your short name"
                          label="Short Name"
                          name="shortName"
                          maxLength={60}
                        />
                      </div>
                      <div className="w-full ">
                        <Input
                          asterisk
                          placeholder="Enter your Email"
                          label="Email"
                          name="email"
                          maxLength={60}
                        />
                      </div>
                      <div className="w-full ">
                        <Input
                          asterisk
                          placeholder="Enter your phone"
                          label="Phone"
                          name="phone"
                          maxLength={60}
                        />
                      </div>
                      <div className="w-full">
                        <UploadImage
                          label="Company Logo"
                          asterisk
                          maxImages={1}
                          onUpload={(files) => {
                            setFieldValue("companyLogo", files);
                          }}
                        />
                      </div>

                      <div>
                        <div className="w-full ">
                          <Dropdown
                            placeholder="Select your logout time"
                            asterisk
                            name="logout"
                            label="Logout Time"
                            id="logout"
                            options={AUTO_LOGOUT_TIME_OPTIONS}
                            value={
                              AUTO_LOGOUT_TIME_OPTIONS.find(
                                (option) => option.value === values.logout
                              ) || null
                            }
                            onChange={(selectedOption: any) =>
                              setFieldValue(
                                "logout",
                                selectedOption?.value || ""
                              )
                            }
                            errorMessage={errors.logout}
                          />
                        </div>
                      </div>
                      <div>
                        <Label required>Login Type</Label>
                        <div className="flex items-center mt-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <RadioGroup
                                label="Default"
                                name="login_type"
                                wrapperClassName="items-center"
                                value={LOGIN_TYPES.DEFAULT}
                                id={LOGIN_TYPES.DEFAULT}
                                onChange={(e) =>
                                  setFieldValue(
                                    "login_type",
                                    e.target.value,
                                    false
                                  )
                                }
                                checked={values.login_type === "default"}
                              />
                              <RadioGroup
                                wrapperClassName="items-center"
                                label="SSO"
                                name="login_type"
                                value={LOGIN_TYPES.SSO}
                                id={LOGIN_TYPES.SSO}
                                onChange={(e) =>
                                  setFieldValue(
                                    "login_type",
                                    e.target.value,
                                    false
                                  )
                                }
                                checked={values.login_type === "sso"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ModuleRights />
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default CreateCompanyConfiguration;
