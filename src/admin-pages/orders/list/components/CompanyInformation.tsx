"use client";

import React from "react";
import { Formik, Form } from "formik";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import { companyValidationSchema } from "./companyInformation.config";
import Button from "@/components/Button/Button";

interface ICompanyFormValues {
  corporateName: string;
  departmentName: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  country: string;
  countryCode: string;
  postalCode: string;
  state: string;
  email: string;
  phone: string;
  fax: string;
}

const CompanyInformation: React.FC = () => {
  const initialValues: ICompanyFormValues = {
    corporateName: "",
    departmentName: "",
    address1: "",
    address2: "",
    suite: "",
    city: "",
    country: "",
    countryCode: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "",
    fax: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companyValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log("Company Information Submitted:", values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
      }) => {
        console.log("values", values);
        console.log("errors", errors);
        console.log("touched", touched);

        return (
          <Form>
            <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Corporate Name"
                      name="corporateName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.corporateName}
                      error={!!(touched.corporateName && errors.corporateName)}
                      errorMessage={errors.corporateName}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Department Name"
                      name="departmentName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.departmentName}
                      error={
                        !!(touched.departmentName && errors.departmentName)
                      }
                      errorMessage={errors.departmentName}
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 1"
                      name="address1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address1}
                      error={!!(touched.address1 && errors.address1)}
                      errorMessage={errors.address1}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 2"
                      name="address2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address2}
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="APT/SUITE#"
                      name="suite"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.suite}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="City"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      error={!!(touched.city && errors.city)}
                      errorMessage={errors.city}
                      asterisk
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="Country"
                      name="country"
                      id="country"
                      options={[]}
                      onChange={(value) => setFieldValue("country", value)}
                      error={!!(touched.country && errors.country)}
                      errorMessage={errors.country}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Country Code"
                      name="countryCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.countryCode}
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="State"
                      name="state"
                      id="state"
                      options={[]}
                      onChange={(value) => setFieldValue("state", value)}
                      error={!!(touched.state && errors.state)}
                      errorMessage={errors.state}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Postal Code"
                      name="postalCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.postalCode}
                      error={!!(touched.postalCode && errors.postalCode)}
                      errorMessage={errors.postalCode}
                      asterisk
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={!!(touched.email && errors.email)}
                      errorMessage={errors.email}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Phone"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      error={!!(touched.phone && errors.phone)}
                      errorMessage={errors.phone}
                      asterisk
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Fax"
                      name="fax"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fax}
                      error={!!(touched.fax && errors.fax)}
                      errorMessage={errors.fax}
                    />
                  </div>
                  <div className="lg:w-6/12" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {}}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmit()}
                  form="catalog-form"
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  form="catalog-form"
                >
                  Search From BC
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  form="catalog-form"
                >
                  Create In BC
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CompanyInformation;
