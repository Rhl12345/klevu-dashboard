"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";
import { paginationDetails, userNameValues } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import CustomerReviewData from "@/mock-data/CustomerReview.json";
import { IPaginationState } from "@/types/special-request/specialRequest.type";
import { getErrorMessage } from "@/utils/common.util";
import { IModalState } from "@/types/admin-stores/storeForm.types";
import { customerOptions } from "@/utils/Dummy";
import {
  ICustomerReview,
  ICustomerReviewEnhancedICellProps,
  ICustomerReviewFormList,
  ICustomerReviewModalType,
} from "@/types/Customer-Review/customerReview.type";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const CustomerReview = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
  });

  const [customerReviewsList, setCustomerReviewsList] = useState<
    ICustomerReview[]
  >([]);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "customerReview",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState<IPaginationState>({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const getCustomerReviews = useCallback(async () => {
    try {
      setCustomerReviewsList(CustomerReviewData as ICustomerReview[]);
    } catch (err) {
      getErrorMessage(err);
    }
  }, []);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const handleModalOpen = useCallback(
    (type: ICustomerReviewModalType["type"]) => {
      setModalState({
        isOpen: true,
        type: type as ICustomerReviewModalType["type"],
      });
    },
    []
  );
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
  };
  const moreFilterOption = [
    {
      columnName: "CUSTOMER NAME",
      name: "CUSTOMER NAME",
      options: customerOptions,
    },
    
    {
      columnName: "createddate",
      name: "Created Date",
      type: "date",
      options: null,
    },
    {
      columnName: "modifieddate",
      name: "Updated Date",
      type: "date",
      options: null,
    },
    {
      columnName: "createdby",
      name: "Created By",
      type: "checkbox",
      options: userNameValues,
      conditionalSearch: true,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: userNameValues,
      conditionalSearch: true,
    },
  ];
  const COLUMNS: ITableColumn<ICustomerReviewFormList>[] = useMemo(
    () => [
      {
        id: "customer_name",
        accessorKey: "customer_name",
        header: "customer name",
        cell: (props: ICustomerReviewEnhancedICellProps) => (
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
        cell: (props: ICustomerReviewEnhancedICellProps) => {
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
        cell: (props: ICustomerReviewEnhancedICellProps) => (
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
        cell: (props: ICustomerReviewEnhancedICellProps) => {
          const status = props.getValue();
          if (status === undefined || status === null) return null;
          return <Status type={status} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: ICustomerReviewEnhancedICellProps) => {
          return (
            <>
              <TableActionPanel
                remove={{
                  show: true,
                  onClick: () => handleModalOpen("delete"),
                }}
                extraAction={
                  <>
                    <>
                      <Button
                        variant="rounded-outline-primary"
                        className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                        icon={
                          <SvgIcon
                            name="SuccessCheckmark"
                            width={24}
                            height={24}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="rounded-outline-primary"
                        className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark`}
                        icon={
                          <SvgIcon name="CrossIcon" width={24} height={24} />
                        }
                      >
                        Reject
                      </Button>
                    </>
                  </>
                }
              />
            </>
          );
        },
      },
    ],
    [customerReviewsList]
  );

  return (
    <>
      <ReactTable
        DATA={customerReviewsList}
        COLUMNS={COLUMNS}
        fetchData={getCustomerReviews}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        usedInsideModal
      />

      <DeleteModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        onDelete={() => {}}
      />
      <StatusModal
        isOpen={modalState.isOpen && modalState.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{
          recStatus: "inactive",
          recordName: "Customer Review",
        }}
        title="Inactive this Customer Review"
        message="Do you want to Inactive this Customer Review?"
      />
    </>
  );
};

export default CustomerReview;
