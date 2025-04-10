import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Accordion from "@/components/Accordion/Accordion";
import AccordionSourceCode from "!!raw-loader!./Accordion";
import { CreateSourceCodeStory } from "@/utils/helpers";
import { IAccordionProps } from "@/components/Accordion/types";
import { expect, within, userEvent } from "@storybook/test";

export default {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the accordion container",
    },
    itemClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for each accordion item",
    },
    disclousreButtonClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the disclosure button",
    },
    disclousrePanelClassName: {
      control: { type: "text" },
      defaultValue: "",
      description: "Custom class for the disclosure panel",
    },
    items: {
      control: false,
      description: "Array of items for the accordion",
    },
    iconVariant: {
      control: { type: "select" },
      options: ["plusMinus", "arrow"],
      description: "Icon variant for the accordion",
    },
  },
} as Meta<IAccordionProps>;

export const Default: StoryFn = () => (
  <Accordion
    items={[
      {
        id: "1",
        title: <p data-testid="title-1">Section Title 1</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
      {
        id: "2",
        title: <p data-testid="title-2">Section Title 2</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
      {
        id: "3",
        title: <p data-testid="title-3">Section Title 3</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
    ]}
    iconVariant="plusMinus"
  />
);
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Visual Tests
  // ------------

  // Test Case 1: Verify all accordion items are rendered
  const accordionItems = canvas.getAllByRole("button");
  await expect(accordionItems).toHaveLength(3);

  // Test Case 2: Verify initial state - all items should be collapsed
  const initialContent = canvas.queryByTestId("content-1");
  await expect(initialContent).toBeNull();

  // Test Case 3: Verify correct title elements exist
  await expect(canvas.getByTestId("title-1")).toBeInTheDocument();
  await expect(canvas.getByTestId("title-2")).toBeInTheDocument();

  // Interaction Tests
  // ----------------

  // Test Case 4: Click to expand first accordion item
  await userEvent.click(accordionItems[0]);
  const firstItemContent = canvas.getByTestId("content-1");
  await expect(firstItemContent).toBeInTheDocument();

  // Test Case 5: Verify icon changes on expansion
  await expect(canvas.getByTestId("icon-0-expanded")).toBeInTheDocument();
  await expect(canvas.queryByTestId("icon-0-not-expanded")).toBeNull();

  // Test Case 6: Click again to collapse
  await userEvent.click(accordionItems[0]);
  await expect(canvas.queryByTestId("content-1")).toBeNull();
  await expect(canvas.getByTestId("icon-0-not-expanded")).toBeInTheDocument();
  await expect(canvas.queryByTestId("icon-0-expanded")).toBeNull();

  // Test Case 7: Multiple items can be open simultaneously
  await userEvent.click(accordionItems[0]);
  await userEvent.click(accordionItems[1]);

  // Verify both contents are visible
  await expect(canvas.getByTestId("content-1")).toBeInTheDocument();
  await expect(canvas.getByTestId("content-2")).toBeInTheDocument();

  // Verify both icons are in expanded state
  await expect(canvas.getByTestId("icon-0-expanded")).toBeInTheDocument();
  await expect(canvas.getByTestId("icon-1-expanded")).toBeInTheDocument();
};

export const WithArrowIcons: StoryFn = () => (
  <Accordion
    iconVariant="arrow"
    items={[
      {
        id: "1",
        title: <p data-testid="title-1">Section Title 1</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
      {
        id: "2",
        title: <p data-testid="title-2">Section Title 2</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
      {
        id: "3",
        title: <p data-testid="title-3">Section Title 3</p>,
        content: (
          <p className="mt-3 mb-5 text-sm" data-testid="content-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        ),
      },
    ]}
  />
);

export const SourceCode = CreateSourceCodeStory(AccordionSourceCode);
