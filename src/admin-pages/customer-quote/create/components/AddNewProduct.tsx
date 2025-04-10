"use client";
import React from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import { Formik, Form } from "formik";
import { IAddNewProductProps } from "@/types/customer-quote/customerQuote.type";
import { addNewProductValidationSchema } from "@/utils/validations/customerQuote.validation";
import InputNumber from "@/components/Input/InputNumber";

const initialValues = {
  otfItemNo: "",
  otfItemVariant: "",
  name: "",
  sku: "",
  quantity: "",
  price: "",
  color: "",
  size: "",
};

// Add this mock data (you can replace with real data later)
const mockOtfItems = [
  { value: "OTF001", label: "Item 001" },
  { value: "OTF002", label: "Item 002" },
  { value: "OTF003", label: "Item 003" },
];

const mockVariants = [
  { value: "VAR001", label: "Variant 001" },
  { value: "VAR002", label: "Variant 002" },
  { value: "VAR003", label: "Variant 003" },
];

const AddNewProduct = ({ isOpen, onClose, onSave }: IAddNewProductProps) => {
  const modalContent = (
    <Formik
      initialValues={initialValues}
      validationSchema={addNewProductValidationSchema}
      onSubmit={(values) => {
        onSave(values);
      }}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, setFieldTouched, errors, touched }) => (
        <Form>
          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              label="OTF Item No."
              name="otfItemNo"
              options={mockOtfItems}
              placeholder="Select..."
              onChange={(value: any) => setFieldValue("otfItemNo", value.value)}
              error={touched.otfItemNo && errors.otfItemNo ? true : false}
              errorMessage={touched.otfItemNo ? errors.otfItemNo : undefined}
              isFormikField={true}
              displayError={true}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              label="OTF Variant Code"
              name="otfItemVariant"
              options={mockVariants}
              placeholder="Select..."
              onChange={(value: any) =>
                setFieldValue("otfItemVariant", value.value)
              }
              error={
                touched.otfItemVariant && errors.otfItemVariant ? true : false
              }
              errorMessage={
                touched.otfItemVariant ? errors.otfItemVariant : undefined
              }
              isFormikField={true}
              displayError={true}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <Input
              label="Product Name"
              name="name"
              asterisk
              error={touched.name && errors.name ? true : false}
              errorMessage={touched.name ? errors.name : undefined}
              displayError={true}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <Input
              label="SKU"
              name="sku"
              asterisk
              error={touched.sku && errors.sku ? true : false}
              errorMessage={touched.sku ? errors.sku : undefined}
              displayError={true}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <InputNumber
              label="Quantity"
              name="quantity"
              inputMode="numeric"
              type="number"
              formik={true}
              asterisk
              error={touched.quantity && errors.quantity ? true : false}
              errorMessage={touched.quantity ? errors.quantity : undefined}
              displayError={true}
              onBlur={() => setFieldTouched("quantity", true)}
              onChange={(e: any) => setFieldValue("quantity", e.target.value)}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <InputNumber
              label="Price"
              placeholder="0.00"
              name="price"
              asterisk
              error={touched.price && errors.price ? true : false}
              errorMessage={touched.price ? errors.price : undefined}
              displayError={true}
              onBlur={() => setFieldTouched("price", true)}
              onChange={(e: any) => setFieldValue("price", e.target.value)}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <Input
              label="Color"
              name="color"
              error={touched.color && errors.color ? true : false}
              errorMessage={touched.color ? errors.color : undefined}
              displayError={true}
            />
          </div>

          <div className="w-full mb-4 last:mb-0">
            <InputNumber
              label="Size"
              name="size"
              placeholder="0"
              error={touched.size && errors.size ? true : false}
              errorMessage={touched.size ? errors.size : undefined}
              displayError={true}
              onBlur={() => setFieldTouched("size", true)}
              onChange={(e: any) => setFieldValue("size", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
            <Button variant="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={<Text size="xl">Add New Product</Text>}
      content={modalContent}
      size="2xl"
    />
  );
};

export default AddNewProduct;
