"use client";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React from "react";
import { PageRoutes } from "@/admin-pages/routes";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { LoginValidationSchema } from "@/utils/validations/login.validation";
import { useRouter } from "next/navigation";
import { LOGIN_BACKGROUND_IMAGE } from "@/utils/constants";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => <Loader />,
});

const initialValues = {
  email: "",
  password: "",
  captcha: "",
  rememberMe: false,
};

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    handler?: FormikHelpers<typeof initialValues>
  ) => {
    try {
      handler?.resetForm();
      router.replace(
        `${PageRoutes.TWO_FACTOR_AUTHENTICATION}/${Math.floor(Math.random() * 10)}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
          <div>
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
                validationSchema={LoginValidationSchema}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <Form>
                      <div className="flex flex-col gap-6">
                        <Input
                          type="text"
                          name="email"
                          id="email"
                          placeholder="Enter your email address"
                          label="Email Address"
                          asterisk
                          value={values.email}
                          onChange={(e) =>
                            setFieldValue("email", e.target.value)
                          }
                        />
                        <Input
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          name="password"
                          id="password"
                          asterisk
                          value={values.password}
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
                        />

                        <ReCAPTCHA
                          className="transform scale-[1] origin-[0_0]"
                          sitekey={"6LesILIgAAAAAD6ss4sol_J3qA7N2tBYPtJXA1oa"}
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-2">
                            <Checkbox
                              id="rememberMe"
                              name="rememberMe"
                              label="Remember me"
                              labelClassName="text-sm"
                              checkboxClassName="border dark:border-gray-light"
                              onChange={(e) => {
                                setFieldValue(e.target.name, e.target.checked);
                              }}
                              checked={values.rememberMe}
                            />
                          </div>
                          <Link
                            className="text-primary-light text-sm dark:text-primary-dark"
                            href={PageRoutes.FORGOT_PASSWORD}
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            type="submit"
                            className="w-full"
                            onClick={() => {
                              toast.promise(onSubmit(values), {
                                pending: "Redirecting to OTP page...",
                                error: "Failed to redirect to OTP page",
                              });
                            }}
                          >
                            Sign In
                          </Button>
                        </div>
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

export default LoginPage;
