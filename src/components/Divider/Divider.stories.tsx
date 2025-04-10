import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Divider from './Divider';
import DividerSource from '!!raw-loader!./Divider';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iDividerProps } from './types';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Optional text displayed in the middle of the divider.',
    },
  },
} as Meta<iDividerProps>;

const Template: StoryFn<typeof Divider> = (args) => <Divider {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Section Title',
};
Default.parameters = {
  docs: {
    description: {
      story: 'A divider with optional text displayed in the center.',
    },
  },
};

export const WithoutText = Template.bind({});
WithoutText.args = {};
WithoutText.parameters = {
  docs: {
    description: {
      story: 'A simple divider without any text.',
    },
  },
};

export const SourceCode = CreateSourceCodeStory(DividerSource);
