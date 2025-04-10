import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";

import { RecStatusValuebyName } from "@/utils/constants";
import { paymentTypeSchema } from "@/utils/validations/paymentType.validation";
import { getErrorMessage } from "@/utils/common.util";

import {
  IPaymentTypeModal,
  IPaymentTypeValues,
} from "@/types/payment-types/paymentTypes.type";
import { FORM_FIELDS } from "@/mock-data/paymentType";
import paymentTypeData from "@/mock-data/paymentTypeList.json";

const DATA = paymentTypeData.data;

const PaymentTypeModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
}: IPaymentTypeModal) => {
  const [paymentType, setPaymentType] = useState<IPaymentTypeValues | null>(
    null
  );

  useEffect(() => {
    if (editId) {
      const editData = DATA?.find(
        (item: IPaymentTypeValues) => item.id === editId
      );
      setPaymentType(editData || null);
    } else {
      setPaymentType(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: paymentType?.id || 0,
      name: paymentType?.name || "",
      isMultipleSelect: paymentType?.isMultipleSelect || false,
      recStatus: paymentType?.recStatus || RecStatusValuebyName.Active,
    },
    validationSchema: paymentTypeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IPaymentTypeValues);
        toast.success(
          `Successfully ${editId ? "updated" : "created"} payment type`
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
      name: keyof IPaymentTypeValues,
      label: string,
      options?: {
        type?: "input" | "toggle";
        inputType?: string;
        asterisk?: boolean;
      }
    ) => {
      if (options?.type === "toggle") {
        return (          
          <div className="w-full" key={name}>
            <ToggleButton
              asterisk={true}
              label={label}
              name={name}
              id={name}
              size="small"
              on={name === "recStatus" ? "Active" : "Yes"}
              off={name === "recStatus" ? "Inactive" : "No"}
              defaultValue={
                name === "recStatus"
                  ? formik.values[name as keyof typeof formik.values] ===
                    RecStatusValuebyName.Active
                  : Boolean(formik.values[name as keyof typeof formik.values])
              }
              onChange={(value) => {
                formik.setFieldValue(
                  name,
                  name === "recStatus"
                    ? value
                      ? RecStatusValuebyName.Active
                      : RecStatusValuebyName.Inactive
                    : value
                );
              }}
            />
          </div>
        );
      }

      return (
        <div className="w-full" key={name}>
          <Input
            asterisk={options?.asterisk}
            label={label}
            name={name}
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
      header={editId !== null ? "Edit Payment Type" : "Add Payment Type"}
      content={
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 lg:gap-6">
            {FORM_FIELDS.map(({ name, label, options }) =>
              renderField(
                name as keyof IPaymentTypeValues,
                label,
                options as { type?: "input" | "toggle"; asterisk?: boolean }
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

export default PaymentTypeModal;
