import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SvgIcon from './SvgIcon';
import { SvgArray } from './SvgIconsArray';

export default {
  title: 'Components/SvgIcon',
  component: SvgIcon,
  tags: ['autodocs'],
} as Meta<typeof SvgIcon>;

export const AllIcons: StoryFn = () => (
  <div className="grid grid-cols-4 gap-4">
    {SvgArray.map((icon, index) => (
      <div
        key={index}
        className="flex flex-col items-center space-y-2 p-4 border border-gray-300 rounded"
      >
        <SvgIcon name={icon.name} />
        <span className="text-sm font-medium text-center">{icon.name}</span>
      </div>
    ))}
  </div>
);
