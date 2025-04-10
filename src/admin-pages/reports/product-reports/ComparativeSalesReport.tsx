"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { storeOptions } from "@/mock-data/couponCode";
import { getComparativeSalesReport } from "@/services/comparative-sales/comparativeSales.service";
import { IComparativeSalesReportItem } from "@/types/comparative-sales/comparativeSales.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ComparativeSalesReport = () => {
  const [data, setData] = useState<IComparativeSalesReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [pagination, setPagination] = useState({
    ...paginationDetails,
  });

  const columns: ITableColumn<IComparativeSalesReportItem>[] = [
    {
      id: "productName",
      accessorKey: "storeName",
      header: "Store",
    },
    {
      id: "salesDate",
      accessorKey: "sales",
      header: "Sales Start Date",
      cell: ({ row }) => {
        return (
          <>
            <div>{getFormatDate(row.original.p1From).date}</div>
            <div>{getFormatDate(row.original.p1To).date}</div>
          </>
        );
      },
    },
    {
      id: "ordersDate",
      accessorKey: "sales",
      header: "Orders End Date",
      cell: ({ row }) => {
        return (
          <>
            <div>{getFormatDate(row.original.p2From).date}</div>
            <div>{getFormatDate(row.original.p2To).date}</div>
          </>
        );
      },
    },
    {
      id: "p1Sales",
      accessorKey: "p1Sales",
      header: "P1 Sales",
      cell: (props) => props?.getValue() ?? "",
    },
    {
      id: "p2Sales",
      accessorKey: "p2Sales",
      header: "P2 Sales",
      cell: (props) => props?.getValue() ?? "",
    },
    {
      id: "p1Orders",
      accessorKey: "p1Orders",
      header: "P1 Orders",
    },
    {
      id: "p2Orders",
      accessorKey: "p2Orders",
      header: "P2 Orders",
    },
    {
      id: "salesDiff",
      accessorKey: "p2VsP1Sales",
      header: "Sales P2 Vs P1",
      cell: (props) => `${props?.getValue()?.toFixed(2)}%`,
    },
    {
      id: "ordersDiff",
      accessorKey: "p2VsP1Orders",
      header: "Orders P2 Vs P1",
      cell: (props) => `${props?.getValue()?.toFixed(2)}%`,
    },
  ];

  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getComparativeSalesList = async () => {
    try {
      setLoading(true);
      const response = await getComparativeSalesReport();
      setData(response.items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      toast.success("Exported successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <ListPageHeader moduleName={"Comparative Sales Report"}>
        <Button onClick={handleExport}>Export</Button>
        <Dropdown
          id="storeName"
          name="storeName"
          className="lg:w-48"
          options={storeOptions}
        />
      </ListPageHeader>

      <div className="p-4 border border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Text size="sm">P1</Text>
            <Input
              type="date"
              name="startDate"
              formik={false}
              value={startDate?.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full md:w-auto"
            />
            <Text size="sm">to</Text>
            <Input
              type="date"
              name="endDate"
              formik={false}
              value={endDate?.toISOString().split("T")[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full md:w-auto"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <Text size="sm">P2</Text>
            <Input
              type="date"
              name="startDate"
              formik={false}
              value={startDate?.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full md:w-auto"
            />
            <Text size="sm">to</Text>
            <Input
              type="date"
              name="endDate"
              formik={false}
              value={endDate?.toISOString().split("T")[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </div>

      <ReactTable
        loading={loading}
        DATA={data}
        COLUMNS={columns}
        fetchData={getComparativeSalesList}
        displaySearch={false}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showFilter={false}
        {...pagination}
        totalCount={data.length}
      />
    </>
  );
};

export default ComparativeSalesReport;
