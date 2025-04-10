"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import {
  IThirdPartyService,
  IThirdPartyServiceFormProps,
} from "@/types/admin-theme/adminTheme.types";
import {
  STATUS_OPTIONS,
  STORE_OPTIONS,
  THIRD_PART_SERVICE_OPTION,
} from "@/utils/Dummy";
import { adminThemeValidationSchema } from "@/utils/validations/adminTheme.validation";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import { toast } from "react-toastify";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

const defaultInitialValues: IThirdPartyService = {
  name: "",
  thirdPartyServiceId: "",
  storeId: "",
  url: "",
  username: "",
  password: "",
  key: "",
  secretkey: "",
  redirectUrlToSite: "",
  thankYouPageUrl: "",
  source: "",
  certificate: "",
  description: "",
  recStatus: "A",
};

const ThirdPartyServiceForm = ({
  serviceId = 0,
  initialValues = defaultInitialValues,
}: IThirdPartyServiceFormProps) => {
  // Add state for password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  // Helper function to find the matching option
  const getSelectedOption = (
    options: { value: string; label: string }[],
    value: string
  ) => {
    return options.find((option) => option.value === value)?.value || null;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={adminThemeValidationSchema}
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={(values) => {
          if (serviceId) {
            // Handle edit
            toast.success("Edited Successfully");
          } else {
            // Handle create
            toast.success("Created Successfully");
          }
        }}
      >
        {({
          setFieldValue,
          validateForm,
          errors,
          touched,
          setFieldTouched,
          validateField,
          handleChange,
        }) => (
          <Form>
            {/* Header */}
            <CreatePageHeader
              navigateUrl={`${PageRoutes.THIRD_PARTY_SERVICE.LIST}`}
              module={`${!serviceId ? "Add Third Party Services" : "Edit Third Party Services"}`}
              validateForm={validateForm}
              buttonType="submit"
              borderShow={true}
            />

            {/* Main Form Content */}
            <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
              <div className="w-full lg:w-7/12 xl:w-10/12">
                {/* Left Column */}
                <div className="flex flex-wrap gap-4 lg:gap-8">
                  {/* Basic Info Section */}
                  <div className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                    <div className="w-full">
                      <Input
                        name="name"
                        label="Name"
                        asterisk
                        onChange={handleChange}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={touched.name && Boolean(errors.name)}
                        errorMessage={touched.name ? errors.name : undefined}
                      />
                    </div>
                    <div className="w-full">
                      <Dropdown
                        name="thirdPartyServiceId"
                        label="Third Party Services"
                        options={THIRD_PART_SERVICE_OPTION}
                        defaultValue={getSelectedOption(
                          THIRD_PART_SERVICE_OPTION,
                          initialValues.thirdPartyServiceId
                        )}
                        onChange={(selected: any) => {
                          setFieldValue("thirdPartyServiceId", selected?.value);
                          validateField("thirdPartyServiceId");
                        }}
                        onBlur={() => {
                          setFieldTouched("thirdPartyServiceId", true, false);
                          validateField("thirdPartyServiceId");
                        }}
                        asterisk
                        error={
                          touched.thirdPartyServiceId &&
                          Boolean(errors.thirdPartyServiceId)
                        }
                        errorMessage={
                          touched.thirdPartyServiceId
                            ? errors.thirdPartyServiceId
                            : undefined
                        }
                        isFormikField={false}
                      />
                    </div>
                    <div className="w-full">
                      <Dropdown
                        name="storeId"
                        label="Store Name"
                        options={STORE_OPTIONS}
                        defaultValue={getSelectedOption(
                          STORE_OPTIONS,
                          initialValues.storeId
                        )}
                        onChange={(selected: any) => {
                          setFieldValue("storeId", selected?.value);
                        }}
                        onBlur={() => {
                          setFieldTouched("storeId", true, false);
                          validateField("storeId");
                        }}
                        asterisk
                        error={touched.storeId && Boolean(errors.storeId)}
                        errorMessage={
                          touched.storeId ? errors.storeId : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="url"
                        label="URL"
                        onChange={handleChange}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        asterisk
                        error={touched.url && Boolean(errors.url)}
                        errorMessage={touched.url ? errors.url : undefined}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="username"
                        label="User Name"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={touched.username && Boolean(errors.username)}
                        errorMessage={
                          touched.username ? errors.username : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            setFieldTouched(e.target.name, true, false);
                            validateField(e.target.name);
                          }}
                          asterisk
                          error={touched.password && Boolean(errors.password)}
                          errorMessage={
                            touched.password ? errors.password : undefined
                          }
                        />
                        <Button
                          className="absolute right-3 top-10 !p-0 min-w-0"
                          onClick={() => setShowPassword(!showPassword)}
                          variant="default"
                          type="button"
                          size="none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {!showPassword ? (
                            <SvgIcon name="EyeOpen" />
                          ) : (
                            <SvgIcon name="EyeClosed" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="w-full">
                      <Input
                        name="key"
                        label="Key"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={touched.key && Boolean(errors.key)}
                        errorMessage={touched.key ? errors.key : undefined}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="secretkey"
                        label="Secret Key"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={touched.secretkey && Boolean(errors.secretkey)}
                        errorMessage={
                          touched.secretkey ? errors.secretkey : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="redirectUrlToSite"
                        label="Redirect URL To Site"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        asterisk
                        error={
                          touched.redirectUrlToSite &&
                          Boolean(errors.redirectUrlToSite)
                        }
                        errorMessage={
                          touched.redirectUrlToSite
                            ? errors.redirectUrlToSite
                            : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="thankYouPageUrl"
                        label="Thank You Page URL"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        asterisk
                        error={
                          touched.thankYouPageUrl &&
                          Boolean(errors.thankYouPageUrl)
                        }
                        errorMessage={
                          touched.thankYouPageUrl
                            ? errors.thankYouPageUrl
                            : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="source"
                        label="Source"
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={touched.source && Boolean(errors.source)}
                        errorMessage={
                          touched.source ? errors.source : undefined
                        }
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="certificate"
                        label="Certificate"
                        as="textarea"
                        rows={3}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          setFieldTouched(e.target.name, true, false);
                          validateField(e.target.name);
                        }}
                        error={
                          touched.certificate && Boolean(errors.certificate)
                        }
                        errorMessage={
                          touched.certificate ? errors.certificate : undefined
                        }
                      />
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark p-4 lg:p-6">
                    <div className="w-full">
                      <div>
                        <RichTextEditor
                          label="Description"
                          initialData={initialValues.description}
                          onChange={(data) =>
                            setFieldValue("description", data)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column - Status */}
              <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                  <Dropdown
                    name="recStatus"
                    label="Status"
                    options={STATUS_OPTIONS}
                    defaultValue={getSelectedOption(
                      STATUS_OPTIONS,
                      initialValues.recStatus
                    )}
                    onChange={(selected: any) => {
                      setFieldValue("recStatus", selected?.value);
                    }}
                    onBlur={() => {
                      setFieldTouched("recStatus", true, false);
                      validateField("recStatus");
                    }}
                    asterisk
                    error={touched.recStatus && Boolean(errors.recStatus)}
                    errorMessage={
                      touched.recStatus ? errors.recStatus : undefined
                    }
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

export default ThirdPartyServiceForm;
