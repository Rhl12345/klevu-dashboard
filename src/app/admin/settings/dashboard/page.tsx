import SettingsDashboard from "@/admin-pages/settings-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings Dashboard",
  description: "Settings Dashboard",
};

const Dashboard = () => {
  return <SettingsDashboard />;
};

export default Dashboard;
