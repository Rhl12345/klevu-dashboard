import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { ManualShippingFormProps } from "@/types/manual-shipping/manualShipping.type";
import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import { shippingViaOptions } from "@/utils/Dummy";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Textarea } from "@/components/Textarea/Textarea";
import InputNumber from "@/components/Input/InputNumber";

const ManualShippingForm = ({
  isOpen,
  handleModalClose,
  rowData,
}: ManualShippingFormProps) => {
  const initialValues = {};
  const ManualShippingFormSchema = {};
  const contentForm = (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ManualShippingFormSchema}
        onSubmit={() => {}}
      >
        {({ errors, setFieldValue, values }) => {
          return (
            <FormikForm id="email-auto-responders-form">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full last:mb-0">
                  <InputNumber
                    label="Shipping Item "
                    name="shippingItem"
                    id="shippingItem"
                    placeholder="Enter your shipping Item"
                  />
                </div>
                <div className="w-full last:mb-0">
                  <Input
                    label="Tracking #"
                    name="tracking"
                    id="tracking"
                    placeholder="Enter your tracking"
                  />
                </div>
                <div className="w-full last:mb-0">
                  <Dropdown
                    label="Shipped Via"
                    name="shippedVia"
                    id="shippedVia"
                    options={shippingViaOptions}
                    placeholder="select your shipped..."
                  />
                </div>
                <div className="w-full last:mb-0">
                  <DatePicker
                    name="startDate"
                    label="Shipped On"
                    onChange={(date: any) => setFieldValue("startDate", date)}
                  />
                </div>

                <div className="w-full  mb-4 last:mb-0 ">
                  <Textarea
                    label="Shipped Note"
                    placeholder="Enter your text here..."
                    rows={1}
                    name="ShippedNote"
                    isFormikField
                  />
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        header="Shipping Details Form"
        content={contentForm}
        size="3xl"
        footer={
          <>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button>Save Changes</Button>
          </>
        }
      />
    </>
  );
};

export default ManualShippingForm;
