import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import RichTextEditor from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichText",
  component: RichTextEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialData: {
      control: "text",
      description: "Initial content of the editor",
    },
    onChange: {
      action: "changed",
      description: "Callback when content changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the editor is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    initialData: "<h1>Hello from CKEditor 5! adsasdasdasd</h1>",
    placeholder: "Type your content here...",
  },
};

export const Empty: Story = {
  args: {
    placeholder: "Type your content here...",
  },
};

export const Disabled: Story = {
  args: {
    initialData: "<p>This editor is disabled</p>",
    disabled: true,
  },
};

export const WithInteractionTest: Story = {
  args: {
    initialData: "<p>Test content</p>",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find the editor container
    await waitFor(async () => {
      const editorContainer = canvas.getByRole("textbox");

      // Verify initial content
      await expect(editorContainer).toBeInTheDocument();
      await expect(editorContainer).toHaveTextContent("Test content");

      // Test editor focus
      await userEvent.click(editorContainer);
      await expect(editorContainer).toHaveFocus();

      // Test toolbar buttons
      const boldButton = canvas.getByRole("button", { name: /bold/i });
      const italicButton = canvas.getByRole("button", { name: /italic/i });

      await expect(boldButton).toBeInTheDocument();
      await expect(italicButton).toBeInTheDocument();
    });
  },
};

export const WithFormattingTest: Story = {
  args: {
    initialData: "<p>Format this text</p>",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      const editorContainer = canvas.getByRole("textbox");

      // Click the editor to focus it
      await userEvent.click(editorContainer);

      // Test bold formatting
      const boldButton = canvas.getByRole("button", { name: /bold/i });
      await userEvent.click(boldButton);

      // Test italic formatting
      const italicButton = canvas.getByRole("button", { name: /italic/i });
      await userEvent.click(italicButton);
    });
  },
};
