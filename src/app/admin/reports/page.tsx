import Reports from "@/admin-pages/reports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "Reports",
};

const ReportsPage = () => {
  return <Reports />;
};

export default ReportsPage;
