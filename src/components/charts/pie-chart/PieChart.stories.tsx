import { PieChart } from "@/components/charts/pie-chart/PieChart";
import { IPieChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the pie chart",
    },
    dateRange: {
      control: "text",
      description: "Date range to display",
    },
    showTooltip: {
      control: "boolean",
      description: "Whether to show tooltips on hover",
    },
    showLabels: {
      control: "boolean",
      description: "Whether to show labels on pie segments",
    },
    storeName: {
      control: "text",
      description: "Name of the store to display",
    },
  },
} satisfies Meta<IPieChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 200 },
  { name: "Category D", value: 100 },
];

// Basic Pie Chart
export const Basic: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart data={sampleData} title="Basic Pie Chart" showTooltip={true} />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Check if title is rendered
  const title = canvas.getByText("Basic Pie Chart");
  await expect(title).toBeInTheDocument();

  // Check if all segments are rendered
  const legendButtons = canvas.getAllByRole("button");
  await expect(legendButtons).toHaveLength(4);
};

// With Center Label
export const WithCenterLabel: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Pie Chart with Center Label"
      showTooltip
      centerLabel={{
        text: "Total",
        value: "1000",
      }}
    />
  </div>
);

// With Labels
export const WithLabels: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Pie Chart with Data Labels"
      showTooltip
      showLabels
      centerLabel={{
        text: "Total",
        value: "1000",
      }}
    />
  </div>
);

// With Store Information
export const WithStoreInfo: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Store Performance"
      showTooltip
      storeName="Main Store"
      dateRange="Jan 2024 - Mar 2024"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Sales by Category"
      showTooltip
      dateFilter={{
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-03-31"),
        onStartDateChange: (date) => console.log("Start date changed:", date),
        onEndDateChange: (date) => console.log("End date changed:", date),
        showDateFilter: true,
      }}
    />
  </div>
);

// With Store Dropdown
export const WithStoreDropdown: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Store Comparison"
      showTooltip
      dropdownFilter={{
        dropdownOptions: [
          { label: "Store 1", value: "store1" },
          { label: "Store 2", value: "store2" },
          { label: "Store 3", value: "store3" },
        ],
        onStoreChange: (selected) => console.log("Store changed:", selected),
        selectedOption: "store1",
        showDropdown: true,
      }}
    />
  </div>
);

// Custom Tooltip
export const WithCustomTooltip: StoryFn<IPieChartProps> = () => (
  <div className="w-[800px]">
    <PieChart
      data={sampleData}
      title="Custom Tooltip Chart"
      showTooltip={true}
      tooltipFormatter={(value, name) => (
        <div className="custom-tooltip">
          <strong>{name}</strong>: {value} units
        </div>
      )}
    />
  </div>
);
