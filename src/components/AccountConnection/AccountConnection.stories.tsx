import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AccountConnectionSourceCode from '!!raw-loader!./AccountConnection';
import { CreateSourceCodeStory } from '@/utils/helpers';
import AccountConnection from './AccountConnection';
import { iAccountConnectionProps } from './types';

export default {
  title: 'Components/AccountConnection',
  component: AccountConnection,
  tags: ['autodocs'],
  argTypes: {
    appName: {
      control: 'text',
      description: 'Name of the connected application',
    },
    isConnected: { control: 'boolean', description: 'Connection status' },
    onConnect: {
      action: 'connect',
      description: 'Callback for the Connect button',
    },
    onDisconnect: {
      action: 'disconnect',
      description: 'Callback for the Disconnect button',
    },
    termsText: {
      control: 'text',
      description: 'Terms and conditions text displayed when disconnected',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom classes for the wrapper',
    },
    appNameClassName: {
      control: 'text',
      description: 'Custom classes for the app name text',
    },
    statusClassName: {
      control: 'text',
      description: 'Custom classes for the status text',
    },
    buttonWrapperClassName: {
      control: 'text',
      description: 'Custom classes for the button wrapper',
    },
    connectButtonClassName: {
      control: 'text',
      description: 'Custom classes for the Connect button',
    },
    disconnectButtonClassName: {
      control: 'text',
      description: 'Custom classes for the Disconnect button',
    },
    termsTextClassName: {
      control: 'text',
      description: 'Custom classes for the terms and conditions text',
    },
  },
} as Meta<typeof AccountConnection>;

const Template: StoryFn<iAccountConnectionProps> = (args) => (
  <AccountConnection {...args} />
);

export const Disconnected = Template.bind({});
Disconnected.args = {
  appName: 'Sample App',
  isConnected: false,
  termsText:
    'By clicking Connect, you agree to Sample App’s terms and conditions. You’ll pay a commission rate of 15% on sales made through Sample App.',
  wrapperClassName: 'border border-gray-light dark:border-gray-dark',
  appNameClassName: 'text-lg text-blue-500',
  statusClassName: 'text-quaternary-dark dark:text-quaternary-light',
  connectButtonClassName: 'bg-green-600 text-white hover:bg-green-700',
  termsTextClassName: 'italic text-quaternary-dark dark:text-quaternary-light',
};

export const Connected = Template.bind({});
Connected.args = {
  appName: 'Sample App',
  isConnected: true,
  wrapperClassName: 'border border-gray-light dark:border-gray-dark',
  appNameClassName: 'text-lg text-green-600',
  statusClassName: 'text-green-500',
  disconnectButtonClassName: 'bg-red-500 text-white hover:bg-red-600',
};

export const SourceCode = CreateSourceCodeStory(AccountConnectionSourceCode);
