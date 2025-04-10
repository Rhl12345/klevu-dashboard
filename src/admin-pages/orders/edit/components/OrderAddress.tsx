import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IOrderDetail } from "@/types/orders/orders.type";
import { useState } from "react";
import OrderAddressModal from "@/admin-pages/orders/edit/components/OrderAddressModal";
const OrderAddress = ({
  orderDetail,
  type,
}: {
  orderDetail: IOrderDetail;
  type: "Billing" | "Shipping";
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="xl:w-4/12 xl:h-full h-auto xl:flex">
        <div className="w-full flex flex-col gap-4 lg:gap-6 justify-start border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                {type} Address
              </div>
              <div className="">
                <SvgIcon
                  name="edit-01"
                  className="text-quaternary-dark dark:text-quaternary-light cursor-pointer"
                  width={16}
                  height={16}
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.firstName
                : orderDetail?.shippingAddress?.firstName}
            </div>
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.email
                : orderDetail?.shippingAddress?.email}
            </div>
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.address1
                : orderDetail?.shippingAddress?.address1}
            </div>
            {type === "Billing" && orderDetail?.billingAddress?.address2 && (
              <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
                {orderDetail?.billingAddress?.address2}
              </div>
            )}
            {type === "Shipping" && orderDetail?.shippingAddress?.address2 && (
              <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
                {orderDetail?.shippingAddress?.address2}
              </div>
            )}
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.city
                : orderDetail?.shippingAddress?.city}
            </div>
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.country
                : orderDetail?.shippingAddress?.country}
            </div>
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light w-full">
              {type === "Billing"
                ? orderDetail?.billingAddress?.phone
                : orderDetail?.shippingAddress?.phone}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <OrderAddressModal
          type={type}
          showModal={showModal}
          orderDetail={orderDetail}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default OrderAddress;
