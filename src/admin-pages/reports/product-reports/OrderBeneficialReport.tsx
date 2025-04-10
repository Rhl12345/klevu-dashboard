"use client";
import React, { useMemo, useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import ChartHeader from "@/components/charts/ChartHeader";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import orderBeneficialReport from "@/mock-data/orderBeneficialReport.json";
import ReportsData from "@/mock-data/reports.json";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  IOrder,
  IOrderItem,
  IOrderTableRow,
  IReportsStore,
} from "@/types/reports/reports";
import { toast } from "react-toastify";

/**
 * OrderBeneficialReport Component
 *
 * A component that displays a detailed report of orders with their associated products,
 * costs, and profits. It includes filtering capabilities by store and date range.
 *
 * Features:
 * - Store selection dropdown
 * - Date range filtering
 * - Tabular display of order details including:
 *   - Product information
 *   - Quantities
 *   - Costs (unit and total)
 *   - Profits
 * - Export functionality
 * - Pagination
 *
 * @returns {JSX.Element} The rendered OrderBeneficialReport component
 */
const OrderBeneficialReport = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const storeData = useMemo(() => ReportsData.storeData, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState(orderBeneficialReport as IOrder[]);

  const [dateRange, setDateRange] = useState({
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
  });

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: orderBeneficialReport.length,
  });

  const setPaginationDataFunc = (key: string, value: number | string) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleStoreChange = (newStore: unknown) => {
    if (newStore as IReportsStore) {
      setStore((prev) => ({
        ...prev,
        label: (newStore as IReportsStore).label,
        value: (newStore as IReportsStore).value,
      }));
    } else {
      setStore({ label: "", value: "" });
    }
  };
  const handleDateChange = (type: "start" | "end") => (date: Date) => {
    setDateRange((prev) => ({
      ...prev,
      [type === "start" ? "startDate" : "endDate"]: date,
    }));
  };

  const columns: ITableColumn<IOrderTableRow>[] = [
    {
      id: "productName",
      header: "PRODUCT NAME",
      accessorKey: "productName",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original.isOrderHeader) {
          return (
            <div className="text-quaternary-dark dark:text-quaternary-light">
              (Order #: ${row.original.orderId} | Order Total:$
              {row.original.orderTotal} | Order Cost:${row.original.orderCost} |
              Shipping Cost:${row.original.shippingCost} | Shipping:$
              {row.original.shipping} | Profit:${row.original.profit});
            </div>
          );
        }
        if (row.original.isTotal) {
          return (
            <div className="text-quaternary-dark dark:text-quaternary-light  text-end">
              Total
            </div>
          );
        }
        return getValue();
      },
    },
    {
      id: "quantity",
      header: "QUANTITY",
      accessorKey: "quantity",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original?.isOrderHeader) {
          return;
        }
        return getValue();
      },
    },
    {
      id: "unitCost",
      header: "UNIT COST ($)",
      accessorKey: "unitCost",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original?.isOrderHeader) {
          return;
        }
        return `$${getValue()}`;
      },
    },
    {
      id: "totalCost",
      header: "TOTAL ($)",
      accessorKey: "totalCost",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original?.isOrderHeader) {
          return;
        }
        return `$${getValue()}`;
      },
    },
    {
      id: "ourCost",
      header: "OUR COST ($)",
      accessorKey: "ourCost",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original?.isOrderHeader) {
          return;
        }
        return `$${getValue()}`;
      },
    },
    {
      id: "profit",
      header: "PROFIT ($)",
      accessorKey: "profit",
      enableSorting: false,
      cell: ({ row, getValue }) => {
        if (row.original?.isOrderHeader) {
          return;
        }
        return `$${getValue()}`;
      },
    },
  ];

  /**
   * Transforms order data into a format suitable for table display
   *
   * @param {IOrder[]} orders - Array of order objects to transform
   * @returns {IOrderTableRow[]} Transformed data ready for table display
   */
  const transformDataForTable = (orders: IOrder[]) => {
    const tableData: IOrderTableRow[] = [];

    orders.forEach((order: IOrder) => {
      tableData.push({
        isOrderHeader: true,
        orderId: order.orderId,
        orderTotal: order.orderTotal,
        orderCost: order.orderCost,
        shippingCost: order.shippingCost,
        shipping: order.shipping,
        profit: order.profit,
        productName: "",
        quantity: 0,
        unitCost: 0,
        totalCost: 0,
        ourCost: 0,
      });

      order.items.forEach((item: IOrderItem) => {
        tableData.push(item);
      });

      tableData.push({
        isTotal: true,
        productName: "Total",
        ...order.totals,
      });
    });

    return tableData;
  };

  return (
    <>
      <ListPageHeader moduleName="Order beneficial report">
        <Button
          size="sm"
          onClick={() => {
            toast.success("Exported successfully");
          }}
        >
          Export
        </Button>
        <Dropdown
          onChange={handleStoreChange}
          isClearable={false}
          defaultValue={store}
          options={storeData}
          className="lg:w-48"
        />
      </ListPageHeader>

      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          dateFilter={{
            showDateFilter: true,
            startDate: DEFAULT_START_DATE,
            endDate: DEFAULT_END_DATE,
            onStartDateChange: handleDateChange("start"),
            onEndDateChange: handleDateChange("end"),
          }}
        />
      </div>

      <ReactTable
        COLUMNS={columns}
        DATA={transformDataForTable(data)}
        displaySearch={false}
        showFilter={false}
        pageIndex={paginationData.pageIndex}
        totalCount={paginationData.totalCount}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        pageSize={paginationData.pageSize}
        loading={isLoading}
      />
    </>
  );
};

export default OrderBeneficialReport;
