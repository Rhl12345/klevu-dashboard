import React, { useCallback, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import orderByCustomerAndEmployee from "@/mock-data/order-deshboard/orderByCustomerAndEmployee.json";
import {
  ICommonSendProps,
  IOrderByCustomerAndEmployee,
} from "@/types/order-deshboard/orderByCustomerAndEmployee.type";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import Image from "@/components/Image/Image";
import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { SEARCH_ORDER } from "@/utils/Dummy";

const OrderByCustomerAndEmployee = ({
  selectedStore,
  selectedDuration,
}: ICommonSendProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderByCustomerEmpList, setOrderByCustomerEmpList] = useState<
    IOrderByCustomerAndEmployee[]
  >([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: orderByCustomerAndEmployee.data.length,
  });
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getOrderByCustomerAndEmployeeList = useCallback(async () => {
    // API call implementation
    setOrderByCustomerEmpList(orderByCustomerAndEmployee.data);
  }, []);
  const COLUMNS: ITableColumn<IOrderByCustomerAndEmployee>[] = [
    {
      id: "storeLogo",
      accessorKey: "storeLogo",
      header: "store Logo",
      enableSorting: false,
      cell: ({ row }) => {
        return row?.original?.storeLogo ? (
          <div className="border border-gray-light dark:border-gray-dark p-2 h-22 w-28">
            <Image src={row?.original?.storeLogo} alt="dummayImg" />
          </div>
        ) : null;
      },
    },
    { id: "storeName", accessorKey: "storeName", header: "store Name" },
    {
      id: "customerName",
      accessorKey: "customerName",
      header: "customer Name",
    },
    {
      id: "customerEmail",
      accessorKey: "customerEmail",
      header: "customer Email",
    },
    { id: "totalOrders", accessorKey: "totalOrders", header: "total Orders" },
    { id: "orderTotal", accessorKey: "orderTotal", header: "order Total($)" },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-col gap-2">
          <Label size="large">
            Order By Customer and Employee
          </Label>
          <Text size="sm">
            Store: {selectedStore.label}({selectedDuration.label})
          </Text>
        </div>
        <Dropdown
          name="store"
          id="store"
          className="lg:w-48"
          options={SEARCH_ORDER}
          onChange={() => {}}
        />
      </div>
      <ReactTable
        DATA={orderByCustomerEmpList}
        COLUMNS={COLUMNS}
        fetchData={getOrderByCustomerAndEmployeeList}
        {...paginationData}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        loading={isLoading}
        showFilter={false}
        displaySearch={false}
        isListPage={false}
        usedInsideModal={true}
      />
    </>
  );
};

export default OrderByCustomerAndEmployee;
