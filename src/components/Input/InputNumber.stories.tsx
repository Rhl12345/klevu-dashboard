import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import InputNumber from "@/components/Input/InputNumber";
import { within, userEvent, expect } from "@storybook/test";
import { Formik } from "formik";
import { Form } from "formik";
import Button from "@/components/Button/Button";

import {
  baseValidationSchema,
  currencyValidationSchema,
  rangeValidationSchema,
} from "@/utils/validations/inputNumber.validation";

export default {
  title: "Components/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the number input field.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the number input field is disabled.",
    },
    className: {
      control: "text",
      description: "Additional custom CSS classes for the input field.",
    },
    name: {
      control: "text",
      description: "Name attribute for the input field.",
    },
    formik: {
      control: "boolean",
      description: "Whether the input field is part of a form.",
    },
    errorMessage: {
      control: "text",
      description: "Error message for the input field.",
    },
    asterisk: {
      control: "boolean",
      description: "Whether the input field is required.",
    },
    labelClassName: {
      control: "text",
      description: "Additional custom CSS classes for the label.",
    },
    label: {
      control: "text",
      description: "Label text for the input field.",
    },

  },
} as Meta<typeof InputNumber>;

export const Default: StoryFn = () => (
  <Formik
    initialValues={{ number: "" }}
    validationSchema={baseValidationSchema}
    onSubmit={(values) => console.log("Submitted:", values)}
  >
    {({ values, errors, touched, setFieldValue }) => (
      <Form className="space-y-4">
        <InputNumber
          name="number"
          id="number"
          value={values.number}
          placeholder="Enter number..."
          onChange={(e) => setFieldValue("number", e.target.value)}
          displayError={errors.number && touched.number ? true : false}
          data-testid="number"
          className={errors.number && touched.number ? "border-red-500" : ""}
        />

        <Button type="submit">Submit</Button>
      </Form>
    )}
  </Formik>
);
Default.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("number") as HTMLInputElement;

  // Visual checks
  await expect(input).toBeVisible();
  await expect(input).toHaveAttribute("name", "number");
  await expect(input.value).toBe("");

  // Test numeric input
  await userEvent.type(input, "123");
  await expect(input.value).toBe("123");

  // Test non-numeric input (should be prevented)
  await userEvent.type(input, "abc");
  await expect(input.value).toBe("123");

  // Test decimal input
  await userEvent.clear(input);
  await userEvent.type(input, "123.45");
  await expect(input.value).toBe("123.45");
};

export const Disabled: StoryFn = () => (
  <Formik
    initialValues={{ disabled: "" }}
    validationSchema={baseValidationSchema}
    onSubmit={(values) => console.log("Submitted:", values)}
  >
    {({ errors, touched }) => (
      <Form className="space-y-4">
        <InputNumber
          id="disabled"
          name="disabled"
          placeholder="Disabled number input..."
          disabled={true}
          displayError={errors.disabled && touched.disabled ? true : false}
          data-testid="disabled"
          className={
            errors.disabled && touched.disabled ? "border-red-500" : ""
          }
        />

        <Button type="submit" disabled>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

Disabled.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("disabled") as HTMLInputElement;

  // Visual checks
  await expect(input).toBeVisible();
  await expect(input).toBeDisabled();
  await expect(input).toHaveClass("bg-gray-100");

  // Attempt interaction with disabled input
  await userEvent.type(input, "123");
  await expect(input.value).toBe(""); // Value should remain empty
};

export const WithCustomFormat: StoryFn = () => (
  <Formik
    initialValues={{ currency: "" }}
    validationSchema={currencyValidationSchema}
    onSubmit={(values) => console.log("Submitted:", values)}
  >
    {({ errors, touched, setFieldValue, values, handleBlur }) => (
      <Form className="space-y-4">
        <InputNumber
          id="currency"
          name="currency"
          placeholder="Enter currency amount..."
          prefix="$"
          thousandSeparator={true}
          decimalScale={2}
          onBlur={handleBlur}
          displayError={true}
          data-testid="currency"
          className={
            errors.currency && touched.currency ? "border-red-500" : ""
          }
          onValueChange={(values: { floatValue: number }) => {
            // Pass the float value to Formik for validation
            setFieldValue("currency", values.floatValue);
          }}
          value={values.currency || ""}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )}
  </Formik>
);
WithCustomFormat.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("currency") as HTMLInputElement;

  // Visual checks
  await expect(input).toBeVisible();

  // Test currency formatting
  await userEvent.type(input, "1234567.89");
  await expect(input.value).toBe("$1,234,567.89");

  // Test decimal limitation
  await userEvent.clear(input);
  await userEvent.type(input, "123.456");
  await expect(input.value).toBe("$123.45"); // Should round to 2 decimal places

  // Test thousand separator
  await userEvent.clear(input);
  await userEvent.type(input, "1000000");
  await expect(input.value).toBe("$1,000,000");
};

export const WithMinMax: StoryFn = () => (
  <Formik
    initialValues={{ range: "" }}
    validationSchema={rangeValidationSchema}
    onSubmit={(values) => console.log("Submitted:", values)}
  >
    {({ errors, touched, setFieldValue, values, handleBlur }) => (
      <Form className="space-y-4">
        <InputNumber
          id="range"
          name="range"
          onBlur={handleBlur}
          onValueChange={(values: { floatValue: number }) => {
            setFieldValue("range", values.floatValue);
          }}
          placeholder="Enter number (0-100)..."
          displayError={errors.range && touched.range ? true : false}
          data-testid="range"
          className={errors.range && touched.range ? "border-red-500" : ""}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )}
  </Formik>
);
WithMinMax.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("range") as HTMLInputElement;

  // Test valid range inputs
  await userEvent.type(input, "50");
  await expect(input.value).toBe("50");

  // Test lower boundary
  await userEvent.clear(input);
  await userEvent.type(input, "0");
  await expect(input.value).toBe("0");

  // Test upper boundary
  await userEvent.clear(input);
  await userEvent.type(input, "100");
  await expect(input.value).toBe("100");
};
