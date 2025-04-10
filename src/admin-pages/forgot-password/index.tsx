"use client";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { PageRoutes } from "@/admin-pages/routes";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { ForgotPasswordValidationSchema } from "@/utils/validations/forgotPassword.validation";
import { LOGIN_BACKGROUND_IMAGE } from "@/utils/constants";

const initialValues = {
  email: "",
};

const ForgotPasswordPage = () => {
  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      toast.success("Reset link sent to your email");
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleBackToLogin = () => {
    router.push(PageRoutes.LOGIN);
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
                validationSchema={ForgotPasswordValidationSchema}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <Form>
                      <div className="flex flex-col gap-6">
                        <Input
                          id="email"
                          type="text"
                          name="email"
                          asterisk
                          label="Email Address"
                          placeholder="Enter your email address"
                          value={values.email || ""}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                        />

                        <Button
                          type="button"
                          variant="outline-primary"
                          onClick={handleBackToLogin}
                        >
                          Back to Login
                        </Button>
                        <Button type="submit" variant="primary">
                          Send Reset Link
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

export default ForgotPasswordPage;
