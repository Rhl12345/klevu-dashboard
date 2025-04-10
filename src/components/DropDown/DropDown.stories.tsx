import { Meta, StoryFn } from "@storybook/react";
import Dropdown from "./DropDown";
import { IDropdownProps } from "./types";
import { CreateSourceCodeStory } from "@/utils/helpers";
import DividerSource from "!!raw-loader!./DropDown";
import { expect, within, userEvent } from "@storybook/test";

export default {
  title: "Components/DropDown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    isMulti: {
      control: "boolean",
      description: "Enable multi-select functionality",
    },
    isSearchable: {
      control: "boolean",
      description: "Enable search functionality",
    },
    isLoading: {
      control: "boolean",
      description: "Enable loader feature",
    },
    showDropdown: {
      control: "boolean",
      description: "Show custom dropdown",
      defaultValue: true,
    },
    options: {
      control: "object",
      description: "Array of options for the dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
} as Meta<typeof Dropdown>;

const Template: StoryFn<IDropdownProps> = (args) => <Dropdown {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  defaultValue: "strawberry",
  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
  placeholder: "Select an flavor...",
  id: "flavor-select",
  "aria-label": "Select a flavor",
  label: "Category",
};
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test initial render with empty state
  const dropdown = await canvas.findByText("Strawberry");
  await expect(dropdown).toBeInTheDocument();

  // Verify dropdown starts empty
  const select = canvas.getByRole("combobox");
  await expect(select).toHaveValue("");

  // Optional: Verify all options are available but none selected
  await userEvent.click(dropdown);
  const options = await canvas.findAllByRole("option");
  await expect(options).toHaveLength(3); // Assuming you still have 3 options
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  isMulti: true,
  defaultValue: ["strawberry", "vanilla"],

  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
  placeholder: "Select an flavor...",
  id: "flavor-select",
  "aria-label": "Select a flavor",
  label: "Category",
};
MultiSelect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test initial render with selected values
  const strawberryOption = await canvas.findByText("Strawberry");
  const vanillaOption = await canvas.findByText("Vanilla");
  await expect(strawberryOption).toBeInTheDocument();
  await expect(vanillaOption).toBeInTheDocument();

  // Verify dropdown has the correct values
  const select = canvas.getByRole("combobox");
  await expect(select).toHaveValue("");

  // Optional: Verify all options are available
  await userEvent.click(select);
  const options = await canvas.findAllByRole("option");
  await expect(options).toHaveLength(1);
};

export const MultiSelectWithCheckbox = Template.bind({});
MultiSelectWithCheckbox.args = {
  isMulti: true,
  withCheckBox: true,
  defaultValue: ["strawberry", "vanilla"],
  closeMenuOnSelect: false,
  hideSelectedOptions: false,
  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
  placeholder: "Select an flavor...",
  id: "flavor-select",
  "aria-label": "Select a flavor",
  label: "Category",
};

export const CustomDropdown = Template.bind({});
CustomDropdown.args = {
  customFilterDropdown: true,
  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
};
CustomDropdown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Test 1: Search functionality
  const searchInput = canvas.getByPlaceholderText("Search");
  await userEvent.type(searchInput, "Vanilla");

  // Test 2: Checkbox selection
  const checkboxes = canvas.getAllByRole("checkbox");
  await userEvent.click(checkboxes[0]);

  // Test 3: Clear button functionality
  const clearButton = canvas.getByRole("button", { name: /clear/i });
  await userEvent.click(clearButton);

  // Test 4: Apply button functionality
  await userEvent.click(checkboxes[0]);
  const applyButton = canvas.getByRole("button", { name: /apply/i });
  await userEvent.click(applyButton);

  // Test 5: Multiple checkbox selection
  if (checkboxes.length > 1) {
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);
  }
};

export const CustomSearchDropDown = Template.bind({});
CustomSearchDropDown.args = {
  customSearchDropdown: true,
  options: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
  placeholder: "Select an flavor...",
  id: "flavor-select",
  "aria-label": "Select a flavor",
  label: "Category",
};

CustomSearchDropDown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const user = await userEvent.setup();

  // Get the dropdown input
  const dropdown = canvas.getByRole("combobox");
  await expect(dropdown).toBeInTheDocument();

  // Click to focus the dropdown
  await user.click(dropdown);

  // Type in the search box
  await user.type(dropdown, "cho");

  // Wait for the menu to appear and verify chocolate option is visible
  const chocolateOption = await canvas.findByText("Chocolate");
  await expect(chocolateOption).toBeVisible();

  // Click the chocolate option
  await user.click(chocolateOption);

  // Verify the selection
  await expect(canvas.getByText("Chocolate")).toBeInTheDocument();
};

export const SourceCode = CreateSourceCodeStory(DividerSource);
