import type { Meta, StoryObj } from "@storybook/react";
import ToggleButton from "./ToggleButton";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "small"],
      description: "Size of the toggle button",
    },
    defaultValue: {
      control: "boolean",
      description: "Initial state of the toggle",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle button is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    name: {
      control: "text",
      description: "Name attribute for the input",
    },
    id: {
      control: "text",
      description: "ID attribute for the input",
    },
    onChange: {
      action: "changed",
      description: "Callback function when toggle state changes",
    },
    on: {
      control: "text",
      description: "Text to display when toggle is on",
    },
    off: {
      control: "text",
      description: "Text to display when toggle is off",
    },
    label: {
      control: "text",
      description: "Label text for the toggle button",
    },
    labelClassName: {
      control: "text",
      description: "Additional CSS classes for the label",
    },
    asterisk: {
      control: "boolean",
      description: "Whether to display an asterisk",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

// Default story with tests
export const Default: Story = {
  args: {
    size: "medium",
    defaultValue: false,
    disabled: false,
    name: "toggle-default",
    id: "toggle-default",
    on: "Active",
    off: "Inactive",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const toggleInput = canvas.getByTestId("toggle-input");
    const toggleLabel = canvas.getByTestId("toggle-label");
    const toggleTextRight = canvas.getByTestId("toggle-text-right");

    // Initial state tests
    await expect(toggleInput).not.toBeChecked();
    await expect(toggleTextRight).toHaveTextContent("Inactive");
    await expect(toggleLabel).toHaveClass("bg-slate-600");

    // Click interaction test
    await userEvent.click(toggleLabel);
    await expect(toggleInput).toBeChecked();
    await expect(canvas.getByTestId("toggle-text-left")).toHaveTextContent(
      "Active"
    );
    await expect(toggleLabel).toHaveClass("bg-green-600");

    // Toggle back
    await userEvent.click(toggleLabel);
    await expect(toggleInput).not.toBeChecked();
    await expect(toggleTextRight).toHaveTextContent("Inactive");
    await expect(toggleLabel).toHaveClass("bg-slate-600");
  },
};

// Small size story with tests
export const Small: Story = {
  args: {
    size: "small",
    defaultValue: false,
    name: "toggle-small",
    id: "toggle-small",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const container = canvas.getByTestId("toggle-input").parentElement;

    // Size-specific tests
    await expect(container).toHaveClass("w-20");
  },
};

// Initially active story with tests
export const InitiallyActive: Story = {
  args: {
    size: "medium",
    defaultValue: true,
    name: "toggle-active",
    id: "toggle-active",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const toggleInput = canvas.getByTestId("toggle-input");
    const toggleTextLeft = canvas.getByTestId("toggle-text-left");
    const toggleLabel = canvas.getByTestId("toggle-label");

    // Initial state tests
    await expect(toggleInput).toBeChecked();
    await expect(toggleTextLeft).toHaveTextContent("Active");
    await expect(toggleLabel).toHaveClass("bg-green-600");

    // Visual state tests
    const toggleHandle = canvas.getByTestId("toggle-handle");
    await expect(toggleHandle).toHaveClass("left-[4.4rem]");
  },
};

// Disabled story with tests
export const Disabled: Story = {
  args: {
    size: "medium",
    defaultValue: false,
    disabled: true,
    name: "toggle-disabled",
    id: "toggle-disabled",
    label: "Disabled Toggle",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const toggleInput = canvas.getByTestId("toggle-input");
    const toggleLabel = canvas.getByTestId("toggle-label");

    // Disabled state tests
    await expect(toggleInput).toBeDisabled();
    await expect(toggleLabel).toHaveClass("opacity-30");
  },
};

// Disabled and active story with tests
export const DisabledActive: Story = {
  args: {
    size: "medium",
    defaultValue: true,
    disabled: true,
    name: "toggle-disabled-active",
    id: "toggle-disabled-active",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const toggleInput = canvas.getByTestId("toggle-input");
    const toggleLabel = canvas.getByTestId("toggle-label");

    // Disabled active state tests
    await expect(toggleInput).toBeDisabled();
    await expect(toggleInput).toBeChecked();
    await expect(toggleLabel).toHaveClass("opacity-30");
    await expect(toggleLabel).toHaveClass("bg-green-600");
  },
};

// Add new story for custom text
export const CustomText: Story = {
  args: {
    size: "medium",
    defaultValue: false,
    name: "toggle-custom",
    id: "toggle-custom",
    on: "ON",
    off: "OFF",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const toggleInput = canvas.getByTestId("toggle-input");
    const toggleTextRight = canvas.getByTestId("toggle-text-right");

    await expect(toggleTextRight).toHaveTextContent("OFF");
    await userEvent.click(canvas.getByTestId("toggle-label"));
    await expect(canvas.getByTestId("toggle-text-left")).toHaveTextContent(
      "ON"
    );
  },
};

export const WithLabel: Story = {
  args: {
    size: "medium",
    defaultValue: false,
    name: "toggle-with-label",
    id: "toggle-with-label",
    label: "Toggle Status",
    asterisk: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement as HTMLElement);
    const label = canvas.getByText("Toggle Status");
    // Label tests
    await expect(label).toBeInTheDocument();
    await expect(label).toHaveClass("text-sm", "font-medium", "text-gray-700");
  },
};
