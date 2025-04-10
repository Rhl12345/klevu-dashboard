/**
 * @file Clone.tsx
 * @description Component for cloning discount tables. Provides a modal interface
 * for creating a copy of an existing discount table with a new name.
 *
 * @component Clone
 * @requires React
 * @requires Formik - For form handling
 * @requires Yup - For form validation
 * @requires Modal - Custom modal component
 * @requires Input - Custom input component
 *
 * @typedef {Object} CloneProps
 * @property {boolean} openCloneModal - Controls visibility of clone modal
 * @property {function} setOpenCloneModal - Function to toggle modal visibility
 * @property {any} cloneData - Data of the discount table to be cloned
 * @property {function} fetchListData - Function to refresh the discount tables list
 */

import React, { useState, useCallback, useRef, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import Button from "@/components/Button/Button";
import {
  CloneFormValues,
  CloneProps,
} from "@/types/discount-table/discountTable.type";
import { cloneValidationSchema } from "@/utils/validations/discountTable.validation";

const Clone: React.FC<CloneProps> = ({
  openCloneModal,
  setOpenCloneModal,
  cloneData,
  fetchListData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const formikRef = useRef<FormikProps<CloneFormValues>>(null);

  const handleClose = useCallback(() => {
    setOpenCloneModal(false);
  }, [setOpenCloneModal]);

  const handleSubmit = async (values: CloneFormValues) => {
    setIsLoading(true);
    try {
      toast.success("Discount table cloned successfully");
      setOpenCloneModal(false);
      fetchListData();
    } catch (error: any) {
      toast.error(getErrorMessage(error, "Failed to clone discount table"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!openCloneModal) {
      formikRef.current?.resetForm();
    }
  }, [openCloneModal]);

  return (
    <Modal
      isOpen={openCloneModal}
      onClose={handleClose}
      header="Clone Discount Table"
      content={
        <Formik
          enableReinitialize
          initialValues={{
            quantityName: cloneData?.quantityName
              ? `Clone of ${cloneData.quantityName}`
              : "",
          }}
          onSubmit={handleSubmit}
          validationSchema={cloneValidationSchema}
          ref={formikRef}
        >
          {() => (
            <FormikForm id="clone-form">
              <div className="mb-6">
                <Input
                  asterisk
                  name="quantityName"
                  label="Quantity Name"
                  placeholder="Enter Quantity Name"
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline-primary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="clone-form"
            variant="primary"
            disabled={isLoading}
          >
            Clone
          </Button>
        </div>
      }
    />
  );
};

export default Clone;
