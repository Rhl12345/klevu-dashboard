import Checkbox from "@/components/Checkbox/Checkbox";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { IOneTimePasswordSectionProps } from "@/types/account-settings/accountSettings.type";
const OneTimePasswordSection = ({
  handleChange,
  values,
}: IOneTimePasswordSectionProps) => {
  return (
    <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 border-b border-gray-light dark:border-gray-dark">
      <div className="flex items-center justify-between">
        <Text size="lg" className="font-bold">
          One-time password
        </Text>
      </div>
      <div className="">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6 text-sm font-medium">
            <Text size="sm">
              {/* As of now using static value */}
              Some applications don't support two-factor (2FA) or single sign-on
              (SSO) authentication and may need a one-time password (OTP) for
              you to log in. This option enables the creation and usage of OTPs
              for all admins and regular users of the account.
            </Text>
            <div className="bg-gray-light dark:bg-gray-dark p-4 max-w-3xl text-quaternary-dark dark:text-quaternary-light">
              <p className="font-semibold">Note</p>
              <ul className="list-disc pl-5 my-2.5">
                <li>
                  Disabling OTP generation for users of this account will
                  disable OTPs for all accounts they have access to.
                </li>
                <li>
                  You won't be able to log in if OTP is disabled. Please contact
                  our support team if you need to log in to the backup tool but
                  can't enable OTP.
                </li>
              </ul>
            </div>
            <Text size="sm" className="cursor-pointer">
              Contact our support team
            </Text>
          </div>
          <div className="inline-flex items-center">
            <Checkbox
              id="isOneTimePasswordEnabled"
              name="isOneTimePasswordEnabled"
              onChange={handleChange}
              defaultChecked={values.isOneTimePasswordEnabled === true}
            />
            <Label size="small" className="text-sm font-medium ml-2">
              Enable one-time passwords
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimePasswordSection;
