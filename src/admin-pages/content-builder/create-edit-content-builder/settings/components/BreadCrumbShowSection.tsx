import React from "react";
import Accordion from "@/components/Accordion/Accordion";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/DropDown/DropDown";
import { useFormikContext } from "formik";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";

const menuTypeOptions = [
  { label: "Menu Type 1", value: "menuType1" },
  { label: "Menu Type 2", value: "menuType2" },
  { label: "Menu Type 3", value: "menuType3" },
];

const BreadCrumbShowSection = () => {
  const { values, setFieldValue } =
    useFormikContext<IContentBuilderSettingsFormValues>();

  const accordionItems = [
    {
      id: "breadcrumb",
      title: "Bread Crumb Show",
      content: (
        <>
          <div className="font-semibold text-secondary-dark dark:text-secondary-light">
            <div className="gap-4 grid grid-cols-1">
                <div className="w-full">
                  <Checkbox
                    id="isBreadCrumbShow"
                    label="Is Bread Crumb Show"
                    name="isBreadCrumbShow"
                    checked={values.isBreadCrumbShow}
                    onChange={() => {
                      setFieldValue(
                        "isBreadCrumbShow",
                        !values.isBreadCrumbShow
                      );
                    }}
                  />
                </div>
                <div className="w-full">
                  <Dropdown
                    id="menuType"
                    label="Menu Type"
                    name="menuType"
                    options={menuTypeOptions}
                    value={menuTypeOptions.find(
                      (option) => option.value === values.menuType
                    )}
                    onChange={(value: any) => {
                      setFieldValue("menuType", value?.value);
                    }}
                  />
                </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return <Accordion iconVariant="arrow" items={accordionItems} />;
};

export default BreadCrumbShowSection;
