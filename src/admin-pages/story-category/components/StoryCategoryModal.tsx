"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import Dropdown from "@/components/DropDown/DropDown";

import { storyCategorySchema } from "@/utils/validations/storyCategory.validation";

import {
  IStoryCategoryModal,
  IStoryCategoryValues,
} from "@/types/story-category/storyCategory.type";
import storyCategoryList from "@/mock-data/storyCategoryList.json";

const DATA = storyCategoryList.data;

const parentCategoryOptions = storyCategoryList.PARENT_CATEGORY_OPTIONS;

const StoryCategoryModal = ({
  isOpen,
  onClose,
  editId,
  onSubmit,
}: IStoryCategoryModal) => {
  const [storyCategory, setStoryCategory] =
    useState<IStoryCategoryValues | null>(null);

  useEffect(() => {
    if (editId) {
      const editData = DATA?.find((item) => item.id === editId) as
        | IStoryCategoryValues
        | undefined;
      setStoryCategory(editData || null);
    } else {
      setStoryCategory(null);
    }
  }, [editId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: storyCategory?.id || 0,
      category: storyCategory?.category,
      slug: storyCategory?.slug,
      parentCategoryId: storyCategory?.parentCategoryId || "",
    },
    validationSchema: storyCategorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values as IStoryCategoryValues);
        toast.success(
          `Successfully ${editId ? "updated" : "created"} story category`
        );
        onClose();
      } catch (error) {
        toast.error(
          `Failed to ${editId ? "update" : "create"} story category`
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);


  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      header={editId !== null ? "Edit Story Category" : "Add Story Category"}
      content={
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full mb-4 last:mb-0">
            <Input
              asterisk={true}
              required={true}
              label={"Category"}
              name={"category"}
              placeholder={`Enter Category`}
              type={"text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              error={
                formik.touched.category &&
                !!formik.errors.category
              }
              errorMessage={
                (formik.touched.category &&
                  formik.errors.category) ||
                undefined
              }
              formik={false}
            />
        </div>
        <div className="w-full mb-4 last:mb-0">
          <Input
            label={"Category Slug"}
            name={"slug"}
            placeholder={`Enter Category Slug`}
            type={"text"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.slug}
            error={
              formik.touched.slug &&
              !!formik.errors.slug
            }
            errorMessage={
              (formik.touched.slug &&
                formik.errors.slug) ||
              undefined
            }
            formik={false}
            />
        </div>
        <div className="w-full mb-4 last:mb-0">
          <Dropdown
            asterisk={false}
            aria-label={`Select Parent`}
            id={"parentCategoryId"}
            name={"parentCategoryId"}
            label={"Parent"}
            options={parentCategoryOptions}
            value={parentCategoryOptions.find(
              (option) =>
                option.value ===
                formik.values.parentCategoryId
            )}
            onChange={(newValue: unknown) => {
              const selectedOption = newValue as {
                value: string;
                label: string;
              } | null;
              if (selectedOption === null) {
                formik.setFieldValue("parentCategoryId", "");
              } else {
                formik.setFieldValue("parentCategoryId", selectedOption?.value || "");
              }
            }}
            placeholder={`Select Parent Category`}
            errorMessage={
              (formik.touched.parentCategoryId &&
                formik.errors.parentCategoryId) ||
              undefined
            }
          />
        </div>
      </form>
      }
      footer={
        <>
          <Button size="sm" variant="outline-secondary" onClick={handleClose}>
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

export default StoryCategoryModal;
