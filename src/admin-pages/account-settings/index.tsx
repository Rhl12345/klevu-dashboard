"use client";
import ApprovedDomainSection from "@/admin-pages/account-settings/components/ApprovedDomainSection";
import IPSection from "@/admin-pages/account-settings/components/IPSection";
import OneTimePasswordSection from "@/admin-pages/account-settings/components/OneTimePasswordSection";
import PasswordPolicySection from "@/admin-pages/account-settings/components/PasswordPolicySection";
import Loading from "@/app/loading";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { IUserSettingsData } from "@/types/account-settings/accountSettings.type";
import { getErrorMessage } from "@/utils/common.util";
import { PasswordStrengthType } from "@/utils/constants";
import { settingValidationSchema } from "@/utils/validations/accountSettings.validation";
import { Formik, Form as FormikForm } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const [userSettingsData, setUserSettingsData] = useState<IUserSettingsData>({
    id: 1,
    companyConfigurationId: 1,
    passwordStrengthType: PasswordStrengthType.GOOD,
    resetPasswordType: 1,
    resetPasswordDays: 60,
    restrictUsedPasswordType: 1,
    restrictUsedPasswordCount: 0,
    isOneTimePasswordEnabled: false,
    twoStepVerificationType: 1,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserSettingsData = async () => {
    try {
      setIsLoading(true);
      // API call
      toast.success("User settings data fetched successfully");
    } catch (error) {
      // handle error
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useCallback(async (values: IUserSettingsData) => {
    try {
      setIsLoading(true);
      // API call
      toast.success("User settings data updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserSettingsData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Formik
        enableReinitialize={true}
        initialValues={userSettingsData}
        validationSchema={settingValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          validateForm,
          values,
          handleChange,
          setFieldValue,
          errors,
          isSubmitting,
          touched,
          handleBlur,
          setFieldTouched,
        }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                module="Settings"
                validateForm={validateForm}
                aria-label="Account Settings Form"
              />
              <div className="lg:py-8 xl:px-8 py-4 px-4">
                <div
                  className="relative w-full flex flex-col flex-1 overflow-y-auto border border-gray-light dark:border-gray-dark"
                  role="main"
                  aria-label="Account Settings Content"
                >
                  <PasswordPolicySection
                    handleChange={handleChange}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                  />
                  <IPSection />
                  <OneTimePasswordSection
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                  />
                  <ApprovedDomainSection
                    handleChange={handleChange}
                    values={values}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default AccountSettings;
