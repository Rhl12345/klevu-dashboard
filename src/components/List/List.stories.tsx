import List from './List';
import { StoryFn, Meta } from '@storybook/react';
import ListSourceCode from '!!raw-loader!./List';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iListProps } from './types';

export default {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['ul', 'ol'],
      description: 'Defines the type of the list.',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional class names for customization.',
    },
    items: {
      control: { type: 'object' },
      description: 'The list items as an array of strings.',
    },
  },
} as Meta<iListProps>;

const Template: StoryFn<iListProps> = (args) => <List {...args} />;

export const Bulleted = Template.bind({});
Bulleted.args = {
  type: 'ul',
  className: 'list-disc',
  items: ['Yellow shirt', 'Red shirt', 'Green shirt'],
};

export const Numbered = Template.bind({});
Numbered.args = {
  type: 'ol',
  className: 'list-decimal',
  items: ['Yellow shirt', 'Red shirt', 'Green shirt'],
};

export const ExtraTight = Template.bind({});
ExtraTight.args = {
  type: 'ul',
  className: 'list-disc leading-none',
  items: ['Yellow shirt', 'Red shirt', 'Green shirt'],
};

export const SourceCode = CreateSourceCodeStory(ListSourceCode);
