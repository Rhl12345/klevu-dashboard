import React from "react";
import PhoneOrderList from "@/admin-pages/phone-order/list";

export const metadata = {
  title: "Draft/Phone Order",
  description: "Draft/Phone Order",
};

const PhoneOrder = () => {
  return (
    <div>
      <PhoneOrderList />
    </div>
  );
};

export default PhoneOrder;
