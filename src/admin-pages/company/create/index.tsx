"use client";
import { Formik, Form as FormikForm } from "formik";
import React from "react";

import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { ICompanyFormValues } from "@/types/company/company.type";
import { countryOptions, stateOptions } from "@/utils/constants";
import { validationSchema } from "@/utils/validations/comapny.validation";

const Index: React.FC<{ id?: string }> = ({ id }) => {
  const initialValues: ICompanyFormValues = {
    corporateName: "",
    departmentName: "",
    address1: "",
    address2: "",
    suite: "",
    city: "",
    countryName: "",
    countryCode: "",
    zipCode: "",
    state: "",
    OtherState: "",
    webSite: "",
    email: "",
    phone: "",
    fax: "",
  };

  const handleSubmit = async (values: ICompanyFormValues) => {
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // Missing response handling
      // Missing success feedback to user
    } catch (error) {
      console.error("Error submitting form:", error);
      // Missing error feedback to user
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ errors, values, setFieldValue, validateForm }) => {
          return (
            <>
              <FormikForm>
                <CreatePageHeader
                  module="Add Company"
                  navigateUrl={PageRoutes.COMPANY.LIST}
                  buttonType="submit"
                  validateForm={validateForm}
                />
                <div className="lg:py-8 xl:px-8 py-4 px-4">
                  <div className=" lg:py-6 lg:px-6 py-4 px-4 border border-gray-light dark:border-gray-dark rounded-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Input
                        asterisk={true}
                        label="Corporate Name"
                        name="corporateName"
                        placeholder="Enter corporate name"
                        onChange={(e) => {
                          setFieldValue("corporateName", e.target.value);
                        }}
                        value={values.corporateName}
                        errormessage={errors.corporateName}
                      />
                      <Input
                        asterisk={false}
                        label="Department Name"
                        name="departmentName"
                        placeholder="Enter department name"
                        onChange={(e) => {
                          setFieldValue("departmentName", e.target.value);
                        }}
                        value={values.departmentName}
                        errormessage={errors.departmentName}
                      />
                      <Input
                        asterisk={true}
                        label="Address 1"
                        name="address1"
                        placeholder="Enter address line 1"
                        onChange={(e) => {
                          setFieldValue("address1", e.target.value);
                        }}
                        value={values.address1}
                        errormessage={errors.address1}
                      />
                      <Input
                        asterisk={false}
                        label="Address 2"
                        name="address2"
                        placeholder="Enter address line 2"
                        onChange={(e) => {
                          setFieldValue("address2", e.target.value);
                        }}
                        value={values.address2}
                        errormessage={errors.address2}
                      />
                      <Input
                        asterisk={false}
                        label=" Apt/ Suite#"
                        name="suite"
                        placeholder="Enter suite number"
                        onChange={(e) => {
                          setFieldValue("suite", e.target.value);
                        }}
                        value={values.suite}
                        errormessage={errors.suite}
                      />
                      <Input
                        asterisk={true}
                        label="City"
                        name="city"
                        placeholder="Enter city"
                        onChange={(e) => {
                          setFieldValue("city", e.target.value);
                        }}
                        value={values.city}
                        errormessage={errors.city}
                      />
                      <Dropdown
                        aria-label="Select a country"
                        id="country-select"
                        defaultInputValue="United States"
                        label="Country"
                        asterisk={true}
                        options={countryOptions}
                        placeholder="Select a country..."
                        onChange={(value) => {
                          setFieldValue("countryName", value);
                          // Reset state when country changes
                          setFieldValue("state", "");
                        }}
                        value={values.countryName}
                      />
                      <Input
                        asterisk={true}
                        label="Postal Code"
                        name="zipCode"
                        placeholder="Enter postal code"
                        onChange={(e) => {
                          setFieldValue("zipCode", e.target.value);
                        }}
                        value={values.zipCode}
                        errormessage={errors.zipCode}
                      />
                      <Dropdown
                        aria-label="Select a State"
                        defaultInputValue="California"
                        asterisk={true}
                        id="state-select"
                        label="State"
                        options={stateOptions}
                        placeholder="Select a state..."
                        onChange={(value) => setFieldValue("state", value)}
                        value={values.state}
                      />
                      {values.state === "Other" && (
                        <Input
                          asterisk={true}
                          label="Other State"
                          name="OtherState"
                          placeholder="Enter state name"
                          onChange={(e) => {
                            setFieldValue("OtherState", e.target.value);
                          }}
                          value={values.OtherState}
                          errormessage={errors.OtherState}
                        />
                      )}
                      <Input
                        asterisk={false}
                        label="Country Code"
                        name="countryCode"
                        placeholder="Enter country code"
                        onChange={(e) => {
                          setFieldValue("countryCode", e.target.value);
                        }}
                        value={values.countryCode}
                        errormessage={errors.countryCode}
                      />
                      <Input
                        asterisk={false}
                        label=" Enter Website"
                        name="Website"
                        placeholder="Enter website URL"
                        onChange={(e) => {
                          setFieldValue("Website", e.target.value);
                        }}
                        value={values.webSite}
                        errormessage={errors.webSite}
                      />
                      <Input
                        asterisk={true}
                        label=" Email"
                        name="email"
                        placeholder="Enter email address"
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        value={values.email}
                        errormessage={errors.email}
                      />
                      <Input
                        asterisk={false}
                        label=" Phone"
                        name="phone"
                        placeholder="000-000-0000"
                        onChange={(e) => {
                          setFieldValue("phone", e.target.value);
                        }}
                        value={values.phone}
                        errormessage={errors.phone}
                      />
                      <Input
                        asterisk={false}
                        label=" Fax"
                        name="fax"
                        placeholder="000-000-0000"
                        onChange={(e) => {
                          setFieldValue("fax", e.target.value);
                        }}
                        value={values.fax}
                        errormessage={errors.fax}
                      />
                    </div>
                  </div>
                </div>
              </FormikForm>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default Index;
