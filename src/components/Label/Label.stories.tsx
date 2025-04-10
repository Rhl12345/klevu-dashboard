import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Label } from './Label';
import { within, userEvent } from '@storybook/test';
import LabelSourceCode from '!!raw-loader!./Label';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { LabelProps } from './type';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      defaultValue: 'Label Text',
      description: 'Text content to be displayed in the label.',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form control.',
    },
    required: {
      control: 'boolean',
      defaultValue: false,
      description: 'Indicates if the associated form field is required.',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description:
        'Specifies if the label should be displayed in a disabled state.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Defines the size of the label text.',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class to override the default label styles.',
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the label element.',
    },
  },
} satisfies Meta<LabelProps>;

export default meta;

type Story = StoryFn<typeof Label>;

export const Default: Story = (args) => <Label {...args} />;
Default.args = {
  children: 'Label Text',
};

export const Sizes: Story = () => (
  <div className="flex flex-col gap-4">
    <Label size="small">Small Label</Label>
    <Label size="medium">Medium Label</Label>
    <Label size="large">Large Label</Label>
  </div>
);

export const Required: Story = () => (
  <div className="flex flex-col gap-4">
    <Label required>Required Label</Label>
    <Label>Optional Label</Label>
  </div>
);

export const Disabled: Story = () => (
  <div className="flex flex-col gap-4">
    <Label disabled>Disabled Label</Label>
    <Label>Enabled Label</Label>
  </div>
);

export const WithInput: Story = () => (
  <div className="flex flex-col gap-2">
    <Label htmlFor="example-input">Email Address</Label>
    <input
      id="example-input"
      type="email"
      className="border rounded px-3 py-2"
      placeholder="Enter your email"
    />
  </div>
);

// Interactive tests
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const label = canvas.getByText('Label Text');
  await userEvent.hover(label);
};

Sizes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByText('Small Label');
  canvas.getByText('Medium Label');
  canvas.getByText('Large Label');
};

Required.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByText('Required Label');
  canvas.getByText('Optional Label');
};

Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByText('Disabled Label');
  canvas.getByText('Enabled Label');
};

WithInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const label = canvas.getByText('Email Address');
  const input = canvas.getByPlaceholderText('Enter your email');
  await userEvent.click(label);
  await userEvent.type(input, 'test@example.com');
};

export const SourceCode = CreateSourceCodeStory(LabelSourceCode);
