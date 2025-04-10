"use client";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";

import { paginationDetails } from "@/utils/constants";

import phoneOrder from "@/mock-data/phoneOrder.json";
import { IPhoneOrder } from "@/types/phone-order/phoneOrder.type";
import { getErrorMessage } from "@/utils/common.util";
import { ITableColumn } from "@/components/Table/types";

const phoneListData = phoneOrder.data;

const PhoneOrderList = () => {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: phoneListData.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
    }>
  >([]);

  const setSortingOptionHandler = () => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleLogin = useCallback((url: string) => {
    try {
      router.push(url);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  const COLUMNS: ITableColumn<IPhoneOrder>[] = useMemo(
    () => [
      {
        id: "logourl",
        accessorKey: "logoUrl",
        header: "IMAGE",
        cell: (props: { row: { original: IPhoneOrder } }) => {
          const phoneOrder = props.row.original;
          return (
            <div className="w-20">
              <Image
                src={`${process.env.REACT_APP_API_BLOB}${phoneOrder.logoUrl}`}
                alt={phoneOrder.name}
              />
            </div>
          );
        },
      },
      {
        id: "name",
        header: "STORE NAME",
        accessorKey: "name",
      },
      {
        id: "storeTypeName",
        header: "STORE TYPE",
        accessorKey: "storeTypeName",
      },

      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: { row: { original: IPhoneOrder } }) => {
          return (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleLogin(props.row.original.url)}
                aria-label={`Login to ${props.row.original.name}`}
              >
                Log In
              </Button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <ListPageHeader
        name={"Draft/Phone Order"}
        moduleName={"Draft/Phone Order"}
      />
      <ReactTable
        DATA={phoneListData}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationData((prevState) => ({
            ...prevState,
            pageSize: value,
          }));
        }}
        showFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />
    </div>
  );
};

export default PhoneOrderList;
