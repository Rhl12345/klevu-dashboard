import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Formik, Form } from "formik";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Button from "@/components/Button/Button";
import { IInputComponentType } from "@/components/Input/types";
import { within, userEvent, expect } from "@storybook/test";

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the input field. Leave it empty for no label.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input field is disabled.",
    },
    error: {
      control: "boolean",
      description: "Indicates whether the input field is in an error state.",
    },
    className: {
      control: "text",
      description: "Additional custom CSS classes for the input field.",
    },
    wrapperClassName: {
      control: "text",
      description: "Additional custom CSS classes for the container.",
    },
    labelClassName: {
      control: "text",
      description: "Additional custom CSS classes for the label.",
    },
    name: {
      control: "text",
      description: "Name attribute for the input field.",
    },
    formik: {
      control: "boolean",
      description: "Whether the input field is used with Formik.",
    },
  },
} as Meta<typeof Input>;

// Wrap template in Formik for form-related stories
const FormikTemplate: StoryFn<IInputComponentType> = (args) => (
  <Formik
    initialValues={{ [args.name || "field"]: "" }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <Input {...args} />
    </Form>
  </Formik>
);

// Test the basic input without label
export const WithoutLabel = FormikTemplate.bind({});
WithoutLabel.args = {
  placeholder: "Enter text...",
  name: "input-without-label",
  "data-testid": "input-without-label",
};
WithoutLabel.parameters = {
  docs: {
    description: {
      story: "An input field without a label, only displaying a placeholder.",
    },
  },
};
WithoutLabel.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-without-label");

  // Visual checks
  await expect(input).toBeVisible();
  await expect(input).toHaveAttribute("name", "input-without-label");
  await expect(canvas.queryByRole("label")).toBeNull();

  // Interaction tests
  await userEvent.type(input, "Hello World");
  await expect(input).toHaveValue("Hello World");

  // Focus state
  await userEvent.click(input);
  await expect(document.activeElement).toBe(input);
};

// Test input with label
export const WithLabel = FormikTemplate.bind({});
WithLabel.args = {
  label: "Username",
  placeholder: "Enter your username",
  name: "input-with-label",
  "data-testid": "input-with-label",
};
WithLabel.parameters = {
  docs: {
    description: {
      story:
        "An input field with a label. The label is displayed above the input field.",
    },
  },
};
WithLabel.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-with-label");
  const label = canvas.getByText("Username");

  // Visual checks
  await expect(input).toBeVisible();
  await expect(label).toBeVisible();
  await expect(input).toHaveAttribute("name", "input-with-label");

  // Interaction tests
  await userEvent.type(input, "johndoe");
  await expect(input).toHaveValue("johndoe");
};

// Test disabled state
export const Disabled = FormikTemplate.bind({});
Disabled.args = {
  label: "Disabled Input",
  placeholder: "You cannot type here...",
  disabled: true,
  name: "input-disabled",
  "data-testid": "input-disabled",
};
Disabled.parameters = {
  docs: {
    description: {
      story: "An input field that is disabled. Users cannot interact with it.",
    },
  },
};
Disabled.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-disabled");

  // Visual checks
  await expect(input).toBeVisible();
  await expect(input).toBeDisabled();
  await expect(input).toHaveClass("opacity-90");
  await expect(input).toHaveClass("bg-gray-100");

  // Interaction tests
  await userEvent.type(input, "test text");
  await expect(input).toHaveValue(""); // Should remain empty
};

// Test error state
export const ErrorState = FormikTemplate.bind({});
ErrorState.args = {
  label: "Email",
  placeholder: "Enter your email",
  error: true,
  name: "input-error",
  displayError: true,
  "data-testid": "input-error",
};
ErrorState.parameters = {
  docs: {
    description: {
      story: "An input field in an error state.",
    },
  },
};
ErrorState.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-error");

  // Visual checks
  await expect(input).toBeVisible();
  await expect(input).toHaveClass("border-red-500");

  // Interaction tests
  await userEvent.type(input, "invalid-email");
  await userEvent.tab(); // Trigger blur
};

// Test custom styling
export const WithCustomClasses = FormikTemplate.bind({});
WithCustomClasses.args = {
  label: "Custom Styled Input",
  placeholder: "Type here...",
  name: "custom-input",
  wrapperClassName: "bg-gray-50 p-4 rounded-lg",
  labelClassName: "text-blue-600 uppercase",
  className: "border-2 border-blue-300 focus:border-blue-500",
  "data-testid": "custom-input",
};
WithCustomClasses.parameters = {
  docs: {
    description: {
      story:
        "An input field with custom styling applied through className props.",
    },
  },
};
WithCustomClasses.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("custom-input");
  const label = canvas.getByText("Custom Styled Input");

  // Style checks
  await expect(label).toHaveClass("text-blue-600", "uppercase");
  await expect(input).toHaveClass("border-2", "border-blue-300");

  // Interaction tests
  await userEvent.type(input, "Custom styled text");
  await expect(input).toHaveValue("Custom styled text");
};

