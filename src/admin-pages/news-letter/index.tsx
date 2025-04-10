"use client";

import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { useCallback, useMemo, useState } from "react";
import Status from "@/components/DisplayStatus/Status";
import { getFormatDate } from "@/utils/date.util";
import Button from "@/components/Button/Button";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { ISortingOption, ITableColumn } from "@/components/Table/types";
import {
  INewsLetter,
  INewsLetterCellProps,
} from "@/types/news-letter/newsletter.type";
import NewsLetterData from "@/mock-data/newsLetter.json";
import Dropdown from "@/components/DropDown/DropDown";
import { IReportsStore } from "@/types/reports/reports";
import ReportsData from "@/mock-data/reports.json";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
/**
 * NewsLetter component displays a paginated table of news letter
 * with sorting and filtering capabilities.
 */

const NewsLetter = () => {
  // Initialize state with callback for performance
  const [newsLetter, setNewsLetter] = useState<INewsLetter[]>(
    () => NewsLetterData.items
  );
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const storeData = useMemo(() => ReportsData.storeData, []);

  const changeStatus = (id: number) => {
    let newsList = newsLetter.map((item) => {
      if (item.id === id) {
        item.isSubscribe = !item.isSubscribe;
      }
      return item;
    });
    setNewsLetter(newsList);
    toast.success("Status changed successfully");
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

  // Keep COLUMNS inside component but memoize it since it's computationally expensive

  const COLUMNS: ITableColumn<INewsLetter>[] = useMemo(
    () => [
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.email ? (
            <div>{props.row.original.email}</div>
          ) : (
            ""
          );
        },
      },
      {
        id: "storeName",
        header: "Store Name",
        accessorKey: "storeName",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.storeName ? (
            <div className="w-full flex justify-start items-center group">
              <div className="text-sm font-normal">
                {props.row.original.storeName}
              </div>
            </div>
          ) : (
            ""
          );
        },
      },
      {
        id: "createdDate",
        header: "Created Date",
        accessorKey: "createdDate",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.createdDate ? (
            <div>{getFormatDate(props.row.original.createdDate).date} </div>
          ) : (
            ""
          );
        },
      },
      {
        id: "createdBy",
        header: "Created By",
        accessorKey: "createdName",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.createdName ? (
            <div>{props.row.original.createdName}</div>
          ) : (
            ""
          );
        },
      },
      {
        id: "updatedDate",
        header: "Updated Date",
        accessorKey: "modifiedDate",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.modifiedDate ? (
            <div>{getFormatDate(props.row.original.modifiedDate).date} </div>
          ) : (
            ""
          );
        },
      },
      {
        id: "updatedBy",
        header: "Updated By",
        accessorKey: "modifiedName",
        cell: (props: INewsLetterCellProps) => {
          return props.row?.original?.modifiedName ? (
            <div>{props.row.original.modifiedName}</div>
          ) : (
            ""
          );
        },
      },
      {
        id: "recStatus",
        header: "Status",
        accessorKey: "recStatus",
        cell: (props: INewsLetterCellProps) => {
          return (
            <Status
              type={
                props.row.original.isSubscribe ? "Subscribed" : "Unsubscribed"
              }
              text={
                props.row.original.isSubscribe ? "Subscribed" : "Unsubscribed"
              }
            />
          );
        },
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "id",
        disableSortBy: true,
        cell: (props: INewsLetterCellProps) => {
          return (
            <div className="flex items-center gap-2">
            <Button
              variant="default"
              onClick={() => {
                changeStatus(props.row.original.id);
              }}
            >{
              <SvgIcon name="Subscribe"  />  
            }
            </Button>
            </div>
          );
        },
      },
    ],
    [] // Empty dependency array since columns don't depend on any props or state
  );

  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const getProductData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = NewsLetterData.items.slice(
              startIndex,
              endIndex
            );

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: NewsLetterData.items.length,
              totalPages: Math.ceil(
                NewsLetterData.items.length / paginationData.pageSize
              ),

              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < NewsLetterData.items.length,
            });
          }, 500);
        });

        const result = await response;
        setNewsLetter(result.items);

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
        toast.error(getErrorMessage(error));
      }
    },
    [paginationData.pageSize, store]
  );
  return (
    <>
      <ListPageHeader
        moduleName="News Letter"
        name="News Letter"
        children={
          <Dropdown
            className="lg:w-48"
            onChange={handleStoreChange}
            isClearable={false}
            defaultValue={store?.value}
            options={storeData}
          />
        }
      />

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={newsLetter}
        {...paginationData}
        fetchData={getProductData}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        showEditColumns={true}
        showMoreFilters={false}
      />
    </>
  );
};

export default NewsLetter;
