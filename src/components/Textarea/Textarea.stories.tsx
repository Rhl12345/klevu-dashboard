import { Meta, StoryFn } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Textarea } from "./Textarea";
import { ITextareaProps } from "./type";

export default {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the textarea field. Leave it empty for no label.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea field.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea field is disabled.",
    },
    error: {
      control: "boolean",
      description: "Indicates whether the textarea field is in an error state.",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines.",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Controls how the textarea can be resized.",
    },
    className: {
      control: "text",
      description: "Additional custom CSS classes for the textarea field.",
    },
    wrapperClassName: {
      control: "text",
      description: "Additional custom CSS classes for the container.",
    },
    labelClassName: {
      control: "text",
      description: "Additional custom CSS classes for the label.",
    },
  },
} as Meta<typeof Textarea>;

// Wrap template in Formik for form-related stories
const FormikTemplate: StoryFn<ITextareaProps> = (args) => (
  <Formik
    initialValues={{ [args.name || "field"]: "" }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <Textarea {...args} />
    </Form>
  </Formik>
);

// Basic textarea without label
export const WithoutLabel = FormikTemplate.bind({});
WithoutLabel.args = {
  placeholder: "Enter your text here...",
  name: "textarea-without-label",
  "data-testid": "textarea-without-label",
  isFormikField: true,
};
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByTestId("textarea-without-label");

  await expect(textarea).toBeVisible();
  await userEvent.type(textarea, "Hello World");
  await expect(textarea).toHaveValue("Hello World");
};

// Textarea with label
export const WithLabel = FormikTemplate.bind({});
WithLabel.args = {
  label: "Description",
  placeholder: "Enter your description",
  name: "textarea-with-label",
  "data-testid": "textarea-with-label",
  isFormikField: true,
};
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByTestId("textarea-with-label");
  const label = canvas.getByText("Description");

  await expect(textarea).toBeVisible();
  await expect(label).toBeVisible();
  await userEvent.type(textarea, "Test description");
  await expect(textarea).toHaveValue("Test description");
};

// Disabled textarea
export const Disabled = FormikTemplate.bind({});
Disabled.args = {
  label: "Disabled Textarea",
  placeholder: "You cannot type here...",
  disabled: true,
  name: "textarea-disabled",
  "data-testid": "textarea-disabled",
  isFormikField: true,
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByTestId("textarea-disabled");

  await expect(textarea).toBeVisible();
  await expect(textarea).toBeDisabled();
  await userEvent.type(textarea, "test text");
  await expect(textarea).toHaveValue("");
};

// Error state
export const ErrorState = FormikTemplate.bind({});
ErrorState.args = {
  label: "Comments",
  placeholder: "Enter your comments",
  error: true,
  errorMessage: "This field is required",
  name: "textarea-error",
  "data-testid": "textarea-error",
  isFormikField: true,
};
ErrorState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByTestId("textarea-error");
  const errorMessage = canvas.getByText("This field is required");

  await expect(textarea).toBeVisible();
  await expect(textarea).toHaveClass("border-red-500");
  await expect(errorMessage).toBeVisible();
};

// Different resize options
export const ResizeOptions: StoryFn<ITextareaProps> = () => (
  <div className="space-y-4">
    <Textarea
      label="No Resize"
      resize="none"
      placeholder="Cannot be resized"
      data-testid="no-resize"
    />
    <Textarea
      label="Vertical Resize"
      resize="vertical"
      placeholder="Can be resized vertically"
      data-testid="vertical-resize"
    />
    <Textarea
      label="Horizontal Resize"
      resize="horizontal"
      placeholder="Can be resized horizontally"
      data-testid="horizontal-resize"
    />
    <Textarea
      label="Both Directions"
      resize="both"
      placeholder="Can be resized in both directions"
      data-testid="both-resize"
    />
  </div>
);

// Custom styling
export const WithCustomClasses = FormikTemplate.bind({});
WithCustomClasses.args = {
  label: "Custom Styled Textarea",
  placeholder: "Type here...",
  name: "custom-textarea",
  wrapperClassName: "bg-gray-50 p-4 rounded-lg",
  labelClassName: "text-blue-600 uppercase",
  className: "border-2 border-blue-300 focus:border-blue-500",
  "data-testid": "custom-textarea",
  isFormikField: true,
};

// Without Formik
export const WithoutFormik: StoryFn<ITextareaProps> = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Regular Textarea"
      name="regular-textarea"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value)
      }
      placeholder="Type here..."
      data-testid="textarea-without-formik"
      isFormikField={false}
    />
  );
};

WithoutFormik.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByTestId("textarea-without-formik");

  await expect(textarea).toBeVisible();
  await userEvent.type(textarea, "Hello World");
  await expect(textarea).toHaveValue("Hello World");
};
