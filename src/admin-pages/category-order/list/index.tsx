"use client";

import React, { useState } from "react";

import DraggableReactTable from "@/components/Table/DraggableReactTable";
import Status from "@/components/DisplayStatus/Status";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";

import { CATEGORY_DATA } from "@/mock-data/categoryOrder";
import { getFormatDate } from "@/utils/date.util";
import { paginationDetails } from "@/utils/constants";

import { ICategotyOrderData } from "@/types/category-order/categoryOrder.type";
import { ITableColumn } from "@/components/Table/types";

const CategoryOrderList = () => {
  const [data, setData] = useState<ICategotyOrderData[]>(CATEGORY_DATA);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: data.length,
  });

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS: ITableColumn<ICategotyOrderData>[] = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      enableSorting: false,
    },
    {
      id: "products",
      header: "#products",
      accessorKey: "products",
      enableSorting: false,
    },
    {
      id: "created_date",
      accessorKey: "created_date",
      header: "CREATED DATE",
      enableSorting: false,
      cell: ({ row }) => {
        return row?.original?.created_date ? (
          <>
            <div>{getFormatDate(row?.original?.created_date).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.created_date).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "created_by",
      accessorKey: "created_by",
      header: "CREATED BY",
      enableSorting: false,
    },
    {
      id: "updated_date",
      accessorKey: "updated_date",
      header: "Updated Date",
      enableSorting: false,
      cell: ({ row }) => {
        return row?.original?.updated_date ? (
          <>
            <div>{getFormatDate(row?.original?.updated_date).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.updated_date).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "updated_by",
      accessorKey: "updated_by",
      header: "Updated By",
      enableSorting: false,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }: { row: any }) => (
        <Status type={row.original.status === "active" ? "A" : "I"} />
      ),
    },
  ];

  return (
    <>
      <ListPageHeader moduleName="Category Order" name="Navigation" />
      <DraggableReactTable
        COLUMNS={COLUMNS}
        DATA={data}
        setData={setData}
        showPagination={true}
        showEditColumns={false}
        displaySearch={false}
        showFilter={false}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        {...paginationData}
        getRowCanExpand={(row) => row.original.hasChildren}
      />
    </>
  );
};

export default CategoryOrderList;
