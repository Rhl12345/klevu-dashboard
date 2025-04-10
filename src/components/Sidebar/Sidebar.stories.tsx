import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { iSidebarProps } from './types';
import SidebarSourceCode from '!!raw-loader!./Sidebar';
import { CreateSourceCodeStory, RecursiveMenuItem } from '@/utils/helpers';
import { MenuItem } from './types';

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'SidebarNavDashboard',
    href: '/dashboard',
    subItems: [
      {
        id: 'analytics',
        label: 'Analytics',
        href: '/dashboard/analytics',
        subItems: [
          {
            id: 'real-time',
            label: 'Real-time Analytics',
            href: '/dashboard/analytics/real-time',
          },
          {
            id: 'historical',
            label: 'Historical Data',
            href: '/dashboard/analytics/historical',
          },
        ],
      },
      { id: 'reports', label: 'Reports', href: '/dashboard/reports' },
    ],
  },
];

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    isSideBarOpen: {
      control: 'boolean',
      description: 'Controls whether the sidebar is visible.',
    },
    setSideBarOpen: {
      control: false,
      description: 'Function to update the visibility state of the sidebar.',
    },
    content: {
      control: false,
      description:
        'Content to be displayed inside the sidebar, passed as a React node.',
    },
    contentWrapperClassName: {
      control: 'text',
      description: 'Custom classnames for the content wrapper div.',
    },
    transitionClasses: {
      control: 'object',
      description: 'Custom classnames for the transition component.',
    },
  },
} as Meta<iSidebarProps>;

const Template: StoryFn<iSidebarProps> = (args) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <Sidebar
      {...args}
      menuItems={args.menuItems || menuItems}
      content={(menuItems) => (
        <div className="bg-neutral-50 dark:bg-dark-body-bg max-md:mr-16 flex w-64 md:w-72 flex-1 h-full md:p-6 px-4 py-3">
          <div className="w-full flex grow flex-col gap-y-5 overflow-y-auto">
            <nav className="flex w-full flex-1 flex-col">
              <ul id="topiclinks" role="list" className="space-y-1 menu">
                {menuItems.map((item) => (
                  <RecursiveMenuItem
                    key={item.id}
                    item={item}
                    expandedItems={expandedItems}
                    selectedItem={selectedItem}
                    onItemSelect={setSelectedItem}
                    onToggleExpand={handleToggleExpand}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    />
  );
};

export const LeftSidebarNavigation = Template.bind({});
LeftSidebarNavigation.args = {
  isSideBarOpen: true,
  setSideBarOpen: () => { },
  contentWrapperClassName: 'fixed h-screen left-0 top-0',
  transitionClasses: {
    enter: 'transition-transform ease-out duration-300',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transition-transform ease-in duration-200',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full',
  },
  menuItems: menuItems,
};

export const SourceCode = CreateSourceCodeStory(SidebarSourceCode);
