import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Grid from "@/components/Grid/Grid";
import GridSourceCode from "!!raw-loader!./Grid";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { IGridProps } from "@/components/Grid/types";
import { expect, within } from "@storybook/test";

export default {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      defaultValue: "",
      description: "Additional custom classes for the grid container",
    },
  },
} as Meta<IGridProps>;

const Template: StoryFn = (args) => (
  <Grid {...args}>
    <div className="border border-gray-300 p-4 text-center">Item 1</div>
    <div className="border border-gray-300 p-4 text-center">Item 2</div>
    <div className="border border-gray-300 p-4 text-center">Item 3</div>
    <div className="border border-gray-300 p-4 text-center">Item 4</div>
    <div className="border border-gray-300 p-4 text-center">Item 5</div>
    <div className="border border-gray-300 p-4 text-center">Item 6</div>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  className: "flex flex-col gap-4",
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Structure Tests
  const grid = canvas.getByRole("grid");

  // Test 1: Basic Structure
  await expect(grid).toBeInTheDocument();
  await expect(grid).toHaveAttribute("aria-label", "Content Grid");

  // Test 3: Grid Container
  await expect(grid).toHaveClass("flex flex-col gap-4");
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
};
TwoColumns.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Structure Tests
  const grid = canvas.getByRole("grid");

  // Test 1: Basic Structure
  await expect(grid).toBeInTheDocument();
  await expect(grid).toHaveAttribute("aria-label", "Content Grid");
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
};
ThreeColumns.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Structure Tests
  const grid = canvas.getByRole("grid");

  // Test 1: Basic Structure
  await expect(grid).toBeInTheDocument();
  await expect(grid).toHaveAttribute("aria-label", "Content Grid");
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  className: "grid grid-cols-1 lg:grid-cols-4 gap-4",
};
FourColumns.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Structure Tests
  const grid = canvas.getByRole("grid");

  // Test 1: Basic Structure
  await expect(grid).toBeInTheDocument();
  await expect(grid).toHaveAttribute("aria-label", "Content Grid");
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  className:
    "bg-gray-100 p-5 rounded-lg shadow grid grid-cols-1 lg:grid-cols-3 gap-4",
};
CustomStyling.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Structure Tests
  const grid = canvas.getByRole("grid");

  // Test 1: Basic Structure
  await expect(grid).toBeInTheDocument();

  // Test 3: Custom Styling
  await expect(grid).toHaveClass(
    "bg-gray-100 p-5 rounded-lg shadow grid grid-cols-1 lg:grid-cols-3 gap-4"
  );
};

export const SourceCode = CreateSourceCodeStory(GridSourceCode);
