import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { validationSchema } from "@/utils/validations/pageRedirect.validation";
import {
  IEditPageRedirectProps,
  IPageRedirect,
  IPageRedirectFormValues,
} from "@/types/page-redirect/pageRedirect.type";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Text from "@/components/Text/Text";
import { createPageRedirect } from "@/services/page-redirect/pageRedirect.service";
import { getErrorMessage } from "@/utils/common.util";
import PageRedirect from "@/mock-data/pageRedirect.json";
import { storeOptions } from "@/utils/Dummy";
import { Formik, Form as FormikForm } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
/**
 * PageRedirectForm Component
 * @component
 * @description Handles the creation and editing of page redirects
 * @returns {React.ReactElement} Rendered form component
 */

const PageRedirectForm = ({ id }: IEditPageRedirectProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageRedirect = PageRedirect.pageRedirects.find(
    (page: IPageRedirect) => page.id === Number(id)
  );

  const initialValues: IPageRedirectFormValues = {
    storeId: id ? String(pageRedirect?.id) || "" : "",
    oldUrl: id ? pageRedirect?.oldUrl || "" : "",
    newUrl: id ? pageRedirect?.newUrl || "" : "",
  };

  const onSubmit = async (values: IPageRedirectFormValues) => {
    try {
      setIsLoading(true);
      await createPageRedirect(values);
      toast.success("Successfully created page redirect");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create page redirect"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, touched, setFieldValue, validateForm }) => (
        <div className="w-full bg-body-light dark:text-secondary-light dark:bg-body-dark">
          <FormikForm>
            <CreatePageHeader
              module={id ? "Edit Page Redirect" : "Add Page Redirect"}
              navigateUrl={PageRoutes.PAGE_REDIRECT.LIST}
              validateForm={validateForm}
              buttonType="submit"
            />

            <div className="lg:gap-8 lg:py-8 xl:px-8 py-4 px-4 grid grid-cols-12 gap-6">
              <div className="col-span-full">
                <div className="w-full gap-4 lg:gap-6 bg-body-light dark:text-secondary-light dark:bg-body-dark rounded-none border border-gray-light dark:border-gray-dark p-4 lg:p-6">
                  <div className="w-full lg:w-1/2 last:mb-0 lg:pr-3">
                    <Dropdown
                      options={storeOptions}
                      name="storeId"
                      id="storeId"
                      defaultValue={id ? storeOptions[0].value : ""}
                      onChange={(value) => {
                        setFieldValue("storeId", value);
                      }}
                      asterisk={true}
                      label="Store Name"
                      error={!!errors.storeId && touched.storeId}
                      errorMessage={errors.storeId || ""}
                    />
                  </div>
                  <div className="w-full my-6 last:mb-0">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-full lg:col-span-6">
                        <Input
                          name="oldUrl"
                          type="text"
                          id="oldUrl"
                          autoComplete="new-password"
                          label="Old Url"
                          asterisk={true}
                          error={!!errors.oldUrl && touched.oldUrl}
                          errorMessage={errors.oldUrl}
                        />
                        <Text size="xs">eg. /xyz.html</Text>
                      </div>
                      <div className="col-span-full lg:col-span-6">
                        <Input
                          name="newUrl"
                          type="text"
                          id="newUrl"
                          label="New Url"
                          asterisk={true}
                          error={!!errors.newUrl && touched.newUrl}
                          errorMessage={errors.newUrl}
                        />
                        <Text size="xs">eg. /xyz.html</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormikForm>
        </div>
      )}
    </Formik>
  );
};

export default PageRedirectForm;
