import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Avatar from "./Avatar";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import AvatarSourceCode from "!!raw-loader!./Avatar";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { iAvatarComponentProps } from "./types";

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "file",
      description: "URL for the avatar image.",
    },
    icon: {
      control: false,
      description: "Optional icon as a JSX element.",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "Xlarge"],
      description: "Size of the avatar.",
    },
    rounded: {
      control: { type: "select" },
      options: ["Default", "Full", "None"],
      description: "Rounding style of the avatar.",
    },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<iAvatarComponentProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  rounded: "Default",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  rounded: "Default",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  rounded: "Default",
};

export const Rounded = Template.bind({});
Rounded.args = {
  size: "medium",
  rounded: "Full",
};

export const Square = Template.bind({});
Square.args = {
  size: "medium",
  rounded: "None",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: "medium",
  rounded: "Full",
  icon: <SvgIcon name="Avatar" />,
};

export const SourceCode = CreateSourceCodeStory(AvatarSourceCode);
