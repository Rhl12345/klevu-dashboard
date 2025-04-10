import React from 'react';
import Badge from './Badge';
import { Meta, StoryFn } from '@storybook/react';
import BadgeSourceCode from '!!raw-loader!./Badge';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iBadgeProps } from './types';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description:
        'Defines the size of the badge. Options include small, medium, and large.',
    },
    variant: {
      control: { type: 'select' },
      options: ['red', 'green', 'blue'],
      description:
        'Specifies the color variant of the badge. Options include red, green, and blue.',
    },
    className: {
      control: { type: 'text' },
      description:
        'Allows passing custom CSS classes to override default styles.',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to be displayed inside the badge.',
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;

const Template: StoryFn<iBadgeProps> = (args) => <Badge {...args} />;

export const RedBadge = Template.bind({});
RedBadge.args = {
  size: 'medium',
  variant: 'red',
  children: 'Red Badge',
};

export const GreenBadge = Template.bind({});
GreenBadge.args = {
  size: 'medium',
  variant: 'green',
  children: 'Green Badge',
};

export const BlueBadge = Template.bind({});
BlueBadge.args = {
  size: 'medium',
  variant: 'blue',
  children: 'Blue Badge',
};

export const CustomBadge = Template.bind({});
CustomBadge.args = {
  size: 'large',
  variant: 'red',
  className: 'shadow-lg text-yellow-200',
  children: 'Custom Styled Badge',
};

export const SourceCode = CreateSourceCodeStory(BadgeSourceCode);
