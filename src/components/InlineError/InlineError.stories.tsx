import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import InlineError from "./InlineError";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import InlineErrorSourceCode from "!!raw-loader!./InlineError";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { iInlineErrorProps } from "./types";

export default {
  title: "Components/InlineError",
  component: InlineError,
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: { type: "text" },
      description: "The error message to display",
    },
    icon: {
      control: false,
      description: "Optional icon to display alongside the error message",
    },
    className: {
      control: { type: "text" },
      description: "Additional class names for the container",
    },
  },
} as Meta<iInlineErrorProps>;

const Template: StoryFn<iInlineErrorProps> = (args) => (
  <InlineError {...args} />
);

export const Default = Template.bind({});
Default.args = {
  message: "Store name is required",
  icon: <SvgIcon name="CircleInfo" fill="#e11d48" />,
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  message: "This field is required",
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  message: "Invalid input provided",
  icon: <SvgIcon name="Exclamation" fill="#ef4444" />,
  className: "text-red-500 bg-red-50 p-2 gap-x-0 rounded-md",
};

export const SourceCode = CreateSourceCodeStory(InlineErrorSourceCode);
