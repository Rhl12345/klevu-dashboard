import ColorPicker from "@/components/Colorpicker/ColorPicker";
import { Label } from "@/components/Label/Label";
import { IThemeConfigurationProps } from "@/types/theme-configuration/themeConfiguration.type";
import React from "react";

// Create a reusable ColorPickerField component
const ColorPickerField = ({ label, name }: { label: string; name: string }) => (
  <div className="">
    <Label>{label}</Label>
    <div className="">
      <ColorPicker name={name} />
    </div>
  </div>
);

const SidebarConfiguration = ({
  errors,
  setFieldValue,
  values,
}: IThemeConfigurationProps) => {
  return (
    <section
      className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark"
      role="region"
      aria-label="Sidebar Configuration"
    >
      <Label className="font-semibold text-lg" required size="medium">
        Sidebar
      </Label>
      <div className="gap-4 lg:gap-6 grid grid-cols-1">
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker label="Background Color" name="sidebarBgColor" />
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker
                label="Active Background Color"
                name="sidebarBgActiveColor"
              />
            </div>
          </div>
        </div>
        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker name="sFontcolor" label="Font Color" />
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="flex flex-col gap-2">
              <ColorPicker name="sActiveColor" label="Active Font Color" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarConfiguration;
