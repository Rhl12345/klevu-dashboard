import ProfilePage from "@/admin-pages/profile/user-profile";
import React from "react";

export const metadata = {
  title: "User Permission",
  description: "User Permission page",
};

const PermissionPage = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;

  return <ProfilePage customerId={customerId} />;
};

export default PermissionPage;
