import React from "react";
import Input from "@/components/Input/Input";
import dynamic from "next/dynamic";
import { Label } from "@/components/Label/Label";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);

interface PasswordPopUpValues {
  title: string;
  description: string;
}

const PasswordPopUp = () => {
  const formik = useFormik<PasswordPopUpValues>({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      toast.success("Password pop up text saved successfully");
      // Handle form submission here
    },
  });

  return (
    <div className="col-span-4 lg:col-span-2 px-6">
      <form
        onSubmit={formik.handleSubmit}
        className="col-span-12 lg:col-span-6 mt-4 flex-1 mx-3"
      >
        <div className="pb-3">
          <Input
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            formik={false}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.title && formik.errors.title)}
            errorMessage={formik.touched.title && formik.errors.title}
          />
        </div>
        <div className="mt-4">
          <Label>Description</Label>
          <div className="mt-2">
            <RichTextEditor
              initialData={formik.values.description}
              onChange={(value: string) =>
                formik.setFieldValue("description", value)
              }
            />
            {formik.touched.description && formik.errors.description && (
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            )}
          </div>
        </div>
        <div className="mt-2 py-4">
          <Button size="sm" type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordPopUp;
