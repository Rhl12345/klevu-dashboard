"use client";
import { useFormik } from "formik";
import { useEffect, useState, useMemo } from "react";
import { PROFILE_PATHS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { myAccountValidationSchema } from "@/utils/validations/myAccount.validation";
import MyAccount from "@/admin-pages/profile/components/MyAccount";
import MyNotification from "@/admin-pages/profile/components/MyNotification";
import SystemLog from "@/admin-pages/profile/components/SystemLog";
import UserPermission from "@/admin-pages/profile/components/UserPermission";
import AccountActivity from "@/admin-pages/profile/components/AccountActivity";
import ProfileSidebar from "@/admin-pages/profile/components/ProfileSidebar";
import { toast } from "react-toastify";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";

const ProfilePage = ({ customerId }: { customerId: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    setActiveTab(
      PROFILE_PATHS.findIndex((item) => `${item}/${customerId}` === pathname)
    );
  }, []);
  const formik = useFormik({
    initialValues: {
      firstname: "Umang",
      lastname: "Patel",
      phone: "1234567890",
      acceptNewsletter: false,
      isSuperUser: false,
      reportingTo: { value: "1", label: "Manager 1" },
    },
    validationSchema: myAccountValidationSchema,
    onSubmit: (values) => {
      // Handle profile form submission
    },
  });

  const handleSubmit = () => {
    switch (activeTab) {
      case 0: {
        // Setup Tab

        formik.submitForm();
        toast.success("Details saved successfully");
        break;
      }
      default:
        console.log("No form to submit in this tab");
    }
  };

  const tabsRender = useMemo(
    () => [
      <MyAccount key="my-account" formik={formik} />,
      <MyNotification key="notification" />,
      <AccountActivity key="activity" />,
      <UserPermission key="permission" />,
      <SystemLog key="system-log" />,
    ],
    [formik]
  );

  return (
    <>
      <CreatePageHeader
        module="Profile"
        navigateUrl={PageRoutes.USERS.LIST}
        borderShow={true}
      >
        <Button onClick={handleSubmit}>Save</Button>
      </CreatePageHeader>
      <div>
        <ProfileSidebar userId={customerId} setActiveTab={setActiveTab} />
      </div>
      {tabsRender[activeTab]}
    </>
  );
};

export default ProfilePage;
