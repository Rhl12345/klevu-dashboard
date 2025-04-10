import React from "react";
import Image from "next/image";
import { Meta, StoryFn } from "@storybook/react";
import Card from "./Card";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Button from "@/components/Button/Button";
import Collapsible from "@/components/Collapsible/Collapsible";
import CardSourceCode from "!!raw-loader!./Card";
import { CreateSourceCodeStory } from "@/utils/helpers";
import Badge from "@/components/Badge/Badge";
import Pagination from "@/components/Pagination/Pagination";
import { iCardProps } from "./types";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Additional classes to style the card container",
      control: "text",
    },
    children: {
      description: "Content to render inside the card",
      control: false,
    },
  },
} as Meta;

const Template: StoryFn<iCardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden p-4">
      <div className="text-sm text-gray-800 font-semibold mb-2">
        Online store dashboard
      </div>
      <div className="text-sm text-gray-800">
        View a summary of your online store’s performance.
      </div>
    </div>
  ),
};

export const WithSubduedForSecondaryContent = Template.bind({});
WithSubduedForSecondaryContent.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden">
      <div className="p-4 bg-white">
        <div className="text-sm text-gray-800 font-semibold mb-2">
          Staff accounts
        </div>
        <ul className="text-sm text-gray-800 list-disc pl-5">
          <li>Felix Crafford</li>
          <li>Ezequiel Manno</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-800 font-semibold mb-2">
          Deactivated staff accounts
        </div>
        <ul className="text-sm text-gray-800 list-disc pl-5">
          <li>Felix Crafford</li>
          <li>Ezequiel Manno</li>
        </ul>
      </div>
    </div>
  ),
};

export const WithSections = Template.bind({});
WithSections.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden p-4">
      <div className="text-sm text-gray-800 font-semibold mb-2">Customer</div>
      <div className="text-sm text-gray-800 font-medium mb-4">John Smith</div>
      <div className="text-sm text-gray-800 font-semibold mb-3 flex items-center justify-between gap-x-2">
        <div className="">Contact Information</div>
        <div className="flex items-center gap-x-1">
          <a
            href=""
            className="hover:bg-gray-300 text-red-500 hover:text-red-600 size-6 flex items-center justify-center rounded"
          >
            <SvgIcon name="Trash" className="size-5" />
          </a>
          <a
            href=""
            className="hover:bg-gray-300 text-gray-400 hover:text-gray-500 size-6 flex items-center justify-center rounded"
          >
            <SvgIcon name="Edit" className="size-5" />
          </a>
        </div>
      </div>
      <div className="text-sm text-gray-800 font-medium">
        john.smith@example.com
      </div>
    </div>
  ),
};

export const WithHeaderAction = Template.bind({});
WithHeaderAction.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden p-4">
      <div className="text-sm text-gray-800 mb-2 flex flex-wrap items-center justify-between gap-x-2">
        <div className="font-semibold">Variants</div>
        <Button
          icon={<SvgIcon name="PlusIcon" className="size-4" />}
          size="sm"
          type="button"
          className="flex items-center justify-center gap-x-2 hover:bg-gray-200 rounded-md"
        >
          Add Variant
        </Button>
      </div>
      <div className="text-sm text-gray-800">
        Add variants if this product comes in multiple versions, like different
        sizes or colors.
      </div>
    </div>
  ),
};

export const WithFooterActions = Template.bind({});
WithFooterActions.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden p-4">
      <div className="text-sm text-gray-800 font-semibold mb-2">
        Shipment 1234
      </div>
      <div className="text-sm text-gray-800 font-medium mb-2">Items</div>
      <ul className="text-sm text-gray-800 list-disc pl-5 mb-2">
        <li>1 x Oasis Glass, 4-Pack</li>
        <li>1 x Anubis Cup, 2-Pack</li>
      </ul>
      <div className="flex items-center justify-end gap-x-2">
        <Button size="sm" type="button" variant="secondary">
          Fulfill items
        </Button>
        <Button
          icon={<SvgIcon name="PlusIcon" className="size-4" />}
          size="sm"
          type="button"
          className="flex items-center justify-center gap-x-2 hover:bg-gray-200 rounded-md"
        >
          Create shipping label
        </Button>
      </div>
    </div>
  ),
};

export const WithImageSection = Template.bind({});
WithImageSection.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl overflow-hidden">
      <div className="text-sm text-gray-800 mb-1">
        <Image
          src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt=""
          height={400}
          width={400}
        />
      </div>
      <div className="text-sm text-gray-800 p-4">
        You can use sales reports to see information about your customers’
        orders based on criteria such as sales over time, by channel, or by
        staff.
      </div>
    </div>
  ),
};

