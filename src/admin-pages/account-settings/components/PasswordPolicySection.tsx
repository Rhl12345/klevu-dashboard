"use client";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Text from "@/components/Text/Text";
import { IPasswordPolicySectionProps } from "@/types/account-settings/accountSettings.type";
import {
  PasswordStrengthType,
  passwordStrengthTypeLabels,
} from "@/utils/constants";
import { memo, useState } from "react";

const PasswordPolicySection = memo(
  ({
    handleChange,
    values,
    setFieldValue,
    handleBlur,
    errors,
    touched,

    isSubmitting,
  }: IPasswordPolicySectionProps) => {
    const [isModalOpen, setIsModalOpen] = useState<{
      isOpen: boolean;
      type: "view" | null;
    }>({
      isOpen: false,
      type: null,
    });
    const handleModalClose = () => {
      setIsModalOpen({ isOpen: false, type: null });
    };
    return (
      <>
        <Modal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          header={<></>}
          contentClassName={
            "p-6 overflow-y-auto text-sm mt-2 h-[90%] object-contain"
          }
          content={
            <>
              <div className="flex justify-center h-full">
                <Image
                  src="/images/password.png"
                  width={500}
                  height={300}
                  alt="Password strength measurement guide"
                />
              </div>
            </>
          }
        />

        <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 border-b border-gray-light dark:border-gray-dark">
          <div className="flex items-center justify-between">
            <Text size="lg" className="font-bold">
              Password Policies
            </Text>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <div className="flex flex-wrap w-full">
                {/* Minimal required password strength */}
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                  <Text size="sm" className="font-semibold">
                    Minimal required password strength
                  </Text>
                  {Object.values(PasswordStrengthType).map((value, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                      <div className="inline-flex items-center">
                        <RadioGroup
                          id={`password_strength_${value}`}
                          name="passwordStrengthType"
                          value={value}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          defaultChecked={values.passwordStrengthType === value}
                        />
                        <Text size="sm">
                          {passwordStrengthTypeLabels[value]}
                        </Text>
                      </div>
                    </div>
                  ))}
                  <Text
                    size="sm"
                    className=" cursor-pointer"
                    onClick={() =>
                      setIsModalOpen({ isOpen: true, type: "view" })
                    }
                  >
                    How is password strength measured?
                  </Text>
                </div>
                {/* Force reset user passwords */}
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                  <Text size="sm" className="font-semibold">
                    Force reset user passwords
                  </Text>
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center">
                      <RadioGroup
                        id="user_passwords1"
                        name="resetPasswordType"
                        value={1}
                        onChange={(e) => {
                          if (setFieldValue) {
                            setFieldValue("resetPasswordType", e.target.value);
                          }
                        }}
                      />
                      <Label>Never</Label>
                    </div>
                  </div>
                  <div className="">
                    <div className="inline-flex items-center">
                      <RadioGroup
                        id="resetPasswordDays"
                        name="resetPasswordType"
                        value={2}
                        onChange={(e) => {
                          if (setFieldValue) {
                            setFieldValue(
                              "resetPasswordType",
                              parseInt(e.target.value)
                            );
                          }
                        }}
                      />
                      <Label>Every</Label>
                      <Input
                        id="resetPasswordDays"
                        type="number"
                        name="resetPasswordDays"
                        placeholder="Enter days"
                        onBlur={handleBlur}
                      />
                      <Label className="ml-2">days</Label>
                    </div>
                    <div className="mb-2"></div>
                  </div>
                </div>
                {/* Previously used passwords */}
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                  <Text size="sm" className="font-semibold">
                    Previously used passwords
                  </Text>
                  <div className="">
                    <Label className="inline-flex items-center">
                      <RadioGroup
                        id="used_passwords1"
                        name="restrictUsedPasswordType"
                        value={1}
                        onChange={(e) => {
                          if (setFieldValue) {
                            setFieldValue(
                              "restrictUsedPasswordType",
                              parseInt(e.target.value)
                            );
                            setFieldValue("restrictUsedPasswordCount", "");
                          }
                        }}
                      />
                      <Label>Allow</Label>
                    </Label>
                  </div>
                  <div className="">
                    <Label className="inline-flex items-center">
                      <RadioGroup
                        id="used_passwords2"
                        name="restrictUsedPasswordType"
                        value={2}
                        onChange={(e) => {
                          if (setFieldValue) {
                            setFieldValue(
                              "restrictUsedPasswordType",
                              e.target.value
                            );
                          }
                        }}
                      />
                      <Label>Restrict</Label>
                      <div className="flex items-center gap-2 mr-2">
                        <Input
                          type="number"
                          name="restrictUsedPasswordCount"
                          placeholder="Enter count"
                          disabled={values.restrictUsedPasswordType === 1}
                          value={values.restrictUsedPasswordCount}
                          onChange={(e) => {
                            if (setFieldValue) {
                              setFieldValue(
                                "restrictUsedPasswordCount",
                                parseInt(e.target.value)
                              );
                            }
                          }}
                        />
                      </div>
                      <span className="text-[13px] font-semibold ml-2">
                        previous
                      </span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default PasswordPolicySection;
