import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import { FONT_FAMILIES } from "@/mock-data/themeConfiguration";
import {
  IBodyFontConfigurationProps,
  IFontConfig,
} from "@/types/theme-configuration/themeConfiguration.type";
import { fontConfig } from "@/utils/constants";
import React, { useCallback } from "react";

const BodyFontConfiguration = ({
  initialConfig = {},
  onConfigurationChange,
  errors,
  setFieldValue,
  values,
}: IBodyFontConfigurationProps) => {
  const handleChange = useCallback(
    (name: keyof IFontConfig, value: any) => {
      onConfigurationChange?.({
        ...initialConfig,
        [name]: value,
      });
      setFieldValue?.(name, value);
    },
    [initialConfig, onConfigurationChange, setFieldValue]
  );

  const renderDropdown = (
    name: keyof IFontConfig,
    label: string,
    options: Array<{ value: any; label: string }>,
    required: boolean = true
  ) => (
    <div className="lg:w-6/12">
      <Dropdown
        name={name}
        label={label}
        options={options}
        value={values?.[name] || initialConfig[name]}
        onChange={(value) => handleChange(name, value)}
        isMulti={false}
        required={required}
        aria-label={`Select ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <section
      className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark"
      aria-label="Body font configuration"
    >
      <Label className="font-semibold text-lg" required>
        Body Font
      </Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          {renderDropdown("bFontFamily", "Font Family", FONT_FAMILIES)}
          {renderDropdown("bFontSize", "Font Size", fontConfig.SIZE)}
        </div>
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          {renderDropdown("bFontWeight", "Font Weight", fontConfig.WEIGHT)}
          {renderDropdown("bLineHeight", "Line Height", fontConfig.LINE_HEIGHT)}
        </div>
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          {renderDropdown(
            "bLetterSpacing",
            "Letter Spacing",
            fontConfig.LETTER_SPACING
          )}
          <div className="lg:w-6/12"></div>
        </div>
      </div>
    </section>
  );
};

export default BodyFontConfiguration;
