"use client";

import React from "react";
import OrderSidebar from "@/admin-pages/orders/edit/components/OrderSidebar";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import OrderLog from "@/admin-pages/orders/edit/components/OrderLog";
import OrderData from "@/mock-data/OrdersEditData.json";
import OrderJourney from "@/admin-pages/orders/edit/components/OrderJourney";
import OrderDetails from "@/admin-pages/orders/edit/components/OrderDetails";
import CustomerInformation from "@/admin-pages/orders/edit/components/CustomerInformation";
import OrderAddress from "@/admin-pages/orders/edit/components/OrderAddress";
import OrderInvoice from "@/admin-pages/orders/edit/components/OrderInvoice";
import OrderEditHeader from "@/admin-pages/orders/edit/components/OrderEditHeader";
import OrderLineItems from "@/admin-pages/orders/edit/components/OrderLineItems";
import CustomerNotes from "@/admin-pages/orders/edit/components/CustomerNotes";
const EditOrder = ({ id }: { id: string }) => {
  const orderDetail = OrderData.orderDetail;
  return (
    <>
      <div>
        <CreatePageHeader
          navigateUrl={PageRoutes.ORDERS.LIST}
          module="Order Edit Page"
          showCancelButton={false}
        />
        <div className="w-full lg:pt-8 xl:px-8 pt-4 px-4 lg:space-y-8 space-y-5">
          <OrderEditHeader orderDetail={orderDetail} orderId={id} />
        </div>
        <div className="w-full lg:flex gap-4 lg:gap-8 lg:py-8 xl:px-8 p-4 lg:p-6">
          <div className="w-full lg:w-7/12 xl:w-10/12">
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <div className="w-full rounded-none content bg-body-light dark:bg-body-dark">
                <div className="font-semibold text-secondary-dark dark:text-secondary-light">
                  <div className="gap-4 lg:gap-6 grid grid-cols-1">
                    <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                      <OrderDetails orderDetail={orderDetail} />
                      <CustomerInformation orderDetail={orderDetail} id={id} />
                    </div>
                    <div className="xl:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                      <OrderAddress orderDetail={orderDetail} type="Billing" />
                      <OrderAddress orderDetail={orderDetail} type="Shipping" />
                      <div className="xl:w-4/12 xl:h-full h-auto xl:flex">
                        <div className="w-full flex flex-col gap-4 lg:gap-6 justify-start border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                                Payment Information
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
                              Payment Method :
                            </div>
                            <div className="text-left text-sm font-normal text-quaternary-dark dark:text-quaternary-light">
                              {orderDetail?.paymentMethod}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <OrderLineItems orderDetail={orderDetail} />
                    </div>
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <OrderInvoice orderDetail={orderDetail} />
                    </div>
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <CustomerNotes orderDetail={orderDetail} />
                    </div>
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <div className="w-full flex flex-col gap-4 justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
                          <div className="w-full">
                            <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                              Order Log
                            </div>
                          </div>
                          <div className="w-full">
                            <OrderLog />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gap-4 lg:gap-6 grid grid-cols-1">
                      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                        <OrderJourney orderDetail={orderDetail} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12 xl:w-2/12 border rounded-none border-gray-light dark:border-gray-dark">
            <OrderSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
