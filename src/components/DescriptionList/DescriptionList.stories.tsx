import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import DescriptionList from './DescriptionList';
import DescriptionListSourceCode from '!!raw-loader!./DescriptionList';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iDescriptionListProps } from './types';

const meta = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'select' },
      options: ['tight', 'loose'],
      description: 'Controls the vertical spacing between list items.',
    },
    items: {
      control: { type: 'object' },
      description: 'Array of items to be displayed in the description list.',
    },
  },
} satisfies Meta<typeof DescriptionList>;
export default meta;

const Template: StoryFn<iDescriptionListProps> = (args) => (
  <DescriptionList {...args} />
);

export const Default: StoryObj<iDescriptionListProps> = {
  render: Template,
  args: {
    gap: 'loose',
    items: [
      {
        id: 1,
        term: 'Logistics',
        description:
          'The management of products or other resources as they travel between a point of origin and a destination.',
      },
      {
        id: 2,
        term: 'Sole proprietorship',
        description:
          'A business structure where a single individual both owns and runs the company.',
      },
      {
        id: 3,
        term: 'Discount code',
        description:
          'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
      },
    ],
  },
};

export const Tight: StoryObj<iDescriptionListProps> = {
  render: Template,
  args: {
    gap: 'tight',
    items: [
      {
        id: 1,
        term: 'Inventory',
        description:
          'The goods or materials a business intends to sell to customers for profit.',
      },
      {
        id: 2,
        term: 'Net profit',
        description:
          'The amount of money left over after all expenses have been deducted from revenue.',
      },
      {
        id: 3,
        term: 'ROI',
        description:
          'Return on investment: a measure used to evaluate the efficiency of an investment.',
      },
    ],
  },
};

export const SourceCode = CreateSourceCodeStory(DescriptionListSourceCode);
