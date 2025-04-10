"use client";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { getErrorMessage } from "@/utils/common.util";
import { LOGIN_BACKGROUND_IMAGE } from "@/utils/constants";
import { ResetPasswordValidationSchema } from "@/utils/validations/resetPassword.validation";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordPage = () => {
  const onSubmit = async (values: typeof initialValues) => {
    try {
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Image
        src={LOGIN_BACKGROUND_IMAGE}
        alt="Login Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="items-center z-10">
        <div className="min-h-screen h-full flex justify-center items-center w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="relative rounded-none border border-gray-light dark:border-gray-dark bg-body-light dark:bg-secondary-dark w-full flex flex-col max-h-[90vh] py-8 px-4 sm:px-10">
              <div className="sm:mx-auto sm:w-full sm:max-w-md -6 text-center justify-center mb-10">
                <Image
                  src={"/images/redefineFullLogoLight.png"}
                  alt="Redefine Commerce"
                  className="w-60 items-center mx-auto"
                />
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validationSchema={ResetPasswordValidationSchema}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <Form>
                      <div className="flex flex-col gap-6">
                        <Input
                          id="newPassword"
                          type="password"
                          name="newPassword"
                          asterisk
                          label="New Password"
                          placeholder="Enter your new password"
                          value={values.newPassword}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                        />

                        <Input
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          asterisk
                          label="Re-enter New Password"
                          placeholder="Enter your new password"
                          value={values.confirmPassword}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                        />

                        <Button type="submit" variant="primary">
                          Save
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
