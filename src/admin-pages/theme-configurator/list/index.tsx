"use client";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { IThemeConfigurationValues } from "@/types/theme-configuration/themeConfiguration.type";
import { ThemeConfigurationValidationSchema } from "@/utils/validations/theme-configuration.validation";
import { Formik, Form as FormikForm } from "formik";
import { PageRoutes } from "../../routes";
import BodyFontConfiguration from "../components/BodyFontConfiguration";
import ButtonConfiguration from "../components/ButtonConfiguration";
import ColorConfiguration from "../components/ColorConfiguration";
import LoginConfiguration from "../components/LoginConfiguration";
import LogoConfiguration from "../components/LogoConfiguration";
import PageHeadingFontConfiguration from "../components/PageHeadingFontConfiguration";
import SidebarConfiguration from "../components/SidebarConfiguration";

const ThemeConfiguration = () => {
  const initialValues: IThemeConfigurationValues = {
    storeLogoUrl: "",
    headerLogoUrl: "",
    faviconUrl: "",
    emailLogoUrl: "",
    bFontFamily: "",
    bFontSize: "",
    bFontWeight: "",
    bLineHeight: "",
    bLetterSpacing: "",
    sBgcolor: "",
    sbgActivecolor: "",
    sbGhovercolor: "",
    sFontcolor: "",
    sActiveColor: "",
    sHoverColor: "",
    pFontFamily: "",
    pFontSize: "",
    pFontWeight: "",
    pLineHeight: "",
    pLetterSpacing: "",
    cBgcolor: "",
    cbgActivecolor: "",
    cbGhovercolor: "",
    cFontcolor: "",
    cActiveColor: "",
    cHoverColor: "",
    primary: "",
    secondary: "",
    red: "",
    green: "",
    yellow: "",
    loginPageStyle: "",
    loginBackgroundUrl: "",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ThemeConfigurationValidationSchema}
        onSubmit={() => {}}
      >
        {({ errors, setFieldValue, values, validateForm }) => {
          return (
            <FormikForm>
              <CreatePageHeader
                module="Theme Configuration"
                cancelButtonName="Refresh"
                navigateUrl={PageRoutes.THEME_CONFIGURATION.LIST}
                validateForm={validateForm}
              />
              <div className="lg:py-8 xl:px-8 py-4 px-4 w-full">
                <div className="flex flex-col gap-4 lg:gap-8">
                  <LogoConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <BodyFontConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <SidebarConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <PageHeadingFontConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <ButtonConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <ColorConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                  <LoginConfiguration
                    errors={errors}
                    setFieldValue={setFieldValue}
                    values={values}
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

export default ThemeConfiguration;
