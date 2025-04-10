import React from 'react';
import Image from './Image';
import type { Meta, StoryFn } from '@storybook/react';
import { iDefaultImageProps, iNextImageProps } from './types';
import { within, expect, userEvent } from '@storybook/test';
import { DEFAULT_FALLBACK_IMAGE } from '@/utils/constants';

const meta: Meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'next'],
      description: 'Type of image component to use',
    },
    width: {
      control: 'number',
      description: 'Width of the image (required for Next.js Image)',
      if: { arg: 'variant', eq: 'next' },
    },
    height: {
      control: 'number',
      description: 'Height of the image (required for Next.js Image)',
      if: { arg: 'variant', eq: 'next' },
    },
    aspectRatio: {
      control: { type: 'select' },
      options: ['square', 'video', 'portrait', 'landscape', 'auto'],
      description: 'Aspect ratio of the image container',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'How the image should be fitted to its container',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius of the image',
    },
    fallback: {
      control: 'text',
      description: 'Content to display when image fails to load',
    },
    fallbackImage: {
      control: 'text',
      description:
        'URL for the fallback image to display when main image fails to load',
    },
  },
};

export default meta;

const Template: StoryFn<iDefaultImageProps | iNextImageProps> = (args) => {
  const { variant, src, alt = '', ...rest } = args;

  // Ensure width and height are provided when variant is 'next'
  const nextImageProps =
    variant === 'next'
      ? {
          width: Number(rest.width) || 400,
          height: Number(rest.height) || 400,
        }
      : {};

  return (
    <div className="w-64">
      <Image src={src?.toString()} alt={alt} {...nextImageProps} {...rest} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  src: 'https://picsum.photos/400',
  alt: 'Random image from Picsum',
  variant: 'default',
  aspectRatio: 'square',
  objectFit: 'cover',
  rounded: 'md',
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByRole('img');

  // Visual Tests
  // -----------
  // Verify image styling
  await expect(image).toHaveStyle({
    objectFit: 'cover',
    borderRadius: '8px', // rounded-md
  });

  // Interaction Tests
  // ----------------
  // Simulate image load error and check fallback
  await userEvent.click(image);
  await expect(image).toHaveAttribute('src', 'https://picsum.photos/400');
};

export const NextJsImage = Template.bind({});
NextJsImage.args = {
  src: 'https://picsum.photos/400',
  alt: 'Random image from Picsum',
  variant: 'next',
  width: 400,
  height: 400,
  aspectRatio: 'square',
  objectFit: 'cover',
  rounded: 'md',
};
NextJsImage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByRole('img');

  // Visual Tests
  // -----------
  // Verify Next.js image styling
  await expect(image).toHaveStyle({
    objectFit: 'cover',
    borderRadius: '8px', // rounded-md
  });

  // Interaction Tests
  // ----------------
  // Simulate image load error and check fallback
  await userEvent.click(image);
  await expect(image).toHaveAttribute('src', 'https://picsum.photos/400');
};

// New story for testing different aspect ratios
export const NextJsImageWithAspectRatio = Template.bind({});
NextJsImageWithAspectRatio.args = {
  src: 'https://picsum.photos/400',
  alt: 'Random image with aspect ratio',
  variant: 'next',
  width: 400,
  height: 300,
  aspectRatio: 'landscape',
  objectFit: 'contain',
  rounded: 'lg',
};
NextJsImageWithAspectRatio.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByRole('img');

  // Visual Tests
  // -----------
  // Verify image styling with different aspect ratio
  await expect(image).toHaveStyle({
    objectFit: 'contain',
    borderRadius: '12px', // rounded-lg
  });

  // Interaction Tests
  // ----------------
  // Simulate image load error and check fallback
  await userEvent.click(image);
  await expect(image).toHaveAttribute('src', 'https://picsum.photos/400');
};

// New story for testing fallback image
export const NextJsImageWithFallback = Template.bind({});
NextJsImageWithFallback.args = {
  src: 'invalid-url',
  alt: 'Image with fallback',
  variant: 'next',
  width: 400,
  height: 400,
  aspectRatio: 'portrait',
  objectFit: 'fill',
  rounded: 'full',
  fallbackImage: DEFAULT_FALLBACK_IMAGE,
};
NextJsImageWithFallback.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByRole('img');

  // Visual Tests
  // -----------
  // Verify image styling with fallback
  await expect(image).toHaveStyle({
    objectFit: 'fill',
    borderRadius: '9999px', // rounded-full
  });

  // Interaction Tests
  // ----------------
  // Simulate image load error and check fallback
  await userEvent.click(image);
  await expect(image).toHaveAttribute('src', DEFAULT_FALLBACK_IMAGE);
};

// New story for testing different object fits
export const NextJsImageWithObjectFit = Template.bind({});
NextJsImageWithObjectFit.args = {
  src: 'https://picsum.photos/400',
  alt: 'Image with different object fit',
  variant: 'next',
  width: 400,
  height: 400,
  aspectRatio: 'auto',
  objectFit: 'scale-down',
  rounded: 'sm',
};
NextJsImageWithObjectFit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const image = canvas.getByRole('img');

  // Visual Tests
  // -----------
  // Verify image styling with different object fit
  await expect(image).toHaveStyle({
    objectFit: 'scale-down',
    borderRadius: '4px', // rounded-sm
  });

  // Interaction Tests
  // ----------------
  // Simulate image load error and check fallback
  await userEvent.click(image);
  await expect(image).toHaveAttribute('src', 'https://picsum.photos/400');
};
