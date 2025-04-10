import React from "react";
import Dropdown from "@/components/DropDown/DropDown";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import {
  fontOptions,
  logoPositionOptions,
} from "@/mock-data/configurationBuilder";
import { ILogoPositionFormProps } from "@/types/form-builder/formBuilderConfiguration.type";

const LogoPositionForm = ({
  dropDownTitle,
  selectedValue,
  onValueChange,
}: ILogoPositionFormProps) => {
  const handleSave = () => {
    toast.success(
      `${dropDownTitle === "logoPosition" ? "Logo position" : "Font family"} saved`
    );
  };

  return (
    <div className="col-span-4 lg:col-span-2 px-6">
      <div className="col-span-12 lg:col-span-6 mt-4 flex-1 mx-3">
        <Dropdown
          label={
            dropDownTitle === "logoPosition" ? "Logo Position" : "Font Family"
          }
          options={
            dropDownTitle === "logoPosition" ? logoPositionOptions : fontOptions
          }
          defaultValue={selectedValue}
          onChange={onValueChange}
          placeholder={
            dropDownTitle === "logoPosition"
              ? "Select logo position"
              : "Select font family"
          }
        />
        <div className="py-4">
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoPositionForm;
