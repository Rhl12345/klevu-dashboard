import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Listbox from './Listbox';
import SvgIcon from '../SvgIcons/SvgIcon';
import Input from '../Input/Input';
import ListBoxSourceCode from '!!raw-loader!./Listbox';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iListboxProps } from './types';
import { Form, Formik } from 'formik';

export default {
  title: 'Components/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'object' }, description: 'Array of list items' },
    containerClassName: {
      control: { type: 'text' },
      description: 'Class names for the outermost container',
    },
    searchContainerClassName: {
      control: { type: 'text' },
      description: 'Class names for the search container',
    },
    listClassName: {
      control: { type: 'text' },
      description: 'Class names for the `<ul>` element',
    },
    scrollable: {
      control: { type: 'boolean' },
      description: 'Makes the list scrollable with a max height',
    },
    searchComponent: {
      control: false,
      description: 'Custom component to render as a search bar above the list',
    },
  },
} as Meta<iListboxProps>;

const Template: StoryFn<iListboxProps> = (args) => <Listbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { content: 'Item 1', itemClassName: 'bg-gray-300' },
    { content: 'Item 2' },
    { content: 'Item 3' },
  ],
  containerClassName: 'shadow-lg',
};

export const WithAction = Template.bind({});
WithAction.args = {
  items: [
    { content: 'Item 1', itemClassName: 'bg-gray-300' },
    { content: 'Item 2' },
    {
      content: 'Add item',
      itemClassName: 'px-2',
      action: <SvgIcon name="PlusIconWithRoundedCircle" />,
    },
  ],
  containerClassName: 'shadow-md',
};

export const WithCustomElement = Template.bind({});
WithCustomElement.args = {
  items: [
    {
      content: (
        <div className="flex items-center justify-between">
          <span className="">All Customers</span>
          <span className="flex flex-wrap items-center gap-x-2">
            <span>23 Subscribers</span>
            <span>
              <SvgIcon name="SuccessCheckmark" />
            </span>
          </span>
        </div>
      ),
      itemClassName:
        'px-3 py-1.5 rounded-md flex flex-wrap items-center gap-x-2 cursor-pointer justify-between bg-gray-300',
    },
    {
      content: (
        <div className="flex items-center justify-between">
          <span className="">VIP Customers</span>
          <span className="flex flex-wrap items-center gap-x-2">
            <span>16 Subscribers</span>
            <span className="hidden">
              <SvgIcon name="SuccessCheckmark" />
            </span>
          </span>
        </div>
      ),
      itemClassName:
        'px-3 py-1.5 rounded-md flex flex-wrap items-center gap-x-2 cursor-pointer justify-between',
    },
    {
      content: (
        <div className="flex items-center justify-between">
          <span className="">New Customers</span>
          <span className="flex flex-wrap items-center gap-x-2">
            <span>2 Subscribers</span>
            <span className="hidden">
              <SvgIcon name="SuccessCheckmark" />
            </span>
          </span>
        </div>
      ),
      itemClassName:
        'px-3 py-1.5 rounded-md flex flex-wrap items-center gap-x-2 cursor-pointer justify-between',
    },
    {
      content: (
        <div className="flex items-center justify-between">
          <span className="">Abandoned carts - last 30 days</span>
          <span className="flex flex-wrap items-center gap-x-2">
            <span>108 Subscribers</span>
            <span className="hidden">
              <SvgIcon name="SuccessCheckmark" />
            </span>
          </span>
        </div>
      ),
      itemClassName:
        'px-3 py-1.5 rounded-md flex flex-wrap items-center gap-x-2 cursor-pointer justify-between',
    },
  ],
  listClassName: 'bg-white border',
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  items: [
    { content: 'All Customers', itemClassName: 'bg-gray-300' },
    { content: 'VIP Customers' },
    { content: 'New Customers' },
  ],
  searchComponent: (
    <Formik
      initialValues={{ ['search-input']: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input
          type="text"
          name="search-input"
          placeholder="Search..."
          className="py-2 px-4"
        />
      </Form>
    </Formik>
  ),
  searchContainerClassName: 'bg-gray-50',
  listClassName: 'bg-gray-200',
  scrollable: true,
};

export const WithDisabledOption = Template.bind({});
WithDisabledOption.args = {
  items: [
    { content: 'Item 1', itemClassName: 'bg-gray-300' },
    { content: 'Item 2', disabled: true },
    { content: 'Item 3' },
  ],
  listClassName: 'bg-gray-50',
};

export const SourceCode = CreateSourceCodeStory(ListBoxSourceCode);
