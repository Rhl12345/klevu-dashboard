import Checkbox from "@/components/Checkbox/Checkbox";
import CustomFilterSelectBox from "@/components/DropDown/CustomFilterDropDown";
import CustomSearchDropDown from "@/components/DropDown/customSearchDropDown";
import {
  IDropdownProps,
  IOptions,
  TOptionProps,
} from "@/components/DropDown/types";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";
import { ErrorMessage } from "formik";
import { useMemo } from "react";
import Select, { ActionMeta, InputProps, components } from "react-select";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  defaultValue,
  errorMessage,
  isFormikField = false,
  customFilterDropdown,
  customSearchDropdown,
  options,
  onChange,
  label,
  labelClassName = "",
  wrapperClassName = "",
  asterisk = false,
  id,
  displayError = true,
  withCheckBox = false,
  name,
  ...props
}: IDropdownProps) => {
  const SelectBox = useMemo(() => {
    switch (true) {
      case customFilterDropdown:
        return CustomFilterSelectBox;
      case customSearchDropdown:
        return CustomSearchDropDown;
      default:
        return Select;
    }
  }, [customFilterDropdown, customSearchDropdown]);

  const defaultDropDownValue = useMemo(() => {
    if (customFilterDropdown) {
      return defaultValue;
    } else if (props.isMulti) {
      return options?.filter((item) => defaultValue?.includes(item.value));
    } else {
      return options?.find((item) => item.value === defaultValue);
    }
  }, [customFilterDropdown, defaultValue, props.isMulti, options]);

  const handleSelect = (selected: unknown) => {
    onChange?.(selected, {} as ActionMeta<unknown>);
  };

  return (
    <div className={twMerge("flex flex-col gap-2", wrapperClassName)}>
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
          {asterisk && <span className="text-danger pl-1">*</span>}
        </Label>
      )}

      <SelectBox
        {...props}
        name={name}
        options={options}
        onChange={handleSelect}
        instanceId={id}
        defaultValue={defaultDropDownValue}
        classNames={{
          control: (state) =>
            twMerge(
              "!bg-body-light dark:!bg-body-dark !border-gray-light dark:!border-gray-dark !rounded-none hover:!border-gray-light dark:!hover:border-gray-dark px-2 py-2",
              state.isFocused
                ? "!outline-none !ring-2 !shadow-none !outline-none !ring-gray-pointer dark:!ring-gray-pointer !border-gray-light dark:!border-gray-dark"
                : "",
              props?.error
                ? "!border-red-500 hover:!border-red-500 focus:!border-red-500"
                : ""
              // state.isDisabled
              //   ? "!bg-gray-light dark:!bg-gray-dark !cursor-not-allowed !opacity-50"
              //   : ""
            ),
          valueContainer: () => "!p-0",
          menu: () =>
            "!bg-body-light dark:!bg-body-dark !border !border-gray-light dark:!border-gray-dark !z-50",
          option: (state) =>
            twMerge(
              "!text-quaternary-dark dark:!text-quaternary-light hover:!bg-gray-default dark:hover:!bg-gray-dark hover:!text-primary-light dark:hover:!text-primary-dark",
              state.isFocused || state.isSelected
                ? "!bg-gray-default dark:!bg-gray-dark !text-primary-light dark:!text-primary-dark"
                : ""
            ),
          singleValue: (state) =>
            twMerge(
              "!text-quaternary-dark dark:!text-quaternary-light !text-base !font-normal placeholder:!text-quaternary-dark dark:placeholder:!text-quaternary-light",
              state.isDisabled
                ? "!pointer-events-auto !opacity-90 !cursor-not-allowed"
                : ""
            ),
          input: () =>
            "!text-quaternary-dark dark:!text-quaternary-light !p-0 !m-0 !text-base !font-normal placeholder:!text-quaternary-dark dark:placeholder:!text-quaternary-light",
          indicatorsContainer: (props) => "!py-0",
          dropdownIndicator: (props) => "!py-0",
          placeholder: () =>
            "!text-quaternary-dark dark:!text-quaternary-light !text-base !mx-0",
          multiValue: () => "!rounded-none !bg-gray-default dark:!bg-gray-dark",
          multiValueLabel: () =>
            "!text-quaternary-dark dark:!text-quaternary-light !text-sm",
          multiValueRemove: () =>
            "!rounded-none hover:!bg-gray-pointer dark:hover:!bg-gray-pointer",
          clearIndicator: () => "!py-0",
        }}
        components={{
          Option: (prop: TOptionProps<any>) => {
            return (
              <Option
                {...prop}
                data={prop.data}
                isMulti={props.isMulti || false}
                withCheckBox={withCheckBox}
              />
            );
          },
          Input,
        }}
      />
      {!defaultValue && displayError === true && isFormikField && name ? (
        <ErrorMessage name={name} component={FormErrorMessage} />
      ) : errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </div>
  );
};

const Option = <T extends IOptions>(props: TOptionProps<T, true>) => {
  const iconPosition = props.data.iconPosition || "left";

  return (
    <components.Option {...props}>
      <Label
        className={`flex ${
          props.isMulti ? "justify-between" : "gap-2 items-center"
        }`}
      >
        <div className="flex items-center gap-2">
          {props.isMulti && props.withCheckBox && (
            <Checkbox
              id={`checkbox-${props.data.value || "default"}`}
              inputSize="small"
              aria-label={`checkbox-${props.data.value || "default"}`}
              aria-labelledby={`checkbox-${props.data.value || "default"}`}
              checkboxClassName={`border dark:border-gray-light`}
              checked={props.isSelected}
              onChange={() => null}
            />
          )}
          {props.data.icon && iconPosition === "left" && props.data.icon}
          <span className="text-sm font-medium">{props.label}</span>
        </div>
        {props.data.icon && iconPosition === "right" && props.data.icon}
      </Label>
    </components.Option>
  );
};

const Input = (props: InputProps) => {
  if (props.isHidden) {
    return <components.Input {...props} />;
  }

  return <components.Input {...props} type="" />;
};

export default Dropdown;
