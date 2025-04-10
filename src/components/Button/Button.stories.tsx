import React from 'react';
import Button from './Button';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import ButtonSourceCode from '!!raw-loader!./Button';
import SvgIcon from '@/components/SvgIcons/SvgIcon';
import { CreateSourceCodeStory } from '@/utils/helpers';
import { iButtonProps } from './types';
import { within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Defines the size of the button.',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'outline-primary',
        'secondary',
        'outline-secondary',
        'rounded-primary',
        'rounded-outline-primary',
        'rounded-secondary',
        'rounded-outline-secondary',
      ],
      description: 'Specifies the visual style variant of the button.',
    },
    children: {
      control: 'text',
      defaultValue: 'Button',
      description: 'Text or content to be displayed inside the button.',
    },
    icon: {
      control: 'boolean',
      description: 'Optional icon to render inside the button.',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Disables the button when set to true.',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Specifies the position of the icon inside the button.',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Specifies the roundedness of the button.',
    },
  },
} satisfies Meta<iButtonProps>;

export default meta;
type Story = StoryObj<iButtonProps>;

// Default Variants
export const DefaultVariants: StoryFn = () => (
  <div className="flex flex-wrap gap-2">
    <Button data-testid="default-button" variant="default">
      Default
    </Button>
    <Button data-testid="primary-button" variant="primary">
      Primary
    </Button>
    <Button data-testid="outline-primary-button" variant="outline-primary">
      Outline Primary
    </Button>
    <Button data-testid="secondary-button" variant="secondary">
      Secondary
    </Button>
    <Button data-testid="outline-secondary-button" variant="outline-secondary">
      Outline Secondary
    </Button>
  </div>
);

DefaultVariants.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all 5 variants are rendered
  await expect(buttons).toHaveLength(5);

  // Check default button styles
  const defaultButton = canvas.getByTestId('default-button');
  await expect(defaultButton).toHaveClass('btn');
  await expect(defaultButton).toHaveClass(
    'btn-default',
    'dark:btn-dark-default'
  );

  // Check primary button styles
  const primaryButton = canvas.getByTestId('primary-button');
  await expect(primaryButton).toHaveClass('btn');
  await expect(primaryButton).toHaveClass(
    'btn-primary',
    'dark:btn-dark-primary'
  );

  // Check outline primary button styles
  const outlinePrimaryButton = canvas.getByTestId('outline-primary-button');
  await expect(outlinePrimaryButton).toHaveClass('btn');
  await expect(outlinePrimaryButton).toHaveClass(
    'btn-outline-primary',
    'dark:btn-outline-dark-primary'
  );

  // Check secondary button styles
  const secondaryButton = canvas.getByTestId('secondary-button');
  await expect(secondaryButton).toHaveClass('btn');
  await expect(secondaryButton).toHaveClass(
    'btn-secondary',
    'dark:btn-dark-secondary'
  );

  // Check outline secondary button styles
  const outlineSecondaryButton = canvas.getByTestId('outline-secondary-button');
  await expect(outlineSecondaryButton).toHaveClass('btn');
  await expect(outlineSecondaryButton).toHaveClass(
    'btn-outline-secondary',
    'dark:btn-outline-dark-secondary'
  );
};

export const RoundedVariants: StoryFn = () => (
  <div className="flex items-center gap-2">
    <Button
      data-testid="rounded-primary-button"
      size="sm"
      variant="rounded-primary"
      rounded="sm"
    >
      Rounded
    </Button>
    <Button
      data-testid="rounded-outline-primary-button"
      size="md"
      variant="rounded-outline-primary"
      rounded="md"
    >
      Rounded
    </Button>
    <Button
      data-testid="rounded-secondary-button"
      size="lg"
      variant="rounded-secondary"
      rounded="lg"
    >
      Rounded
    </Button>
    <Button
      data-testid="rounded-outline-secondary-button"
      size="lg"
      variant="rounded-outline-secondary"
      rounded="xl"
    >
      Rounded
    </Button>
  </div>
);
RoundedVariants.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all rounded variants are rendered
  await expect(buttons).toHaveLength(4);

  // Check rounded primary button
  const roundedPrimary = canvas.getByTestId('rounded-primary-button');
  await expect(roundedPrimary).toHaveClass('btn');
  await expect(roundedPrimary).toHaveClass('btn-sm');
  await expect(roundedPrimary).toHaveClass('!rounded-sm');

  // Check rounded outline primary button
  const roundedOutlinePrimary = canvas.getByTestId(
    'rounded-outline-primary-button'
  );
  await expect(roundedOutlinePrimary).toHaveClass('btn');
  await expect(roundedOutlinePrimary).toHaveClass('btn-md');
  await expect(roundedOutlinePrimary).toHaveClass('!rounded-md');

  // Check rounded secondary button
  const roundedSecondary = canvas.getByTestId('rounded-secondary-button');
  await expect(roundedSecondary).toHaveClass('btn');
  await expect(roundedSecondary).toHaveClass('btn-lg');
  await expect(roundedSecondary).toHaveClass('!rounded-lg');

  // Check rounded outline secondary button
  const roundedOutlineSecondary = canvas.getByTestId(
    'rounded-outline-secondary-button'
  );
  await expect(roundedOutlineSecondary).toHaveClass('btn');
  await expect(roundedOutlineSecondary).toHaveClass('btn-lg');
  await expect(roundedOutlineSecondary).toHaveClass('!rounded-xl');
};

