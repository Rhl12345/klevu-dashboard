import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { addMessage } from "@/services/messages/messages";
import {
  IMessageFormFieldsProps,
  IMessageFormValues,
  IMessageModalProps,
} from "@/types/global-messages/messages.type";
import { getErrorMessage } from "@/utils/common.util";
import { RecStatusValueName } from "@/utils/constants";
import { messageKeyOptions, storeOptions } from "@/utils/Dummy";
import { MessageSchema } from "@/utils/validations/messages.validation";
import { Formik, Form as FormikForm } from "formik";
import React, { memo, useCallback, useMemo } from "react";
/**
 * MessagesModal Component
 * @component
 * @description Handles the creation and editing of messages
 * @param {IMessageModalProps} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.handleModalClose - Callback function called when modal is closed
 * @param {number | null} props.editId - Optional ID for editing existing messages

 * @returns {React.ReactElement} Rendered modal component
 */

const MessagesModal = memo(
  ({ isOpen, handleModalClose, editId }: IMessageModalProps) => {
    const initialValues = useMemo<IMessageFormValues>(
      () => ({
        message: "",
        messageKey: "",
        storeName: "",
        status: "",
      }),
      []
    );
    const handleSubmit = useCallback(
      async (values: IMessageFormValues) => {
        try {
          await addMessage(values);
          handleModalClose();
        } catch (error) {
          getErrorMessage(error, "Error adding message");
        }
      },
      [handleModalClose]
    );

    const MessageFormFields: React.FC<IMessageFormFieldsProps> = ({
      values,
      errors,
      touched,
      setFieldValue,
    }) => {
      return (
        <>
          <div className="w-full mb-4 last:mb-0">
            <Input
              label="Message"
              name="message"
              type="text"
              asterisk
              errorMessage={errors.message}
              error={!!errors.message && touched.message}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              asterisk
              label="Message Key"
              name="messageKey"
              id="messageKey"
              options={messageKeyOptions}
              onChange={(selectedOption: any) => {
                setFieldValue("messageKey", selectedOption.value);
              }}
              error={!!errors.messageKey && touched.messageKey}
              errorMessage={errors.messageKey}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              asterisk
              label="Store Name"
              name="storeName"
              id="storeName"
              options={storeOptions}
              onChange={(selectedOption: any) => {
                setFieldValue("storeName", selectedOption.value);
              }}
              error={!!errors.storeName && touched.storeName}
              errorMessage={errors.storeName}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <ToggleButton
              name="status"
              id="status"
              size="small"
              on="ON"
              off="OFF"
              asterisk
              label="Status"
              defaultValue={values.status === RecStatusValueName.Active}
            />
          </div>
        </>
      );
    };

    const messageForm = (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={MessageSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <FormikForm id="message-form">
            <MessageFormFields
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </FormikForm>
        )}
      </Formik>
    );

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          size="xl"
          header={`${editId !== null ? "Edit" : "Add"} Message`}
          content={messageForm}
          footer={
            <>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="primary"
                form="message-form"
              >
                Save
              </Button>
            </>
          }
        />
      </>
    );
  }
);

export default MessagesModal;
