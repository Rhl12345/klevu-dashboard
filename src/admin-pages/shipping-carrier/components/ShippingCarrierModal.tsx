import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import { RecStatusValuebyName } from "@/utils/constants";
import { shippingCarrierSchema } from "@/utils/validations/shippingCarrier.validation";
import { getErrorMessage } from "@/utils/common.util";

import {
  IShippingCarrierModal,
  IShippingCarrierValues,
} from "@/types/shipping-carrier/shippingCarrier.type";
import shippingCarrierData from "@/mock-data/shippingCarrierList.json";

const DATA = shippingCarrierData.data;

const ShippingCarrierModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
}: IShippingCarrierModal) => {
  const [shippingCarrier, setShippingCarrier] =
    useState<IShippingCarrierValues | null>(null);

  const [showType, setShowType] = useState("password");

  useEffect(() => {
    if (editId) {
      const editData = DATA?.find((item) => item.id === editId) as
        | IShippingCarrierValues
        | undefined;
      setShippingCarrier(editData || null);
    } else {
      setShippingCarrier(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: shippingCarrier?.id || 0,
      name: shippingCarrier?.name || "",
      userName: shippingCarrier?.userName || "",
      password: shippingCarrier?.password || "",
      clientKey: shippingCarrier?.clientKey || "",
      secretKey: shippingCarrier?.secretKey || "",
      token: shippingCarrier?.token || "",
      url: shippingCarrier?.url || "",
      recStatus: shippingCarrier?.recStatus || RecStatusValuebyName.Active,
    },
    validationSchema: shippingCarrierSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IShippingCarrierValues);
        toast.success(
          `Successfully ${editId ? "updated" : "created"} shipping carrier`
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
      name: keyof IShippingCarrierValues,
      label: string,
      options?: {
        type?: "input" | "toggle";
        inputType?: string;
        asterisk?: boolean;
        icon?: string;
      }
    ) => {
      if (options?.type === "toggle") {
        return (
          <div className="w-full mb-4 last:mb-0" key={name}>
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
        <div className="w-full mb-4 last:mb-0" key={name}>
          <div className="relative">
            <Input
              asterisk={options?.asterisk}
              label={label}
              name={name}
              placeholder={`Enter ${label}`}
              type={showType === options?.inputType ? "password" : "text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name as keyof typeof formik.values]}
              errorMessage={
                formik.touched[name as keyof typeof formik.touched] &&
                formik.errors[name as keyof typeof formik.errors]
              }
              formik={false}
            />
            {options?.inputType === "password" && (
              <Button
                className="absolute right-3 top-10 !p-0 min-w-0"
                onClick={() =>
                  setShowType(showType === "password" ? "text" : "password")
                }
                variant="default"
                type="button"
                size="none"
                aria-label={
                  showType === "password" ? "Hide password" : "Show password"
                }
              >
                {showType === "password" ? (
                  <SvgIcon name="EyeOpen" />
                ) : (
                  <SvgIcon name="EyeClosed" />
                )}
              </Button>
            )}
          </div>
        </div>
      );
    },
    [formik]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={
        editId !== null ? "Edit Shipping Carrier" : "Add Shipping Carrier"
      }
      content={
        <form onSubmit={formik.handleSubmit}>
          {renderField("name", "Name", { asterisk: true })}
          {renderField("userName", "User Name")}
          {renderField("password", "Password", {
            inputType: "password",
          })}
          {renderField("clientKey", "Client Key")}
          {renderField("secretKey", "Secret Key")}
          {renderField("token", "Token")}
          {renderField("url", "URL")}
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

export default ShippingCarrierModal;
