import React from "react";
import { useFormikContext } from "formik";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { IAddSizeModalProps, ISizeMasterFormValues, ISizeModalValues } from "@/types/sizemaster/sizemaster.type";
import { sizeValidationSchema } from "@/utils/validations/sizemaster.validation";

const AddEditSizeModal: React.FC<IAddSizeModalProps> = ({ editSize, isOpen, onClose }) => {
  const { values, setFieldValue } = useFormikContext<ISizeMasterFormValues>();

  const formik = useFormik({
    initialValues: {
      sizeName: editSize?.sizeName || "",
      displayOrder: editSize?.displayOrder || 0,
      status: editSize?.status || "A",
    },
    validationSchema: sizeValidationSchema,
    enableReinitialize: true,
    onSubmit: (formvalues: ISizeModalValues) => {
      setFieldValue("sizes", [...(values.sizes || []), formvalues]);
      onClose();
      formik.resetForm();
    },
  });

  // Helper function to render Input components
  const renderInput = (id: string, name: string, label: string, placeholder: string, asterisk: boolean, type?: string) => (
    <Input
      id={id}
      type={type}
      min={type === "number" ? 0 : undefined}
      name={name}
      label={label}
      placeholder={placeholder}
      value={formik.values[name as keyof ISizeModalValues]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      formik={false}
      error={formik.touched[name as keyof ISizeModalValues] && formik.errors[name as keyof ISizeModalValues] ? true : false}
      errorMessage={formik.touched[name as keyof ISizeModalValues] 
        ? formik.errors[name as keyof ISizeModalValues]
        : undefined}
      asterisk={asterisk}
      aria-required={asterisk}
      aria-invalid={formik.touched[name as keyof ISizeModalValues] && formik.errors[name as keyof ISizeModalValues] ? "true" : "false"}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={"Add Size"}
      content={
        <form onSubmit={formik.handleSubmit} className="space-y-4" aria-label="Add Size Form">
          {renderInput("sizeName", "sizeName", "Size Name", "Enter Size Name", true)}
          {renderInput("displayOrder", "displayOrder", "Display Order", "Enter Display Order", true, "number")}

          <div>
            <ToggleButton
              label="Status"
              id="status"
              name="status"
              off="Inactive"
              defaultValue={formik.values.status === "A"}
              onChange={(value) => {
                formik.setFieldValue("status", value ? "A" : "I");
              }}
              on="Active"
              size="small"
              aria-label="Status Toggle"
            />
          </div>
        </form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} size="sm" variant="outline-secondary" aria-label="Cancel">
            Cancel
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            size="sm"
            variant="primary"
            aria-label="Add Size"
          >
            Save
          </Button>
        </div>
      }
    />
  );
};

export default React.memo(AddEditSizeModal);
