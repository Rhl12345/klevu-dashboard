import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";

import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";

import {
  ICustomerReportListProps,
  ICustomerReportValues,
  IOrderProduct,
} from "@/types/form-builder/formReport.type";
import { IPaginationData } from "@/types/system-log/systemLog.type";

const CustomerReportList = ({ data }: ICustomerReportListProps) => {
  const DATA: IOrderProduct[] = data ? data : [];

  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Calculate total amount
  const { quantity, paid } = useMemo(() => {
    return DATA.reduce(
      (acc: any, order: any) => {
        acc.paid += order.paid || 0; // Accumulate total amount
        acc.quantity += order.quantity || 0; // Accumulate total quantity
        return acc;
      },
      { paid: 0, quantity: 0 } // Initial values
    );
  }, [DATA]);

  const footerData = {
    color: "Product Total",
    quantity,
    paid: `$${paid.toFixed(2)}`,
  };

  const COLUMNS: ITableColumn<ICustomerReportValues>[] = useMemo(
    () => [
      {
        id: "productName",
        accessorKey: "productName",
        header: "Product Name",
      },
      {
        id: "size",
        accessorKey: "size",
        header: "Size",
      },
      {
        id: "color",
        accessorKey: "color",
        header: "Color",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        id: "paid",
        accessorKey: "paid",
        header: "Paid ($)",
      },
    ],
    []
  );

  return (
    <>
      <ReactTable
        DATA={DATA}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showEditColumns={false}
        showFilter={false}
        showMoreFilters={false}
        displaySearch={false}
        calculateFooter={true}
        footerData={footerData}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        usedInsideModal={true}
      />
    </>
  );
};

export default CustomerReportList;
