import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Text from './Text';
import TextSourceCode from '!!raw-loader!./Text';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iTextProps } from './types';

export default {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
      },
      description: 'The size of the text',
    },
    align: {
      control: { type: 'select', options: ['left', 'center', 'right'] },
      description: 'The alignment of the text',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the text',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional class names for custom styling',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the text is disabled',
    },
  },
} as Meta<iTextProps>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'base',
  align: 'left',
  children: 'Default Text',
};

export const WithAlignment: StoryFn = () => (
  <div className="space-y-4">
    <Text align="left">Left Aligned Text</Text>
    <Text align="center">Center Aligned Text</Text>
    <Text align="right">Right Aligned Text</Text>
  </div>
);

export const WithSizes: StoryFn = () => (
  <div className="space-y-2">
    <Text size="xs">Extra Small Text</Text>
    <Text size="sm">Small Text</Text>
    <Text size="base">Base Text</Text>
    <Text size="lg">Large Text</Text>
    <Text size="xl">Extra Large Text</Text>
    <Text size="2xl">2X Large Text</Text>
    <Text size="3xl">3X Large Text</Text>
  </div>
);

export const WithTitle: StoryFn = () => (
  <Text size="3xl" align="center" className="font-bold">
    Title: Welcome to Storybook
  </Text>
);

export const WithSubtitle: StoryFn = () => (
  <Text size="xl" align="center" className="text-gray-600">
    Subtitle: This is a subtitle component
  </Text>
);

export const WithDescription: StoryFn = () => (
  <Text size="base" align="left" className="text-gray-500">
    Description: This is a paragraph component used for descriptions in your
    app. It provides detailed information and supports full customization.
  </Text>
);

export const SourceCode = CreateSourceCodeStory(TextSourceCode);
