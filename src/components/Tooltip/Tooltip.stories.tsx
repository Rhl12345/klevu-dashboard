import TooltipSourceCode from "!!raw-loader!./Tooltip";
import Image from "@/components/Image/Image";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Tooltip from "@/components/Tooltip/Tooltip";
import { TTooltipProps } from "@/components/Tooltip/types";
import { CreateSourceCodeStory } from "@/utils/helpers";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "Defines the maximum width of the tooltip.",
    },
    position: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description:
        "Specifies the position of the tooltip relative to the trigger.",
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the tooltip.",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
      description: "Disables the tooltip when set to true.",
    },
    icon: {
      control: "boolean",
      description: "Optional custom icon to replace the default info icon.",
    },
  },
} satisfies Meta<TTooltipProps>;

export default meta;
type Story = StoryObj<TTooltipProps>;

// Position Variants
export const PositionVariants: StoryFn = () => (
  <div className="flex items-center justify-center gap-16 p-16">
    <Tooltip position="top">Top Tooltip</Tooltip>
    <Tooltip position="right">Right Tooltip</Tooltip>
    <Tooltip position="bottom">Bottom Tooltip</Tooltip>
    <Tooltip position="left">Left Tooltip</Tooltip>
  </div>
);

PositionVariants.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Check if all tooltips are rendered
  const tooltips = canvas.getAllByRole("tooltip");
  await expect(tooltips).toHaveLength(4);

  // Test position-specific classes
  const topTooltip = canvas.getByTestId("top-md-tooltip");
  await expect(topTooltip).toHaveClass("bottom-full");

  const rightTooltip = canvas.getByTestId("right-md-tooltip");
  await expect(rightTooltip).toHaveClass("left-full");

  const bottomTooltip = canvas.getByTestId("bottom-md-tooltip");
  await expect(bottomTooltip).toHaveClass("top-full");

  const leftTooltip = canvas.getByTestId("left-md-tooltip");
  await expect(leftTooltip).toHaveClass("right-full");
};

// Size Variants
export const SizeVariants: StoryFn = () => (
  <div className="space-y-8">
    <Tooltip size="xs">Extra Small Tooltip with limited width</Tooltip>
    <Tooltip size="sm">Small Tooltip with some more content that wraps</Tooltip>
    <Tooltip size="md">
      Medium Tooltip with a reasonable amount of content that wraps
    </Tooltip>
    <Tooltip size="lg">
      Large Tooltip with plenty of space for longer content that wraps. Lorem
      ipsum
    </Tooltip>
  </div>
);

SizeVariants.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Check if all size variants are rendered
  const tooltips = canvas.getAllByRole("tooltip");
  await expect(tooltips).toHaveLength(4);

  // Test size-specific classes
  const xsTooltip = canvas.getByTestId("top-xs-tooltip");
  await expect(xsTooltip).toHaveClass("max-w-xs");

  const smTooltip = canvas.getByTestId("top-sm-tooltip");
  await expect(smTooltip).toHaveClass("max-w-sm");

  const mdTooltip = canvas.getByTestId("top-md-tooltip");
  await expect(mdTooltip).toHaveClass("max-w-md");

  const lgTooltip = canvas.getByTestId("top-lg-tooltip");
  await expect(lgTooltip).toHaveClass("max-w-lg");
};

export const CustomContent: StoryFn = () => (
  <div className="space-x-4">
    <Tooltip>
      <div className="flex flex-col justify-center">
        <Image src="/images/redefine.png" alt="Logo" width={24} height={24} />
        <span>Custom Content Tooltip</span>
      </div>
    </Tooltip>
  </div>
);

// Custom Icon
export const CustomIcon: StoryFn = () => (
  <div className="space-x-4">
    <Tooltip icon={<SvgIcon name="CheckmarkWithCircle" className="w-4 h-4" />}>
      Custom Checkmark Icon
    </Tooltip>
  </div>
);

// Disabled State
export const Disabled: Story = {
  args: {
    children: "Disabled Tooltip",
    disabled: true,
  },
};

Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tooltipTrigger = canvas?.getByRole("tooltip")?.firstChild;
  // Check disabled styles
  await expect(tooltipTrigger).toHaveClass("opacity-50", "!cursor-not-allowed");
};

// Source Code
export const SourceCode = CreateSourceCodeStory(TooltipSourceCode);
