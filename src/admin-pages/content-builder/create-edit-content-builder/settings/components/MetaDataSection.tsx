import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import React from "react";
import { useFormikContext } from "formik";
import { IContentBuilderSettingsFormValues } from "@/types/content-management/content-builder/contentBuilder.type";
import { Textarea } from "@/components/Textarea/Textarea";
import Text from "@/components/Text/Text";

const domainOptions = [
  { label: "Domain 1", value: "domain1" },
  { label: "Domain 2", value: "domain2" },
  { label: "Domain 3", value: "domain3" },
];

const MetaDataSection = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    useFormikContext<IContentBuilderSettingsFormValues>();
  return (
    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
      <Label size="large" className="mb-4">
        Meta Data
      </Label>
      <div className="gap-4 grid grid-cols-1">
        <div className="flex flex-col gap-4">
          <Label>Preview As :</Label>
          <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
            <div>
              <RadioGroup
                id="isDesktopResult"
                label="Desktop Result"
                name="isDesktopResult"
                value="isDesktopResult"
                onChange={() => {
                  setFieldValue("previewAs", "isDesktopResult");
                }}
                checked={values.previewAs === "isDesktopResult"}
              />
            </div>
            <div>
              <RadioGroup
                id="isMobileResult"
                label="Mobile Result"
                name="isMobileResult"
                value="isMobileResult"
                onChange={() => {
                  setFieldValue("previewAs", "isMobileResult");
                }}
                checked={values.previewAs === "isMobileResult"}
              />
            </div>
          </div>
          <div className="text-quaternary-dark dark:text-quaternary-light">
            {values.previewAs === "isMobileResult" ? (
              <div>
                <p className="text-sm cursor-pointer ">{values.domain}</p>
                <p className="text-sm">{values.pageTitle}</p>
                <p className="text-sm">{values.metaDescription}</p>
              </div>
            ) : (
              <div>
                <p className="text-sm cursor-pointer">{values.domain}</p>
                <p className="text-sm">{values.pageTitle}</p>
                <p className="text-sm">{values.metaDescription}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <Label required>Page URL</Label>
            <Text size="xs" className="font-normal">
              Publish your page on your domain.
            </Text>
          </div>
          <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
            <div className="lg:w-6/12">
              <Dropdown
                id={"domain"}
                label={"Domain"}
                name={"domain"}
                isMulti={true}
                options={domainOptions}
                value={domainOptions.find(
                  (option) => option.value === values.domain
                )}
                onChange={(value: any) => {
                  setFieldValue("domain", value?.value);
                }}
              />
            </div>

            <div className="lg:w-6/12">
              <Input
                label={"Content Slug"}
                name={"contentSlug"}
                type={"text"}
                asterisk={true}
                onChange={handleChange("contentSlug")}
                value={values.contentSlug}
                maxLength={255}
                minLength={1}
                inputMode={"text"}
                aria-description={"Content Slug"}
                error={!!errors.contentSlug}
              />
            </div>
          </div>
        </div>

        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="w-full">
            <Input
              id={"pageTitle"}
              label={"Page Title"}
              name={"pageTitle"}
              type={"text"}
              asterisk={true}
              onChange={handleChange("pageTitle")}
              value={values.pageTitle}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Page Title"}
              error={!!errors.pageTitle}
            />
          </div>
        </div>

        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-full">
            <Textarea
              label={"Meta Description"}
              name={"metaDescription"}
              asterisk={true}
              onChange={handleChange("metaDescription")}
              value={values.metaDescription}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Meta Description"}
              error={!!errors.metaDescription}
            />
          </div>
        </div>
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-full">
            <Textarea
              label={"Meta Keywords"}
              name={"metaKeywords"}
              asterisk={true}
              onChange={handleChange("metaKeywords")}
              value={values.metaKeywords}
              maxLength={255}
              minLength={1}
              inputMode={"text"}
              aria-description={"Meta Keywords"}
              error={!!errors.metaKeywords}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDataSection;
