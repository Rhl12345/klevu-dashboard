import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ColorPicker from "./ColorPicker";
import ColorPickerSourceCode from "!!raw-loader!./ColorPicker";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { IColorPickerProps } from "./types";
import { Form, Formik } from "formik";
import { expect, userEvent, within } from "@storybook/test";

export default {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: {
      config: {
        rules: [
          {
            // Ensure proper color contrast
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "The label for the checkbox.",
    },
    labelClassName: {
      control: "text",
      description: "Custom CSS class for the label.",
    },
    descriptionClassName: {
      control: "text",
      description: "Custom CSS class for the description.",
    },
    checkboxClassName: {
      control: "text",
      description: "Custom CSS class for the checkbox input.",
    },
    id: {
      control: "text",
      description: "Unique identifier for the checkbox.",
    },
    name: {
      control: "text",
      description: "Name for the checkbox.",
    },
    onChange: {
      description: "Controlled onChange handler.",
    },
  },
} as Meta<typeof ColorPicker>;

const Template: StoryFn<IColorPickerProps> = (args) => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    <Form>
      <ColorPicker {...args} />
    </Form>
  </Formik>
);

export const Basic = Template.bind({});
Basic.args = {
  id: "basic",
  type: "text",
  name: "basic",
  placeholder: "pick a color",
  label: "Basic",
};
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test initial render
  const colorPicker = await canvas.findByLabelText("Basic");
  await expect(colorPicker).toBeInTheDocument();

  // Verify initial empty state
  await expect(colorPicker).toHaveValue("");

  // Simulate color selection
  await userEvent.type(colorPicker, "");
  await expect(colorPicker).toHaveValue("");
};

export const Required = Template.bind({});
Required.args = {
  id: "requiredColorPicker",
  type: "text",
  name: "requiredColorPicker",
  placeholder: "pick a color",
  label: "Required",
  required: true,
  displayError: true,
  errorMessage: "color picker is required",
};
Required.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test initial render with required field
  const colorPicker = await canvas.findByLabelText("Required *");
  await expect(colorPicker).toBeInTheDocument();

  // Verify required attribute
  await expect(colorPicker).toHaveAttribute("required");

  // Verify error message appears when empty
  await userEvent.click(colorPicker);
  await userEvent.tab(); // Tab out to trigger validation
  const errorMessage = await canvas.findByText("color picker is required");
  await expect(errorMessage).toBeInTheDocument();
};

export const Default = Template.bind({});
Default.args = {
  id: "defaultColorPicker",
  type: "text",
  name: "defaultColorPicker",
  label: "Default",
  placeholder: "pick a color",
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test initial render with default value
  const colorPicker = await canvas.findByLabelText("Default");
  await expect(colorPicker).toBeInTheDocument();

  // Verify default value is set
  await expect(colorPicker).toHaveValue("#f1682d");
};

export const SourceCode = CreateSourceCodeStory(ColorPickerSourceCode);
