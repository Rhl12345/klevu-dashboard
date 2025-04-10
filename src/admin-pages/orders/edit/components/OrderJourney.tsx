import { Fragment } from "react";

import { useEffect, useState } from "react";
import { IOrderDetail } from "@/types/orders/orders.type";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import Input from "@/components/Input/Input";

const OrderJourney = ({ orderDetail }: { orderDetail: IOrderDetail }) => {
  const [data, setData] = useState([]);

  const getOrderJourney = () => {
    if (orderDetail && orderDetail?.orderNumber) {
      setData([]);
    }
  };

  useEffect(() => {
    if (orderDetail && orderDetail?.orderNumber) {
      getOrderJourney();
    }
  }, [orderDetail]);

  return (
    <>
      <div className="w-full flex flex-col gap-4 lg:gap-6 justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
              Order Journey
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light min-w-20">
              Name :
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
              {orderDetail?.billingAddress?.name}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light min-w-20">
              Country :
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
              {orderDetail?.billingAddress?.country}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light min-w-20">
              State :
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
              {orderDetail?.billingAddress?.state}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderJourney;
