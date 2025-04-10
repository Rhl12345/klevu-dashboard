"use client";
import Button from "@/components/Button/Button";
import ColorPicker from "@/components/Colorpicker/ColorPicker";
import Input from "@/components/Input/Input";
import InputNumber from "@/components/Input/InputNumber";
import Modal from "@/components/Modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { ICreateColorProps, TColorFormValues } from "@/types/color/color.type";
import { getErrorMessage } from "@/utils/common.util";
import { ColorValidationSchema } from "@/utils/validations/colors.validation";
import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { toast } from "react-toastify";

const CreateColor = (props: ICreateColorProps) => {
  const onSubmit = async (values: TColorFormValues) => {
    try {
      toast.success(
        `Color ${props.openModal.type === "edit" ? "updated" : "created"} successfully`
      );
      props.handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const initialValues: TColorFormValues = {
    name: props.colorData?.name ?? "",
    hexCode: props.colorData?.hexCode ?? "",
    borderColor: props.colorData?.borderColor ?? "",
    textColor: props.colorData?.textColor ?? "",
    displayOrder: props.colorData?.displayOrder ?? null,
    recStatus: props.colorData?.recStatus ?? "",
  };

  return (
    <Modal
      isOpen={true}
      onClose={props.handleClose}
      header={`${props.openModal.type === "edit" ? "Edit" : "Add"} Color Facets`}
      content={
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ColorValidationSchema}
        >
          {({ errors, values, handleBlur, touched, setFieldValue }) => {
            return (
              <FormikForm id="color-facet-form">
                <div className="flex flex-col gap-4 lg:gap-6">
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      label="Name"
                      asterisk
                      maxLength={60}
                      onBlur={handleBlur}
                      displayError
                    />
                  </div>
                  <div className="flex flex-col">
                    <ColorPicker
                      placeholder="Enter Hexcode"
                      name="hexCode"
                      id="hexCode"
                      label="Hexcode"
                      onBlur={handleBlur}
                      required
                      maxLength={12}
                    />
                  </div>
                  <div className="flex flex-col">
                    <ColorPicker
                      placeholder="Enter Border Color"
                      name="borderColor"
                      id="borderColor"
                      label="Border Color"
                      onBlur={handleBlur}
                      required
                      maxLength={12}
                    />
                  </div>
                  <div className="flex flex-col">
                    <ColorPicker
                      placeholder="Enter Text Color"
                      name="textColor"
                      id="textColor"
                      label="Text Color"
                      onBlur={handleBlur}
                      required
                      maxLength={12}
                    />
                  </div>
                  <div className="flex flex-col">
                    <InputNumber
                      id="displayOrder"
                      name="displayOrder"
                      placeholder="Enter Display Order"
                      value={values.displayOrder!}
                      allowNegative={false}
                      label="Display Order"
                      asterisk
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("displayOrder", e.target.value)
                      }
                      displayError
                    />
                  </div>
                  <div className="flex flex-col">
                    <ToggleButton
                      name="recStatus"
                      id="recStatus"
                      size="medium"
                      on="Active"
                      off="Inactive"
                      label="Status"
                    />
                  </div>
                </div>
              </FormikForm>
            );
          }}
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
          <Button type="submit" form="color-facet-form">
            Save
          </Button>
        </>
      }
    />
  );
};

export default CreateColor;
