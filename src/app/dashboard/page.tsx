import MainDashboard from "@/admin-pages/dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const DashboardPage = () => {
  return <MainDashboard />;
};

export default DashboardPage;
