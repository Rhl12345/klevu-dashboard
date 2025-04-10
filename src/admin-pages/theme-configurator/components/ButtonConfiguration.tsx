import ColorPicker from "@/components/Colorpicker/ColorPicker";
import { Label } from "@/components/Label/Label";
import {
  IColorPickerWrapperProps,
  IThemeConfigurationProps,
} from "@/types/theme-configuration/themeConfiguration.type";
import React from "react";

const ColorPickerWrapper = ({ label, name }: IColorPickerWrapperProps) => (
  <div className=" w-1/2 md:w-full px-2 mb-4">
    <Label>{label}</Label>
    <div className="">
      <ColorPicker name={name} />
    </div>
  </div>
);

const SectionHeader: React.FC<{
  title: string;
}> = ({ title }) => (
  <div className="sm:w-full px-2 mb-4">
    <Label className="font-bold">{title}</Label>
  </div>
);

const ButtonConfiguration = ({
  errors,
  setFieldValue,
  values,
}: IThemeConfigurationProps) => {
  return (
    <section className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <Label
        className="font-semibold text-lg"
        required
        children="Button"
        size="medium"
      />
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          {/* Background Section */}
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker label="Background Color" name="backgroundColor" />
            </div>
          </div>

          {/* Font Section */}
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker label="Font Color" name="fontColor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ButtonConfiguration;
