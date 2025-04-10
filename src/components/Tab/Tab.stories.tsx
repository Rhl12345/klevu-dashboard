import React, { ComponentType, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Tab from "@/components/Tab/Tab";
import { CreateSourceCodeStory } from "@/utils/helpers";
import TabSourceCode from "!!raw-loader!./Tab";
import { ITabsProps } from "@/components/Tab/types";

/**
 * Storybook configuration for the Tab component
 */

export default {
  title: "Components/Tab",
  component: Tab as ComponentType<ITabsProps>,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: false,
      description:
        "Array containing tab options with label, icon, and recordCount.",
    },
    activeTab: {
      control: "number",
      defaultValue: 0,
      description: "Index of the currently active tab.",
    },
    variant: {
      control: "select",
      defaultValue: "default",
      options: ["default", "row-wise", "scrollable"],
      description: "Variant of the tab.",
    },
    pClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for individual tabs.",
    },
    baseTabClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the base tab.",
    },
    activeTabClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the active tab.",
    },
    isAddMode: {
      control: "boolean",
      defaultValue: false,
      description: "Flag to indicate if add mode is active.",
    },
    toDisable: {
      control: { type: "boolean" },
      description: "Array of tab indices to disable.",
    },
    onTabClick: {
      control: false,
      description: "Function to handle tab click.",
    },
    isCount: {
      control: "boolean",
      defaultValue: false,
      description: "Flag to show record count.",
    },
    scrollAmount: {
      control: "number",
      defaultValue: 100,
      description: "Amount to scroll when tabs are scrolled.",
    },
    leftArrowIcon: {
      control: "object",
      defaultValue: null,
      description: "Left arrow icon.",
    },
    rightArrowIcon: {
      control: "object",
      defaultValue: null,
      description: "Right arrow icon.",
    },
    scrollButtonClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for scroll buttons.",
    },
  },
} satisfies Meta<ITabsProps>;

export const PrimaryTableTabs: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Active",
    },
    {
      id: 2,
      label: "Inactive",
    },
    {
      id: 3,
      label: "Staging",
    },
    {
      id: 4,
      label: "Draft",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="flex gap-x-2 text-quaternary-dark dark:text-quaternary-light"
      baseTabClassName="tag-button cursor-pointer outline-none block font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
      activeTabClassName="active tag-button cursor-pointer outline-none block font-semibold py-1 lg:py-2 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
    />
  );
};

export const Default: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
    },

    {
      id: 1,
      label: "Accepts marketing",
    },

    {
      id: 2,
      label: "Repeat customers",
    },

    {
      id: 3,
      label: "Prospects",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="text-quaternary-dark flex gap-2 p-4"
      baseTabClassName="cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-4 lg:px-8 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
      activeTabClassName="active cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-4 lg:px-8 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
    />
  );
};

export const WithUrlTabs: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
      renderAs: "a",
      href: "https://storybook.js.org/docs/react/get-started/whats-a-story",
    },
    {
      id: 1,
      label: "Accepts marketing",
      renderAs: "a",
      href: "https://storybook.js.org/docs/react/get-started/whats-a-story",
    },
    {
      id: 2,
      label: "Repeat customers",
      renderAs: "a",
      href: "https://storybook.js.org/docs/react/get-started/whats-a-story",
    },

    {
      id: 3,
      label: "Prospects",
      renderAs: "a",
      href: "https://storybook.js.org/docs/react/get-started/whats-a-story",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="text-quaternary-dark flex gap-2 p-4 w-full"
      baseTabClassName="cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-4 lg:px-8 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
      activeTabClassName="active cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-4 lg:px-8 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
    />
  );
};

export const Fitted: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
    },

    {
      id: 1,
      label: "Accepts marketing",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="grid grid-cols-2 gap-2"
      baseTabClassName="cursor-pointer outline-none block text-sm font-semibold pt-4 pb-8 px-6 text-quaternary-dark dark:text-quaternary-light text-center"
      activeTabClassName="cursor-pointer outline-none block text-sm font-semibold pt-4 pb-8 px-6 text-quaternary-dark dark:text-quaternary-light text-center !border-b border-gray-light dark:border-gray-dark !font-bold"
    />
  );
};

