import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ICreatePageModalProps } from "@/types/content-management/content-builder/contentBuilder.type";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createPage } from "@/services/content-management/content-builder/content-bulder-list.service";
import { PageRoutes } from "@/admin-pages/routes";

const CreatePageModal = (props: ICreatePageModalProps) => {
  const { isOpen, onClose, pageType } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { pageName: string }) => {
    if (!formik.isValid) return;
    setIsSubmitting(true);
    try {
      // Simulate API delay
      const pageId = await createPage(values.pageName, pageType);
      router.push(`${PageRoutes.CONTENT_MANAGEMENT.EDIT}/${pageId}`);
      toast.success("Page created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create page");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      pageName: "",
    },
    validationSchema: Yup.object({
      pageName: Yup.string().required("Page Name is required"),
    }),
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={"Create Page"}
      aria-labelledby="create-page-modal"
      content={
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            id="pageName"
            name="pageName"
            label="Page Name"
            placeholder="Page Name"
            value={formik.values.pageName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={false}
            error={
              formik.touched.pageName && formik.errors.pageName ? true : false
            }
            errorMessage={formik.errors.pageName}
            asterisk
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
            {isSubmitting ? "Creating..." : "Create Page"}
          </Button>
        </div>
      }
    />
  );
};

export default CreatePageModal;
