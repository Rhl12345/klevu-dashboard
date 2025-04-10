import OrderDashboard from "@/admin-pages/order-dashboard";
import React from "react";
export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
 const Dashboard = () => {
  return (
    <div>
        <OrderDashboard/>
    </div>
  )
 }

 export default Dashboard;
