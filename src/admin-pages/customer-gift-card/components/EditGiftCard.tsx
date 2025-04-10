import React, { useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  IEditGiftCardModalProps,
  IGiftCardFormValues,
} from "@/types/gift-card/giftCard.type";
import Dropdown from "@/components/DropDown/DropDown";
import { toast } from "react-toastify";
import { validationSchema,getInitialValues } from "@/utils/validations/gift.validation";
import { updateGiftCard } from "@/services/gift-card/giftCard.service";
import { storeOptions,formFields } from "@/utils/Dummy";

const EditGiftCardModal: React.FC<IEditGiftCardModalProps> = (props) => {
  const { editGiftCard, isOpen, onClose, selectedStore, setGiftCardList } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: IGiftCardFormValues) => {
    try {
      setIsLoading(true);
      const result = await updateGiftCard(values);
      setGiftCardList(result?.items);
      toast.success("Gift card updated successfully");
      onClose();
      formik.resetForm();
    } catch (error) {
      toast.error("Failed to update gift card. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<IGiftCardFormValues>({
    initialValues: getInitialValues(editGiftCard, selectedStore),
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={"Edit Customer Gift Card"}
      content={
        // grid grid-cols-1 lg:grid-cols-2 gap-6
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 lg:gap-6">
          <Dropdown
            id="storeName"
            isDisabled={true}
            name="storeName"
            label="Store Name"
            placeholder="Select Store Name"
            options={storeOptions}
            value={storeOptions.find(
              (option) => option.value === selectedStore
            )}
            onChange={(value) => formik.setFieldValue("storeName", value)}
            onBlur={formik.handleBlur}
            error={
              formik.touched.storeName && formik.errors.storeName ? true : false
            }
            errorMessage={formik.errors.storeName as string}
            asterisk
          />

          {formFields.map((field) => (
            <Input
              key={field.id}
              id={field.id}
              name={field.id}
              label={field.label}
              placeholder={field.placeholder}
              value={formik.values[field.id as keyof IGiftCardFormValues]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              formik={false}
              error={
                formik.touched[field.id as keyof IGiftCardFormValues] &&
                formik.errors[field.id as keyof IGiftCardFormValues]
                  ? true
                  : false
              }
              errorMessage={
                formik.touched[field.id as keyof IGiftCardFormValues]
                  ? formik.errors[field.id as keyof IGiftCardFormValues]
                  : undefined
              }
              asterisk={field.required}
            />
          ))}

          <div>
            <ToggleButton
              label="Is Active"
              id="status"
              name="status"
              off="Inactive"
              defaultValue={formik.values.status === "A"}
              onChange={(value) => {
                formik.setFieldValue("status", value ? "A" : "I");
              }}
              on="Active"
              size="small"
            />
          </div>
        </form>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            size="sm"
            variant="outline-secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => formik.handleSubmit()}
            size="sm"
            variant="primary"
            disabled={isLoading || !formik.isValid}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      }
    />
  );
};

export default EditGiftCardModal;
