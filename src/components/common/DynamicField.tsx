import Checkbox from "@/components/Checkbox/Checkbox";
import Loader from "@/components/common/Loader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import InputNumber from "@/components/Input/InputNumber";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { IDynamicFieldProps } from "@/types/products-database/productDatabase.type";
import { useFormikContext } from "formik";
import dynamic from "next/dynamic";
import { useEffect } from "react";

/****************************************
 * Dynamic Imports
 ****************************************/
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  { ssr: false, loading: () => <Loader /> }
);

/**
 * DynamicField Component
 *
 * A versatile component that renders different form field types based on configuration.
 * Supports various field types including:
 * - Text input
 * - Number input
 * - Dropdown
 * - Checkbox
 * - Rich text editor
 * - Read-only fields
 * - Volume fields (with length, width, height calculations)
 *
 * @component
 * @param {DynamicFieldProps} props - Component props
 * @returns {JSX.Element | null} Rendered field component or null if conditions aren't met
 */
const DynamicField = ({
  fieldConfig,
  handleStatusDropdownChange,
}: IDynamicFieldProps) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<Record<string, any>>();

  /****************************************
   * Effects
   ****************************************/
  /**
   * Automatically calculates volume when length, width, or height changes
   */
  useEffect(() => {
    if (fieldConfig.name === "volume") {
      const length = Number(values?.length) || 0;
      const width = Number(values?.width) || 0;
      const height = Number(values?.height) || 0;
      if (length && width && height) {
        const volume = length * width * height;
        setFieldValue("volume", volume, false);
      }
    }
  }, [values?.length, values?.width, values?.height, setFieldValue]);

  /****************************************
   * Helper Functions
   ****************************************/
  /**
   * Generates common props for form fields
   * @param {string} name - Field name
   * @returns {Object} Common props object
   */
  const getCommonProps = (name: string) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && !!errors[name],
    errorMessage: touched[name] ? (errors[name] as string) : undefined,
    label: fieldConfig.label,
    placeholder: fieldConfig.placeholder,
    disabled: fieldConfig.disabled,
  });

  const getCommonPropsForDropdown = (name: string) => ({
    name,
    value:
      fieldConfig?.options?.find((option) => option.value === values[name]) ||
      null,
    onChange: (newValue: unknown) => {
      const selected = newValue as { value: string; label: string };
      setFieldValue(name, selected?.value, false);

      handleStatusDropdownChange?.(selected?.value);
    },
    onBlur: handleBlur,
    error: touched[name] && !!errors[name],
    errorMessage: touched[name] ? (errors[name] as string) : undefined,
    label: fieldConfig.label,
    placeholder: fieldConfig.placeholder,
    isDisabled: fieldConfig.disabled,
  });

  /**
   * Generates common props specifically for volume-related fields
   * @param {string} name - Field name (length, width, or height)
   * @returns {Object} Volume field props object
   */
  const getCommonPropsForVolume = (name: string) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && !!errors[name],
    errorMessage:
      touched[name] && errors[name] ? (errors[name] as string) : undefined,
    label: fieldConfig?.subFields?.[name]?.label,
    placeholder: fieldConfig?.subFields?.[name]?.placeholder,
    disabled: fieldConfig?.subFields?.[name]?.disabled,
    asterisk: fieldConfig?.subFields?.[name]?.isRequired,
  });

  /****************************************
   * Conditional Rendering
   ****************************************/
  // Skip rendering if dependency condition is not met
  if (fieldConfig.dependsOn && !values[fieldConfig.dependsOn]) {
    return null;
  }

  /****************************************
   * Field Type Rendering
   ****************************************/
  switch (fieldConfig.type) {
    case "text":
      return (
        <Input
          {...getCommonProps(fieldConfig.name)}
          asterisk={fieldConfig.isRequired}
          formik={false}
        />
      );
    case "number":
      return (
        <InputNumber
          {...getCommonProps(fieldConfig.name)}
          asterisk={fieldConfig.isRequired}
          formik={false}
        />
      );

    case "dropdown":
      return (
        <Dropdown
          id={fieldConfig.name}
          {...getCommonPropsForDropdown(fieldConfig.name)}
          asterisk={fieldConfig.isRequired}
          options={fieldConfig.options || []}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          {...getCommonProps(fieldConfig.name)}
          id={fieldConfig.name}
          asterisk={fieldConfig.isRequired}
          checked={values[fieldConfig.name]}
        />
      );

    case "toggle":
      return (
        <ToggleButton
          {...getCommonProps(fieldConfig.name)}
          id={fieldConfig.name}
        />
      );

    case "richtext":
      return (
        <RichTextEditor
          {...getCommonProps(fieldConfig.name)}
          onChange={(value: string) => setFieldValue(fieldConfig.name, value)}
          initialData={values[fieldConfig.name]}
          asterisk={fieldConfig.isRequired}
        />
      );

    case "readonly":
      return (
        <Input {...getCommonProps(fieldConfig.name)} formik={false} disabled />
      );

    /**
     * Special case for volume fields
     * Renders a composite field with length, width, height inputs that auto-calculate volume
     *
     * Layout:
     * [Length] × [Width] × [Height] = [Volume]
     *
     * Features:
     * - Each dimension field (length, width, height) is independently validated
     * - Volume is automatically calculated when any dimension changes
     * - Consistent min-height to prevent layout shifts when validation errors appear
     * - Multiplication symbols (×) between dimension fields
     * - Disabled volume field showing the calculated result
     */
    case "volume":
      return (
        <div className="flex max-md:flex-wrap gap-4 items-start col-span-full">
          {/* Length Input */}
          <div className="flex-1 min-h-[90px]">
            <InputNumber
              {...getCommonPropsForVolume("length")}
              formik={false}
            />
          </div>

          {/* Multiplication Symbol */}
          <Text className="mt-8">×</Text>

          {/* Width Input */}
          <div className="flex-1 min-h-[90px]">
            <InputNumber {...getCommonPropsForVolume("width")} formik={false} />
          </div>

          {/* Multiplication Symbol */}
          <Text className="mt-8">×</Text>

          {/* Height Input */}
          <div className="flex-1 min-h-[90px]">
            <InputNumber
              {...getCommonPropsForVolume("height")}
              formik={false}
            />
          </div>

          {/* Equals Symbol */}
          <Text className="mt-8">=</Text>

          {/* Calculated Volume (Read-only) */}
          <div className="flex-1 min-h-[90px]">
            <InputNumber
              {...getCommonProps("volume")}
              formik={false}
              disabled
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicField;
