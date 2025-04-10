import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Banner from './Banner';
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import BannerSourceCode from '!!raw-loader!./Banner';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iBannerProps } from './types';

export default {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Title content for the banner.' },
    icon: { description: 'Status icon to display in the banner.' },
    hideIcon: { control: 'boolean', description: 'Whether to hide the icon.' },
    tone: {
      control: 'select',
      options: ['success', 'info', 'warning', 'critical'],
      description: 'Tone of the banner.',
    },
    content: { control: 'text', description: 'Content/body of the banner.' },
    action: {
      control: 'object',
      description:
        'Primary action button details with `content` and `onClick`.',
    },
    secondaryAction: {
      control: 'object',
      description:
        'Secondary action button details with `content` and `onClick`.',
    },
    onDismiss: {
      description: 'Callback for dismissing the banner.',
    },
    dismissIcon: {
      control: 'object',
      description: 'Custom dismiss icon to display in the header.',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom wrapper classes for the banner.',
    },
    headingClassName: {
      control: 'text',
      description: 'Custom classes for the heading section.',
    },
    contentClassName: {
      control: 'text',
      description: 'Custom classes for the content section.',
    },
    actionButtonsWrapperClassName: {
      control: 'text',
      description: 'Custom classes for the actions section.',
    },
    primaryActionButtonClassName: {
      control: 'text',
      description: 'Custom classes for the primary action button.',
    },
    secondaryActionButtonClassName: {
      control: 'text',
      description: 'Custom classes for the secondary action button.',
    },
    dismissIconClassName: {
      control: 'text',
      description: 'Custom classes for the dismiss button.',
    },
  },
} as Meta<typeof Banner>;

const Template: StoryFn<iBannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Order archived',
  tone: 'info',
  icon: <SvgIcon name="CircleInfo" />,
  content: 'This order was archived on March 7, 2017 at 3:12pm EDT.',
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  ...Default.args,
  icon: <SvgIcon name="CircleInfo" />,
  onDismiss: () => alert('Dismissed!'),
};

export const WithFooterCallToAction = Template.bind({});
WithFooterCallToAction.args = {
  tone: 'warning',
  title: 'Some of your product variants are missing weights',
  content: 'Add weights to show accurate rates at checkout.',
  icon: <SvgIcon name="Warning" />,
  action: { content: 'Edit weights', onClick: () => alert('Edit weights') },
  secondaryAction: {
    content: 'Learn more',
    onClick: () => alert('Learn more'),
  },
  onDismiss: () => alert('Dismissed!'),
};

export const Informational = Template.bind({});
Informational.args = {
  ...Default.args,
  icon: <SvgIcon name="CircleInfo" />,
  tone: 'info',
  title: 'USPS has updated their rates',
  content: 'Make sure you know how these changes affect your store.',
  onDismiss: () => alert('Dismissed!'),
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  icon: <SvgIcon name="SuccessCheckmark" />,
  tone: 'success',
  title: 'Your shipping label is ready to print.',
  action: { content: 'Print label', onClick: () => alert('Printed!') },
  onDismiss: () => alert('Dismissed!'),
};

export const Warning = Template.bind({});
Warning.args = {
  tone: 'warning',
  icon: <SvgIcon name="Warning" />,
  title:
    'Before you can purchase a shipping label, this change needs to be made:',
  content: 'The city name can only include spaces and hyphens.',
  onDismiss: () => alert('Dismissed!'),
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  tone: 'info',
  title: 'Choose a plan and your discount will be applied at checkout.',
  icon: <SvgIcon name="CustomBannerIcon" />,
  onDismiss: () => alert('Dismissed!'),
};

export const SourceCode = CreateSourceCodeStory(BannerSourceCode);
