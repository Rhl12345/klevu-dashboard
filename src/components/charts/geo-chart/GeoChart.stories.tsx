import { GeoChart } from "@/components/charts/geo-chart/GeoChart";
import { IGeoChartProps } from "@/types/charts/charts.type";
import type { Meta, StoryFn } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Charts/GeoChart",
  component: GeoChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the geo chart",
    },
    region: {
      control: "text",
      description: "Region to display (e.g., 'US', 'world')",
    },
    displayMode: {
      control: "select",
      options: ["regions", "markers"],
      description: "Display mode for the chart",
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
  },
} satisfies Meta<IGeoChartProps>;

export default meta;

// Sample data for the stories
const sampleData = [
  { location: "US-NY", value: 200 },
  { location: "US-CA", value: 300 },
  { location: "US-TX", value: 250 },
  { location: "US-FL", value: 175 },
];

// Basic Geo Chart
export const Basic: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart data={sampleData} title="Basic Geo Chart" showTooltip={true} />
  </div>
);

Basic.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const title = canvas.getByText("Basic Geo Chart");
  await expect(title).toBeInTheDocument();
};

// World Map
export const WorldMap: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart
      data={[
        { location: "United States", value: 600 },
        { location: "Germany", value: 200 },
        { location: "Brazil", value: 100 },
        { location: "Canada", value: 400 },
        { location: "France", value: 300 },
        { location: "India", value: 250 },
      ]}
      header={["Country", "Sales"]}
      title="World Distribution"
      region="world"
      showTooltip={true}
    />
  </div>
);

// With Custom Colors
export const CustomColors: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart
      data={sampleData}
      title="Custom Colored Map"
      colors={["#e3f2fd", "#1565c0"]}
      datalessRegionColor="#eeeeee"
      showTooltip={true}
    />
  </div>
);

// With Store Information
export const WithStoreInfo: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart
      data={sampleData}
      title="Store Distribution"
      showTooltip={true}
      storeName="Main Store"
      dateRange="Jan 2024 - Mar 2024"
    />
  </div>
);

// With Date Filter
export const WithDateFilter: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart
      data={sampleData}
      title="Regional Performance"
      showTooltip={true}
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
export const WithStoreDropdown: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px]">
    <GeoChart
      data={sampleData}
      title="Store Locations"
      showTooltip={true}
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

// Dark Theme
export const DarkTheme: StoryFn<IGeoChartProps> = () => (
  <div className="w-[800px] bg-body-dark p-4">
    <GeoChart
      data={sampleData}
      title="Dark Theme Map"
      showTooltip={true}
      header={["Location", "Value"]}
      theme="dark"
      colors={["#263238", "#90a4ae"]}
    />
  </div>
);
