import React, { useCallback } from "react";
import { useFormikContext } from "formik";

import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";

import {
  IContactInformation,
  IVendorFormValues,
} from "@/types/vendor/vendor.type";

const ContactInformation = () => {
  const { values, setFieldValue } = useFormikContext<IVendorFormValues>();

  const handleChange = useCallback(
    (name: keyof IVendorFormValues, pattern?: (value: string) => string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = pattern ? pattern(e.target.value) : e.target.value;
        setFieldValue(name, value);
      },
    [setFieldValue]
  );

  const inputFields: IContactInformation[][] = [
    [
      { name: "contactName", label: "Contact Name" },
      {
        name: "contactPhone",
        label: "Contact Phone",
        required: true,
        pattern: (value) => value.replace(/\D/g, "").slice(0, 10),
        maxLength: 10,
        inputMode: "numeric",
        ariaDescription: "Enter a 10-digit phone number",
      },
    ],
    [
      { name: "contactEmail", label: "Contact Email" },
      { name: "address", label: "Address" },
    ],
    [
      { name: "website", label: "Website" },
      { name: "loginName", label: "Login Name" },
    ],
    [
      {
        name: "password",
        label: "Password",
        type: "password",
        minLength: 8,
        ariaDescription: "Password must be at least 8 characters long",
      },
      { name: "imagePortalWebsite", label: "Image Portal Website" },
    ],
    [
      { name: "imagePortalLogin", label: "Image Portal Login" },
      { name: "imagePortalPassword", label: "Image Portal Password" },
    ],
  ];

  return (
    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
      <Label size="large" className="mb-4">
        Contact Information
      </Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        {inputFields.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6"
          >
            {row.map((field) => (
              <div key={field.name} className="lg:w-6/12">
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  asterisk={field.required}
                  onChange={handleChange(field.name, field.pattern)}
                  value={values[field.name]}
                  maxLength={field.maxLength}
                  minLength={field.minLength}
                  inputMode={field.inputMode}
                  aria-description={field.ariaDescription}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInformation;
