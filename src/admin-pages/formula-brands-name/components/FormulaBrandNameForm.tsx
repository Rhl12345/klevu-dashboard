import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { RecStatusValuebyName } from "@/utils/constants";
import { PageRoutes } from "@/admin-pages/routes";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { validationSchema } from "@/utils/validations/formulaBrandName.validation";
import FormulaBrandName from "@/mock-data/formulaBrandname.json";
import { IDropdownOption } from "@/types/common/common.type";
import {
  IFormulaBrandName,
  IFormulaBrandNameForm,
  IFormulaBrandNameFormProps,
} from "@/types/formula-brand-names/formulaBrandName.type";
import { recStatusOptions, storeOptions } from "@/utils/Dummy";
/**
 * FormulaBrandNameForm Component
 * @component
 * @description Handles the creation and editing of formula brand names
 * @param {IFormulaBrandNameFormProps} props - Component props
 * @param {string} [props.id] - Optional ID for editing existing formula brand names
 * @param {Function} props.onSubmit - Callback function called when form is submitted
 * @returns {React.ReactElement} Rendered form component
 */

const FormulaBrandNameForm: React.FC<IFormulaBrandNameFormProps> = ({
  id,
  onSubmit,
}) => {
  const formulaBrandName = FormulaBrandName.formulaBrandNames.find(
    (formulaBrandName: IFormulaBrandName) =>
      id && formulaBrandName.id === parseInt(id)
  );

  const initialValues = {
    storeId: id ? id : "",
    brandName: id ? formulaBrandName?.name || "" : "",
    splitName: id ? formulaBrandName?.splitName || "" : "",
    brandReplace: id ? formulaBrandName?.brandReplace || "" : "",
    replaceCharacter: id ? formulaBrandName?.replaceCharacter || "" : "",
    recStatus: id
      ? formulaBrandName?.recStatus === RecStatusValuebyName.Active
        ? "Active"
        : "Inactive"
      : "",
    isDefault: id ? true : false,
  };

  return (
    <Formik<IFormulaBrandNameForm>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, touched, setFieldValue, validateForm }) => {
        return (
          <FormikForm>
            <CreatePageHeader
              module={
                id ? "Edit Brand Name Formula" : "Create Brand Name Formula"
              }
              navigateUrl={PageRoutes.BRAND_NAME_FORMULA.LIST}
              validateForm={validateForm}
              buttonType="submit"
            />

            <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
              <div className="w-full lg:w-7/12 xl:w-10/12">
                <div className="flex flex-wrap gap-4 lg:gap-8">
                  <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
                    <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                      <div className="gap-4 lg:gap-6 grid grid-cols-1">
                        <div className="w-full">
                          <Dropdown
                            options={FormulaBrandName.storeOptions}
                            name="storeId"
                            id="storeId"
                            value={
                              FormulaBrandName.storeOptions.find(
                                (option: IDropdownOption) =>
                                  option.value === values.storeId
                              ) || ""
                            }
                            onChange={(newValue: unknown) => {
                              const selectedOption = newValue as {
                                value: string;
                                label: string;
                              } | null;
                              setFieldValue(
                                "storeId",
                                selectedOption?.value || ""
                              );
                            }}
                            asterisk={true}
                            label="Store Name"
                            error={!!errors.storeId && touched.storeId}
                            errorMessage={errors.storeId || ""}
                          />
                        </div>
                        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                          <div className="lg:w-6/12">
                            <Input
                              name="brandName"
                              type="text"
                              id="brandName"
                              autoComplete="new-password"
                              label="Brand Name"
                              asterisk={true}
                              errorMessage={errors.brandName}
                            />
                          </div>
                          <div className="lg:w-6/12">
                            <Input
                              name="splitName"
                              type="text"
                              id="splitName"
                              label="Split Name"
                              asterisk={true}
                              errorMessage={errors.splitName}
                            />
                          </div>
                        </div>

                        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                          <div className="lg:w-6/12">
                            <Input
                              name="brandReplace"
                              type="text"
                              id="brandReplace"
                              label="Brand Replace"
                              asterisk={true}
                              errorMessage={errors.brandReplace}
                            />
                          </div>
                          <div className="lg:w-6/12">
                            <Input
                              name="replaceCharacter"
                              type="text"
                              id="replaceCharacter"
                              label="Replace Character"
                              asterisk={true}
                              errorMessage={errors.replaceCharacter}
                            />
                          </div>
                        </div>

                        <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                          <div className="lg:w-6/12">
                            <ToggleButton
                              label="Is Default"
                              name="isDefault"
                              id="isDefault"
                              size="small"
                              on="ON"
                              off="OFF"
                              onChange={(value) => {
                                setFieldValue("isDefault", value);
                              }}
                              defaultValue={values.isDefault}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border rounded-none border-gray-light dark:border-gray-dark">
                <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
                  <Dropdown
                    options={recStatusOptions}
                    value={recStatusOptions.find(
                      (option: IDropdownOption) =>
                        option.label === values?.recStatus
                    )}
                    onChange={(newValue: unknown) => {
                      const selectedOption = newValue as {
                        value: string;
                        label: string;
                      } | null;
                      setFieldValue("recStatus", selectedOption?.label || "");
                    }}
                    name="recStatus"
                    id="recStatus"
                    label="Brand Name Formula Status"
                    asterisk={true}
                    error={!!errors.recStatus && touched.recStatus}
                    errorMessage={errors.recStatus || ""}
                  />
                </div>
              </div>
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default FormulaBrandNameForm;
