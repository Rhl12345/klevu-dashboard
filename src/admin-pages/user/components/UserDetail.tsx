"use client";

import React from "react";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { reportToOptions, roleOptions } from "@/mock-data/userData";
import {
  IAdminUser,
  IDropdownOption,
  IFormValuesUsers,
} from "@/types/user/user.type";
import { useFormikContext, FieldArrayRenderProps, FormikErrors } from "formik";

const UserDetail = ({
  index,
  fieldArrayProps,
}: {
  index: number;
  fieldArrayProps: FieldArrayRenderProps;
}) => {
  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext<IFormValuesUsers>();

  // Get the error message for the role field
  const adminUserErrors = errors?.adminUserViewModel?.[index] as
    | FormikErrors<IAdminUser>
    | undefined;
  const roleError = adminUserErrors?.role;
  const roleTouched = touched?.adminUserViewModel?.[index]?.role;

  return (
    <>
      <div
        className={`border rounded-none border-gray-light dark:border-gray-dark relative`}
      >
        <div
          className={`absolute right-0 top-1 w-8 h-8 p-1 ${index === 0 && "hidden"}`}
        >
          <SvgIcon
            name="Trash"
            className="text-rose-500 cursor-pointer"
            onClick={() => fieldArrayProps.remove(index)}
          />
        </div>
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 md:col-span-6">
              <Input
                asterisk
                label="First Name"
                name={`adminUserViewModel[${index}].firstName`}
                onChange={(e) => {
                  setFieldValue(
                    `adminUserViewModel[${index}].firstName`,
                    e.target.value
                  );
                }}
                placeholder="First Name"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                asterisk
                label="Last Name"
                name={`adminUserViewModel[${index}].lastName`}
                placeholder="Last Name"
                onChange={(e) => {
                  setFieldValue(
                    `adminUserViewModel[${index}].lastName`,
                    e.target.value
                  );
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                asterisk
                label="Email"
                name={`adminUserViewModel[${index}].email`}
                placeholder="Email"
                onChange={(e) => {
                  setFieldValue(
                    `adminUserViewModel[${index}].email`,
                    e.target.value
                  );
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                asterisk
                label="Phone"
                name={`adminUserViewModel[${index}].phone`}
                placeholder="Phone Number"
                onChange={(e) => {
                  setFieldValue(
                    `adminUserViewModel[${index}].phone`,
                    e.target.value
                  );
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                name={`adminUserViewModel[${index}].reportingTo`}
                aria-label="Select a flavor"
                id="flavor-select"
                label="Report To"
                isClearable
                options={reportToOptions}
                placeholder="Select... "
              />
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`super-user-${index}`}
                    name={`adminUserViewModel[${index}].isSuperUser`}
                    label="Super User"
                    onChange={(e) => {
                      setFieldValue(
                        `adminUserViewModel[${index}].isSuperUser`,
                        e.target.checked
                      );
                    }}
                  />
                </div>

                {!values?.adminUserViewModel?.[index]?.isSuperUser && (
                  <div className="flex items-center gap-2 flex-1">
                    <Label required>Role</Label>
                    <div className="flex-1">
                      <Dropdown
                        name={`adminUserViewModel[${index}].role`}
                        aria-label="Select a role"
                        isClearable
                        options={roleOptions}
                        placeholder="Select..."
                        // Add error message display
                        errorMessage={
                          roleTouched && roleError ? String(roleError) : ""
                        }
                        onChange={(option) => {
                          setFieldValue(
                            `adminUserViewModel[${index}].role`,
                            option ? (option as IDropdownOption).value : ""
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
