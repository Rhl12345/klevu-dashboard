import { BarChart } from "@/components/charts/bar-chart/BarChart";
import { IBarChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the bar chart",
    },
    dateRange: {
      control: "text",
      description: "Date range to display",
    },
    showTooltip: {
      control: "boolean",
      description: "Whether to show tooltips on hover",
    },
    storeName: {
      control: "text",
      description: "Name of the store to display",
    },
    barColor: {
      control: "color",
      description: "Color of the bars",
    },
    xAxisLabel: {
      control: "text",
      description: "Label for X-axis",
    },
    yAxisLabel: {
      control: "text",
      description: "Label for Y-axis",
    },
  },
} satisfies Meta<IBarChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 500 },
  { name: "May", value: 250 },
  { name: "Jun", value: 350 },
];

// Basic Bar Chart
export const Basic: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={sampleData}
      title="Basic Bar Chart"
      showTooltip={true}
      xAxisLabel="Months"
      yAxisLabel="Values"
    />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Basic Bar Chart");
  await expect(title).toBeInTheDocument();
};

// With Custom Colors
export const WithCustomColors: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={sampleData}
      title="Custom Colored Bar Chart"
      barColor="#FF6B6B"
      xAxisLabel="Months"
      yAxisLabel="Values"
    />
  </div>
);

// With Store Information
export const WithStoreInfo: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={sampleData}
      title="Store Performance"
      showTooltip
      storeName="Main Store"
      dateRange="Jan 2024 - Jun 2024"
      xAxisLabel="Months"
      yAxisLabel="Sales"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={sampleData}
      title="Monthly Sales"
      showTooltip
      dateFilter={{
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
        onStartDateChange: (date) => console.log("Start date changed:", date),
        onEndDateChange: (date) => console.log("End date changed:", date),
        showDateFilter: true,
      }}
      xAxisLabel="Months"
      yAxisLabel="Sales"
    />
  </div>
);

// With Store Dropdown
export const WithStoreDropdown: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
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
      xAxisLabel="Months"
      yAxisLabel="Sales"
    />
  </div>
);

// Custom Tooltip
export const WithCustomTooltip: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={sampleData}
      title="Custom Tooltip Chart"
      showTooltip={true}
      tooltipFormatter={(value) => [`${value} units`, "Sales"]}
      xAxisLabel="Months"
      yAxisLabel="Units Sold"
    />
  </div>
);

// No Data
export const NoData: StoryFn<IBarChartProps> = () => (
  <div className="w-[800px]">
    <BarChart
      data={[
        { name: "Jan", value: 0 },
        { name: "Feb", value: 0 },
        { name: "Mar", value: 0 },
      ]}
      title="No Data Chart"
      xAxisLabel="Months"
      yAxisLabel="Values"
    />
  </div>
);
