import React from "react";
import { useFormikContext } from "formik";

import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { Label } from "@/components/Label/Label";

import {
  IFormShippingAddressInfoProps,
  ISetupFormValues,
} from "@/types/form-builder/formBuilder.type";
import { AddressType } from "@/mock-data/form-builder/setupForm";

const FormShippingAddressInfo = ({
  countries,
  states,
  type,
  index,
  remove,
  insert,
}: IFormShippingAddressInfoProps) => {
  const { setFieldValue, values } = useFormikContext<ISetupFormValues>();

  const handleBillingShippingFields = (
    value: string,
    name: string,
    sameShipField: string
  ) => {
    setFieldValue(name, value);

    if (values?.shipSameasBilling) {
      values?.shippingAddresses &&
        values?.shippingAddresses.length &&
        values?.shippingAddresses.forEach((val, index) => {
          setFieldValue(`shippingAddresses.${index}.${sameShipField}`, value);
        });
    }
  };

  return (
    <>
      <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark  mb-6 p-6">
        <div className="grid grid-cols-12 gap-6">
          {parseInt(values?.payBusinessMethodId) !== 0 && (
            <div className="col-span-12 flex justify-between items-center">
              <Label size="large">
                {type.charAt(0).toUpperCase() + type.slice(1)} Information
              </Label>

              {type === AddressType.shipping && (
                <div className="flex">
                  <Button
                    type="button"
                    onClick={() =>
                      insert(values.shippingAddresses.length, {
                        formType: values?.formType || "filledUpForm",
                        addressTitle: "",
                        shipFirstName: "",
                        shipLastName: "",
                        shipCompany: "",
                        shipAddress1: "",
                        shipAddress2: "",
                        shipCity: "",
                        shipState: "",
                        shipSuite: "",
                        shipZipcode: "",
                        shipCountry: "",
                        shipPhone: "",
                        shipEmail: "",
                        shipFax: "",
                      })
                    }
                    className={` mr-4 mt-3 mb-5 flex justify-center align-middle py-2 px-4 border border-transparent shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                            `}
                  >
                    <SvgIcon name="plus" className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className={` mt-3 mb-5 flex justify-center align-middle py-2 px-4 border border-transparent shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                            `}
                  >
                    <SvgIcon name="minus" className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingFirstName"
                  : `shippingAddresses.${index}.addressTitle`
              }
              placeholder="Enter Address Title"
              label={`Address Title`}
              asterisk={true}
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingFirstName"
                    : `shippingAddresses.${index}.addressTitle`,
                  `addressTitle`
                )
              }
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingFirstName"
                  : `shippingAddresses.${index}.shipFirstName`
              }
              label={`First Name`}
              placeholder="Enter First Name"
              asterisk={true}
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,

                  type === AddressType.billing
                    ? "billingFirstName"
                    : `shippingAddresses.${index}.shipFirstName`,
                  `shipFirstName`
                )
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingLastName"
                  : `shippingAddresses.${index}.shipLastName`
              }
              label={`Last Name`}
              placeholder="Enter Last Name"
              asterisk={true}
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingLastName"
                    : `shippingAddresses.${index}.shipLastName`,
                  `shipLastName`
                )
              }
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              type="number"
              label={`Phone Number`}
              placeholder="Enter Phone Number"
              asterisk={true}
              name={
                type === AddressType.billing
                  ? "billingPhone"
                  : `shippingAddresses.${index}.shipPhone`
              }
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingPhone"
                    : `shippingAddresses.${index}.shipPhone`,
                  `shipPhone`
                )
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Input
              type="email"
              label={`Email`}
              placeholder="Enter Email"
              asterisk={true}
              name={
                type === AddressType.billing
                  ? "billingEmail"
                  : `shippingAddresses.${index}.shipEmail`
              }
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingEmail"
                    : `shippingAddresses.${index}.shipEmail`,
                  `shipEmail`
                )
              }
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingCompany"
                  : `shippingAddresses.${index}.shipCompany`
              }
              label={`Company`}
              placeholder="Enter Company"
              asterisk={true}
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingCompany"
                    : `shippingAddresses.${index}.shipCompany`,
                  `shipCompany`
                )
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingAddress1"
                  : `shippingAddresses.${index}.shipAddress1`
              }
              label={`Address One`}
              placeholder="Enter Address "
              asterisk={true}
              onChange={(e) => {
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingAddress1"
                    : `shippingAddresses.${index}.shipAddress1`,
                  `shipAddress1`
                );
                setFieldValue(`shippingAddresses.${index}.shipAddress2`, "");
              }}
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              name={
                type === AddressType.billing
                  ? "billingSuite"
                  : `shippingAddresses.${index}.shipSuite`
              }
              label={`Apt, Suite`}
              placeholder="Enter Apt, Suite"
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,

                  type === AddressType.billing
                    ? "billingSuite"
                    : `shippingAddresses.${index}.shipSuite`,
                  `shipSuite`
                )
              }
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              type="text"
              label={`Zip Code`}
              asterisk={true}
              placeholder="Enter Zip Code"
              name={
                type === AddressType.billing
                  ? "billingZipcode"
                  : `shippingAddresses.${index}.shipZipcode`
              }
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingZipcode"
                    : `shippingAddresses.${index}.shipZipcode`,
                  `shipZipcode`
                )
              }
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Input
              label={`City`}
              asterisk={true}
              placeholder="Enter City"
              name={
                type === AddressType.billing
                  ? "billingCity"
                  : `shippingAddresses.${index}.shipCity`
              }
              onChange={(e) =>
                handleBillingShippingFields(
                  e.target.value,
                  type === AddressType.billing
                    ? "billingCity"
                    : `shippingAddresses.${index}.shipCity`,
                  `shipCity`
                )
              }
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Dropdown
              isClearable
              name={
                type === AddressType.billing
                  ? "billingCountry"
                  : `shippingAddresses.${index}.shipCountry`
              }
              label={`Country`}
              placeholder="Select Country"
              asterisk
              options={countries}
              defaultValue={`${values?.shippingAddresses[index]?.shipCountry}`}
              onChange={(e: any) => {
                setFieldValue(
                  type === AddressType.billing
                    ? AddressType.state.billing
                    : `shippingAddresses.${index}.shipCountry`,
                  e ? e.value : ""
                );
              }}
              displayError={true}
              isFormikField={true}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Dropdown
              isClearable
              label={`State / Province`}
              asterisk={true}
              placeholder="Select State / Province"
              options={states}
              name={
                type === AddressType.billing
                  ? AddressType.state.billing
                  : `shippingAddresses.${index}.shipState`
              }
              defaultValue={`${values?.shippingAddresses[index]?.shipState}`}
              onChange={(e: any) => {
                setFieldValue(
                  type === AddressType.billing
                    ? AddressType.state.billing
                    : `shippingAddresses.${index}.shipState`,
                  e ? e.value : ""
                );
              }}
              displayError={true}
              isFormikField={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormShippingAddressInfo;
