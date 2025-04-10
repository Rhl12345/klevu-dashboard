"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { CUSTOMER_LOGO_COLUMNS } from "./customerLogo.config";
import {
  getOrderLogoDetails,
  ICustomerLogo,
} from "@/services/order/getOrderLogoDetails.service";

const CustomerLogo = ({ orderId }: { orderId: string }) => {
  const [customerLogos, setCustomerLogos] = useState<ICustomerLogo[]>([]);

  const fetchOrderLogoDetails = async () => {
    const response = await getOrderLogoDetails(orderId);
    setCustomerLogos(response.data);
  };

  useEffect(() => {
    fetchOrderLogoDetails();
  }, [orderId]);

  return (
    <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6">
      <ReactTable
        COLUMNS={CUSTOMER_LOGO_COLUMNS}
        DATA={customerLogos}
        usedInsideModal={true}
        showFilter={false}
        />
    </div>
  );
};

export default CustomerLogo;
