import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import {
  defaultThemeConfigurationValidationSchema,
  themeConfigurationValidationSchema,
} from "@/utils/validations/form-builder-validation/themeConfiguration.validation";

import ContactSection from "@/admin-pages/form-builder/form-theme-configuration/components/ContactSection";
import CardRadioGroupSection from "@/admin-pages/form-builder/form-theme-configuration/components/CardRadioGroupSection";
import ColorpickerSection from "@/admin-pages/form-builder/form-theme-configuration/components/ColorpickerSection";

const FormThemeConfiguration = () => {
  const initialValues = {
    selectThemeId: 0,
    customId: 0,
    dark: true,
    light: false,
    custom: false,
    typeJson: "",
    customElements: {
      "--tw-theme-btn-primary-color": "",
      "--tw-theme-btn-primary-hover-color": "",
      "--tw-theme-btn-primary-text-color": "",
      "--tw-theme-btn-primary-hover-text-color": "",

      "--tw-theme-btn-secondary-color": "",
      "--tw-theme-btn-secondary-hover-color": "",
      "--tw-theme-btn-secondary-text-color": "",
      "--tw-theme-btn-secondary-hover-text-color": "",

      "--tw-theme-link-default-color": "#007bc5",
      "--tw-theme-link-default-hover-color": "#000000",
      "--tw-theme-bg-gray-color": "#f5f5f6",
      "--tw-theme-border-gray-color": "#f5f5f6",
    },
    contactInfo_id: 0,
    phone: "",
    email: "",
    footer_id: 0,
    footerDisplay: "DarkThemeFooter",
  };

  const handleSubmit = (values: any) => {
    // Check if custom is true and color picker value is not set
    if (
      values.custom &&
      !values.customElements["--tw-theme-btn-primary-color"]
    ) {
      toast.error(
        "Please select a color in the color picker before submitting."
      );
      return; // Prevent form submission
    }
    toast.success("Form theme configuration saved successfully");
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={(values: any) => {
        // Log the values to see if custom is being set correctly
        return values?.custom
          ? themeConfigurationValidationSchema
          : defaultThemeConfigurationValidationSchema;
      }}
    >
      {({ setFieldValue, values, errors }) => {
        return (
          <>
            <FormikForm>
              <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
                <div className="w-full flex flex-col gap-4 lg:gap-6">
                  <CardRadioGroupSection
                    values={values}
                    setFieldValue={setFieldValue}
                    initialValues={initialValues}
                  />

                  {values?.custom && (
                    <ColorpickerSection
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  <ContactSection
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                  <div>
                    <Button size="sm" variant="primary" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </FormikForm>
          </>
        );
      }}
    </Formik>
  );
};

export default FormThemeConfiguration;
