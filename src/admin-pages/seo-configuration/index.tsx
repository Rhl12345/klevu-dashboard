"use client";
import Loader from "@/components/common/Loader";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import MyTabs from "@/components/Tab/Tab";
import seoConfiguration from "@/mock-data/seoConfiguration.json";
import {
  getSeoConfiguration,
  saveSeoConfiguration,
} from "@/services/seo-configuration/seoConfiguration.service";
import { ISeoConfiguration } from "@/types/seo-configuration/seoConfiguration.type";
import { getErrorMessage } from "@/utils/common.util";
import { getFirstFormikErrorMessage } from "@/utils/forms.util";
import { SeoConfigurationSchema } from "@/utils/validations/seo.validation";
import { Form, Formik, FormikErrors } from "formik";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

//Lazy loading components
const GeneralTab = dynamic(
  () => import("@/admin-pages/seo-configuration/components/GeneralTab"),
  { loading: () => <Loader /> }
);
const IntegrationTab = dynamic(
  () => import("@/admin-pages/seo-configuration/components/IntegrationTab"),
  { loading: () => <Loader /> }
);
const SocialTab = dynamic(
  () => import("@/admin-pages/seo-configuration/components/SocialTab"),
  { loading: () => <Loader /> }
);

const SeoConfigurator = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "General", component: GeneralTab },
    { id: 2, label: "Social", component: SocialTab },
    { id: 3, label: "Integration", component: IntegrationTab },
  ];
  const [initialValues, setInitialValues] =
    useState<ISeoConfiguration>(seoConfiguration);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSeoConfigData();
  }, []);

  const fetchSeoConfigData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getSeoConfiguration();
      setInitialValues(response);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to fetch SEO configuration"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (
      values: ISeoConfiguration,
      { resetForm }: { resetForm: () => void }
    ) => {
      try {
        setIsLoading(true);
        const response = await saveSeoConfiguration(values);
        setInitialValues(response);
        toast.success("SEO configuration saved successfully");
        fetchSeoConfigData();
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to save SEO configuration"));
      } finally {
        resetForm();
        setIsLoading(false);
      }
    },
    [activeTab, fetchSeoConfigData]
  );

  const ActiveTabComponent = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.component,
    [activeTab]
  );

  const handleTabChange = useCallback(
    async (
      tabId: number,
      validateForm: () => Promise<FormikErrors<ISeoConfiguration>>
    ) => {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        toast.error(
          getFirstFormikErrorMessage(errors) ||
            "Please fill all the required fields"
        );
      } else {
        setActiveTab(tabId);
      }
    },
    [activeTab]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SeoConfigurationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ validateForm }) => (
        <Form>
          <CreatePageHeader
            module="SEO Configuration"
            validateForm={validateForm}
            buttonType="submit"
          />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <MyTabs
                options={tabs}
                activeTab={activeTab}
                onTabClick={(id) => handleTabChange(id, validateForm)}
              />
              <div className="w-full flex flex-col gap-4 lg:gap-8 lg:py-8 xl:px-8 px-4 py-4">
                <div className="w-full bg-body-light dark:bg-body-dark">
                  <div className="flex flex-wrap gap-4 lg:gap-8">
                    {ActiveTabComponent && <ActiveTabComponent />}
                  </div>
                </div>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SeoConfigurator;
