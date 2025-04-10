"use client";

import React from "react";
import { Formik, Form } from "formik";
import Input from "@/components/Input/Input";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";

/**
 * PO Number
 * Amount
 */

interface IPaymentOptionFormValues {
  cardName: string;
  cardNumber: string;
  generalPO: boolean;
  poNumber: string;
  amount: string;
}

const PaymentOption: React.FC = () => {
  const initialValues: IPaymentOptionFormValues = {
    cardName: "XXXX XXXX",
    cardNumber: "XXXX XXXX XXXX XXXX",
    generalPO: false,
    poNumber: "",
    amount: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log("Payment Option Submitted:", values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
            <Text size="lg">
              Credit Card Information
            </Text>
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                <div className="lg:w-6/12">
                  <Input
                    label="Name of Card"
                    name="cardName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardName}
                    disabled
                    required
                  />
                </div>
                <div className="lg:w-6/12">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardNumber}
                    disabled
                    required
                  />
                </div>
              </div>
            </div>

            <Text size="lg">
              PO Information
            </Text>
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                <div className="lg:w-6/12">
                  <ToggleButton
                    label="General PO"
                    name="generalPO"
                    id="generalPO"
                    onChange={(value) => setFieldValue("generalPO", value)}
                    defaultValue={values.generalPO}
                  />
                </div>
              </div>
              <div className="flex lg:flex-row flex-col gap-4 lg:gap-6">
                <div className="lg:w-6/12">
                  <Input
                    label="PO Number"
                    name="poNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.poNumber}
                    required
                  />
                </div>
                <div className="lg:w-6/12">
                  <Input
                    label="Amount"
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentOption;
