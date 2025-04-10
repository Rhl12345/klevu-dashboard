"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/DropDown/DropDown";
import InputNumber from "@/components/Input/InputNumber";

import { RecStatusValuebyName } from "@/utils/constants";
import { shippingMethodSchema } from "@/utils/validations/shippingMethod.validation";

import {
  IShippingMethodModal,
  IShippingMethodValues,
} from "@/types/shipping-method/shippingMethod.type";
import shippingMethodData from "@/mock-data/shippingMethodList.json";

const DATA = shippingMethodData.data;

const shippingServicesData = DATA.map(
  (item: { shippingServicesId: number; shippingServicesName: string }) => ({
    value: item.shippingServicesId,
    label: item.shippingServicesName,
  })
);

const ShippingMethodModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
}: IShippingMethodModal) => {
  const [shippingMethod, setShippingMethod] =
    useState<IShippingMethodValues | null>(null);

  useEffect(() => {
    if (editId) {
      const editData = DATA?.find((item) => item.id === editId) as
        | IShippingMethodValues
        | undefined;
      setShippingMethod(editData || null);
    } else {
      setShippingMethod(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: shippingMethod?.id || 0,
      name: shippingMethod?.name || "",
      shippingVia: shippingMethod?.shippingVia || "",
      charges: shippingMethod?.charges || "",
      recStatus: shippingMethod?.recStatus || RecStatusValuebyName.Active,
      shippingServicesId: shippingMethod?.shippingServicesId || "",
    },
    validationSchema: shippingMethodSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IShippingMethodValues);
        toast.success(
          `Successfully ${editId ? "updated" : "created"} shipping method`
        );
        onClose();
      } catch (error) {
        toast.error(
          `Failed to ${editId ? "update" : "create"} shipping method`
        );
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
      name: keyof IShippingMethodValues,
      label: string,
      options?: {
        type?: "input" | "toggle" | "dropdown" | "input-number";
        inputType?: string;
        asterisk?: boolean;
      }
    ) => {
      if (options?.type === "toggle") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <ToggleButton
              label={label}
              name={name}
              id={name}
              size="small"
              on="Active"
              off="Inactive"
              asterisk={true}
              defaultValue={
                formik.values[name as keyof typeof formik.values] ===
                RecStatusValuebyName.Active
              }
              onChange={(value) => {
                formik.setFieldValue(
                  name,
                  value
                    ? RecStatusValuebyName.Active
                    : RecStatusValuebyName.Inactive
                );
              }}
            />
          </div>
        );
      }

      if (options?.type === "dropdown") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <Dropdown
              asterisk={options?.asterisk}
              aria-label={`Select ${label.toLowerCase()}`}
              id={name}
              name={name}
              label={label}
              options={shippingServicesData}
              value={shippingServicesData.find(
                (option) =>
                  option.value ===
                  formik.values[name as keyof typeof formik.values]
              )}
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

      if (options?.type === "input-number") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <InputNumber
              asterisk={true}
              name={name}
              label={label}
              placeholder={`Enter ${label.toLowerCase()}`}
              min={0}
              type={options?.inputType || "number"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name as keyof typeof formik.values]}
              error={
                formik.touched[name as keyof typeof formik.touched] &&
                !!formik.errors[name as keyof typeof formik.errors]
              }
              errorMessage={
                formik.touched[name as keyof typeof formik.touched] &&
                typeof formik.errors[name as keyof typeof formik.errors] ===
                  "string"
                  ? formik.errors[name as keyof typeof formik.errors]
                  : undefined
              }
              formik={false}
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
            placeholder={`Enter ${label.toLowerCase()}`}
            type={options?.inputType || "text"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name as keyof typeof formik.values]}
            error={
              formik.touched[name as keyof typeof formik.touched] &&
              !!formik.errors[name as keyof typeof formik.errors]
            }
            errorMessage={
              (formik.touched[name as keyof typeof formik.touched] &&
                formik.errors[name as keyof typeof formik.errors]) ||
              undefined
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
      header={editId !== null ? "Edit Shipping Method" : "Add Shipping Method"}
      content={
        <form onSubmit={formik.handleSubmit}>
          {renderField("name", "Name", { asterisk: true })}
          {renderField("shippingVia", "Shipping Via", { asterisk: true })}
          {renderField("charges", "Charges ($)", {
            asterisk: true,
            type: "input-number",
            inputType: "number",
          })}

          {renderField("shippingServicesId", "Shipping Services", {
            type: "dropdown",
            asterisk: true,
          })}
          {renderField("recStatus", "Status", { type: "toggle" })}
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

export default ShippingMethodModal;
