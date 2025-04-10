import React from "react";

import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";

import { footerDisplayOptions } from "@/mock-data/formThemeConfiguration";
import { IContactSectionProps } from "@/types/form-builder/formBuilder.type";

const ContactSection = ({
  values,
  setFieldValue,
  errors,
}: IContactSectionProps) => {
  return (
    <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="font-semibold text-secondary-dark dark:text-secondary-light">
        <div className="flex w-full flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/6 ">
            <Input
              name={"phone"}
              type="number"
              aria-label="Phone"
              label={"Phone"}
              placeholder={"Enter Phone"}
              onChange={(e) => {
                setFieldValue("phone", e.target.value);
              }}
              errorMessage={errors.phone}
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/6 ">
            <Input
              name={"email"}
              type="email"
              aria-label="Email"
              label={"Email"}
              placeholder={"Enter Email"}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
              errorMessage={errors.email}
            />
          </div>

          {values?.custom && (
            <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/6 ">
              <Dropdown
                name={"footerDisplay"}
                options={footerDisplayOptions}
                label={"Footer Display"}
                placeholder={"Select Footer Display"}
                errorMessage={errors.footerDisplay}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
