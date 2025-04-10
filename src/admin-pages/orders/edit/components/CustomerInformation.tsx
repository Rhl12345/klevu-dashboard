import { IOrderDetail } from "@/types/orders/orders.type";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import InputNumber from "@/components/Input/InputNumber";
import OrderModal from "@/admin-pages/orders/list/components/OrderModal";

const CustomerInformation = ({
  orderDetail,
  id,
}: {
  orderDetail: IOrderDetail;
  id: string;
}) => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const blockIP = () => {
    toast.success("IP blocked");
  };
  const saveCustomerID = () => {
    setCustomerID(customerID);
    toast.success("Customer ID saved");
  };
  const refreshFromBC = () => {
    setCustomerID(orderDetail?.navCustomerID);
    toast.success("Customer ID refreshed from BC");
  };

  const [customerID, setCustomerID] = useState(orderDetail?.navCustomerID);
  return (
    <>
      <div className="2xl:w-6/12 2xl:h-full h-auto lg:flex">
        <div className="w-full flex flex-col justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none gap-2">
          <div className="w-full border-b border-gray-light dark:border-gray-dark mb-2">
            <div className="flex items-center justify-between pb-2">
              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                Customer Info
              </div>
              <div className="">
                <Button variant="primary" size="sm" onClick={() => blockIP()}>
                  Block this IP
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Name :
            </div>
            <div
              className="text-left text-sm font-semibold text-quaternary-dark dark:text-quaternary-light cursor-pointer"
              onClick={() => setSelectedOrder(id)}
            >
              {orderDetail?.billingAddress?.firstName}
              {orderDetail?.billingAddress?.lastName}
            </div>
          </div>
          <div className="sm:flex items-center gap-1">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light pb-2 sm:pb-0">
              BC Customer ID :
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light md:flex md:items-center gap-1 md:space-y-0 space-y-2 flex-wrap">
              <div className="2xl:mt-1 lg:mt-2 md:mt-2.5 mt-0">
                <InputNumber
                  defaultValue={orderDetail?.navCustomerID}
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                  formik={false}
                />
              </div>
              <div className="2xl:pt-0 pt-2 flex gap-1 ">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => saveCustomerID()}
                >
                  Save
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => refreshFromBC()}
                >
                  Refresh From BC
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Company Name :
            </div>
            <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              {orderDetail?.billingAddress?.company}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              BC Order Status :
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
              &nbsp;
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              BC Document Number :
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
              &nbsp;
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Email :
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
              {orderDetail?.billingAddress?.email}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Shipping &amp; Handling :
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
              {orderDetail?.shippingType}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              In HandDate :
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal">
              {orderDetail?.inHandDate}
            </div>
          </div>
        </div>

        {selectedOrder && (
          <OrderModal
            onClose={() => setSelectedOrder(null)}
            orderId={selectedOrder}
          />
        )}
      </div>
    </>
  );
};

export default CustomerInformation;
