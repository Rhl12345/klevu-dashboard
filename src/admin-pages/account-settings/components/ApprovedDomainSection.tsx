import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Text from "@/components/Text/Text";
import { IApprovedDomainSectionProps } from "@/types/account-settings/accountSettings.type";
import { useState } from "react";

const ApprovedDomainSection = ({
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}: IApprovedDomainSectionProps) => {
  const [isAddingDomain, setIsAddingDomain] = useState<boolean>(false);

  const handleCancelAddDomain = () => {
    setIsAddingDomain(false);
    if (setFieldValue) {
      setFieldValue("domain", "");
    }
    if (setFieldTouched) {
      setFieldTouched("domain", false);
    }
  };

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
      <div className="flex items-center justify-between">
        <Text size="lg" className="font-bold">
          Approved Domains
        </Text>
      </div>
      <div className="">
        <div className="flex flex-wrap gap-4 lg:gap-6">
          <div className="flex flex-col gap-2 lg:gap-4 text-sm font-medium">
            <Text size="sm" className=" cursor-pointer">
              Single Sign-On (SSO) using Microsoft credentials is enabled.
              Approved domains below designate:
            </Text>

            <ol className="pl-5 list-decimal text-quaternary-dark dark:text-quaternary-light">
              <li>
                <Text size="sm">
                  Who can log in using Microsoft Credentials
                </Text>
              </li>
              <li>
                <Text size="sm">
                  Who can automatically be granted a Wrike license based on SCIM
                  user provisioning.
                </Text>
              </li>
            </ol>
            <Text size="sm">
              How do I approve domains? Company domains (2):
            </Text>
            <ul className="list-disc pl-5" />
            {isAddingDomain && (
              <div className="lg:w-1/3 mb-2 flex">
                <div className="w-full">
                  <Input
                    id="domains"
                    type="text"
                    name="domain"
                    placeholder="Enter domain"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <SvgIcon
                  name="x-close"
                  className="w-6 h-6 cursor-pointer text-red-500 mt-2"
                  onClick={handleCancelAddDomain}
                />
              </div>
            )}
            <div>
              <Button
                type="button"
                variant="primary"
                onClick={() => setIsAddingDomain(true)}
              >
                Add domain
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedDomainSection;
