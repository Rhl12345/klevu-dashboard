import React from "react";

import ColorPicker from "@/components/Colorpicker/ColorPicker";
import { IColorpickerSectionProps } from "@/types/form-builder/formBuilder.type";

const ColorpickerSection = ({
  values,
  setFieldValue,
}: IColorpickerSectionProps) => {
  return (
    <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="font-semibold text-secondary-dark dark:text-secondary-light">
        <div className="flex w-full flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/6 gap-4 lg:gap-6">
            <ColorPicker
              required={true}
              label="Background Color"
              placeholder="Pick a color"
              aria-label="Background Color"
              name={`customElements.${"--tw-theme-btn-primary-color"}`}
              id={`customElements.${"--tw-theme-btn-primary-color"}`}
              defaultValue={
                values.customElements["--tw-theme-btn-primary-color"]
              }
              onChange={(color) => {
                setFieldValue(
                  `customElements.${"--tw-theme-btn-primary-color"}`,
                  color
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-primary-hover-color"}`,
                  color?.hex
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-secondary-color"}`,
                  color?.hex
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-secondary-hover-color"}`,
                  color?.hex
                );
              }}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/6 gap-4 lg:gap-6">
            <ColorPicker
              required={true}
              label="Text Color"
              placeholder="Pick a color"
              aria-label="Text Color"
              name={`customElements.${"--tw-theme-btn-primary-text-color"}`}
              id={`customElements.${"--tw-theme-btn-primary-text-color"}`}
              value={values.customElements["--tw-theme-btn-primary-text-color"]}
              onChange={(color) => {
                setFieldValue(
                  `customElements.${"--tw-theme-btn-primary-text-color"}`,
                  color
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-primary-hover-text-color"}`,
                  color?.hex
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-secondary-text-color"}`,
                  color?.hex
                );
                setFieldValue(
                  `customElements.${"--tw-theme-btn-secondary-hover-text-color"}`,
                  color?.hex
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorpickerSection;
