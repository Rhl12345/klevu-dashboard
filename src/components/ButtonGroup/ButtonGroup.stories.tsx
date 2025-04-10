import ButtonGroup from "./ButtonGroup";
import Button from "@/components/Button/Button";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ButtonGroupSource from "!!raw-loader!./ButtonGroup";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { iButtonGroupProps } from "./types";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description:
        "Custom CSS class to override the default button group styles.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "with-gap"],
      description: "Defines the ButtonGroup layout variant.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate: StoryFn<iButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Years
    </Button>
    <Button className="relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Months
    </Button>
    <Button className="relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Days
    </Button>
  </ButtonGroup>
);

export const Default: Story = DefaultTemplate.bind({});
Default.args = {
  variant: "default",
};

const WithGapsTemplate: StoryFn<iButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button className="relative inline-flex items-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Years
    </Button>
    <Button className="relative inline-flex items-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Months
    </Button>
    <Button className="relative inline-flex items-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Days
    </Button>
  </ButtonGroup>
);

export const WithGaps: Story = WithGapsTemplate.bind({});
WithGaps.args = {
  variant: "with-gap",
};

export const IconOnlyButtonGroup: StoryFn = () => (
  <ButtonGroup variant="default">
    <Button className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      <span className="sr-only">Previous</span>
      <SvgIcon name="ArrowLeft" />
    </Button>
    <Button className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      <span className="sr-only">Next</span>
      <SvgIcon name="ArrowRight" />
    </Button>
  </ButtonGroup>
);

export const StatButtonGroup: StoryFn = () => (
  <ButtonGroup variant="default">
    <Button className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      <SvgIcon name="Bookmark" />
      Bookmark
    </Button>
    <Button className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      12k
    </Button>
  </ButtonGroup>
);

export const SourceCode = CreateSourceCodeStory(ButtonGroupSource);
