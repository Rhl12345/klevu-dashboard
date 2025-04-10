import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IOrderDetail } from "@/types/orders/orders.type";
import { getFormatDate } from "@/utils/date.util";
import { useRouter } from "next/navigation";
import ViewOldOrder from "@/admin-pages/orders/edit/components/ViewOldOrder";
import { useState } from "react";
import ManualShipping from "@/admin-pages/orders/edit/components/ManualShipping";
import Dropdown from "@/components/DropDown/DropDown";

const OrderEditHeader = ({
  orderDetail,
  orderId,
}: {
  orderDetail: IOrderDetail;
  orderId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "viewOrder" | "manualShipping" | null;
  }>({ isOpen: false, type: null });
  const router = useRouter();
  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };
  const handleModalOpen = (type: "viewOrder" | "manualShipping" | null) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const MoreOptions = [
    {
      label: "Manual Shipping",
      value: "Manual Shipping",
    },
    {
      label: "Review",
      value: "Review",
    },
    {
      label: "View Old Orders",
      value: "View Old Orders",
    },
    {
      label: "Fraud",
      value: "Fraud",
    },
    {
      label: "Block IP",
      value: "Block IP",
    },
    {
      label: "Cancel Order",
      value: "Cancel Order",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-wrap bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark rounded-none p-2 justify-between items-center gap-4 lg:gap-6">
        <div className="">
          <div className="flex items-center gap-2 flex-wrap text-quaternary-dark dark:text-quaternary-light">
            <SvgIcon
              name="ArrowLeft"
              width={24}
              height={24}
              onClick={() => {
                router.back();
              }}
            />
            <div className="text-base font-bold text-quaternary-dark dark:text-quaternary-light">
              Orders: {orderId}
            </div>
            {orderDetail?.paymentMethod === "PO" && (
              <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
                PO # : {orderDetail?.paymentStatus}
              </div>
            )}
            <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light flex items-center gap-1">
              Fulfillment:
              <span className="rounded-full px-3 py-1 text-xs border border-sky-300 bg-sky-100 text-sky-600 text-center block font-medium tracking-widest">
                {orderDetail?.fulfillmentStatus}
              </span>
            </div>
            <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light flex items-center gap-1">
              Payment:
              <span className="rounded-full px-3 py-1 text-xs border border-sky-300 bg-sky-100 text-sky-600 text-center block font-medium tracking-widest">
                {orderDetail?.paymentStatus}
              </span>
            </div>
          </div>
          <div className="flex items-center pt-1 lg:ml-4 ml-1">
            <div className="inline-flex text-sm font-normal text-quaternary-dark dark:text-quaternary-light items-center gap-1">
              {getFormatDate(orderDetail?.orderDate).date} on{" "}
              {getFormatDate(orderDetail?.orderDate).time} from
              <span className="text-base font-bold text-quaternary-dark dark:text-quaternary-light">
                {orderDetail?.storeName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Dropdown
            name="store"
            id="store"
            options={MoreOptions}
            className="lg:w-48"
            placeholder=" More Action"
            onChange={(selected) => {
              const value = (selected as any)?.value;
              if (value === "manual_shipping") {
                handleModalOpen("manualShipping");
              } else if (value === "view_old_orders") {
                handleModalOpen("viewOrder");
              }
            }}
          />
          <div className="flex items-center gap-1 text-quaternary-dark dark:text-quaternary-light">
            <SvgIcon name="arrow-narrow-left" width={24} height={24} />
            <SvgIcon name="arrow-narrow-right" width={24} height={24} />
          </div>
        </div>
      </div>

      <ViewOldOrder
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewOrder"}
        handleModalClose={handleModalClose}
        orderDetail={orderDetail}
      />
      <ManualShipping
        handleModalClose={handleModalClose}
        isOpen={isModalOpen.isOpen && isModalOpen.type === "manualShipping"}
        orderDetail={orderDetail}
      />
    </>
  );
};

export default OrderEditHeader;
