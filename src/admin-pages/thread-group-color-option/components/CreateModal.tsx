import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import {
  ICreateModalProps,
  IThreadGroupColorOptionFormValues,
} from "@/types/thread-group-color-option/threadGroupColorOption.type";
import { threadGroupColorOptionSchema } from "@/utils/validations/threadGroupColorOption.validation";
import { Formik, Form as FormikForm } from "formik";
import { THREAD_GROUP_OPTIONS } from "@/mock-data/threadGroupColorOption.json";
import threadGroupColorOption from "@/mock-data/threadGroupColorOption.json";
import InputNumber from "@/components/Input/InputNumber";
const CreateModal = ({
  isOpen,
  handleModalClose,
  editId,
}: ICreateModalProps) => {
  const [initialValues, setInitialValues] =
    useState<IThreadGroupColorOptionFormValues>({
      id: null,
      threadBrandName: "",
      groupColorValue: "",
      displayOrder: "",
    });

  useEffect(() => {
    if (editId) {
      const threadGroupColor = threadGroupColorOption.threadData.find(
        (template) => template.id === editId
      );

      if (threadGroupColor) {
        setInitialValues({
          id: threadGroupColor.id,
          threadBrandName: threadGroupColor.threadBrandName,
          groupColorValue: threadGroupColor.groupColorValue,
          displayOrder: threadGroupColor.displayOrder,
        });
      }
    } else {
      setInitialValues({
        id: null,
        threadBrandName: "",
        groupColorValue: "",
        displayOrder: "",
      });
    }
  }, [editId]);

  const contentForm = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={threadGroupColorOptionSchema}
      onSubmit={() => {}}
    >
      {({ errors, setFieldValue, values, touched }) => (
        <FormikForm id="groupDescription-form">
          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              asterisk
              placeholder="select your thread brand"
              label="Thread Brand"
              name="threadBrandName"
              id="threadBrandName"
              options={THREAD_GROUP_OPTIONS}
              value={
                THREAD_GROUP_OPTIONS.find(
                  (option) => option.label === values.threadBrandName
                ) || null
              }
              onChange={(selectedOption: any) => {
                setFieldValue("threadBrandName", selectedOption.label || "");
              }}
              errorMessage={errors.threadBrandName}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <Input
              label="Group Color Value"
              name="groupColorValue"
              placeholder="Enter your Group Color Value"
              asterisk
              errorMessage={errors.groupColorValue}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <InputNumber
              asterisk
              name="displayOrder"
              label="Display Order"
              placeholder="Enter your display order"
              id="displayOrder"
              value={values.displayOrder}
              errorMessage={errors.displayOrder}
              displayError={
                touched.displayOrder && !!errors.displayOrder ? true : false
              }
              onValueChange={(values: { floatValue: number }) => {
                setFieldValue("displayOrder", values.floatValue);
              }}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        header={`${editId !== null ? "Edit" : "Add"} Thread Group Color Option`}
        content={contentForm}
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
              form="groupDescription-form"
            >
              Save
            </Button>
          </>
        }
      />
    </>
  );
};

export default CreateModal;
