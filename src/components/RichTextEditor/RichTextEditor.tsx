"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Autoformat,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  SourceEditing,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";
import "@/components/RichTextEditor/richtext.css";
export interface RichTextProps {
  initialData?: string;
  onChange?: (data: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  asterisk?: boolean;
}

const RichTextEditor = ({
  initialData = "",
  onChange,
  disabled = false,
  placeholder = "Start typing...",
  className = "bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark",
  label = "",
  error = false,
  errorMessage = "",
  asterisk = false,
}: RichTextProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label>
          {label}
          {asterisk && <span className="text-danger">*</span>}
        </Label>
      )}
      <div className={`rich-text-editor-wrapper ${className}`}>
        <CKEditor
          editor={ClassicEditor}
          disabled={disabled}
          data={initialData}
          config={{
            licenseKey: "GPL",
            plugins: [
              SourceEditing,
              Autoformat,
              BlockQuote,
              Bold,
              CloudServices,
              Essentials,
              Heading,
              Image,
              ImageCaption,
              ImageResize,
              ImageStyle,
              ImageToolbar,
              ImageUpload,
              Base64UploadAdapter,
              Indent,
              IndentBlock,
              Italic,
              Link,
              List,
              MediaEmbed,
              Mention,
              Paragraph,
              PasteFromOffice,
              PictureEditing,
              Table,
              TableColumnResize,
              TableToolbar,
              TextTransformation,
              Underline,
            ],
            toolbar: [
              "SourceEditing",
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "link",
              "uploadImage",
              "ckbox",
              "insertTable",
              "blockQuote",
              "mediaEmbed",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
              ],
            },
            image: {
              resizeOptions: [
                {
                  name: "resizeImage:original",
                  label: "Default image width",
                  value: null,
                },
                {
                  name: "resizeImage:50",
                  label: "50% page width",
                  value: "50",
                },
                {
                  name: "resizeImage:75",
                  label: "75% page width",
                  value: "75",
                },
              ],
              toolbar: [
                "imageTextAlternative",
                "toggleImageCaption",
                "|",
                "imageStyle:inline",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "|",
                "resizeImage",
              ],
            },
            link: {
              addTargetToExternalLinks: true,
              defaultProtocol: "https://",
            },
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
            placeholder,
            initialData,
          }}
          onChange={(event: any, editor: any) => {
            const data = editor?.getData();
            onChange?.(data);
          }}
        />
      </div>
      {error && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </div>
  );
};

export default RichTextEditor;