// Size Variants
export const Sizes: StoryFn = () => (
  <div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="default">
        Default
      </Button>
      <Button size="sm" variant="primary">
        Primary
      </Button>
      <Button size="sm" variant="outline-primary">
        Outline Primary
      </Button>
      <Button size="sm" variant="secondary">
        Secondary
      </Button>
      <Button size="sm" variant="outline-secondary">
        Outline Secondary
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button size="md" variant="default">
        Default
      </Button>
      <Button size="md" variant="primary">
        Primary
      </Button>
      <Button size="md" variant="outline-primary">
        Outline Primary
      </Button>
      <Button size="md" variant="secondary">
        Secondary
      </Button>
      <Button size="md" variant="outline-secondary">
        Outline Secondary
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button size="lg" variant="default">
        Default
      </Button>
      <Button size="lg" variant="primary">
        Primary
      </Button>
      <Button size="lg" variant="outline-primary">
        Outline Primary
      </Button>
      <Button size="lg" variant="secondary">
        Secondary
      </Button>
      <Button size="lg" variant="outline-secondary">
        Outline Secondary
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button size="xl" variant="default">
        Default
      </Button>
      <Button size="xl" variant="primary">
        Primary
      </Button>
      <Button size="xl" variant="outline-primary">
        Outline Primary
      </Button>
      <Button size="xl" variant="secondary">
        Secondary
      </Button>
      <Button size="xl" variant="outline-secondary">
        Outline Secondary
      </Button>
    </div>
  </div>
);
// Size Variants Tests
Sizes.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all size variants are rendered (5 variants * 4 sizes = 20 buttons)
  await expect(buttons).toHaveLength(20);

  // Test small buttons
  const smButtons = buttons.slice(0, 5);
  smButtons.forEach(async (button) => {
    await expect(button).toHaveClass('btn-sm');
  });

  // Test medium buttons
  const mdButtons = buttons.slice(5, 10);
  mdButtons.forEach(async (button) => {
    await expect(button).toHaveClass('btn-md');
  });

  // Test large buttons
  const lgButtons = buttons.slice(10, 15);
  lgButtons.forEach(async (button) => {
    await expect(button).toHaveClass('btn-lg');
  });

  // Test extra large buttons
  const xlButtons = buttons.slice(15, 20);
  xlButtons.forEach(async (button) => {
    await expect(button).toHaveClass('btn-xl');
  });
};

// Full Width Buttons
export const FullWidth: StoryFn = () => (
  <div className="space-y-2 w-full">
    <Button size="full" variant="primary">
      Primary
    </Button>
    <Button size="full" variant="outline-primary">
      Outline Primary
    </Button>
    <Button size="full" variant="secondary">
      Secondary
    </Button>
    <Button size="full" variant="outline-secondary">
      Outline Secondary
    </Button>
  </div>
);

// Full Width Tests
FullWidth.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all full width variants are rendered
  await expect(buttons).toHaveLength(4);

  // Test each full width button
  buttons.forEach(async (button) => {
    // Check for full width size class
    await expect(button).toHaveClass('btn-full');
  });

  // Test specific variants
  const [primary, outlinePrimary, secondary, outlineSecondary] = buttons;

  // Check primary button styles
  await expect(primary).toHaveClass('btn-primary', 'dark:btn-dark-primary');

  // Check outline primary button styles
  await expect(outlinePrimary).toHaveClass(
    'btn-outline-primary',
    'dark:btn-outline-dark-primary'
  );

  // Check secondary button styles
  await expect(secondary).toHaveClass(
    'btn-secondary',
    'dark:btn-dark-secondary'
  );

  // Check outline secondary button styles
  await expect(outlineSecondary).toHaveClass(
    'btn-outline-secondary',
    'dark:btn-outline-dark-secondary'
  );
};

