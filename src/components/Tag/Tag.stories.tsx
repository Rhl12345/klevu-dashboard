import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tag from './Tag';
import { CreateSourceCodeStory } from '@/utils/helpers';
import TagSourceCode from '!!raw-loader!./Tag';
import { iTagProps } from './types';

export default {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
      defaultValue: 'base',
      description: 'Size of the Tag',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      defaultValue: 'left',
      description: 'Alignment of the Tag',
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Default Tag',
      description: 'Content of the Tag',
    },
    className: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'Custom class for the Tag',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Whether the Tag is disabled',
    },
    removable: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Whether the Tag is removable',
    },
    link: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'Optional link for the Tag',
    },
  },
} as Meta<iTagProps>;

const Template: StoryFn<iTagProps> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Tag',
  className: 'bg-gray-200',
};

export const WithLink = Template.bind({});
WithLink.args = {
  children: 'Tag with Link',
  link: 'https://storybook.js.org/showcase',
  className: 'bg-gray-200',
};

export const Removable = Template.bind({});
Removable.args = {
  children: 'Removable Tag',
  removable: true,
  onRemove: () => alert('Tag removed!'),
  className: 'bg-gray-200',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Tag',
  disabled: true,
  className: 'bg-gray-200',
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  children: 'Custom Styled Tag',
  className: 'bg-blue-500 text-white hover:bg-blue-600',
};

export const AllVariants = () => (
  <div className="space-y-2 space-x-2">
    <Tag className="bg-gray-200">Default</Tag>
    <Tag className="bg-gray-200" removable>
      Removable
    </Tag>
    <Tag className="bg-gray-200" disabled>
      Disabled
    </Tag>
    <Tag
      className="bg-gray-200"
      removable
      link="https://storybook.js.org/showcase"
    >
      Link with Remove
    </Tag>
    <Tag className="bg-blue-500 text-white hover:bg-blue-600">
      Custom Styled
    </Tag>
  </div>
);

export const SourceCode = CreateSourceCodeStory(TagSourceCode);
