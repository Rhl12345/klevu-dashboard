import React, { FC } from "react";
import { useFormikContext } from "formik";

import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import ToggleButton from "@/components/ToggleButton/ToggleButton";

import vendorMockData from "@/mock-data/Vendor.json";

import { IVendorFormValues } from "@/types/vendor/vendor.type";

const VendorSidebar = () => {
  const { values, setFieldValue } = useFormikContext<IVendorFormValues>();

  return (
    <>
      <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
        <div className="flex flex-col gap-2 max-w-sm mx-auto">
          <Dropdown
            label="Vendor Status"
            asterisk={true}
            aria-label="vendor status"
            defaultValue={values.vendorStatus}
            name="vendorStatus"
            id="vendorStatus"
            options={vendorMockData.vendorStatusOptions}
            onChange={(e: any) => {
              setFieldValue("vendorStatus", e.value === "active" ? "A" : "I");
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-wrap p-4 gap-y-4">
        <div className="w-full relative">
          <div className="flex items-center justify-between">
            <span className="flex grow flex-col">
              <Label>Inventory Available</Label>
            </span>
            <div className="inline-flex items-center cursor-pointer">
              <ToggleButton
                id="isInventoryAvailable"
                onChange={(value) =>
                  setFieldValue("isInventoryAvailable", value)
                }
                defaultValue={values.isInventoryAvailable}
                name="isInventoryAvailable"
                size="small"
              />
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <div className="flex items-center justify-between">
            <span className="flex grow flex-col">
              <Label>API Available</Label>
            </span>
            <div className="inline-flex items-center cursor-pointer">
              <ToggleButton
                id="isAPIAvailable"
                onChange={(value) => setFieldValue("isAPIAvailable", value)}
                name="isAPIAvailable"
                defaultValue={values.isAPIAvailable}
                size="small"
              />
            </div>
          </div>
          {values.isAPIAvailable && (
            <div className="pb-3 w-full">
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="API URL"
                  name="apiUrl"
                  onChange={(e) => setFieldValue("apiUrl", e.target.value)}
                  value={values.apiUrl}
                />
              </div>
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="API Username"
                  name="apiUsername"
                  onChange={(e) => setFieldValue("apiUsername", e.target.value)}
                  value={values.apiUsername}
                />
              </div>
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="API Password"
                  name="apiPassword"
                  onChange={(e) => setFieldValue("apiPassword", e.target.value)}
                  value={values.apiPassword}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full relative">
          <div className="flex items-center justify-between">
            <span className="flex grow flex-col">
              <Label>FTP Feed Available</Label>
            </span>
            <div className="inline-flex items-center cursor-pointer">
              <ToggleButton
                id="isFTPAvailable"
                onChange={(value) => setFieldValue("isFTPAvailable", value)}
                defaultValue={values.isFTPAvailable}
                name="isFTPAvailable"
                size="small"
              />
            </div>
          </div>
          {values.isFTPAvailable && (
            <div className="pb-3 w-full">
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="FTP URL"
                  name="ftpUrl"
                  onChange={(e) => setFieldValue("ftpUrl", e.target.value)}
                  value={values.ftpUrl}
                />
              </div>
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="FTP Username"
                  name="ftpUsername"
                  onChange={(e) => setFieldValue("ftpUsername", e.target.value)}
                  value={values.ftpUsername}
                />
              </div>
              <div className="mt-3 mb-3">
                <Input
                  asterisk={true}
                  label="FTP Password"
                  name="ftpPassword"
                  onChange={(e) => setFieldValue("ftpPassword", e.target.value)}
                  value={values.ftpPassword}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorSidebar;
