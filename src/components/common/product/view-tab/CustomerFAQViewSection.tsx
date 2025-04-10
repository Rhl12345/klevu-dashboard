import React from "react";

import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";

import { FAQ_DATA } from "@/mock-data/productFaq";

import { IFAQData } from "@/types/product-faq/productFaq.types";
import { ITableColumn } from "@/components/Table/types";

const CustomerFAQViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tabId: number) => void;
}) => {
  const COLUMNS: ITableColumn<IFAQData>[] = [
    {
      id: "question",
      header: "Questions",
      accessorKey: "question",
      cell: (info) => info.getValue(),
    },
    {
      id: "answer",
      header: "Answers",
      accessorKey: "answer",
      cell: (info) => info.getValue(),
    },
    {
      id: "createdDate",
      header: "CREATED Date",
      accessorKey: "createdDate",
      cell: (info) => (
        <div>
          <div>{info.row.original.createdDate}</div>
          <div className="text-xs font-normal">
            {info.row.original.createdTime}
          </div>
        </div>
      ),
    },
    {
      id: "createdBy",
      header: "Created BY",
      accessorKey: "createdBy",
      cell: (info) => info.getValue(),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (info) => <Status type="A" />,
    },
  ];

  return (
    <>
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Customer FAQ
            </Text>

            <Button
              variant="default"
              size="lg"
              onClick={() => handleTabChange(9)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          <ReactTable
            DATA={FAQ_DATA}
            COLUMNS={COLUMNS}
            isListPage={true}
            showFilter={false}
            usedInsideModal={true}
            showPagination={false}
            loading={false}
            showEditColumns={false}
            showMoreFilters={false}
            displaySearch={false}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerFAQViewSection;
