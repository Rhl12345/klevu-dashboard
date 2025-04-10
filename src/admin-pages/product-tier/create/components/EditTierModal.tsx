import React, { useMemo, useState } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import { IEditTierFormValues, IEditTierModalProps } from "@/types/product-tier/productTier.type";
import { toast } from "react-toastify";
import { validationTierSchema } from "@/utils/validations/tier.validation";


const EditTierModal: React.FC<IEditTierModalProps> = ({ editTier, isOpen, onClose }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formvalues: IEditTierFormValues) => {
    if (!formik.isValid) return;
    setIsSubmitting(true);
    try {
      // Simulate API delay
      toast.success('Tier updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update tier');
    } finally {
      setIsSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: useMemo(() => ({
      tierName: editTier?.tierName || "",
      tierValue: editTier?.tierValue || 0,
    }), [editTier]),
    validationSchema: validationTierSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleSave = () => formik.handleSubmit();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={"Edit Tier"}
      aria-labelledby="edit-tier-modal"
      content={
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            id="tierName"
            name="tierName"
            label="Tier Name"
            placeholder="Enter Tier Name"
            value={formik.values.tierName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={false}
            error={
              formik.touched.tierName && formik.errors.tierName ? true : false
            }
            errorMessage={formik.errors.tierName}
            asterisk
          />

          <Input
            id="tierValue"
            name="tierValue"
            label="Tier"
            placeholder="Enter Tier"
            value={formik.values.tierValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            formik={false}
            error={
              formik.touched.tierValue && formik.errors.tierValue
                ? true
                : false
            }
            errorMessage={formik.errors.tierValue}
            asterisk
            type="number"
            min={0}
            step={1}
          />
        </form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} size="sm" variant="outline-secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            variant="primary"
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      }
    />
  );
};

export default EditTierModal;
