import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import OptionListSourceCode from '!!raw-loader!./OptionList';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iOptionListProps } from './types';
import OptionList from './OptionList';

const meta: Meta<typeof OptionList> = {
  title: 'Components/OptionList',
  component: OptionList,
  tags: ['autodocs'],
  argTypes: {
    itemsArray: {
      control: 'object',
      description: 'Array containing Option List items.',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom CSS class for the parent wrapper div.',
    },
    optionTextClassName: {
      control: 'text',
      description: 'Custom CSS class for the option text name.',
    },
    buttonClassName: {
      control: 'text',
      description: 'Custom CSS class for the button parent wrapper div.',
    },
    inputCheckBoxClassName: {
      control: 'text',
      description: 'Custom CSS class for the checkbox parent wrapper div.',
    },
    inputLabelClassName: {
      control: 'text',
      description: 'Custom CSS class for the checkbox name.',
    },
    wrapperSectionsItemsClassName: {
      control: 'text',
      description: 'Custom CSS class for the sections items wrapper.',
    },
    withSectionsTitleClassName: {
      control: 'text',
      description: 'Custom CSS class for the section title.',
    },
    popUpWrapperClassName: {
      control: 'text',
      description: 'Custom CSS class for the popup wrapper.',
    },
    popUpTitle: {
      control: 'text',
      description: 'Title for the popup.',
    },
    popUpTitleClassName: {
      control: 'text',
      description: 'Custom CSS class for the popup title.',
    },
    popUpOptionsWrapperClassName: {
      control: 'text',
      description: 'Custom CSS class for the popup options wrapper.',
    },
    popUpOptionTitle: {
      control: 'text',
      description: 'Title for the popup option.',
    },
    popUpOptionTitleClassName: {
      control: 'text',
      description: 'Custom CSS class for the popup option title.',
    },
    type: {
      control: 'select',
      options: [
        'default',
        'multiple',
        'multipleWithDisabledOption',
        'withSections',
        'inAPopover',
      ],
      description: 'Type of the OptionList to render.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
const Template: StoryFn<iOptionListProps> = (args) => <OptionList {...args} />;

export const Default: Story = Template.bind({});
Default.args = {
  itemsArray: [
    { id: '1', label: 'Byward Market', value: 'bywardMarket' },
    { id: '2', label: 'Centretown', value: 'centretown' },
    { id: '3', label: 'Hintonburg', value: 'hintonburg' },
    { id: '4', label: 'Westboro', value: 'westboro' },
    { id: '5', label: 'Downtown', value: 'downtown' },
  ],
  wrapperClassName: '',
  buttonClassName: '',
  optionTextClassName: '',
  type: 'default',
};

export const Multiple: StoryFn = () => {
  return (
    <OptionList
      type="multiple"
      itemsArray={[
        { id: '1', label: 'Online Store', value: 'onlineStore' },
        { id: '2', label: 'Messanger', value: 'messanger' },
        { id: '3', label: 'Facebook', value: 'facebook' },
        { id: '4', label: 'Wholesale', value: 'wholesale' },
        { id: '5', label: 'BuzzFeed', value: 'buzzFeed' },
      ]}
      wrapperClassName=""
      inputCheckBoxClassName=""
      inputLabelClassName=""
    />
  );
};

export const MultipleWithDisabledOption: StoryFn = () => {
  return (
    <OptionList
      type="multipleWithDisabledOption"
      itemsArray={[
        {
          id: '1',
          label: 'Online Store',
          value: 'onlineStore',
          isDisabled: false,
        },
        { id: '2', label: 'Messanger', value: 'messanger', isDisabled: true },
        { id: '3', label: 'Facebook', value: 'facebook', isDisabled: false },
        { id: '4', label: 'Wholesale', value: 'wholesale', isDisabled: false },
        { id: '5', label: 'BuzzFeed', value: 'buzzFeed', isDisabled: false },
      ]}
      wrapperClassName=""
      inputCheckBoxClassName=""
      inputLabelClassName=""
    />
  );
};

export const WithSections: StoryFn = () => {
  return (
    <OptionList
      type="withSections"
      itemsArray={[
        {
          id: 'section1',
          title: '',
          items: [
            { id: '1', label: 'Online Store', value: 'onlineStore' },
            { id: '2', label: 'Facebook', value: 'Facebook' },
          ],
        },
        {
          id: 'section2',
          title: 'Traffic',
          items: [
            {
              id: 'trafficReferrerSource',
              label: 'Traffic referrer source',
              value: 'trafficReferrerSource',
            },
            {
              id: 'trafficReferrerHost',
              label: 'Traffic referrer host',
              value: 'trafficReferrerHost',
            },
            {
              id: 'trafficRreferrerPath',
              label: 'Traffic referrer path',
              value: 'trafficRreferrerPath',
            },
          ],
        },
        {
          id: 'section3',
          title: 'Inventory Location',
          items: [
            {
              id: 'bywardMarket',
              label: 'Byward Market',
              value: 'bywardMarket',
            },
            { id: 'centretown', label: 'Centretown', value: 'centretown' },
            { id: 'hintonburg', label: 'Hintonburg', value: 'hintonburg' },
            { id: 'westboro', label: 'Westboro', value: 'westboro' },
            { id: 'downtown', label: 'Downtown', value: 'downtown' },
          ],
        },
      ]}
      wrapperClassName=""
      inputCheckBoxClassName=""
      inputLabelClassName=""
      wrapperSectionsItemsClassName=""
      withSectionsTitleClassName=""
    />
  );
};

export const InAPopover: StoryFn = () => {
  return (
    <OptionList
      type="inAPopover"
      itemsArray={[
        { id: '1', label: 'Online Store', value: 'onlineStore' },
        { id: '2', label: 'Messanger', value: 'messanger' },
        { id: '3', label: 'Facebook', value: 'facebook' },
        { id: '4', label: 'Wholesale', value: 'wholesale' },
        { id: '5', label: 'BuzzFeed', value: 'buzzFeed' },
      ]}
      wrapperClassName=""
      inputCheckBoxClassName=""
      inputLabelClassName=""
      popUpWrapperClassName=""
      popUpTitle="Options"
      popUpTitleClassName=""
      popUpOptionsWrapperClassName=""
      popUpOptionTitle="Inventory Location"
      popUpOptionTitleClassName=""
      buttonClassName=""
      optionTextClassName=""
    />
  );
};

export const WithDisabledOption: StoryFn = () => {
  return (
    <OptionList
      itemsArray={[
        { id: '1', label: 'Byward Market', value: 'bywardMarket' },
        { id: '2', label: 'Centretown', value: 'centretown', isDisabled: true },
        { id: '3', label: 'Hintonburg', value: 'hintonburg' },
        { id: '4', label: 'Westboro', value: 'westboro' },
        { id: '5', label: 'Downtown', value: 'downtown' },
      ]}
      wrapperClassName=""
      buttonClassName=""
      optionTextClassName=""
      type="default"
    />
  );
};

export const SourceCode = CreateSourceCodeStory(OptionListSourceCode);
