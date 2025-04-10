import React, { useEffect, useState, useRef } from "react";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import {
  IThreadBrandFormValues,
  IThreadBrandModelProps,
} from "@/types/thread-brand/thread-brand.types";
import ThreadBrandListData from "@/mock-data/ThreadBrandData.json";
import { ThreadBrandSchema } from "@/utils/validations/thread-brand.validation";
import { ActionMeta } from "react-select";
import { IDropdownOption } from "@/types/common/common.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import InputNumber from "@/components/Input/InputNumber";

const defaultValues: IThreadBrandFormValues = {
  logoGroupDescriptionId: "",
  brandValue: "",
  displayOrder: "",
  recStatus: "A",
};

const ThreadBrandModel = ({
  isOpen,
  onClose,
  editId,
  getList,
}: IThreadBrandModelProps) => {
  const [initialValues, setInitialValues] =
    useState<IThreadBrandFormValues>(defaultValues);
  const [groupDescriptionOptions, setGroupDescriptionOptions] = useState<
    IDropdownOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formikRef = useRef<FormikProps<IThreadBrandFormValues>>(null);

  // Get Group Description Options
  const getGroupDescriptionOptions = async () => {
    setIsLoading(true);
    try {
      const data =
        ThreadBrandListData.groupDescriptionList as unknown as IDropdownOption[];
      setGroupDescriptionOptions(data);
    } catch (error) {
      toast.error(getErrorMessage("Failed to load group descriptions"));
    } finally {
      setIsLoading(false);
    }
  };

  // Get Thread Brand Data for Edit
  const getThreadBrandData = async () => {
    if (!editId) return;
    setIsLoading(true);
    try {
      const data = ThreadBrandListData.threadBrandList.find(
        (item) => item.id === editId
      );
      if (!data) {
        throw new Error("Thread brand not found");
      }
      setInitialValues({
        id: data.id || 0,
        logoGroupDescriptionId: data.logoGroupDescriptionId || 0,
        brandValue: data.brandValue || "",
        displayOrder: data.displayOrder || 0,
        recStatus: data.recStatus || "active",
      });
    } catch (error) {
      toast.error(getErrorMessage("Failed to load thread brand data"));
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  // Create/Update Thread Brand
  const handleSubmit = async (values: IThreadBrandFormValues) => {
    setIsSubmitting(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success(
        `Thread brand ${editId ? "updated" : "created"} successfully`
      );
      getList();
      onClose();
    } catch (error) {
      toast.error(
        getErrorMessage(
          `Failed to ${editId ? "update" : "create"} thread brand`
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setInitialValues(defaultValues);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      getGroupDescriptionOptions();
      if (editId) {
        getThreadBrandData();
      } else {
        setInitialValues(defaultValues);
      }
    }
  }, [isOpen, editId]);

  const modalContent = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ThreadBrandSchema}
      onSubmit={handleSubmit}
      innerRef={formikRef}
    >
      {({ errors, touched, setFieldValue, values, handleBlur }) => {
        return (
          <FormikForm id="threadBrand-form">
            <div className="space-y-4">
              <Dropdown
                label="Group Description"
                name="logoGroupDescriptionId"
                defaultValue={values.logoGroupDescriptionId}
                options={groupDescriptionOptions}
                asterisk
                onChange={(newValue: unknown, _: ActionMeta<unknown>) =>
                  setFieldValue(
                    "logoGroupDescriptionId",
                    (newValue as { value: number })?.value || ""
                  )
                }
                error={!!errors.logoGroupDescriptionId}
                errorMessage={errors.logoGroupDescriptionId}
              />

              <Input
                label="Brand Value"
                name="brandValue"
                type="text"
                asterisk
              />

              <InputNumber
                label="Display Order"
                name="displayOrder"
                asterisk
                defaultValue={values.displayOrder}
                displayError={!!errors.displayOrder && !!touched.displayOrder}
                onBlur={handleBlur}
                onValueChange={(values: { floatValue: number }) => {
                  setFieldValue("displayOrder", values.floatValue);
                }}
              />
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={`${editId ? "Edit" : "Add"} Thread Brand`}
      content={modalContent}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={() => formikRef.current?.submitForm()}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </div>
      }
    />
  );
};

export default ThreadBrandModel;
