import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Collapsible from "./Collapsible";
import Button from "@/components/Button/Button";
import CollapsibleSourceCode from "!!raw-loader!./Collapsible";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { iCollapsibleProps } from "./types";

export default {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      control: false,
      description: "ReactNode to render as the dropdown trigger.",
    },
    children: {
      control: false,
      description: "Content to display inside the dropdown.",
    },
    className: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the outer wrapper.",
    },
    triggerClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the trigger button.",
    },
    contentClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the dropdown content.",
    },
  },
} as Meta<iCollapsibleProps>;

const Template: StoryFn = (args) => <Collapsible {...args}></Collapsible>;

export const Default = Template.bind({});
Default.args = {
  trigger: (
    <Button className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
      Open Dropdown
    </Button>
  ),
  children: (
    <div className="text-sm mt-2">
      <p className="text-sm">
        This is a basic dropdown example. Customize the trigger and content as
        needed!
      </p>
    </div>
  ),
};

export const DropdownMenu = Template.bind({});
DropdownMenu.args = {
  trigger: (
    <Button className="px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-800">
      Actions
    </Button>
  ),
  className: "relative",
  children: (
    <div className="bg-white border border-gray-300 rounded-md w-40 divide-y divide-gray-200 shadow-lg hover:cursor-pointer">
      <a className="block px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100">
        Edit
      </a>
      <a className="block px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100">
        Clone
      </a>
      <a className="block px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100">
        Delete
      </a>
    </div>
  ),
  contentClassName: "absolute top-10",
};

export const Inline = Template.bind({});
Inline.args = {
  trigger: (
    <Button className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">
      More Info
    </Button>
  ),
  className: "relative",
  children: (
    <div className="bg-white border border-gray-300 rounded-md p-4 shadow-md">
      <p className="text-sm">
        Inline dropdown with flexible layout options. Adjust spacing and styling
        as needed.
      </p>
    </div>
  ),
  contentClassName: "absolute top-0 left-24",
};

export const WithCustomStyling = Template.bind({});
WithCustomStyling.args = {
  trigger: (
    <Button className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">
      View Details
    </Button>
  ),
  className: "relative",
  children: (
    <div className="bg-gray-50 border border-red-400 text-red-700 rounded-md p-4 shadow-md">
      <p className="text-sm">This dropdown has custom styles applied.</p>
    </div>
  ),
  contentClassName: "absolute top-full mt-2 left-0 transition-all delay-500",
};

export const SourceCode = CreateSourceCodeStory(CollapsibleSourceCode);
