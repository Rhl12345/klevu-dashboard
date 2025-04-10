import ProfilePage from "@/admin-pages/profile/user-profile";
import React from "react";

export const metadata = {
  title: "My Notification",
  description: "Notifications page",
};

const MyNotificationPage = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;

  return <ProfilePage customerId={customerId} />;
};

export default MyNotificationPage;
