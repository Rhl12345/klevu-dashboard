"use client";

import React from "react";
import { Formik, Form } from "formik";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import Text from "@/components/Text/Text";

import Button from "@/components/Button/Button";
import { personalDetailsValidationSchema } from "./personalDetails.config";

interface IPersonalDetailsFormValues {
  store: string;
  email: string;
  firstName: string;
  lastName: string;
  bcCustomerId: string;
  // Billing Info
  billingFirstName: string;
  billingLastName: string;
  billingCompanyName: string;
  billingAddress1: string;
  billingAddress2: string;
  billingSuite: string;
  billingCity: string;
  billingCountry: string;
  billingCountryCode: string;
  billingState: string;
  billingPostalCode: string;
  billingEmail: string;
  billingPhone: string;
  billingFax: string;
  // Shipping Info
  shippingFirstName: string;
  shippingLastName: string;
  shippingCompanyName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingSuite: string;
  shippingCity: string;
  shippingCountry: string;
  shippingCountryCode: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingFax: string;
}

const PersonalDetails: React.FC = () => {
  const initialValues: IPersonalDetailsFormValues = {
    store: "",
    email: "",
    firstName: "",
    lastName: "",
    bcCustomerId: "",
    // Billing Info
    billingFirstName: "",
    billingLastName: "",
    billingCompanyName: "",
    billingAddress1: "",
    billingAddress2: "",
    billingSuite: "",
    billingCity: "",
    billingCountry: "",
    billingCountryCode: "",
    billingState: "",
    billingPostalCode: "",
    billingEmail: "",
    billingPhone: "",
    billingFax: "",
    // Shipping Info
    shippingFirstName: "",
    shippingLastName: "",
    shippingCompanyName: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingSuite: "",
    shippingCity: "",
    shippingCountry: "",
    shippingCountryCode: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingFax: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={personalDetailsValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log("Personal Details Submitted:", values);
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
        return (
          <Form>
            <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
              <Text size="lg">
                Security Information
              </Text>
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="Store"
                      name="store"
                      id="store"
                      options={[]} // Populate with store options
                      onChange={(value) => setFieldValue("store", value)}
                      error={!!(touched.store && errors.store)}
                      errorMessage={errors.store}
                      asterisk
                    />
                  </div>
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
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={!!(touched.firstName && errors.firstName)}
                      errorMessage={errors.firstName}
                      asterisk
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={!!(touched.lastName && errors.lastName)}
                      errorMessage={errors.lastName}
                      asterisk
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="BC Customer ID"
                      name="bcCustomerId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bcCustomerId}
                      error={!!(touched.bcCustomerId && errors.bcCustomerId)}
                      errorMessage={errors.bcCustomerId}
                    />
                  </div>
                  <div className="lg:w-6/12" />
                </div>
              </div>

              {/* Billing Information */}
              <Text size="lg">
                Billing Information
              </Text>
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="First Name"
                      name="billingFirstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingFirstName}
                      error={
                        !!(touched.billingFirstName && errors.billingFirstName)
                      }
                      errorMessage={errors.billingFirstName}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Last Name"
                      name="billingLastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingLastName}
                      error={
                        !!(touched.billingLastName && errors.billingLastName)
                      }
                      errorMessage={errors.billingLastName}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Company Name"
                      name="billingCompanyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingCompanyName}
                      error={
                        !!(
                          touched.billingCompanyName &&
                          errors.billingCompanyName
                        )
                      }
                      errorMessage={errors.billingCompanyName}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 1"
                      name="billingAddress1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingAddress1}
                      error={
                        !!(touched.billingAddress1 && errors.billingAddress1)
                      }
                      errorMessage={errors.billingAddress1}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 2"
                      name="billingAddress2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingAddress2}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="APT/SUITE#"
                      name="billingSuite"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingSuite}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="City"
                      name="billingCity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingCity}
                      error={!!(touched.billingCity && errors.billingCity)}
                      errorMessage={errors.billingCity}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="Country"
                      name="billingCountry"
                      id="billingCountry"
                      options={[]}
                      onChange={(value) =>
                        setFieldValue("billingCountry", value)
                      }
                      error={
                        !!(touched.billingCountry && errors.billingCountry)
                      }
                      errorMessage={errors.billingCountry}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Country Code"
                      name="billingCountryCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingCountryCode}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="State"
                      name="billingState"
                      id="billingState"
                      options={[]}
                      onChange={(value) => setFieldValue("billingState", value)}
                      error={!!(touched.billingState && errors.billingState)}
                      errorMessage={errors.billingState}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Postal Code"
                      name="billingPostalCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingPostalCode}
                      error={
                        !!(
                          touched.billingPostalCode && errors.billingPostalCode
                        )
                      }
                      errorMessage={errors.billingPostalCode}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Email"
                      name="billingEmail"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingEmail}
                      error={!!(touched.billingEmail && errors.billingEmail)}
                      errorMessage={errors.billingEmail}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Phone"
                      name="billingPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingPhone}
                      error={!!(touched.billingPhone && errors.billingPhone)}
                      errorMessage={errors.billingPhone}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Fax"
                      name="billingFax"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.billingFax}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <Text size="lg">
                Shipping Information
              </Text>
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="First Name"
                      name="shippingFirstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingFirstName}
                      error={
                        !!(
                          touched.shippingFirstName && errors.shippingFirstName
                        )
                      }
                      errorMessage={errors.shippingFirstName}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Last Name"
                      name="shippingLastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingLastName}
                      error={
                        !!(touched.shippingLastName && errors.shippingLastName)
                      }
                      errorMessage={errors.shippingLastName}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Company Name"
                      name="shippingCompanyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingCompanyName}
                      error={
                        !!(
                          touched.shippingCompanyName &&
                          errors.shippingCompanyName
                        )
                      }
                      errorMessage={errors.shippingCompanyName}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 1"
                      name="shippingAddress1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingAddress1}
                      error={
                        !!(touched.shippingAddress1 && errors.shippingAddress1)
                      }
                      errorMessage={errors.shippingAddress1}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Address 2"
                      name="shippingAddress2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingAddress2}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="APT/SUITE#"
                      name="shippingSuite"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingSuite}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="City"
                      name="shippingCity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingCity}
                      error={!!(touched.shippingCity && errors.shippingCity)}
                      errorMessage={errors.shippingCity}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="Country"
                      name="shippingCountry"
                      id="shippingCountry"
                      options={[]}
                      onChange={(value) =>
                        setFieldValue("shippingCountry", value)
                      }
                      error={
                        !!(touched.shippingCountry && errors.shippingCountry)
                      }
                      errorMessage={errors.shippingCountry}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Country Code"
                      name="shippingCountryCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingCountryCode}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Dropdown
                      label="State"
                      name="shippingState"
                      id="shippingState"
                      options={[]}
                      onChange={(value) =>
                        setFieldValue("shippingState", value)
                      }
                      error={!!(touched.shippingState && errors.shippingState)}
                      errorMessage={errors.shippingState}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Postal Code"
                      name="shippingPostalCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingPostalCode}
                      error={
                        !!(
                          touched.shippingPostalCode &&
                          errors.shippingPostalCode
                        )
                      }
                      errorMessage={errors.shippingPostalCode}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Email"
                      name="shippingEmail"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingEmail}
                      error={!!(touched.shippingEmail && errors.shippingEmail)}
                      errorMessage={errors.shippingEmail}
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                  <div className="lg:w-6/12">
                    <Input
                      label="Phone"
                      name="shippingPhone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingPhone}
                      error={!!(touched.shippingPhone && errors.shippingPhone)}
                      errorMessage={errors.shippingPhone}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      label="Fax"
                      name="shippingFax"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shippingFax}
                    />
                  </div>
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
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmit()}
                >
                  Search From BC
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled
                  onClick={() => handleSubmit()}
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

export default PersonalDetails;
