import React from "react";
import Accordion from "@/components/Accordion/Accordion";
import Dropdown from "@/components/DropDown/DropDown";
import { useFormikContext } from "formik";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";

const templateOptions = [
  { label: "Template 1", value: "template1" },
  { label: "Template 2", value: "template2" },
  { label: "Template 3", value: "template3" },
];

const TemplateSection = () => {
  const { values, setFieldValue } =
    useFormikContext<IContentBuilderSettingsFormValues>();

  const accordionItems = [
    {
      id: "template",
      title: "Template",
      content: (
        <div className="font-semibold text-secondary-dark dark:text-secondary-light">
          <div className="gap-4 grid grid-cols-1">
            <div className="w-full">
              <Dropdown
                id="template"
                label="Select Template"
                name="template"
                options={templateOptions}
                value={templateOptions.find(
                  (option) => option.value === values.template
                )}
                onChange={(value: any) => {
                  setFieldValue("template", value?.value);
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Accordion iconVariant="arrow" items={accordionItems} />;
};

export default TemplateSection;
