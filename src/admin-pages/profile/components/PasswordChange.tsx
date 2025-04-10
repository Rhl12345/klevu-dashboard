import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Text from "@/components/Text/Text";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { passwordChangeValidationSchema } from "@/utils/validations/myAccount.validation";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";

const PasswordChange = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Handle password change logic here
      toast.success("Password change values:", values);
    } catch (error) {
      getErrorMessage(error, "Password change failed");
      toast.error("Password change error:");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <Text size="xl">Password</Text>
      <div className="mb-2">
        <Text size="xs">
          You can set a permanent password if you don't want to use temporary
          login codes.
        </Text>
      </div>

      <Button
        variant="outline-primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        Set New Password
      </Button>

      {isFormVisible && (
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordChangeValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="sm:flex sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                <div className="sm:w-1/3 relative">
                  <Input
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    label="Current Password"
                    placeholder="Current Password"
                    asterisk
                  />
                  <div className="absolute right-2 top-9">
                    <Button
                      variant="default"
                      size="none"
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                    >
                      <SvgIcon
                        name={showCurrentPassword ? "EyeClosed" : "EyeOpen"}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                </div>
                <div className="sm:w-1/3 relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    label="New Password"
                    placeholder="New Password"
                    asterisk
                  />
                  <div className="absolute right-2 top-9">
                    <Button
                      variant="default"
                      type="button"
                      size="none"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                    >
                      <SvgIcon
                        name={showNewPassword ? "EyeClosed" : "EyeOpen"}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                </div>
                <div className="sm:w-1/3 relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Re-enter New Password"
                    placeholder="Re-enter New Password"
                    asterisk
                  />
                  <div className="absolute right-2 top-9">
                    <Button
                      variant="default"
                      size="none"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      <SvgIcon
                        name={showConfirmPassword ? "EyeClosed" : "EyeOpen"}
                        width={20}
                        height={20}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Change Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </section>
  );
};

export default PasswordChange;
