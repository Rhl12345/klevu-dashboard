import React, { memo } from "react";
import { useFormikContext } from "formik";

import { Label } from "@/components/Label/Label";
import Dropdown from "@/components/DropDown/DropDown";

import { productCountOptions } from "@/mock-data/form-builder/setupForm";
import {
  FORM_TYPE,
  ISetupFormValues,
} from "@/types/form-builder/formBuilder.type";

const FormTypeSection = memo(
  ({ setFormType }: { setFormType: (values: FORM_TYPE) => void }) => {
    const { values, setFieldValue } = useFormikContext<ISetupFormValues>();

    const handleFormTypeClick = (formType: FORM_TYPE) => {
      setFieldValue("formType", formType === values.formType ? "" : formType);
      setFormType(formType);
    };

    return (
      <div className="w-full bg-body-light dark:bg-body-dark p-6 mb-6 border border-gray-light dark:border-gray-dark">
        <div className="flex pb-6">
          <Label size="large">Form Type</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            role="button"
            className="cursor-pointer"
            onClick={() => {
              handleFormTypeClick(FORM_TYPE.REQUEST);
            }}
            id="requestForm"
          >
            <div
              style={{ borderWidth: "1px" }}
              className={`block p-6 ${values.formType === FORM_TYPE.REQUEST ? "border-green-500" : "border-neutral-200"}`}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Label> Request Form : </Label>
              </div>
            </div>
          </div>

          <div
            role="button"
            className="cursor-pointer"
            onClick={() => {
              handleFormTypeClick(FORM_TYPE.FILLED_UP);
            }}
          >
            <div
              style={{ borderWidth: "1px" }}
              className={`block p-6 ${values.formType === FORM_TYPE.FILLED_UP ? "border-green-500" : "border-neutral-200"}`}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Label> Single or Multiple Product(s) Form : </Label>
              </div>
            </div>
          </div>

          <div>
            {values.formType === FORM_TYPE.FILLED_UP && (
              <Dropdown
                label="Product Count"
                isMulti={false}
                name="productLimitCount"
                options={productCountOptions}
                defaultValue={productCountOptions[0].value}
                isClearable
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

FormTypeSection.displayName = "FormTypeSection";

export default FormTypeSection;
