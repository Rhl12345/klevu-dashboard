import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';
import RadioGroupSourceCode from '!!raw-loader!./RadioGroup';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iRadioGroupProps } from './types';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the radio button.',
    },
    description: {
      control: 'text',
      description: 'Additional descriptive text for the radio button.',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom CSS class for the parent wrapper div.',
    },
    labelDescriptionWrapperClassName: {
      control: 'text',
      description: 'Custom CSS class for the wrapper of label and description.',
    },
    labelClassName: {
      control: 'text',
      description: 'Custom CSS class for the label.',
    },
    descriptionClassName: {
      control: 'text',
      description: 'Custom CSS class for the description.',
    },
    radioClassName: {
      control: 'text',
      description: 'Custom CSS class for the radio input.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<iRadioGroupProps> = (args) => <RadioGroup {...args} />;

export const Default: Story = Template.bind({});
Default.args = {
  label: 'Email',
  description: 'Get notified via email.',
  wrapperClassName: 'items-center',
};

export const ListWithDescription: StoryFn = () => (
  <div className="space-y-4">
    <RadioGroup
      label="Small"
      description="4 GB RAM / 2 CPUs / 80 GB SSD Storage"
      name="plan"
      wrapperClassName="items-center"
    />
    <RadioGroup
      label="Medium"
      description="8 GB RAM / 4 CPUs / 160 GB SSD Storage"
      name="plan"
      wrapperClassName="items-center"
    />
    <RadioGroup
      label="Large"
      description="16 GB RAM / 8 CPUs / 320 GB SSD Storage"
      name="plan"
      wrapperClassName="items-center"
    />
  </div>
);

export const InlineList: StoryFn = () => (
  <div className="flex space-x-10">
    <RadioGroup
      label="Email"
      name="notification"
      wrapperClassName="items-center"
    />
    <RadioGroup
      label="SMS"
      name="notification"
      wrapperClassName="items-center"
    />
    <RadioGroup
      label="Push Notification"
      name="notification"
      wrapperClassName="items-center"
    />
  </div>
);

export const ListWithRadioOnRight: StoryFn = () => (
  <div className="space-y-5">
    <RadioGroup
      label="Checking"
      description="CIBC ••••6610"
      name="account"
      wrapperClassName="flex-row-reverse justify-between items-center"
    />
    <RadioGroup
      label="Savings"
      description="Bank of America ••••0149"
      name="account"
      wrapperClassName="flex-row-reverse justify-between items-center"
    />
    <RadioGroup
      label="Mastercard"
      description="Capital One ••••7877"
      name="account"
      wrapperClassName="flex-row-reverse justify-between items-center"
    />
  </div>
);

export const SourceCode = CreateSourceCodeStory(RadioGroupSourceCode);
