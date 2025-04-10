import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import UploadImage from "@/components/UploadImage/UploadImage";
import InputNumber from "@/components/Input/InputNumber";

import { RecStatusValuebyName } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import { giftCardSchema } from "@/utils/validations/giftCards.validation";

import giftCards from "@/mock-data/giftCards.json";
import {
  IGiftCardModalProps,
  IGiftCardValues,
} from "@/types/gift-cards/giftCards.type";

const giftCardData = giftCards && giftCards.data;

const GiftCardModal = ({
  isOpen,
  onClose,
  onSubmit,
  editId,
}: IGiftCardModalProps) => {
  const [giftCard, setGiftCard] = useState<IGiftCardValues | null>(null);

  useEffect(() => {
    if (editId) {
      const editData = giftCardData?.find((item) => item.id === Number(editId));
      setGiftCard(editData as IGiftCardValues);
    } else {
      setGiftCard(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: giftCard?.id || 0,
      name: giftCard?.name || "",
      image: giftCard?.image || "",
      ourSku: giftCard?.ourSku || "",
      endDate: giftCard?.endDate || "",
      salePrice: Number(giftCard?.salePrice) || null,
      recStatus: giftCard?.recStatus || RecStatusValuebyName.Active,
    },
    validationSchema: giftCardSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IGiftCardValues);
        toast.success(
          `Gift Card ${editId ? "updated" : "created"} successfully`
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
      name: keyof IGiftCardValues,
      label: string,
      options?: {
        type?: "input" | "toggle" | "date" | "image" | "number";
        inputType?: string;
        asterisk?: boolean;
        icon?: string;
      }
    ) => {
      if (options?.type === "image") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <UploadImage
              id={name}
              asterisk
              label={label}
              maxImages={1}
              minImages={1}
              onUpload={(file) => {
                formik.setFieldValue("image", file[0]);
              }}
              initialImages={giftCard?.image ? [giftCard?.image] : []}
              errorMessage={formik.errors.image}
            />
          </div>
        );
      }
      if (options?.type === "toggle") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <ToggleButton
              asterisk={options?.asterisk}
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
      if (options?.type === "number") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
            <InputNumber
              asterisk={options?.asterisk}
              label={label}
              name={name}
              placeholder={`Enter ${label}`}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values[name as keyof typeof formik.values] || undefined
              }
              errorMessage={
                formik.touched[name as keyof typeof formik.touched] &&
                formik.errors[name as keyof typeof formik.errors]
                  ? (formik.errors[
                      name as keyof typeof formik.errors
                    ] as string)
                  : undefined
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
            placeholder={`Enter ${label}`}
            type={options?.inputType || "text"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name as keyof typeof formik.values]}
            errorMessage={
              formik.touched[name as keyof typeof formik.touched] &&
              formik.errors[name as keyof typeof formik.errors]
                ? (formik.errors[name as keyof typeof formik.errors] as string)
                : undefined
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
      header={editId !== null ? "Edit Gift Card" : "Add Gift Card"}
      content={
        <form onSubmit={formik.handleSubmit}>
          {renderField("name", "Name", { asterisk: true })}
          {renderField("image", "Image", { type: "image", asterisk: true })}
          {renderField("ourSku", "SKU", { asterisk: true })}
          {renderField("endDate", "End Date", {
            type: "date",
            inputType: "date",
            asterisk: true,
          })}
          {renderField("salePrice", "Price", {
            type: "number",
            inputType: "number",
            asterisk: true,
          })}
          {renderField("recStatus", "", { type: "toggle" })}
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

export default GiftCardModal;
