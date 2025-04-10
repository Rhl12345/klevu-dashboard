import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import {
  ICreateModalProps,
  INavSkuMappingFormValues,
} from "@/types/nav-sku-mapping/navSkuMapping.type";
import { NavSkuMappingSchema } from "@/utils/validations/navSkuMapping.validation";
import { Formik, Form as FormikForm } from "formik";
import React, { useEffect, useState } from "react";
import navSkuMappingDummyList from "@/mock-data/navSkuMappingDummyList.json";
import { NAV_SKU_MAPPING_OPTIONS } from "@/mock-data/navSkuMappingDummyList.json";

const CreateModal = ({
  isOpen,
  handleModalClose,
  editId,
}: ICreateModalProps) => {
  const [initialValues, setInitialValues] = useState<INavSkuMappingFormValues>({
    id: null,
    storeName: "",
    currentSku: "",
    bcSku: "",
  });
  useEffect(() => {
    if (editId) {
      const navMapping = navSkuMappingDummyList.navSkuMappingData.find(
        (template) => template.id === editId
      );

      if (navMapping) {
        setInitialValues({
          id: navMapping.id,
          storeName: navMapping.storeName,
          currentSku: navMapping.currentSku,
          bcSku: navMapping.bcSku,
        });
      }
    } else {
      setInitialValues({
        id: null,
        storeName: "",
        currentSku: "",
        bcSku: "",
      });
    }
  }, [editId]);

  const createForm = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={NavSkuMappingSchema}
      onSubmit={() => {}}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <FormikForm id="navSkuMapping-form">
          <div className="w-full mb-4 last:mb-0">
            <Dropdown
              asterisk
              placeholder="Select your store name"
              label="Store Name"
              name="storeName"
              id="storeName"
              options={NAV_SKU_MAPPING_OPTIONS}
              value={
                NAV_SKU_MAPPING_OPTIONS.find(
                  (option) => option.label === values.storeName
                ) || null
              }
              onChange={(selectedOption: any) => {
                setFieldValue("storeName", selectedOption?.label || "");
              }}
              errorMessage={errors.storeName}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <Input
              label="Current Sku"
              name="currentSku"
              placeholder="Enter your current sku"
              asterisk
              errorMessage={errors.currentSku}
            />
          </div>
          <div className="w-full mb-4 last:mb-0">
            <Input
              label="BC Sku"
              name="bcSku"
              placeholder="Enter you bc sku"
              asterisk
              errorMessage={errors.bcSku}
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
        header={`${editId !== null ? "Edit" : "Add"} BC SKU Mapping`}
        content={createForm}
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
              form="navSkuMapping-form"
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
