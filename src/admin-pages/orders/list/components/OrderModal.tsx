import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import MyTabs from "@/components/Tab/Tab";
import { ORDER_MODAL_TABS } from "./orderModal.config";
import { IGetOrdersItem } from "@/services/order/getOrders.service";
import { getOrderDetails } from "@/services/order/getOrderDetails.service";
import ReactTable from "@/components/Table/ReactTable";
import PersonalDetails from "./PersonalDetails";
import PaymentOption from "./PaymentOption";
import Order from "./Order";
import CustomerLogo from "./CustomerLogo";
import TierDiscount from "./TierDiscount";
import CompanyInformation from "./CompanyInformation";

const OrderModal = ({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) => {
  const [orderDetails, setOrderDetails] = useState<IGetOrdersItem["items"]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const getOrderDetailsData = async () => {
    const response = await getOrderDetails(orderId);
    setOrderDetails(response.items);
  };

  useEffect(() => {
    getOrderDetailsData();
  }, [orderId]);

  const tabContent = [
    <CompanyInformation />,
    <PersonalDetails />,
    <PaymentOption />,
    <Order customerId={'TODO: NEED TO ADD CUSTOMER ID'} />,
    <CustomerLogo orderId={orderId} />,
    <TierDiscount />,
  ];

  if (!orderDetails) {
    return null;
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      header={<div>Order Details #{orderId}</div>}
      size="7xl"
      content={
        <>
          <MyTabs
            options={ORDER_MODAL_TABS}
            activeTab={activeTab}
            usedInsideModal={true}
            onTabClick={(index: number) => setActiveTab(index)}
          />
          <div className="">{tabContent[activeTab]}</div>
        </>
      }
    />
  );
};

export default OrderModal;
