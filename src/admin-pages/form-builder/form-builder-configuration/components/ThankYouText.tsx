import React, { useState } from "react";
import { Label } from "@/components/Label/Label";
import dynamic from "next/dynamic";
import Button from "@/components/Button/Button";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

const ThankYouTextSection = () => {
  // Add state for both text fields and error
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    error: false,
  });

  const handleSave = () => {
    if (!formData.topText.trim() || !formData.bottomText.trim()) {
      setFormData((prev) => ({ ...prev, error: true }));
      return;
    }
    toast.success("Thank you text saved successfully");
    // TODO: Add your save logic here
    setFormData((prev) => ({ ...prev, error: false }));
  };

  return (
    <div className="flex flex-col px-8 py-4">
      <div>
        <Label>Thank You Top</Label>
        <div className="mt-2">
          <RichTextEditor
            initialData={formData.topText}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, topText: value, error: false }))
            }
          />
          {formData.error && !formData.topText.trim() && (
            <FormErrorMessage>This field is required</FormErrorMessage>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Label>Thank You Bottom</Label>
        <div className="mt-2">
          <RichTextEditor
            initialData={formData.bottomText}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                bottomText: value,
                error: false,
              }))
            }
          />
          {formData.error && !formData.bottomText.trim() && (
            <FormErrorMessage>This field is required</FormErrorMessage>
          )}
        </div>
      </div>

      <div className="mt-2">
        <Button variant="primary" size="sm" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ThankYouTextSection;
