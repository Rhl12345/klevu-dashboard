import React from "react";

import Image from "@/components/Image/Image";
import RadioGroup from "@/components/RadioGroup/RadioGroup";

import { ICardRadioGroupSectionProps } from "@/types/form-builder/formBuilder.type";

const CardRadioGroupSection = ({
  values,
  setFieldValue,
  initialValues,
}: ICardRadioGroupSectionProps & { initialValues: any }) => {
  // Dynamic onChange handler
  const handleThemeChange = (theme: string) => {
    // Reset form fields to initial values
    setFieldValue("dark", theme === "dark");
    setFieldValue("light", theme === "light");
    setFieldValue("custom", theme === "custom");

    // Reset other fields to their initial values
    Object.keys(initialValues.customElements).forEach((key) => {
      setFieldValue(`customElements.${key}`, initialValues.customElements[key]);
    });

    // Reset other fields if necessary
    setFieldValue("phone", initialValues.phone);
    setFieldValue("email", initialValues.email);
    // Add any other fields you want to reset
  };

  return (
    <div className="w-full content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="flex gap-4 lg:gap-6 flex-wrap font-semibold text-secondary-dark dark:text-secondary-light">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex flex-col gap-2 lg:gap-4">
          <RadioGroup
            label={"Dark"}
            aria-label="Select Theme"
            type="radio"
            name="theme"
            id="dark"
            value="dark"
            checked={values?.dark}
            onChange={() => handleThemeChange("dark")}
          />
          <Image
            alt="Loading..."
            src={
              "https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/Store-Builder-Dark-Theme.jpg"
            }
            className="h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex flex-col gap-2 lg:gap-4">
          <RadioGroup
            label={"Light"}
            aria-label="Select Theme"
            type="radio"
            name="theme"
            id="light"
            value="light"
            checked={values?.light}
            onChange={() => handleThemeChange("light")}
          />
          <Image
            alt="Loading..."
            src={
              "https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/Store-Builder-Light-Theme.jpg"
            }
            className="h-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex flex-col gap-2 lg:gap-4">
          <RadioGroup
            label={"Custom"}
            aria-label="Select Theme"
            type="radio"
            name="theme"
            id="custom"
            value="custom"
            checked={values?.custom}
            onChange={() => handleThemeChange("custom")}
          />
          <Image
            alt="Loading..."
            src={
              "https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/Store-Builder-Custom-Color-Theme.jpg"
            }
            className="h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CardRadioGroupSection;
