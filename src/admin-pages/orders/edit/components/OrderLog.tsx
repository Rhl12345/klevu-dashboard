import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import {
  IOrderJourneyCellProps,
  IOrderJourney,
} from "@/types/orders/orders.type";
import { useCallback, useState } from "react";
import { paginationDetails } from "@/utils/constants";
import OrderData from "@/mock-data/OrdersEditData.json";
import { toast } from "react-toastify";

const OrderLog = () => {
  const COLUMNS: ITableColumn<IOrderJourney>[] = [
    {
      id: "createdName",
      header: "Created By",
      accessorKey: "createdName",
    },

    {
      id: "status",
      header: "Status",
      accessorKey: "status",
    },

    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      cell: (props: IOrderJourneyCellProps) => {
        const { time, date } = getFormatDate(props.row.original.createdDate);
        return props.row.original.createdDate ? (
          <>
            <div>{date} </div>
            <div className=" text-xs font-normal">{time}</div>
          </>
        ) : (
          ""
        );
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "createdDate",
      direction: 1,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const getOrderJourneyData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        setLoading(true);
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = OrderData.orderJourney.items.slice(
              startIndex,
              endIndex
            );

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: OrderData.orderJourney.items.length,
              totalPages: Math.ceil(
                OrderData.orderJourney.items.length / paginationData.pageSize
              ),

              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < OrderData.orderJourney.items.length,
            });
          }, 1000);
        });

        const result = await response;
        setData(result.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: result.pageIndex,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,

          hasPreviousPage: result.hasPreviousPage,
          hasNextPage: result.hasNextPage,
        }));
      } catch (error) {
        toast.error("Error fetching abandoned cart list");
      } finally {
        setLoading(false);
      }
    },
    [paginationData.pageSize]
  );
  return (
    <ReactTable
      isListPage={false}
      COLUMNS={COLUMNS}
      DATA={Data}
      {...paginationData}
      fetchData={getOrderJourneyData}
      sortingOptions={sortingOptions}
      hasPreviousPage={paginationData.hasPreviousPage}
      hasNextPage={paginationData.hasNextPage}
      showEditColumns={false}
      showMoreFilters={false}
      usedInsideModal={true}
      // tablePadding={true}
    />
  );
};

export default OrderLog;
