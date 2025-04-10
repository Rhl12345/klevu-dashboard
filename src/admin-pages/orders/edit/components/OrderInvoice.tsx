import { IOrderDetail } from "@/types/orders/orders.type";
import Button from "@/components/Button/Button";
const OrderInvoice = ({ orderDetail }: { orderDetail: IOrderDetail }) => {
  return (
    <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
      <div className="w-full flex flex-col gap-4 justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
              Channel Invoice : {orderDetail?.orderNumber}
            </div>
            <div className="">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.print();
                }}
              >
                Download Personalization
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-left text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
            <span>Subtotal</span>
            <span className="font-normal lg:ml-10 ml-4">
              {orderDetail.totalItems} Item(s)
            </span>
          </div>
          <div className="text-base text-quaternary-dark dark:text-quaternary-light font-normal text-right">
            ${orderDetail.subTotal}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-left text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
            <span>Tax</span>
          </div>
          <div className="text-base text-quaternary-dark dark:text-quaternary-light font-normal text-right">
            ${orderDetail.tax}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-left text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
            <span>Shipping</span>
          </div>
          <div className="text-base text-quaternary-dark dark:text-quaternary-light font-normal text-right">
            ${orderDetail.shipping}
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-2">
          <div className="text-left text-sm font-semibold text-quaternary-dark dark:text-quaternary-light">
            Total
          </div>
          <div className="text-base text-quaternary-dark dark:text-quaternary-light font-bold text-right">
            ${orderDetail.total}
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                window.print();
              }}
            >
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
