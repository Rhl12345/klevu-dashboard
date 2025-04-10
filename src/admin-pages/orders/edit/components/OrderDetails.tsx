import Button from "@/components/Button/Button";
import { IOrderDetail } from "@/types/orders/orders.type";
import { getFormatDate } from "@/utils/date.util";
import { toast } from "react-toastify";

const OrderDetails = ({ orderDetail }: { orderDetail: IOrderDetail }) => {
  const ResendOrderDetails = () => {
    toast.success("Order details resent");
  };
  return (
    <>
      <div className="2xl:w-6/12 2xl:h-full h-auto lg:flex">
        <div className="w-full flex flex-col justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none gap-2">
          <div className="w-full border-b border-gray-light dark:border-gray-dark mb-2">
            <div className="flex items-center justify-between pb-2">
              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                Order Details
              </div>
              <div className="">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => ResendOrderDetails()}
                >
                  Resend order Details
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Total
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
              {orderDetail?.total
                ? Number(orderDetail?.total).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Payment Status
            </div>
            <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
              <span className="rounded-full px-3 py-1 text-xs border border-sky-300 bg-sky-100 text-sky-600 text-center block font-medium tracking-widest">
                {orderDetail?.paymentStatus}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Imported On
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.orderDate
                ? getFormatDate(orderDetail?.orderDate).date +
                  " " +
                  getFormatDate(orderDetail?.orderDate).time
                : ""}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Ordered On
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.orderDate &&
                getFormatDate(orderDetail?.orderDate).date +
                  " " +
                  getFormatDate(orderDetail?.orderDate).time}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Channel
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.employeeId == 0 ? "Web Order" : "Employee Order"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Sales Representative
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.empSalesRap}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Employee Source Name
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.empSourceName}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
              Employee Source Medium
            </div>
            <div className="text-sm text-quaternary-dark dark:text-quaternary-light font-normal text-right">
              {orderDetail?.empSourceMedium}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
