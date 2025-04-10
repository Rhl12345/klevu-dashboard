import { ScatterChart } from "@/components/charts/scatter-chart/ScatterChart";
import { IScatterChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/ScatterChart",
  component: ScatterChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the scatter chart",
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
    xAxisLabel: {
      control: "text",
      description: "Label for X-axis",
    },
    yAxisLabel: {
      control: "text",
      description: "Label for Y-axis",
    },
    defaultColor: {
      control: "color",
      description: "Default color for scatter points",
    },
  },
} satisfies Meta<IScatterChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { x: 100, y: 200, name: "Point A" },
  { x: 120, y: 100, name: "Point B" },
  { x: 170, y: 300, name: "Point C" },
  { x: 140, y: 250, name: "Point D" },
  { x: 150, y: 400, name: "Point E" },
];

// Basic Scatter Chart
export const Basic: StoryFn<IScatterChartProps> = () => (
  <div className="w-[800px]">
    <ScatterChart
      data={sampleData}
      title="Basic Scatter Chart"
      showTooltip={true}
      xAxisLabel="X Values"
      yAxisLabel="Y Values"
    />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Basic Scatter Chart");
  await expect(title).toBeInTheDocument();
};

// With Store Information
export const WithStoreInfo: StoryFn<IScatterChartProps> = () => (
  <div className="w-[800px]">
    <ScatterChart
      data={sampleData}
      title="Store Performance"
      showTooltip={true}
      storeName="Main Store"
      dateRange="Jan 2024 - Mar 2024"
      xAxisLabel="Sales"
      yAxisLabel="Profit"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<IScatterChartProps> = () => (
  <div className="w-[800px]">
    <ScatterChart
      data={sampleData}
      title="Sales Analysis"
      showTooltip={true}
      xAxisLabel="Revenue"
      yAxisLabel="Units Sold"
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
export const WithStoreDropdown: StoryFn<IScatterChartProps> = () => (
  <div className="w-[800px]">
    <ScatterChart
      data={sampleData}
      title="Store Comparison"
      showTooltip={true}
      xAxisLabel="Customer Count"
      yAxisLabel="Average Purchase"
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
export const WithCustomTooltip: StoryFn<IScatterChartProps> = () => (
  <div className="w-[800px]">
    <ScatterChart
      data={sampleData}
      title="Custom Tooltip Chart"
      showTooltip={true}
      xAxisLabel="X Axis"
      yAxisLabel="Y Axis"
      tooltipFormatter={(value, name, props) => {
        return (
          <div className="custom-tooltip">
            <strong>{props?.payload?.name}</strong>: ({props?.payload?.x},{" "}
            {props?.payload?.y})
          </div>
        );
      }}
    />
  </div>
);
