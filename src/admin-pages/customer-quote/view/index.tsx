"use client";
import React, { useMemo } from "react";
import Text from "@/components/Text/Text";
import ReactTable from "@/components/Table/ReactTable";
import { IColumn } from "@/components/Table/types";
import { PageRoutes } from "@/admin-pages/routes";
import { ICustomerQuoteViewProps } from "@/types/customer-quote/customerQuote.type";
import CustomerDetails from "./components/CustomerDetails";
import CreatePageHeader from "@/components/CreateAndListPageHeader/CreatePageHeader";
import { Label } from "@/components/Label/Label";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";

const CustomerQuoteView = ({
  quoteNumber,
  customerName,
  billingAddress,
  shippingAddress,
  products,
}: ICustomerQuoteViewProps) => {
  // Define columns for ReactTable
  const COLUMNS: IColumn[] = useMemo(
    () => [
      {
        id: "name",
        header: "Product Name",
        accessorKey: "name",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "options",
        header: "Options",
        accessorKey: "options",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "quantity",
        header: "Quantity",
        accessorKey: "quantity",
        cell: (info: any) => (
          <div className="text-center">{info.getValue()}</div>
        ),
      },
      {
        id: "price",
        header: "Price",
        accessorKey: "price",
        cell: (info: any) => `$${info.getValue().toFixed(2)}`,
      },
      {
        id: "notes",
        header: "Notes",
        accessorKey: "notes",
        cell: (info: any) => info.getValue() || "",
      },
    ],
    []
  );

  // Calculate total for display at bottom
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const productsWithTotal = [
    ...products,
    {
      name: "",
      options: "",
      sku: "",
      quantity: "Total:",
      price: total,
      notes: "",
    },
  ];

  return (
    <>
      <CreatePageHeader
        module="View Customer Quote"
        navigateUrl={`${PageRoutes.CUSTOMER.QUOTE_LIST}`}
        borderShow={true}
      />

      <div className="w-full lg:px-8 px-4 pt-4 lg:pt-8">
        <div className="border border-gray-light dark:border-gray-dark">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-8 col-span-12">
                {/* Quote Number */}
                <div className="flex flex-wrap gap-1">
                  <Label size="small">Quote Number :</Label>
                  <Text size="sm">{quoteNumber}</Text>
                </div>

                {/* Customer Details */}
                <CustomerDetails
                  customerName={customerName}
                  billingAddress={billingAddress}
                  shippingAddress={shippingAddress}
                />

                {/* Products Table */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:px-8 px-4 pt-4 lg:pt-8">
        <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
          <ListPageHeader
            moduleName="Products"
            name="customerQuoteList"
            navigateUrl=""
            className="w-full"
          />
          <div className="overflow-x-auto w-full">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={productsWithTotal}
              totalCount={productsWithTotal.length}
              pageSize={productsWithTotal.length}
              showEditColumns={false}
              showFilter={false}
              displaySearch={false}
              hasPageSize={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerQuoteView;
