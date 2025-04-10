import {
  TCustomDropdownOptions,
  TDynamicFields,
} from "@/types/products-database/productDatabase.type";
import { FormikErrors } from "formik";
import * as Yup from "yup";

export const getFirstFormikErrorMessage = <T>(
  errors: FormikErrors<T>,
  customMessage?: string
): string => {
  for (const key in errors) {
    if (typeof errors[key] === "string") {
      return errors[key];
    } else if (typeof errors[key] === "object") {
      const nestedError = getFirstFormikErrorMessage(errors[key]);
      if (nestedError) {
        return nestedError;
      }
    }
  }
  return customMessage || "Please fill all the required fields";
};

export const getValidationSchema = (fieldsArray: TDynamicFields[]) => {
  let validationSchema = {};
  fieldsArray.forEach((fields) => {
    validationSchema = {
      ...validationSchema,
      ...Object.entries(fields).reduce(
        (acc, [key, field]) => {
          if (field.validation) {
            acc[key] = field.validation;
          }
          if (field.subFields) {
            Object.entries(field.subFields).forEach(([subKey, subField]) => {
              if (subField?.validation) {
                acc[subKey] = subField.validation;
              }
            });
          }
          return acc;
        },
        {} as Record<string, any>
      ),
    };
  });
  return Yup.object().shape(validationSchema);
};

export const getFieldsInOrder = (
  fieldConfig: TDynamicFields,
  fieldOrder?: string[]
): TDynamicFields => {
  return fieldOrder
    ? fieldOrder
        .filter((fieldName) => fieldName in fieldConfig)
        .map((fieldName) => ({ fieldName, field: fieldConfig[fieldName] }))
        .reduce((acc, { fieldName, field }) => {
          acc[fieldName] = field;
          return acc;
        }, {} as TDynamicFields)
    : fieldConfig;
};

// Function to update fields with custom options
export const updateFieldsWithCustomOptions = (
  fields: TDynamicFields,
  customOptions: TCustomDropdownOptions
): TDynamicFields => {
  const updatedFields: TDynamicFields = {};

  for (const [key, field] of Object.entries(fields)) {
    if (field.type === "dropdown" && key in customOptions) {
      updatedFields[key] = {
        ...field,
        options: customOptions[key],
      };
    } else {
      updatedFields[key] = field;
    }
  }
  return updatedFields;
};

export const getInitialValuesFromMultipleFields = (fields: TDynamicFields) => {
  const initialValues: Record<string, any> = {};

  for (const [key, field] of Object.entries(fields)) {
    initialValues[key] = field.initialValue;
    if (field.subFields) {
      for (const [subKey, subField] of Object.entries(field.subFields)) {
        initialValues[subKey] = subField.initialValue;
      }
    }
  }
  return initialValues;
};

export const getInitialValues = (fields: TDynamicFields) => {
  return Object.entries(fields).reduce(
    (acc, [key, field]) => {
      acc[key] = field.initialValue;
      if (field.subFields) {
        Object.entries(field.subFields).forEach(([subKey, subField]) => {
          acc[subKey] = subField.initialValue;
        });
      }
      return acc;
    },
    {} as Record<string, any>
  );
};

export const getSelectedInitialValues = (
  fields: TDynamicFields,
  initialValuesKeys: string[]
) => {
  return Object.entries(fields).reduce(
    (acc, [key, value]) => {
      if (initialValuesKeys.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );
};
