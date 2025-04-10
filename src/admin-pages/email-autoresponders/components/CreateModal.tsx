import { Formik, Form as FormikForm } from "formik";
import React, { useState, useEffect } from "react";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import { Textarea } from "@/components/Textarea/Textarea";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  ICreateModalProps,
  IEmailAutorespondersFormValues,
} from "@/types/email-autoresponders/emailAutoresponders.type";
import { EmailAutorespondersSchema } from "@/utils/validations/emailAutoresponders.validation";
import EmailTemplateListDummyData from "@/mock-data/emailTemplateListDummy.json";

const CreateModal = ({
  isOpen,
  handleModalClose,
  editId,
}: ICreateModalProps) => {
  // Add useEffect to fetch and set data when editing
  const [initialValues, setInitialValues] =
    useState<IEmailAutorespondersFormValues>({
      id: null,
      label: "",
      subject: "",
      emailBody: null,
      emailFrom: "",
      store: "",
      emailTo: null,
      emailCC: null,
      emailBCC: null,
      recStatus: "A",
    });

  const [previewEmailBody, setPreviewEmailBody] = useState<boolean>(false);

  useEffect(() => {
    if (editId) {
      // Find the email template data from the dummy data
      const emailTemplate =
        EmailTemplateListDummyData.emailTemplateListData.find(
          (template) => template.id === editId
        );

      if (emailTemplate) {
        setInitialValues({
          id: emailTemplate.id,
          label: emailTemplate.label,
          subject: emailTemplate.subject,
          emailBody: emailTemplate.emailBody ?? null,
          emailFrom: emailTemplate.emailFrom,
          store: emailTemplate.store,
          emailTo: emailTemplate.emailTo,
          emailCC: emailTemplate.emailCC,
          emailBCC: emailTemplate.emailBCC,
          recStatus: emailTemplate.recStatus as "A" | "I",
        });
      }
    } else {
      setInitialValues({
        id: null,
        label: "",
        subject: "",
        emailBody: null,
        emailFrom: "",
        store: "",
        emailTo: null,
        emailCC: null,
        emailBCC: null,
        recStatus: "A",
      });
    }
  }, [editId]);

  const previewTemplate = ({
    values,
  }: {
    values: IEmailAutorespondersFormValues;
  }) => {
    return (
      <>
        <div className="p-6">
          <div dangerouslySetInnerHTML={{ __html: values.emailBody ?? "" }} />
        </div>
      </>
    );
  };

  const handleSubmit = (values: IEmailAutorespondersFormValues) => {};

  const contentForm = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={EmailAutorespondersSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, setFieldValue, values }) => {
        return (
          <FormikForm id="email-auto-responders-form">
            {previewEmailBody ? (
              previewTemplate({ values })
            ) : (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="w-full">
                  <Input
                    label="Label"
                    name="label"
                    id="label"
                    placeholder="Enter your label"
                    errorMessage={errors.label}
                    asterisk
                  />
                </div>
                <div className="w-full">
                  <Input
                    asterisk
                    id="emailFrom"
                    placeholder="Enter your email from"
                    label="Email From"
                    name="emailFrom"
                    errorMessage={errors.emailFrom}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email To"
                    name="emailTo"
                    placeholder="Enter your email to"
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email CC"
                    name="emailCC"
                    placeholder="Enter your email cc"
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email BCC"
                    name="emailBCC"
                    placeholder="Enter your email bcc"
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="Enter your subject"
                    asterisk
                    errorMessage={errors.subject}
                  />
                </div>

                <div>
                  <Dropdown
                    asterisk
                    label="Store Name"
                    name="store"
                    id="store"
                    placeholder="Select your store name"
                    options={EmailTemplateListDummyData.EMAIL_AUTORESPONDER_OPTIONS}
                    value={
                      EmailTemplateListDummyData. EMAIL_AUTORESPONDER_OPTIONS.find(
                        (option) => option.label === values.store
                      ) || null
                    }
                    onChange={(selectedOption: any) => {
                      setFieldValue("store", selectedOption?.label || "");
                    }}
                    errorMessage={errors.store}
                  />
                </div>

                <div className="">
                  <ToggleButton
                    label="Status"
                    asterisk
                    id="isAPIAvailable"
                    name="isAPIAvailable"
                    defaultValue={values.recStatus === "A" ? true : false}
                    onChange={(value) => {
                      setFieldValue("recStatus", value ? "A" : "I");
                    }}
                    size="medium"
                    on="Active"
                    off="Inactive"
                  />
                </div>
                <div className="w-full col-span-1 lg:col-span-2">
                  <Textarea
                    asterisk
                    label="Email Body"
                    placeholder="Enter your text here..."
                    rows={12}
                    name="emailBody"
                    isFormikField
                    defaultValue={values?.emailBody ?? ""}
                    className="w-full min-h-[300px] resize-y"
                    error={!!errors.emailBody}
                    errorMessage={errors.emailBody}
                  />
                </div>
              </div>
            )}
          </FormikForm>
        );
      }}
    </Formik>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        header={`${!previewEmailBody ? (editId ? "Edit" : "Add") : "Preview"} Email Autoresponders`}
        content={contentForm}
        footerClassName={"p-4 lg:p-6 flex gap-4 lg:gap-6 items-center justify-between  border-t"}
        size="7xl"
        footer={
          <>
            <Button
              size="sm"
              onClick={() => setPreviewEmailBody((prev) => !prev)}
              variant="primary"
            >
              {previewEmailBody ? "Previous" : "Preview"}
            </Button>
            {!previewEmailBody && (
              <div className="flex gap-y-0 gap-x-2.5">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  form="email-auto-responders-form"
                >
                  Save
                </Button>
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default CreateModal;
