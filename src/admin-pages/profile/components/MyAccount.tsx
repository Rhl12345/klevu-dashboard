"use client";
import Input from "@/components/Input/Input";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import Dropdown from "@/components/DropDown/DropDown";
import PasswordChange from "./PasswordChange";
import { IMyAccountProps } from "@/types/profile/myAccount.type";
import { Label } from "@/components/Label/Label";
import { ADMIN_EMAIL } from "@/mock-data/accountActivity";
import { REPORTING_TO_OPTIONS } from "@/utils/Dummy";
import Checkbox from "@/components/Checkbox/Checkbox";

const MyAccount = ({ formik }: IMyAccountProps) => {
  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:px-8 px-4 py-4 lg:py-8">
      <div className="w-full bg-body-light dark:bg-body-dark lg:py-6 lg:px-6 py-4 px-4 border border-gray-light dark:border-gray-dark">
        <div className="flex flex-wrap gap-4 lg:gap-6">
          <div className="w-full flex flex-wrap gap-4 lg:gap-6">
            <Label size="large" className="w-full flex flex-wrap gap-2">
              My Account
              <span className="max-md:w-full">{`(${formik.values.firstname} ${formik.values.lastname})`}</span>
            </Label>

            <form id="profile-form" onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4 lg:gap-6">
              {/* Profile Photo Section */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex items-center">
                  <div className="mr-4 w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src="https://www.creativefabrica.com/wp-content/uploads/2023/04/18/Corgi-Puppy-Dog-Face-Clipart-Graphics-67524519-1-580x387.jpg" // Your base64 image
                      alt="User upload"
                      className="h-full"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/jpeg,image/png";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement)
                            .files?.[0];
                          // Handle file upload here
                        };
                        input.click();
                      }}
                    >
                      Change
                    </Button>
                    <Label size="small">
                      recommended size 80px to 80px (width to height) & (JPG,
                      PNG)
                    </Label>
                  </div>
                </div>
              </div>

              {/* User Profile Section */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <Text size="xl">User Profile</Text>
                <Text className="text-sm">
                  You may edit this page to include additional information about
                  yourself.
                </Text>
                <div className="sm:flex sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="sm:w-1/3">
                    <Input
                      type="text"
                      name="firstname"
                      label="First Name"
                      asterisk
                      formik={false}
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstname &&
                        Boolean(formik.errors.firstname)
                      }
                      errorMessage={
                        formik.touched.firstname && formik.errors.firstname
                      }
                    />
                  </div>
                  <div className="sm:w-1/3">
                    <Input
                      type="text"
                      name="lastname"
                      label="Last Name"
                      asterisk
                      formik={false}
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
                      }
                      errorMessage={
                        formik.touched.lastname && formik.errors.lastname
                      }
                    />
                  </div>
                  <div className="sm:w-1/3">
                    <Input
                      type="text"
                      name="phone"
                      label="Phone Number"
                      asterisk
                      formik={false}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      errorMessage={formik.touched.phone && formik.errors.phone}
                    />
                  </div>
                  <div className="sm:w-1/3">
                    <Dropdown
                      id="reportingTo"
                      name="reportingTo"
                      label="Report To"
                      value={formik.values.reportingTo}
                      onChange={(value) =>
                        formik.setFieldValue("reportingTo", value)
                      }
                      options={REPORTING_TO_OPTIONS}
                      isDisabled={formik.values.isSuperUser}
                      error={
                        formik.touched.reportingTo &&
                        Boolean(formik.errors.reportingTo)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <div className="flex justify-between gap-2">
                  <div className="flex items-center text-tertiary-dark dark:text-tertiary-light">
                    <Checkbox
                      id="isSuperUser"
                      name="isSuperUser"
                      label="Super User"
                      onChange={(e) =>
                        formik.setFieldValue("isSuperUser", e.target.checked)
                      }
                      checked={formik.values.isSuperUser}
                    />
                  </div>
                  <div className="flex items-center  text-tertiary-dark dark:text-tertiary-light">
                    <Checkbox
                      id="acceptNewsletter"
                      name="acceptNewsletter"
                      label="Accept To Receive Promotional Newsletter"
                      onChange={(e) =>
                        formik.setFieldValue(
                          "acceptNewsletter",
                          e.target.checked
                        )
                      }
                      checked={formik.values.acceptNewsletter}
                    />
                  </div>
                </div>
                <div className="">
                  <Text size="xl">Email</Text>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Text size="xs">{ADMIN_EMAIL}</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Section */}
            </form>

            <section>
              <PasswordChange />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
