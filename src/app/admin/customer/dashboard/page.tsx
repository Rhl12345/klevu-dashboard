import React from "react";
import { Metadata } from "next";
import CustomerDashboard from "@/admin-pages/customer-dashboard/dashboard";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer Dashboard Page",
};
const CustomerDashboardPage = () => {
  return <CustomerDashboard />;
};

export default CustomerDashboardPage;
