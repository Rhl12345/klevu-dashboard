import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";

import {
  IAddGroupDescriptionModal,
  IGroupDescriptionValues,
} from "@/types/group-description/groupDescription.type";
import groupDescriptionData from "@/mock-data/GroupDescription.json";

const DATA = groupDescriptionData.data;

const AddGroupDescriptionModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
}: IAddGroupDescriptionModal) => {
  const [groupDescriptionOptions, setGroupDescription] =
    useState<IGroupDescriptionValues | null>(null);

  useEffect(() => {
    if (editId) {
      const editData = DATA?.find(
        (item: IGroupDescriptionValues) => item.id === editId
      ) as IGroupDescriptionValues | undefined;
      setGroupDescription(editData || null);
    } else {
      setGroupDescription(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: groupDescriptionOptions?.id || 0,
      descriptionValue: groupDescriptionOptions?.descriptionValue || "",
      displayOrder: groupDescriptionOptions?.displayOrder || "",
    },
    validationSchema: yup.object().shape({
      descriptionValue: yup
        .string()
        .trim()
        .required("Description is required."),
      displayOrder: yup.string().trim().required("Display Order is required."),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={
        editId !== null ? "Edit Group Description" : "Add Group Description"
      }
      content={
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="w-full mb-4 last:mb-0">
              <Input
                asterisk
                label="Description Value"
                name="descriptionValue"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.initialValues.descriptionValue}
                formik={false}
                displayError={true}
                error={
                  formik.touched.descriptionValue &&
                  formik.errors.descriptionValue
                    ? true
                    : false
                }
                errorMessage={formik.errors.descriptionValue}
              />
            </div>
            <div className="w-full mb-4 last:mb-0">
              <Input
                id="displayOrder"
                name="displayOrder"
                label="Display Order"
                value={formik.values.displayOrder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={false}
                error={
                  formik.touched.displayOrder && formik.errors.displayOrder
                    ? true
                    : false
                }
                errorMessage={formik.errors.displayOrder}
                asterisk
              />
            </div>
          </div>
        </form>
      }
      footer={
        <>
          <Button size="sm" variant="outline-secondary" onClick={onClose}>
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

export default AddGroupDescriptionModal;
