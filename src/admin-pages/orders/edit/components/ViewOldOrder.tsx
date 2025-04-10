import React, { useCallback, useState } from "react";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import viewOldOrder from "@/mock-data/viewOldOrder.json";
import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";
import { IViewOldOrderList } from "@/types/view-old-order/viewOldOrder.type";
import { getFormatDate } from "@/utils/date.util";
import { paginationDetails } from "@/utils/constants";
import Link from "next/link";
import { ViewOldOrderProps } from "@/types/manual-shipping/manualShipping.type";

const ViewOldOrder = ({
  isOpen,
  handleModalClose,
  orderDetail,
}: ViewOldOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewOldOrderList, setViewOldOrderList] = useState<IViewOldOrderList[]>(
    []
  );

  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: viewOldOrder.data.length,
  });
  // if (!isOpen) return null;

  const getViewOldOrderList = useCallback(async () => {
    // API call implementation
    setViewOldOrderList(viewOldOrder.data);
  }, []);
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS: ITableColumn<IViewOldOrderList>[] = [
    {
      id: "order",
      accessorKey: "order",
      header: "Order",
      cell: ({ row }: { row: { original: IViewOldOrderList } }) => {
        return (
          <>
            <Link href={`/admin/order/orders/edit/${row.original.order}`}>
              {row.original.order}
            </Link>
          </>
        );
      },
    },
    {
      id: "status",
      accessorKey: "recStatus",
      header: "STATUS",
      filterFn: "arrIncludesSome",
      cell: ({ row }: { row: { original: IViewOldOrderList } }) => {
        return (
          <>
            <Status type={row.original?.status} />
          </>
        );
      },
    },
    {
      id: "date",
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }: { row: { original: IViewOldOrderList } }) => {
        return row?.original?.date ? (
          <>
            <div>{getFormatDate(row?.original?.date).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.date).time}
            </div>
          </>
        ) : null;
      },
    },
    { id: "sub_total", accessorKey: "sub_total", header: "Sub total($)" },
    {
      id: "discount_amt",
      accessorKey: "discount_amt",
      header: "Discount amt($)",
    },
    {
      id: "shipping_amt",
      accessorKey: "shipping_amt",
      header: "Shipping amt($)",
    },
    {
      id: "tax",
      accessorKey: "tax",
      header: "tax($)",
    },
    {
      id: "adjusted_amt",
      accessorKey: "adjusted_amt",
      header: "adjusted_amt($)",
    },
    {
      id: "total",
      accessorKey: "total",
      header: "total($)",
    },
  ];
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        header="Order History"
        content={
          <>
            <ReactTable
              DATA={viewOldOrderList}
              COLUMNS={COLUMNS}
              fetchData={getViewOldOrderList}
              sortingOptions={sortingOptions}
              setTablePageSize={(value) => {
                setPaginationDataFunc("pageSize", value);
              }}
              setSortingOptionHandler={setSortingOptionHandler}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              globalFilter={globalFilter}
              {...paginationData}
              setGlobalFilter={setGlobalFilter}
              displaySearch={false}
              usedInsideModal={true}
              isListPage={false}
              showFilter={false}
              noData="No View Old Order data available"
              loading={isLoading}
            />
          </>
        }
        size="7xl"
      />
    </>
  );
};

export default ViewOldOrder;
