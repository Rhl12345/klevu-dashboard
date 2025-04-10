"use client";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import OTPInput from "@/components/Input/OtpInput";
import Text from "@/components/Text/Text";
import { getErrorMessage } from "@/utils/common.util";
import {
  LOGIN_BACKGROUND_IMAGE,
  OTP_LENGTH,
  TILL_ONE_DAY_EXPIRATION,
} from "@/utils/constants";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { PageRoutes } from "@/admin-pages/routes";

const initialValues = {
  code: "",
};

const TwoFactorAuthenticationPage = ({ id }: { id: string }) => {
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleResendOtp = (resetForm: () => void) => {
    if (timer === 0) {
      startTimer();
      toast.success("Reset link sent to your email");
      resetForm();
    }
  };

  const startTimer = () => {
    setTimer(105);
  };

  const onSubmit = async (
    values: typeof initialValues,
    handler?: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const otpMatch = values.code.split("");

      if (otpMatch.length < OTP_LENGTH) {
        toast.error("otp code is not valid");
        return;
      }

      handler?.resetForm();
      // set auth token
      document.cookie =
        "auth_token=your_token_value_here; path=/; max-age=" +
        TILL_ONE_DAY_EXPIRATION;

      router.replace(PageRoutes.DASHBOARD);
      await new Promise((resolve) => setTimeout(resolve, 900));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const renderTime = useMemo(() => {
    return `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;
  }, [timer]);

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
              >
                {({ setFieldValue, values, resetForm }) => {
                  return (
                    <Form>
                      <div className="flex flex-col gap-6">
                        <OTPInput
                          name="code"
                          length={OTP_LENGTH}
                          value={values.code}
                          setValue={(value) => {
                            setFieldValue("code", value);
                          }}
                          autoFocus={true}
                          isNumberInput
                          disabled={false}
                        />

                        <Text align="center">
                          A message with a verification code has been sent to
                          your devices. Enter the code to continue.
                        </Text>

                        <div
                          className={`flex justify-${
                            timer > 0 ? "between" : "end"
                          }`}
                        >
                          {timer > 0 && renderTime}

                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => handleResendOtp(resetForm)}
                            disabled={timer > 0}
                          >
                            Resend
                          </Button>
                        </div>

                        <Button
                          type="submit"
                          onClick={() => {
                            toast.promise(onSubmit(values), {
                              pending: "Logging in...",
                              success: "Login successful",
                              error: "Login failed",
                            });
                          }}
                        >
                          Continue
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

export default TwoFactorAuthenticationPage;
