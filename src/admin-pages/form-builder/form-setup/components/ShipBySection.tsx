import React from "react";
import { FieldArray, useFormikContext } from "formik";

import { Label } from "@/components/Label/Label";
import Button from "@/components/Button/Button";

import {
  ADDRESS_TYPE,
  IFormTypeSectionProps,
  ISetupFormValues,
} from "@/types/form-builder/formBuilder.type";
import FormShippingAddressInfo from "@/admin-pages/form-builder/form-setup/components/FormShippingAddressInfo";
import { countries, states } from "@/mock-data/form-builder/setupForm";

const ShipBySection = ({
  payBusinessMethodIdStringOptions,
}: IFormTypeSectionProps) => {
  const { values, setFieldValue } = useFormikContext<ISetupFormValues>();

  const handleFormTypeClick = (formType: string) => {
    setFieldValue(
      "payBusinessMethodId",
      formType === values.payBusinessMethodId ? "" : formType
    );
  };

  return (
    <>
      <div className="w-full bg-body-light dark:bg-body-dark p-6 mb-6 border border-gray-light dark:border-gray-dark">
        <div className="flex pb-6">
          <Label size="large">Ship By</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payBusinessMethodIdStringOptions.map((payBusinessObj, index) => {
            return (
              <div key={`${payBusinessObj.label}${index}`}>
                <div
                  role="button"
                  className="cursor-pointer"
                  id={`${payBusinessObj?.label}`}
                  onClick={() => {
                    handleFormTypeClick(String(payBusinessObj?.value));
                  }}
                >
                  <div
                    style={{ borderWidth: "1px" }}
                    className={`block p-6 ${
                      String(payBusinessObj?.value) ===
                      String(values.payBusinessMethodId)
                        ? "border-green-500"
                        : "border-neutral-200"
                    }`}
                  >
                    <Label htmlFor={`${payBusinessObj?.label}`}>
                      {payBusinessObj?.label}
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SHIPPING INFORMATION */}

      {(parseInt(values.payBusinessMethodId) === 0 ||
        parseInt(values.payBusinessMethodId) === 1 ||
        parseInt(values.payBusinessMethodId) === 3) && (
        <FieldArray name="shippingAddresses">
          {({ remove, insert, push }) => (
            <>
              {values.shippingAddresses &&
              values.shippingAddresses?.length > 0 ? (
                values.shippingAddresses.map((item, index) => (
                  <div className="mt-4" key={index}>
                    <FormShippingAddressInfo
                      countries={countries}
                      states={states}
                      type={ADDRESS_TYPE.SHIPPING}
                      index={index}
                      remove={remove}
                      insert={insert}
                      push={push}
                    />
                  </div>
                ))
              ) : (
                <Button
                  type="button"
                  onClick={() =>
                    push({
                      formType: values?.formType || "requestForm",
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
                      shipCountry: 0,
                      shipPhone: "",
                      shipEmail: "",
                    })
                  }
                >
                  Add Shipping
                </Button>
              )}
            </>
          )}
        </FieldArray>
      )}
    </>
  );
};

export default ShipBySection;
