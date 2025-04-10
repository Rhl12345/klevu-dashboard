import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  IFixChargesProps,
  IInitialValues,
} from "@/types/fix-charges/fixCharges.type";
import { fixChargesOptions } from "@/utils/Dummy";
import { FixChargesSchema } from "@/utils/validations/fixCharges.validation";
import { Formik, Form as FormikForm } from "formik";
import { useEffect, useState } from "react";
import FixChargesTempData from "@/mock-data/fixCharges.json";
import InputNumber from "@/components/Input/InputNumber";

const FixChargesCreateModal = ({
  isOpen,
  handleModalClose,
  editId,
}: IFixChargesProps) => {
  const [initialValues, setInitialValues] = useState<IInitialValues>({
    name: "",
    charges: "",
    storeName: "",
    isAPIAvailable: false,
  });

  useEffect(() => {
    if (editId) {
      const selectedCharge = FixChargesTempData.fixChargesTempData.find(
        (item) => item.id === editId
      );
      if (selectedCharge) {
        setInitialValues({
          name: selectedCharge.name || "",
          charges: selectedCharge.charges || "",
          storeName: selectedCharge.store_name || "",
          isAPIAvailable: selectedCharge.recStatus === "A",
        });
      }
    } else {
      setInitialValues({
        name: "",
        charges: "",
        storeName: "",
        isAPIAvailable: false,
      });
    }
  }, [editId]);

  const handleSubmit = async (values: IInitialValues) => {
    handleModalClose();
  };

  const contentForm = (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={FixChargesSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, setFieldValue, values }) => (
        <FormikForm id="fixCharges-form" className="grid gap-4">
          <Input label="Name" name="name" asterisk errorMessage={errors.name} />
          <InputNumber
            placeholder="0.00"
            label="Charges ($)"
            id="charges"
            name="charges"
            asterisk
            decimalScale={2}
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
          <div>
            <div className="flex items-center">
              <ToggleButton
                label="Status"
                asterisk
                id="isAPIAvailable"
                name="isAPIAvailable"
                defaultValue={values.isAPIAvailable}
                size="medium"
                on="Active"
                off="Inactive"
                onChange={(value) => setFieldValue("isAPIAvailable", value)}
              />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      header={`${editId ? "Edit" : "Add"} Fixed Charges`}
      content={contentForm}
      footer={
        <div className="flex gap-2.5">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button size="sm" variant="primary" form="fixCharges-form">
            Save
          </Button>
        </div>
      }
    />
  );
};

export default FixChargesCreateModal;