// Card with All Elements
export const WithAllElements = Template.bind({});
WithAllElements.args = {
  children: (
    <div className="bg-gray-100 shadow rounded-xl">
      <div className="p-4">
        <div className="text-sm text-gray-800 mb-2 flex flex-wrap items-center justify-between gap-x-2">
          <div className="font-semibold">Sales</div>
          <div className="flex flex-wrap gap-x-3">
            <Button
              size="sm"
              variant="primary"
              className="flex items-center justify-center rounded-md"
            >
              Total Sales
            </Button>

            <Collapsible
              className="relative"
              contentClassName="absolute top-10 right-0"
              trigger={
                <Button
                  size="sm"
                  variant="primary"
                  icon={<SvgIcon name="ArrowDown" className="size-5" />}
                  className="flex flex-row-reverse items-center justify-center gap-x-2 w-full h-full"
                >
                  View Sales
                </Button>
              }
              triggerClassName="cursor-pointer focus:outline-none"
            >
              <ul className="text-sm shadow rounded-xl bg-white p-1.5">
                <li>
                  <a
                    href=""
                    className="px-1.5 py-1 block text-nowrap rounded-lg hover:bg-gray-100"
                  >
                    Gross Sales
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="px-1.5 py-1 block text-nowrap rounded-lg hover:bg-gray-100"
                  >
                    New Sales
                  </a>
                </li>
              </ul>
            </Collapsible>
          </div>
        </div>
        <div className="text-sm text-gray-800 mb-4">
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </div>
        <div className="text-sm text-gray-800 font-medium mb-2">
          Total Sales Breakdown
        </div>
        <ul className="text-sm text-gray-800 divide-y">
          <li className="p-3 hover:bg-white flex items-center justify-between gap-x-2">
            <div className="">Orders</div>
            <div className="">$0.00</div>
          </li>
          <li className="p-3 hover:bg-white flex items-center justify-between gap-x-2">
            <div className="">Returns</div>
            <div className="">-$250.00</div>
          </li>
        </ul>
      </div>
      <div className="bg-white px-4 py-3">
        <div className="text-sm text-gray-800 font-semibold mb-2">
          Deactivated reports
        </div>
        <ul className="text-sm text-gray-800 list-disc pl-5">
          <li>Payouts</li>
          <li>Total Sales By Channel</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-800 font-semibold mb-2">Note</div>
        <div className="text-sm text-gray-800 mb-2">
          The sales reports are available only if your store is on the Shopify
          plan or higher.
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <Button size="sm" type="button" variant="secondary">
            Dismiss
          </Button>
          <Button size="sm" type="button" variant="secondary">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const CustomCard = Template.bind({});
CustomCard.args = {
  children: (
    <div className="max-w-4xl w-full mx-auto flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-12 w-full gap-4 lg:gap-6 mb-4">
        <div className="md:col-span-6 col-span-12">
          <div className="flex gap-2 items-center">
            <div className="">
              <Button size="sm" variant="secondary">
                <SvgIcon name="ArrowLeft" />
              </Button>
            </div>
            <div className="">
              <div className="text-lg font-bold">
                3/4 inch Leather pet collar
              </div>
              <div className="text-xs">Perfect for any pet</div>
            </div>
            <div className="">
              <Badge size="small" variant="green">
                Paid
              </Badge>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12">
          <div className="flex items-center md:justify-end w-full gap-2">
            <div className="">
              <Button
                size="sm"
                variant="secondary"
                className="flex gap-x-1 items-center"
              >
                <SvgIcon
                  name="Trash"
                  fill="currentColor"
                  height={18}
                  width={18}
                />
                Delete
              </Button>
            </div>
            <div className="">
              <Button size="sm" variant="primary" className="px-4">
                Edit
              </Button>
            </div>
            <div className="">
              <Button size="sm" variant="primary" className="px-3">
                Save
              </Button>
            </div>
            <Pagination
              leftIcon={<SvgIcon name="ArrowLeft" />}
              rightIcon={<SvgIcon name="ArrowRight" />}
            />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-md border border-gray-light dark:border-gray-dark bg-gray-pointer-50">
        <div className="text-md font-semibold">Credit card</div>
        <div className="text-base">Credit card information</div>
      </div>
    </div>
  ),
};

export const SourceCode = CreateSourceCodeStory(CardSourceCode);