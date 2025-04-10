"use client";
import { Form, Formik } from "formik";
import React from "react";
import { IManageLogoLocationProps } from "@/types/logo-location/logo-location.type";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import BrandsList from "./BrandList";

const INITIAL_VALUES = {
  brandId: [],
};

const ManageLogoLocation: React.FC<IManageLogoLocationProps> = (props) => {
  const onSubmit = () => {};

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      {({ values }) => {
        return (
          <Modal
            isOpen={true}
            onClose={props.handleClose}
            header={"Manage Logo Location"}
            content={
              <Form>
                <BrandsList logoLocationDetailsId={props.locationId} />
              </Form>
            }
            footer={
              <div className="flex items-center justify-end space-x-2 border-gray-200 ">
                <Button
                  variant="outline-primary"
                  data-modal-toggle="ManageLocationModal"
                  type="button"
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
                <Button data-modal-toggle="ManageLocationModal" type="submit">
                  Save
                </Button>
              </div>
            }
          />
        );
      }}
    </Formik>
  );
};

export default ManageLogoLocation;
