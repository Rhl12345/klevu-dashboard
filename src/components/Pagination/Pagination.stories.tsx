import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Pagination from "@/components/Pagination/Pagination";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import PaginationSourceCode from "!!raw-loader!./Pagination";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { IPaginationProps } from "@/components/Pagination/types";

export default {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    leftIcon: {
      control: false,
      description: "Custom left icon for the previous button",
    },
    rightIcon: {
      control: false,
      description: "Custom right icon for the next button",
    },
    children: {
      control: false,
      description: "Custom content displayed between the buttons",
    },
    className: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the pagination container",
    },
    prevButtonClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the previous button",
    },
    nextButtonClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the next button",
    },
    onPreviousClick: {
      action: "Previous button clicked",
      description: "Callback for the previous button click event",
    },
    onNextClick: {
      action: "Next button clicked",
      description: "Callback for the next button click event",
    },
    isPrevButtonDisabled: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Disables the previous button if true",
    },
    isNextButtonDisabled: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Disables the next button if true",
    },
  },
} as Meta<IPaginationProps>;

const Template: StoryFn<IPaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftIcon: <SvgIcon name="ArrowLeft" />,
  rightIcon: <SvgIcon name="ArrowRight" />,
  prevButtonClassName:
    "relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  nextButtonClassName:
    "relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  leftIcon: <SvgIcon name="ArrowLeft" />,
  rightIcon: <SvgIcon name="ArrowRight" />,
  children: <div className="text-sm">Results</div>,
  className: "gap-4",
  prevButtonClassName:
    "relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  nextButtonClassName:
    "relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

export const WithTableType = Template.bind({});
WithTableType.args = {
  leftIcon: <SvgIcon name="ArrowLeft" />,
  rightIcon: <SvgIcon name="ArrowRight" />,
  className: "bg-gray-200 w-96 p-5 gap-4 rounded-md justify-center",
  children: <div className="text-sm">1-50 of 8,450 orders</div>,
  prevButtonClassName:
    "relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  nextButtonClassName:
    "relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

export const WithTableTypeNoLabel = Template.bind({});
WithTableTypeNoLabel.args = {
  leftIcon: <SvgIcon name="ArrowLeft" />,
  rightIcon: <SvgIcon name="ArrowRight" />,
  className: "justify-center",
  prevButtonClassName:
    "relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
  nextButtonClassName:
    "relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

export const SourceCode = CreateSourceCodeStory(PaginationSourceCode);
