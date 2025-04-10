"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactTable from "@/components/Table/ReactTable";
import { ICustomerCredential } from "@/types/company/customer.type";
import Text from "@/components/Text/Text";
import companyDetail from "@/mock-data/companyDetail.json";
import { ITableColumn } from "@/components/Table/types";
import { ICompanyDetails } from "@/types/company/company.type";

const COLUMNS: ITableColumn<ICompanyDetails>[] = [
  {
    id: "Email",
    accessorKey: "email",
    header: "Customer Email",
    enableSorting: false,
  },
  {
    id: "password",
    accessorKey: "password",
    header: "Password",
    enableSorting: false,
  },
  {
    id: "resetPassword",
    accessorKey: "resetPassword",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <Link
        href={``}
        className="text-primary-light dark:text-primary-dark transition-colors underline "
      >
        Reset Password
      </Link>
    ),
  },
];
const CompanyDetails = () => {
  const [customers, setCustomers] =
    useState<ICustomerCredential[]>(companyDetail);

  return (
    <>
      
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-light dark:border-gray-dark gap-4">
          <div className="flex flex-col gap-4 lg:gap-2 p-4 lg:p-6">

            <div className="flex flex-col lg:flex-row gap-2">
              <Text size="base" className="text-base">
                Company Name :
              </Text>
              <Text size="sm" className="text-sm">
                RDC
              </Text>
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
              <Text size="base" className="text-base">
                Email :
              </Text>
              <Text size="sm" className="text-sm">
                tejas2334@redefinesolutions.com
              </Text>
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
              <Text size="base" className="text-base">
                Status :
              </Text>
              <Text size="sm" className="text-sm">
                Active
              </Text>
            </div>
          </div>
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={customers}
            fetchData={() => {}}
            pageIndex={1}
            pageSize={10}
            setTablePageSize={() => {}}
            showFilter={false}
            displaySearch={false}
            showExportCSV={false}
            showPagination={false}
            showFilterDirection="left"
            showMoreFilters={false}
            showEditColumns={false}
            isListPage={false}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
