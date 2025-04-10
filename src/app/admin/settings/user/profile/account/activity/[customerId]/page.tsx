import ProfilePage from "@/admin-pages/profile/user-profile";
import React from "react";

export const metadata = {
  title: "Account Activity",
  description: "Account activity page",
};

const AccountActivityPage = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;
  return <ProfilePage customerId={customerId} />;
};

export default AccountActivityPage;