export const WithBadges: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: (
        <>
          All{" "}
          <span className="bg-gray-light rounded-md py-1 px-2 text-xs text-quaternary-dark">
            10 +
          </span>
        </>
      ),
      recordCount: "10 +",
    },
    {
      id: 1,
      label: (
        <>
          Accepts marketing{" "}
          <span className="bg-gray-light rounded-md py-1 px-2 text-xs text-quaternary-dark">
            4
          </span>
        </>
      ),
      recordCount: "4",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="grid grid-cols-2 gap-2"
      baseTabClassName="cursor-pointer outline-none block text-sm font-semibold pt-4 pb-8 px-6 text-quaternary-dark dark:text-quaternary-light text-center"
      activeTabClassName="cursor-pointer outline-none block text-sm font-semibold pt-4 pb-8 px-6 text-quaternary-dark dark:text-quaternary-light text-center !border-b border-gray-light dark:border-gray-dark !font-bold"
    />
  );
};

export const CustomDisclosure: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Accepts marketing",
    },
    {
      id: 2,
      label: "Repeat customers",
    },
    {
      id: 3,
      label: "Prospects",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      pClassName="border-b border-gray-light dark:border-gray-dark flex gap-2"
      baseTabClassName="py-4 pb-8 px-6 outline-none cursor-pointer block text-sm font-semibold text-quaternary-dark dark:text-quaternary-light text-center"
      activeTabClassName="py-4 pb-8 px-6 outline-none cursor-pointer block text-sm font-semibold text-quaternary-dark dark:text-quaternary-light text-center !border-b border-gray-light dark:border-gray-dark !font-bold"
    />
  );
};

export const RowWise: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
      content: "All content",
    },
    {
      id: 1,
      label: "Accepts marketing",
      content: "Accepts marketing content",
    },

    {
      id: 2,
      label: "Repeat customers",
      content: "Repeat customers content",
    },
    {
      id: 3,
      label: "Prospects",
      content: "Prospects content",
    },
    {
      id: 4,
      label: "New Users",
      content: "New Users content",
    },
    {
      id: 5,
      label: "VIP Customers",
      content: "VIP Customers content",
    },
    {
      id: 6,
      label: "New Users",
      content: "New Users content",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      variant="row-wise"
      pClassName="flex flex-col gap-2"
      baseTabClassName="cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
      activeTabClassName="active cursor-pointer outline-none block font-semibold py-2 lg:py-4 px-2 lg:px-4 rounded-none text-sm text-quaternary-dark dark:text-quaternary-light hover:text-primary-light dark:hover:text-primary-dark hover:bg-white hover:dark:bg-gray-selected [&.active]:bg-gray-selected dark:[&.active]:bg-gray-dark [&.active]:text-white dark:[&.active]:text-white"
    />
  );
};

export const ScrollableTabs: StoryFn = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  const options = [
    {
      id: 0,
      label: "All",
    },
    {
      id: 1,
      label: "Accepts marketing",
    },
    {
      id: 2,
      label: "Repeat customers",
    },
    {
      id: 3,
      label: "Prospects",
    },
    {
      id: 4,
      label: "New Users",
    },
    {
      id: 5,
      label: "VIP Customers",
    },
    {
      id: 6,
      label: "New Users",
    },
    {
      id: 7,
      label: "New Users",
    },
    {
      id: 8,
      label: "New Users",
    },
    {
      id: 9,
      label: "New Users",
    },
    {
      id: 10,
      label: "New Users",
    },
  ];

  return (
    <Tab
      options={options}
      activeTab={activeTab}
      onTabClick={onTabClick}
      variant="scrollable"
      pClassName="flex gap-2 border-b border-gray-light dark:border-gray-dark"
      baseTabClassName="py-4 pb-8 px-6 outline-none whitespace-nowrap cursor-pointer block text-sm font-semibold text-quaternary-dark dark:text-quaternary-light text-center"
      activeTabClassName="py-4 pb-8 px-6 outline-none whitespace-nowrap cursor-pointer block text-sm font-semibold text-quaternary-dark dark:text-quaternary-light text-center !border-b border-gray-light dark:border-gray-dark !font-bold"
    />
  );
};

export const SourceCode = CreateSourceCodeStory(TabSourceCode);
