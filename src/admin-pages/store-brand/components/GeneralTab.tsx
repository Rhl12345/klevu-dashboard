import React from "react";
import { Form as FormikForm, useFormikContext } from "formik";
import ImageInstructionsComponent from "@/admin-pages/brand/components/ImageUploadInstructions";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { IDropdownOption } from "@/components/Table/types";
import UploadImage from "@/components/UploadImage/UploadImage";
import storeBrandData from "@/mock-data/storeBrandData.json";

const GeneralTab = () => {
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <FormikForm>
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="font-semibold text-secondary-dark dark:text-secondary-light">
            <div className="gap-4 grid grid-cols-1">
              <>
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="lg:w-6/12">
                    <Input
                      asterisk
                      label="Brand Name"
                      name="name"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                      maxLength={60}
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      asterisk
                      label="Display Order"
                      name="displayOrder"
                      onChange={(e) => {
                        setFieldValue("displayOrder", e.target.value);
                      }}
                      maxLength={60}
                    />
                  </div>
                </div>
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="lg:w-6/12">
                    <UploadImage
                      initialImages={[]}
                      label="Color Logo"
                      maxImages={1}
                      onUpload={(files) => {
                        setFieldValue("colorLogoUrl", files);
                      }}
                    />
                    <ImageInstructionsComponent imageSize="350 x 220" />
                  </div>
                  <div className="lg:w-6/12">
                    <UploadImage
                      initialImages={[]}
                      label="Black & White Logo"
                      maxImages={1}
                      onUpload={(files) => {
                        setFieldValue("bandWLogoUrl", files);
                      }}
                    />
                  </div>
                </div>
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="w-full">
                    <UploadImage
                      initialImages={[]}
                      label="Product Listing Page Banner Logo"
                      maxImages={1}
                      onUpload={(files) => {
                        setFieldValue("productBrandLogo", files);
                      }}
                    />
                    <ImageInstructionsComponent imageSize="350 x 220" />
                  </div>
                </div>

                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="w-full">
                    <UploadImage
                      initialImages={[]}
                      label="Product Listing Page Brand Logo"
                      maxImages={1}
                      onUpload={(files) => {
                        setFieldValue("productBrandLogo", files);
                      }}
                    />
                    <ImageInstructionsComponent imageSize="200 x 35" />
                  </div>
                </div>

                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="w-full">
                    <Dropdown
                      id="vendorName"
                      label="Select Vendor"
                      asterisk
                      isFormikField
                      isMulti
                      name={"vendorName"}
                      onChange={(e) => {
                        setFieldValue(
                          "vendorName",
                          (e as IDropdownOption[]).map((item) => item.label)
                        );
                      }}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      displayError
                      withCheckBox
                      options={storeBrandData.venderOptions}
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </FormikForm>
    </>
  );
};

export default GeneralTab;
