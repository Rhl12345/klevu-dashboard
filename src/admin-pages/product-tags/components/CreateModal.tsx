import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import UploadImage from "@/components/UploadImage/UploadImage";
import { fixChargesOptions, positionOptions } from "@/utils/Dummy";
import { Formik, Form as FormikForm } from "formik";
import { useCallback, useEffect, useState } from "react";
import productTagsData from "@/mock-data/productTagsData.json";
import {
  IProductTagsListValues,
  IProductTagsListFormValues,
  IProductTagsProps,
} from "@/types/product-tags/productTags.type";
import { ProductTagsSchema } from "@/utils/validations/productTags.validation";

const ProductTagsCreateModal = ({
  isOpen,
  handleModalClose,
  editId,
}: IProductTagsProps) => {
  const [initialValues, setInitialValues] =
    useState<IProductTagsListFormValues>({
      createdBy: "",
      storeName: "",
      status: "Inactive",
      displayOrder: "",
      position: "",
    });

  const handleSubmit = async (values: IProductTagsListValues) => {
    handleModalClose();
  };

  const handleImageUpload = useCallback(async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;
  }, []);

  useEffect(() => {
    if (editId) {
      const productTag = productTagsData.find(
        (template) => template.id === editId
      );

      if (productTag) {
        setInitialValues({
          createdBy: productTag.createdBy || "",
          storeName: productTag.storeName || "",
          status: productTag.status || "Inactive",
          displayOrder: "",
          position: productTag.imagePosition || "",
        });
      }
    } else {
      setInitialValues({
        createdBy: "",
        storeName: "",
        status: "Inactive",
        displayOrder: "",
        position: "",
      });
    }
  }, [editId]);

  const contentForm = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ProductTagsSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, setFieldValue, values }) => (
        <FormikForm id="ProductTags-form" className="grid grid-cols-1 gap-4">
          <Input
            label="Name"
            name="createdBy"
            asterisk
            errorMessage={errors.createdBy}
          />
          <Dropdown
            asterisk
            label="Store Name"
            name="storeName"
            id="storeName"
            options={fixChargesOptions}
            value={
              fixChargesOptions.find(
                (option) => option.label === values.storeName
              ) || null
            }
            onChange={(selectedOption: any) => {
              setFieldValue("storeName", selectedOption?.label || "");
            }}
            errorMessage={errors.storeName}
          />

          <Dropdown
            asterisk
            label="Tag Type"
            name="tagType"
            id="tagType"
            options={fixChargesOptions}
            onChange={(newValue: unknown) => {
              const selectedOption = newValue as {
                value: string;
                label: string;
              } | null;
              setFieldValue("tagType", selectedOption?.value || "");
            }}
            errorMessage={errors.tagType}
          />
          <Input
            type="number"
            placeholder="0.00"
            label="Display Order"
            id="displayOrder"
            name="displayOrder"
            asterisk
          />

          <div className="md:col-span-2">
            <UploadImage
              onUpload={handleImageUpload}
              label="Image"
              asterisk={false}
              errorMessage={errors.image}
            />
            <div className="pt-4">
              <Dropdown
                asterisk
                label="Position"
                name="position"
                id="position"
                options={positionOptions}
                value={
                  positionOptions.find(
                    (option) => option.value === values?.position
                  ) || null
                }
                onChange={(selectedOption: any) => {
                  setFieldValue("position", selectedOption?.value || "");
                }}
                errorMessage={errors.position}
              />
            </div>
          </div>

          <div className="flex items-center">
            <ToggleButton
              label="Status"
              asterisk={false}
              id="status"
              name="status"
              defaultValue={values.status === "A"}
              size="medium"
              on="Active"
              off="Inactive"
              onChange={(value) =>
                setFieldValue("status", value ? "Active" : "Inactive")
              }
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
        header={`${editId ? "Edit" : "Add"} Product Tags`}
        content={contentForm}
        footer={
          <>
            <div className="flex gap-y-0 gap-x-2.5">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button size="sm" variant="primary" form="ProductTags-form">
                Save
              </Button>
            </div>
          </>
        }
      />
    </>
  );
};

export default ProductTagsCreateModal;
