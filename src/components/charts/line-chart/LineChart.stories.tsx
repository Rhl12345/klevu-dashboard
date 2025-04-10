import { LineChart } from "@/components/charts/line-chart/LineChart";
import { ILineChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/LineChart",
  component: LineChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the line chart",
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
    lineColor: {
      control: "color",
      description: "Color of the line",
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
} satisfies Meta<ILineChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 200 },
  { name: "May", value: 500 },
  { name: "Jun", value: 350 },
];

// Basic Line Chart
export const Basic: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Basic Line Chart"
      showTooltip={true}
      xAxisLabel="Month"
      yAxisLabel="Value"
    />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Basic Line Chart");
  await expect(title).toBeInTheDocument();
};

// With Custom Color
export const WithCustomColor: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Custom Colored Line Chart"
      lineColor="#FF5733"
      xAxisLabel="Month"
      yAxisLabel="Value"
    />
  </div>
);

// With Store Information
export const WithStoreInfo: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Store Performance"
      showTooltip={true}
      storeName="Main Store"
      dateRange="Jan 2024 - Jun 2024"
      xAxisLabel="Month"
      yAxisLabel="Sales"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Monthly Sales"
      showTooltip={true}
      xAxisLabel="Month"
      yAxisLabel="Sales"
      dateFilter={{
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
        onStartDateChange: (date) => console.log("Start date changed:", date),
        onEndDateChange: (date) => console.log("End date changed:", date),
        showDateFilter: true,
      }}
    />
  </div>
);

// With Store Dropdown
export const WithStoreDropdown: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Store Comparison"
      showTooltip={true}
      xAxisLabel="Month"
      yAxisLabel="Sales"
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
export const WithCustomTooltip: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={sampleData}
      title="Custom Tooltip Chart"
      showTooltip={true}
      xAxisLabel="Month"
      yAxisLabel="Value"
      tooltipFormatter={(value, name) => (
        <div className="custom-tooltip">
          <strong>{name}</strong>: {value} units
        </div>
      )}
    />
  </div>
);

// No Data
export const NoData: StoryFn<ILineChartProps> = () => (
  <div className="w-[800px]">
    <LineChart
      data={[
        { name: "Jan", value: 0 },
        { name: "Feb", value: 0 },
      ]}
      title="No Data Chart"
      xAxisLabel="Month"
      yAxisLabel="Value"
    />
  </div>
);
