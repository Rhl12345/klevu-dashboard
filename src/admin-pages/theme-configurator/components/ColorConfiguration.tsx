import ColorPicker from "@/components/Colorpicker/ColorPicker";
import { Label } from "@/components/Label/Label";
import { IThemeConfigurationProps } from "@/types/theme-configuration/themeConfiguration.type";
import React from "react";

const ColorConfiguration = ({
  errors,
  setFieldValue,
  values,
}: IThemeConfigurationProps) => {
  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <Label className="font-semibold text-lg">Color</Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              {/* <Label>Primary</Label> */}
              <ColorPicker name="primary" label="Primary" />
            </div>
          </div>
          <div className="lg:w-6/12"></div>
        </div>
      </div>
    </section>
  );
};

export default ColorConfiguration;
