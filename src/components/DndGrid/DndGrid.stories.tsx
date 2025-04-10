import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DndGrid from '@/components/DndGrid/DndGrid';
import ProductItem from '@/components/DndGrid/ProductItem';

const meta: Meta<typeof DndGrid> = {
  title: 'Components/DndGrid',
  component: DndGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      defaultValue: [],
      description: 'Array of items to display in the grid',
    },
    setItems: {
      control: { type: 'object' },
      defaultValue: () => {},
      description: 'Function to update the items in the grid',
    },
    renderItem: {
      control: { type: 'object' },
      defaultValue: () => {},
      description: 'Function to render the items in the grid',
    },
    className: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'Additional custom classes for the grid container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DndGrid>;

const GridExample = () => {
  const [items, setItems] = useState(
    Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      content: <ProductItem index={index} />,
    }))
  );

  return (
    <DndGrid
      items={items}
      sortableKey="id"
      setItems={setItems}
      className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
      renderItem={(item) => item.content}
    />
  );
};

export const Default: Story = {
  render: () => <GridExample />,
};

export const SingleColumn: Story = {
  render: () => <GridExample />,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};
