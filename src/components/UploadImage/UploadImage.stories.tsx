import { Meta, StoryFn } from "@storybook/react";
import UploadImage from "./UploadImage";

export default {
  title: "Components/UploadImage",
  component: UploadImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta;

// Template for the UploadImage component
const Template: StoryFn = (args) => (
  <UploadImage
    {...args}
    onUpload={(files) => console.log("Uploaded files:", files)}
  />
);

// Default story
export const Default = Template.bind({});
Default.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  className: "border p-4",
  maxImages: 1,
  minImages: 1,
};

// Story for multiple image uploads
export const MultipleImages = Template.bind({});
MultipleImages.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  className: "border p-4",
  maxImages: 3, // Allow up to 3 images
  minImages: 1, // Require at least 1 image
};

// Story for minimum image requirement
export const MinimumImagesRequired = Template.bind({});
MinimumImagesRequired.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  className: "border p-4",
  maxImages: 5, // Allow up to 5 images
  minImages: 2, // Require at least 2 images
};

// Story for exceeding maximum images
export const ExceedingMaxImages = Template.bind({});
ExceedingMaxImages.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  className: "border p-4",
  maxImages: 2, // Allow up to 2 images
  minImages: 1, // Require at least 1 image
};

// Story for no images uploaded
export const NoImagesUploaded = Template.bind({});
NoImagesUploaded.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  className: "border p-4",
  maxImages: 1,
  minImages: 1,
};

// Story for upload with label and asterisk
export const WithLabelAndAsterisk = Template.bind({});
WithLabelAndAsterisk.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  maxImages: 1,
  minImages: 1,
  label: "Upload Product Images",
  asterisk: true,
};

// Story for upload with label only
export const WithLabelOnly = Template.bind({});
WithLabelOnly.args = {
  onUpload: (files: File[]) => {
    console.log("Uploaded files:", files);
  },
  maxImages: 1,
  minImages: 1,
  label: "Upload Product Images",
};
