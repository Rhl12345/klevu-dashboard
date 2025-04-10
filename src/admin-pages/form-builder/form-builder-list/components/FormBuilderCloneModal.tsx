"use client";

import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/DropDown/DropDown";

import { getErrorMessage } from "@/utils/common.util";
import { formBuilderSchema } from "@/utils/validations/formBuilderCloneModal.validation";

import { FORM_FIELDS } from "@/mock-data/formBuilder";
import {
  IFormBuilderCloneModal,
  IFormBuilderValues,
} from "@/types/form-builder/formBuilder.type";

const FormBuilderCloneModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
  formbuilderData,
}: IFormBuilderCloneModal) => {
  const [formBuilder, setFormBuilder] = useState<IFormBuilderValues | null>(
    null
  );

  useEffect(() => {
    if (editId) {
      const editData = formbuilderData.find((item) => item.id === editId);
      setFormBuilder(editData as unknown as IFormBuilderValues);
    } else {
      setFormBuilder(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: formBuilder?.id || 0,
      name: formBuilder?.name || "",
      formType: formBuilder?.formType || "",
      programId: formBuilder?.storeCode || "",
      url: formBuilder?.url || "",
    },
    validationSchema: formBuilderSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IFormBuilderValues);
        toast.success(
          `Successfully ${editId ? "updated" : "created"} form builder`
        );
        onClose();
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  const renderField = useCallback(
    (
      name: keyof IFormBuilderValues,
      label: string,
      options?: {
        type?: "input" | "dropdown";
        asterisk?: boolean;
        options?: { label: string; value: string }[];
      }
    ) => {
      if (options?.type === "dropdown") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <Dropdown
              asterisk={options?.asterisk}
              aria-label={`Select ${label.toLowerCase()}`}
              id={name}
              name={name}
              label={label}
              isClearable
              options={options?.options || []}
              onChange={(newValue: unknown) => {
                const selectedOption = newValue as {
                  value: string;
                  label: string;
                } | null;
                if (selectedOption === null) {
                  formik.setFieldValue(name, "");
                } else {
                  formik.setFieldValue(name, selectedOption?.value || "");
                }
              }}
              placeholder={`Select ${label.toLowerCase()}`}
              errorMessage={
                (formik.touched[name as keyof typeof formik.touched] &&
                  formik.errors[name as keyof typeof formik.errors]) ||
                undefined
              }
            />
          </div>
        );
      }

      return (
        <div className="w-full mb-4 last:mb-0" key={name}>
          <Input
            asterisk={options?.asterisk}
            label={label}
            name={name}
            id={name}
            type={options?.type}
            placeholder={`Enter ${label.toLowerCase()}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name as keyof typeof formik.values]}
            error={
              formik.touched[name as keyof typeof formik.touched] &&
              !!formik.errors[name as keyof typeof formik.errors]
            }
            errorMessage={
              formik.touched[name as keyof typeof formik.touched] &&
              formik.errors[name as keyof typeof formik.errors]
            }
            formik={false}
          />
        </div>
      );
    },
    [formik]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={"Create Clone"}
      content={
        <form onSubmit={formik.handleSubmit}>
          {FORM_FIELDS.map(({ name, label, options }) =>
            renderField(
              name as keyof IFormBuilderValues,
              label,
              options as {
                type?: "input" | "dropdown";
                asterisk?: boolean;
                options?: { label: string; value: string }[];
              }
            )
          )}
        </form>
      }
      footer={
        <>
          <Button size="sm" variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Save
          </Button>
        </>
      }
    />
  );
};

export default FormBuilderCloneModal;
