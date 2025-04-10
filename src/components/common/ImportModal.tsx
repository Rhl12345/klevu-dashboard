import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IImportModalProps, IImportFormValues } from "@/types/stores/ecommerce/product-order/productOrder.type";
import * as Yup from "yup";


const ImportModal = (props: IImportModalProps) => {
  const { isOpen, onClose } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: IImportFormValues) => {
    if (!formik.isValid) {
      formik.setTouched({ file: true });
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate API delay
      toast.success("Products imported successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to import products");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik<IImportFormValues>({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("File is required")
        .test(
          "fileFormat",
          "Only CSV files are allowed",
          (value) => {
            if (value instanceof File) {
              const allowedTypes = ["text/csv"];
              return allowedTypes.includes(value.type);
            }
            return false;
          }
        ),
    }),
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={"Import Products"}
      aria-labelledby="create-page-modal"
      content={
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            formik={false}
            id="file"
            type="file"
            label="Select File"
            name="file"
            placeholder="Select File"
            onChange={(event) => {
              const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
              formik.setFieldValue("file", file);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.file && formik.errors.file ? true : false}
            errorMessage={formik.errors.file}
          />
        </form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={handleClose}
            size="sm"
            variant="outline-secondary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => formik.handleSubmit()}
            size="sm"
            variant="primary"
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? "Importing..." : "Import"}
          </Button>
        </div>
      }
    />
  );
};

export default ImportModal;