// Scale Animation
export const ScaleAnimation: StoryFn = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-2">
      <Button variant="default" scale>
        Default
      </Button>
      <Button variant="primary" scale>
        Primary
      </Button>
      <Button variant="outline-primary" scale>
        Outline Primary
      </Button>
      <Button variant="secondary" scale>
        Secondary
      </Button>
      <Button variant="outline-secondary" scale>
        Outline Secondary
      </Button>
    </div>
  </div>
);
// Scale Animation Tests
ScaleAnimation.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all scale variants are rendered
  await expect(buttons).toHaveLength(5);

  // Test scale animation classes on each button
  buttons.forEach(async (button) => {
    await expect(button).toHaveClass('transition-all');
    await expect(button).toHaveClass('transform');
    await expect(button).toHaveClass('hover:scale-x-105');
    await expect(button).toHaveClass('hover:scale-y-105');
  });

  // Interaction Test - Hover
  const firstButton = buttons[0];
  await userEvent.hover(firstButton);
  // Note: We can't test actual scaling as it's a CSS transform,
  // but we can verify the hover classes are applied
  await expect(firstButton).toHaveClass('hover:scale-x-105');
  await expect(firstButton).toHaveClass('hover:scale-y-105');
};

// Icon Buttons
export const IconButtons: StoryFn = () => (
  <div className="flex items-center gap-4">
    <Button
      variant="primary"
      size="none"
      gap={2}
      icon={<SvgIcon name="Edit" />}
    >
      Button
    </Button>
    <Button variant="primary" size="sm" gap={3} icon={<SvgIcon name="Edit" />}>
      Button
    </Button>
    <Button variant="primary" size="md" gap={3} icon={<SvgIcon name="Edit" />}>
      Button
    </Button>
    <Button variant="primary" size="lg" gap={2} icon={<SvgIcon name="Edit" />}>
      Button
    </Button>
    <Button variant="primary" size="xl" gap={4} icon={<SvgIcon name="Edit" />}>
      Button
    </Button>
  </div>
);

// Icon Buttons Tests
IconButtons.play = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const buttons = canvas.getAllByRole('button');

  // Check if all icon buttons are rendered
  await expect(buttons).toHaveLength(5);

  // Configuration for each button size
  const buttonConfigs = [
    { size: 'none', iconSize: 10, gap: 2 },
    { size: 'sm', iconSize: 12, gap: 3 },
    { size: 'md', iconSize: 14, gap: 3 },
    { size: 'lg', iconSize: 16, gap: 2 },
    { size: 'xl', iconSize: 18, gap: 4 },
  ];

  // Test each button configuration
  buttons.forEach(async (button, index) => {
    const config = buttonConfigs[index];

    // Check base button classes
    await expect(button).toHaveClass(
      'btn',
      'btn-primary',
      'dark:btn-dark-primary'
    );

    // Check size-specific classes
    if (config.size !== 'none') {
      await expect(button).toHaveClass(`btn-${config.size}`);
    }

    // Check flex and gap classes
    await expect(button).toHaveClass(
      'flex',
      'items-center',
      `gap-${config.gap}`
    );

    // Check icon size
    const svg = button.querySelector('svg');
    await expect(svg).toBeInTheDocument();

    // Check icon position and text content
    const buttonChildren = Array.from(button.children);
    await expect(buttonChildren[0]).toContainElement(svg); // Icon should be in first span
  });

  // Interaction Tests
  const firstButton = buttons[0];

  // Test focus state
  await userEvent.tab();
  await expect(firstButton).toHaveFocus();
};

// Disabled State
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

// Disabled Button Tests
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Visual Tests
  const button = canvas.getByRole('button');

  // Check if button is rendered with disabled state
  await expect(button).toBeDisabled();

  // Check for disabled styles
  await expect(button).toHaveClass('opacity-50', '!cursor-not-allowed');

  // Check base variant styles
  await expect(button).toHaveClass('btn-primary', 'dark:btn-dark-primary');

  // Check text content
  await expect(button).toHaveTextContent('Disabled Button');

  // Interaction Tests
  // Test that hover styles are not applied
  await userEvent.hover(button);
  await expect(button).not.toHaveClass('hover:opacity-90');

  // Test that focus is not possible
  await userEvent.tab();
  await expect(button).not.toHaveFocus();

  // Test cursor style
  const computedStyle = window.getComputedStyle(button);
  expect(computedStyle.cursor).toBe('not-allowed');
};

// Source Code
export const SourceCode = CreateSourceCodeStory(ButtonSourceCode);
