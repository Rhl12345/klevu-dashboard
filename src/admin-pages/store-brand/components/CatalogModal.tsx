"use client";

import React from "react";
import { Formik, Form as FormikForm } from "formik";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import UploadImage from "@/components/UploadImage/UploadImage";
import { ICatalogModalProps } from "@/types/store-brand/storeBrand.type";
import { catalogValidationSchema } from "@/utils/validations/storeBrand.validation";

const CatalogModal = ({
  isOpen,
  onClose,
  data,
  catalogId,
}: ICatalogModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header={`${catalogId ? "Edit" : "Add"} Catalog`}
        size="xl"
        content={
          <Formik
            enableReinitialize
            initialValues={{
              ...(data
                ? {
                    displayOrder: data.displayOrder || "",
                    catalogName: data.catalogName || "",
                    catalogLogo: data.catalogLogo || null,
                    uploadCatalogURL: data.uploadCatalogURL || [],
                    uploadCatalogName: data.uploadCatalogName || "",
                  }
                : {}),
            }}
            validationSchema={catalogValidationSchema}
            onSubmit={(values) => {}}
          >
            {({ setFieldValue, errors, touched }) => (
              <FormikForm id="catalog-form" className="flex flex-col gap-4">
                <Input
                  label="Display Order"
                  name="displayOrder"
                  displayError={true}
                  placeholder="Display Order"
                  asterisk
                />
                <Input
                  label="Catalog Name"
                  name="catalogName"
                  displayError={true}
                  placeholder="Catalog Name"
                  asterisk
                />
                <div className="w-full">
                  <UploadImage
                    id="catalogLogo"
                    label="Catalog Logo"
                    maxImages={1}
                    asterisk
                    onUpload={(files) => {
                      setFieldValue("catalogLogo", files);
                    }}
                    errorMessage={
                      touched.catalogLogo && errors.catalogLogo
                        ? errors.catalogLogo
                        : ""
                    }
                  />
                </div>
                <Input
                  label="Upload Catalog"
                  name="uploadCatalogName"
                  displayError={true}
                  placeholder="Upload Catalog"
                  asterisk
                  type="file"
                  errorMessage={errors.uploadCatalogName}
                />
              </FormikForm>
            )}
          </Formik>
        }
        footer={
          <>
            <Button
              type="button"
              onClick={() => {
                onClose();
              }}
              variant="outline-secondary"
            >
              Cancel
            </Button>
            <Button form="catalog-form" type="submit" variant="primary">
              Save
            </Button>
          </>
        }
      />
    </>
  );
};

export default CatalogModal;
