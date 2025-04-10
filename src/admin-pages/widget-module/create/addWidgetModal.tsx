import React from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { WidgetModuleValidationSchema } from "@/utils/validations/widgetModule.validation";
import widgetModule from "@/mock-data/widgetModule.json";
import { ActionMeta } from "react-select";
import {
  IDropdownOption,
  IFormValues,
  IWidgetModuleModalProps,
} from "@/types/WidgetModule/widgetModule.type";

const AddWidgetModal = ({
  isOpen,
  onClose,
  selectedWidgetModule,
  moduleOptions,
  handleWidgetChange,
  handleModulesChange,
}: IWidgetModuleModalProps) => {
  const initialValues: IFormValues = {
    widget:
      widgetModule.widgetOptions?.find(
        (item) => item.label === selectedWidgetModule?.name
      )?.value ?? "",
    modules: moduleOptions.reduce((acc, item) => {
      if (selectedWidgetModule?.moduleName.includes(item.label)) {
        acc.push(item.value);
      }
      return acc;
    }, [] as string[]),
  };

  const handleFormSubmit = (values: IFormValues): void => {
    handleWidgetChange(values.widget);
    handleModulesChange(values.modules);
    onClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: WidgetModuleValidationSchema,
    onSubmit: handleFormSubmit,
  });

  const handleWidgetDropdownChange = (
    newValue: IDropdownOption | null
  ): void => {
    formik.setFieldValue("widget", newValue?.value ?? "");
  };

  const handleModuleDropdownChange = (
    newValue: IDropdownOption[] | null
  ): void => {
    const selectedValues =
      newValue?.map((option) => option.value.toString()) ?? [];
    formik.setFieldValue("modules", selectedValues);
  };

  const getWidgetDropdownValue = (): IDropdownOption | null =>
    formik.values.widget
      ? {
          value: formik.values.widget,
          label:
            widgetModule.widgetOptions.find(
              (opt) => opt.value === formik.values.widget
            )?.label ?? "",
        }
      : null;

  const getModuleDropdownValue = (): IDropdownOption[] =>
    formik.values.modules.map((module) => ({
      value: module,
      label: moduleOptions.find((opt) => opt.value === module)?.label ?? "",
    }));

  return (
    <Modal
      isOpen={isOpen.isOpen}
      onClose={onClose}
      header={`${isOpen.type === "viewEdit" ? "Edit" : "Add"} Widget Module Details`}
      contentClassName="overflow-inherit"
      footerClassName="z-0"
      content={
        <form onSubmit={formik.handleSubmit} className="gap-4 lg:gap-6 grid grid-cols-1">
          <Dropdown
            value={getWidgetDropdownValue()}
            aria-label="Select a widget"
            id="widget-select"
            label="Widget"
            asterisk
            name="widget"
            isClearable
            onChange={(newValue: unknown, actionMeta: ActionMeta<unknown>) =>
              handleWidgetDropdownChange(newValue as IDropdownOption | null)
            }
            options={widgetModule.widgetOptions}
            placeholder="Select Widget"
            errorMessage={formik.errors.widget ?? ""}
          />
          <Dropdown
            value={getModuleDropdownValue()}
            aria-label="Select modules"
            id="module-select"
            isMulti
            label="Module"
            asterisk
            isClearable
            options={moduleOptions}
            name="modules"
            placeholder="Select Module"
            withCheckBox
            onChange={(newValue: unknown, actionMeta: ActionMeta<unknown>) =>
              handleModuleDropdownChange(newValue as IDropdownOption[] | null)
            }
            errorMessage={formik.errors.modules?.toString() ?? ""}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
          />
        </form>
      }
      footer={
        <>
          <Button size="sm" variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Save
          </Button>
        </>
      }
    />
  );
};

export default AddWidgetModal;
