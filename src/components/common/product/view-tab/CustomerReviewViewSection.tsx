import React from "react";

import Button from "@/components/Button/Button";
import ReactTable from "@/components/Table/ReactTable";
import Text from "@/components/Text/Text";
import Status from "@/components/DisplayStatus/Status";

import CustomerReviewData from "@/mock-data/CustomerReview.json";
import { getFormatDate } from "@/utils/date.util";

import { ICustomerReviewFormList } from "@/types/Customer-Review/customerReview.type";
import { ITableColumn } from "@/components/Table/types";

const CustomerReviewViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tabId: number) => void;
}) => {
  const COLUMNS: ITableColumn<ICustomerReviewFormList>[] = [
    {
      id: "customer_name",
      accessorKey: "customer_name",
      header: "customer name",
      cell: (props) => (
        <>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleModalOpen("edit");
            }}
          >
            {props.getValue()}
          </div>
        </>
      ),
    },
    {
      id: "customer_email",
      accessorKey: "customer_email",
      header: "CUSTOMER Email",
    },
    { id: "comments", accessorKey: "comments", header: "Comments" },
    {
      id: "rating",
      accessorKey: "rating.stars",
      header: "Rating",
      cell: (props) => {
        const rating = Number(props.getValue());
        return (
          <div className="flex items-center text-xl">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
            <span className="ml-2 text-sm">({rating} of 5 stars)</span>
          </div>
        );
      },
    },
    {
      id: "updated_date",
      accessorKey: "updated_date",
      header: "Created Date",
      cell: (props) => (
        <div>
          {props.getValue() ? (
            <>
              <div>{getFormatDate(props.getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(props.getValue()).time}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      id: "recStatus",
      accessorKey: "approved_status",
      header: "STATUS",
      filterFn: "arrIncludesSome",
      cell: (props) => {
        const status = props.getValue();
        if (status === undefined || status === null) return null;
        return <Status type={status} />;
      },
    },
  ];

  return (
    <>
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Customer Review
            </Text>

            <Button
              variant="default"
              size="lg"
              onClick={() => handleTabChange(8)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          <ReactTable
            DATA={CustomerReviewData}
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

export default CustomerReviewViewSection;
