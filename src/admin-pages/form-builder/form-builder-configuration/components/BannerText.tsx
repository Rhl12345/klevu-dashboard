import Button from "@/components/Button/Button";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";
import { IBannerTextState } from "@/types/form-builder/formBuilderConfiguration.type";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

const initialState: IBannerTextState = {
  text: "",
  error: "",
  isSaving: false,
};

const BannerTextSection = ({
  textEditorTitle,
}: {
  textEditorTitle: string;
}) => {
  const [state, setState] = useState<IBannerTextState>(initialState);

  const handleTextChange = (newText: string) => {
    setState((prev) => ({
      ...prev,
      text: newText,
      error: "", // Clear error when text changes
    }));
  };

  const handleSave = () => {
    if (!state.text.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Please enter some text before saving",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isSaving: true, error: "" }));

    try {
      // TODO: Add your save logic here
      toast.success(
        `${textEditorTitle === "bannerText" ? "Banner text" : "Receipt Header Note"} saved successfully`
      );
      // After successful save
      setState((prev) => ({ ...prev, isSaving: false }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: "Failed to save. Please try again.",
      }));
    }
  };

  return (
    <div className="flex flex-col px-8 py-2">
      <Label>
        {textEditorTitle === "bannerText"
          ? "Banner Text"
          : "Receipt Header Note"}
      </Label>
      <div className="mt-2">
        <RichTextEditor initialData={state.text} onChange={handleTextChange} />
        {state.error && <FormErrorMessage>{state.error}</FormErrorMessage>}
      </div>
      <div className="mt-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={state.isSaving}
        >
          {state.isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default BannerTextSection;
