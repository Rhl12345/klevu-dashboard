import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TextSourceCode from '!!raw-loader!./Header'; // Loads the raw source code of the Header component
import { CreateSourceCodeStory } from '@/utils/helpers'; // Helper function to display source code
import Header from './Header'; // Import the Header component

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: 'For Now We Have Default Header component',
      },
    },
  },
  tags: ['autodocs'], // Tags for auto documentation
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

// Default story showcasing the Header with default props
export const Default = Template.bind({});
Default.args = {
  navigationLinks: [
    { label: 'Team', href: '#' },
    { label: 'Enterprise', href: '#' },
    { label: 'Explore', href: '#' },
    { label: 'Marketplace', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  profileOptions: [
    { label: 'Profile', href: '#' },
    { label: 'User', href: '#' },
    { label: 'Logs', href: '#' },
    { label: 'Sign out', href: '#', isSignOut: true },
  ],
  user: {
    name: 'Umang Patel',
    role: 'Super Admin',
  },
  handleBurgerMenuClick: () => {},
  handleNavigation: (path: string) => {},
};

// Story displaying the raw source code of the Header component
export const SourceCode = CreateSourceCodeStory(TextSourceCode);
