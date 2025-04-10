import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Checkbox from "@/components/Checkbox/Checkbox";
import CheckboxSourceCode from "!!raw-loader!./Checkbox";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { ICheckboxProps } from "@/components/Checkbox/types";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    inputSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Defines the size of the checkbox: small, medium, or large.",
    },
    label: {
      control: "text",
      description: "The label for the checkbox.",
    },
    asterisk: {
      control: "boolean",
      description: "Whether to show an asterisk.",
    },
    wrapperClassName: {
      control: "text",
      description: "Custom CSS class for the parent wrapper div.",
    },

    labelClassName: {
      control: "text",
      description: "Custom CSS class for the label.",
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
    checked: {
      control: "boolean",
      description: "Controlled checked state.",
    },
    onChange: {
      description: "Controlled onChange handler.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
const Template: StoryFn<ICheckboxProps> = (args) => <Checkbox {...args} />;

export const Default: Story = Template.bind({});
Default.args = {
  inputSize: "medium",
  id: "default-checkbox",
};
Default.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Visual Tests
  // -----------
  // Verify checkbox is present with correct test ID
  const checkbox = canvas.getByTestId("default-checkbox");

  // Interaction Tests
  // ----------------
  // 1. Verify initial unchecked state
  await expect(checkbox).not.toBeChecked();

  // 2. Verify checkbox can be checked
  await userEvent.click(checkbox);
  await expect(checkbox).toBeChecked();

  // 3. Verify checkbox can be unchecked
  await userEvent.click(checkbox);
  await expect(checkbox).not.toBeChecked();
};

export const WithLabel: Story = Template.bind({});
WithLabel.args = {
  inputSize: "medium",
  id: "with-label-checkbox",
  label: "Default Checkbox",
};

export const SourceCode = CreateSourceCodeStory(CheckboxSourceCode);
