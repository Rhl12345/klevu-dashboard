import React from "react";
import { useFormikContext } from "formik";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";
import { Label } from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/DropDown/DropDown";
import Tooltip from "@/components/Tooltip/Tooltip";

const parentOptions = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
  { label: "Contact", value: "contact" },
];

const GeneralSection = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    useFormikContext<IContentBuilderSettingsFormValues>();
  return (
    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
      <Label size="large" className="mb-4">
        General Information
      </Label>
      <div className="gap-4 grid grid-cols-1">
        <div className="space-y-4">
          <div className="w-full">
            <Input
              label={
                <>
                  <div className="flex">
                    Internal Page Name
                    <Tooltip id="openGraphTitle">
                      <p>Internal Name Used For Organization</p>
                    </Tooltip>
                  </div>
                </>
              }
              name={"internalPageName"}
              type={"text"}
              asterisk={true}
              onChange={handleChange("internalPageName")}
              value={values.internalPageName}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Internal Page Name"}
              error={!!errors.internalPageName}
            />
          </div>

          <div className="w-full">
            <Checkbox 
              id="isPasswordRequredToViewPage"
              label="Is Password Required to View Page"
              name="isPasswordRequredToViewPage"
              checked={values.isPasswordRequredToViewPage}
              onChange={(e) => {
                setFieldValue("isPasswordRequredToViewPage", e.target.checked);
              }}
            />
          </div>

          <div className="w-full">
            <Dropdown 
              id={"selectParent"}
              label={"Select Parent"}
              name={"selectParent"}
              options={parentOptions}
              value={parentOptions.find(
                (option) => option.value === values.selectParent
              )}
              onChange={(value: any) => {
                setFieldValue("selectParent", value?.value);
              }}
            />
          </div>

          <div className="w-full">
            <Input
              label={"Tag"}
              name={"tag"}
              type={"text"}
              onChange={handleChange("tag")}
              value={values.tag}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Tag"}
            />
          </div>

          <div className="w-full">
            <Input
              label={"Author"}
              name={"author"}
              type={"text"}
              onChange={handleChange("author")}
              value={values.author}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Author"}
            />
          </div>

          <div className="w-full">
            <Checkbox
              id="isHomePage"
              label="Is Home Page"
              name="isHomePage"
              checked={values.isHomePage}
              onChange={(e) => {
                setFieldValue("isHomePage", e.target.checked);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
