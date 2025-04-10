"use client";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import InputNumber from "@/components/Input/InputNumber";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import { IDropdownOption } from "@/components/Table/types";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import {
  ICreateShippingCostProps,
  ICreateShippingCostValues,
} from "@/types/shipping-charges/shippingCharges.type";
import { getErrorMessage } from "@/utils/common.util";
import { ShippingChargesSchemaValidation } from "@/utils/validations/shippingCharges.validation";
import { Formik, Form as FormikForm } from "formik";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import STORE_OPTIONS from "@/mock-data/reports.json";

const CreateShippingCost = (props: ICreateShippingCostProps) => {
  const INITIAL_VALUES: ICreateShippingCostValues = useMemo(() => {
    return {
      charge: props.shippingChargeData?.charge?.toString() ?? "",
      orderTotalMin: props.shippingChargeData?.orderTotalMin?.toString() ?? "",
      orderTotalMax: props.shippingChargeData?.orderTotalMax?.toString() ?? "",
      storeId: props.shippingChargeData?.storeId?.toString() ?? "",
      recStatus:
        props.shippingChargeData?.recStatus === "active" ? true : false,
    };
  }, [props.shippingChargeData]);

  const isForEdit = props.isModalOpen.type === "edit";

  const onSubmit = async (values: ICreateShippingCostValues) => {
    try {
      props.handleClose();
      toast.success(
        `Shipping cost ${isForEdit ? "updated" : "created"} successfully`
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getStoreOption = useCallback((value: string) => {
    return STORE_OPTIONS.storeData.find((item) => item.value === value);
  }, []);

  return (
    <Modal
      isOpen={true}
      onClose={props.handleClose}
      header={`${isForEdit ? "Edit" : "Add"} Shipping Costs`}
      content={
        <Formik
          enableReinitialize={true}
          initialValues={INITIAL_VALUES}
          validationSchema={ShippingChargesSchemaValidation}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => (
            <FormikForm id="shipping-charges-form" className="flex flex-col gap-4 lg:gap-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <InputNumber
                  name="charge"
                  label="Charge"
                  asterisk
                  value={values.charge}
                  placeholder="Enter Charge"
                  id="charge"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("charge", e.target.value)}
                  displayError={errors.charge && touched.charge ? true : false}
                />
              </div>
              <div className="w-full">
                <InputNumber
                  name="orderTotalMin"
                  label="Order Total Minimum"
                  asterisk
                  placeholder="Enter Order Total Minimum"
                  id="orderTotalMin"
                  value={values.orderTotalMin}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue("orderTotalMin", e.target.value)
                  }
                  displayError={
                    errors.orderTotalMin && touched.orderTotalMin ? true : false
                  }
                />
              </div>
              <div className="w-full">
                <InputNumber
                  name="orderTotalMax"
                  label="Order Total Maximum"
                  asterisk
                  placeholder="Enter Order Total Maximum"
                  id="orderTotalMax"
                  value={values.orderTotalMax}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    setFieldValue("orderTotalMax", e.target.value)
                  }
                  displayError={
                    errors.orderTotalMax && touched.orderTotalMax ? true : false
                  }
                />
              </div>
              <div className="w-full">
                <Dropdown
                  asterisk
                  name="storeId"
                  label="Store"
                  value={getStoreOption(values.storeId)}
                  isClearable
                  options={STORE_OPTIONS.storeData}
                  placeholder="Select Store"
                  onChange={(event) => {
                    setFieldValue(
                      "storeId",
                      (event as IDropdownOption)?.value ?? ""
                    );
                  }}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.storeId && !!errors.storeId ? errors.storeId : ""
                  }
                />
              </div>
              <div className="w-full flex mb-4">
                <div className="w-full">
                  <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                    <ToggleButton
                      name="recStatus"
                      id="recStatus"
                      label="Status"
                      size="medium"
                      on="Active"
                      off="Inactive"
                      onChange={(toggle) => {
                        setFieldValue("recStatus", toggle);
                      }}
                    />
                  </div>
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      }
      footer={
        <>
          <Button
            variant="outline-secondary"
            type="button"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" form="shipping-charges-form">
            Save
          </Button>
        </>
      }
    />
  );
};

export default CreateShippingCost;

CreateShippingCost.displayName = "CreateShippingCost";
