import { RadialBarChart } from "@/components/charts/radial-bar-chart/RadialBarChart";
import { IRadialBarChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/RadialBarChart",
  component: RadialBarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the radial bar chart",
    },
    dateRange: {
      control: "text",
      description: "Date range to display",
    },
    showTooltip: {
      control: "boolean",
      description: "Whether to show tooltips on hover",
    },
    innerRadius: {
      control: "text",
      description: "Inner radius of the chart",
    },
    outerRadius: {
      control: "text",
      description: "Outer radius of the chart",
    },
    barSize: {
      control: "number",
      description: "Size of the bars",
    },
    startAngle: {
      control: "number",
      description: "Starting angle of the chart",
    },
    endAngle: {
      control: "number",
      description: "Ending angle of the chart",
    },
    storeName: {
      control: "text",
      description: "Name of the store to display",
    },
  },
} satisfies Meta<IRadialBarChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { name: "Category A", value: 70 },
  { name: "Category B", value: 55 },
  { name: "Category C", value: 40 },
  { name: "Category D", value: 25 },
];

// Basic Radial Bar Chart
export const Basic: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart data={sampleData} title="Basic Radial Bar Chart" />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Basic Radial Bar Chart");
  await expect(title).toBeInTheDocument();
};

// Custom Dimensions
export const CustomDimensions: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="Custom Dimensions Chart"
      innerRadius="30%"
      outerRadius="100%"
      barSize={15}
      startAngle={90}
      endAngle={200}
    />
  </div>
);

// With Store Information
export const WithStoreInfo: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="Store Performance"
      storeName="Main Store"
      dateRange="Jan 2024 - Mar 2024"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="Performance Metrics"
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
export const WithStoreDropdown: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="Store Comparison"
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
export const WithCustomTooltip: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="Custom Tooltip Chart"
      tooltipFormatter={(value) => `Progress: ${value}%`}
    />
  </div>
);

// Without Background
export const WithoutBackground: StoryFn<IRadialBarChartProps> = () => (
  <div className="w-[800px]">
    <RadialBarChart
      data={sampleData}
      title="No Background Chart"
      background={false}
    />
  </div>
);