// Example of a controlled input with clear button
export const WithIconButton: StoryFn<IInputComponentType> = () => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <Formik
        initialValues={{ "input-with-icon": "" }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Input
            name="input-with-icon"
            placeholder="Type and clear..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pr-10"
            data-testid="input-with-icon"
          />

          <Button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            data-testid="clear-button"
            aria-label="Clear input"
          >
            <SvgIcon name="CrossIcon" className="h-4 w-4" />
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

WithIconButton.parameters = {
  docs: {
    description: {
      story:
        "An input field with a clear button that appears when text is entered.",
    },
  },
};

WithIconButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Get elements
  const input = canvas.getByTestId("input-with-icon") as HTMLInputElement;
  const clearButton = canvas.getByTestId("clear-button");

  // Initial state checks
  await expect(input).toBeVisible();
  await expect(clearButton).toBeVisible();
  await expect(input.value).toBe("");

  // Test input functionality
  await userEvent.type(input, "Hello World");
  await expect(input.value).toBe("Hello World");

  // Test clear button functionality
  await userEvent.click(clearButton);
  await expect(input.value).toBe("");

  // Test input positioning and styling
  await expect(input).toHaveClass("pr-10");

  // Test button positioning
  const buttonStyles = window.getComputedStyle(clearButton);
  await expect(buttonStyles.position).toBe("absolute");
  await expect(buttonStyles.right).toBe("8px"); // 2 * 4px (right-2)

  // Test multiple interactions
  await userEvent.type(input, "Test text");
  await expect(input.value).toBe("Test text");
  await userEvent.click(clearButton);
  await expect(input.value).toBe("");

  // Test rapid interactions
  await userEvent.type(input, "Quick test");
  await userEvent.click(clearButton);
  await userEvent.type(input, "Another test");
  await expect(input.value).toBe("Another test");

  // Test focus management
  await userEvent.click(input);
  // Wait a bit for focus to settle
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Verify input can receive focus
  await expect(input.matches(":focus")).toBe(true);

  // Clear and check focus remains or returns to input
  await userEvent.click(clearButton);
  await new Promise((resolve) => setTimeout(resolve, 100));
  await userEvent.click(input);
  await expect(input.matches(":focus")).toBe(true);
};

// Test validation
export const WithValidation: StoryFn<IInputComponentType> = () => (
  <Formik
    initialValues={{ email: "" }}
    validate={(values) => {
      const errors: { email?: string } = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    }}
    onSubmit={(values) => console.log(values)}
  >
    <Form className="space-y-4">
      <Input
        label="Email"
        name="email"
        placeholder="Enter your email"
        displayError={true}
        data-testid="input-with-validation"
      />
    </Form>
  </Formik>
);
WithValidation.parameters = {
  docs: {
    description: {
      story: "An input field with form validation using Formik.",
    },
  },
};
WithValidation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-with-validation");

  // Test empty validation
  await userEvent.click(input);
  await userEvent.tab(); // Trigger blur
  let errorMessage = await canvas.findByRole("alert");
  await expect(errorMessage).toHaveTextContent("Required");

  // Test invalid email
  await userEvent.type(input, "invalid-email");
  await userEvent.tab(); // Trigger blur
  errorMessage = await canvas.findByRole("alert");
  await expect(errorMessage).toHaveTextContent("Invalid email address");

  // Test valid email
  await userEvent.clear(input);
  await userEvent.type(input, "test@example.com");
  await userEvent.tab(); // Trigger blur
  await expect(canvas.queryByRole("alert")).toBeNull();
};

// Example of input without Formik
export const WithoutFormik: StoryFn<IInputComponentType> = () => {
  const [value, setValue] = useState<any>("");

  return (
    <Input
      type="text"
      label="Regular Input"
      name="regular-input"
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      placeholder="Type here..."
      data-testid="input-without-formik"
      formik={false}
    />
  );
};

WithoutFormik.parameters = {
  docs: {
    description: {
      story: "An input field used without Formik integration.",
    },
  },
};

// Add play function to test the non-Formik functionality
WithoutFormik.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-without-formik");

  // Test basic functionality
  await expect(input).toBeVisible();
  await userEvent.type(input, "Hello World");
  await expect(input).toHaveValue("Hello World");

  // Test label
  const label = canvas.getByText("Regular Input");
  await expect(label).toBeVisible();
};

// Add this new story
export const WithAutoSuggestion = FormikTemplate.bind({});
WithAutoSuggestion.args = {
  label: "Search Countries",
  placeholder: "Type to search...",
  name: "country-search",
  autoSuggestion: true,
  suggestions: [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
  ],
  "data-testid": "input-with-suggestions",
};

WithAutoSuggestion.parameters = {
  docs: {
    description: {
      story: "An input field with autosuggestion functionality.",
    },
  },
};

WithAutoSuggestion.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByTestId("input-with-suggestions");

  // Visual checks
  await expect(input).toBeVisible();

  // Test suggestions visibility
  await userEvent.type(input, "United");
  const suggestions = canvas.getAllByText(/United/);
  await expect(suggestions.length).toBeGreaterThan(0);
};
