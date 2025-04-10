"use client";
import React from "react";
import BrandsList from "@/admin-pages/logo-location/components/BrandList";
import Button from "@/components/Button/Button";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Input from "@/components/Input/Input";
import UploadImage from "@/components/UploadImage/UploadImage";
import Modal from "@/components/Modal/Modal";
import {
  ILogoLocationCreateEditProps,
  ILogoLocationItem,
} from "@/types/logo-location/logo-location.type";
import { LogoLocationFormValidationSchema } from "@/utils/validations/logo-location.validation";
import { Label } from "@/components/Label/Label";
import InputNumber from "@/components/Input/InputNumber";
import { Formik, Form as FormikForm } from "formik";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";

const CreateEditLogoLocation = (props: ILogoLocationCreateEditProps) => {
  const INITIAL_VALUES = {
    name: props.logoLocationDetail.name ?? "",
    threeDLogoLocationClass:
      props.logoLocationDetail.threeDLogoLocationClass ?? "",
    imageUrl: props.logoLocationDetail.imageUrl ?? "",
    threeDImageURL: props.logoLocationDetail.threeDImageURL ?? "",
    price: props.logoLocationDetail.price ?? "",
    cost: props.logoLocationDetail.cost ?? "",
    brandGuidelines: props.logoLocationDetail.brandGuidelines ?? false,
    brands: props.logoLocationDetail.brands ?? [],
  } as ILogoLocationItem;

  const onSubmit = async (values: ILogoLocationItem) => {
    try {
      toast.success("Logo Location Detail Created Successfully");
      props.handleClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={true}
      size="2xl"
      onClose={props.handleClose}
      header={
        <div className="">
          {`${props.editId ? "Edit" : "Add"} Logo Location Detail`}
        </div>
      }
      content={
        <Formik
          enableReinitialize={true}
          initialValues={INITIAL_VALUES}
          validationSchema={LogoLocationFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleBlur, setFieldValue }) => (
            <FormikForm id="logo-location-detail-form">
              <div className="relative overflow-y-auto">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-6">
                    <Input
                      asterisk={true}
                      label={"Logo Location Name"}
                      name="name"
                      placeholder="Enter Logo Location Name"
                      displayError={true}
                    />
                  </div>
                  <div className="col-span-full xl:col-span-6">
                    <Input
                      label={"3D Logo Location Class"}
                      placeholder="Enter 3D Logo Location Class"
                      name="threeDLogoLocationClass"
                    />
                  </div>
                  <div className="col-span-full xl:col-span-6">
                    <UploadImage label="Location Image" onUpload={() => {}} />
                  </div>
                  <div className="col-span-full xl:col-span-6">
                    <div>
                      <UploadImage label="3D Image" onUpload={() => {}} />
                    </div>
                  </div>
                  <div className="col-span-full xl:col-span-6">
                    <InputNumber
                      label="Price"
                      asterisk
                      name="price"
                      value={values.price}
                      placeholder="Enter Price"
                      id="price"
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("price", e.target.value)}
                      displayError={
                        touched.price && errors.price ? true : false
                      }
                    />
                  </div>
                  <div className="col-span-full xl:col-span-6">
                    <InputNumber
                      name="cost"
                      label="Cost"
                      asterisk
                      value={values.cost}
                      placeholder="Enter Cost"
                      id="cost"
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("cost", e.target.value)}
                      displayError={touched.cost && errors.cost ? true : false}
                    />
                  </div>

                  <div className="col-span-full xl:col-span-6">
                    <div className="text-sm font-medium text-quaternary-dark dark:text-quaternary-light mb-2">
                    <Label>Following Brand Guidelines</Label>
                    </div>
                    <div className="flex items-center">
                      <ToggleButton
                        on="Yes"
                        off="No"
                        id="followingBrand"
                        name="brandGuidelines"
                      />
                    </div>
                  </div>

                  <div className="col-span-full flex flex-col gap-2">
                    <Label>Brand Logo Location </Label>
                    <BrandsList
                      selectedBrands={INITIAL_VALUES.brands ?? []}
                      logoLocationDetailsId={props.locationId}
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
          <Button variant="outline-secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button form="logo-location-detail-form" type="submit">
            Save
          </Button>
        </>
      }
    />
  );
};

export default CreateEditLogoLocation;
