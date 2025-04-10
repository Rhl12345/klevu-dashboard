"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import ReactTable from "@/components/Table/ReactTable";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import Status from "@/components/DisplayStatus/Status";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import { getFormatDate } from "@/utils/date.util";
import { tempData } from "@/mock-data/productAttribute";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";

const ProductattributeList = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [productAttributesList, setProductAttributesList] = useState<any[]>([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory"
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS: ITableColumn[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      cell: (props: any) => (
        <>
          <Link
            href={`${PageRoutes.PRODUCTATTRIBUTES.EDIT}${props.row?.original?.id}`}
          >
            <div className="whitespace-pre">{props.getValue()}</div>
          </Link>
        </>
      ),
    },
    {
      id: "displayOrder",
      accessorKey: "displayOrder",
      header: "Display Order",
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "Created Date",
      filterFn: "createdDate",
      cell: ({ row }: any) => {
        return row?.original?.createdDate ? (
          <>
            <div>{getFormatDate(row?.original?.createdDate).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(row?.original?.createdDate).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    { id: "createdBy", accessorKey: "createdBy", header: "Created By" },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: "Updated Date",
      filterFn: "customDateFilter",
      cell: ({ row }: any) => {
        return row?.original?.updatedDate ? (
          <>
            <div>{getFormatDate(row?.original?.updatedDate).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(row?.original?.updatedDate).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    { id: "updatedBy", accessorKey: "updatedBy", header: "Updated By" },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      filterFn: "arrIncludesSome",
      cell: (props: any) => {
        if (props.getValue() !== undefined) {
          return <Status type={props.getValue()} />;
        } else {
          return "";
        }
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: any) => {
        return (
          props?.row?.original?.id && (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.PRODUCTATTRIBUTES.EDIT}${props?.row?.original?.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete"),
              }}
              viewHistory={{
                show: true,
                onClick: () => handleModalOpen("viewHistory"),
              }}
            />
          )
        );
      },
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
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

  const getProductAttributesListList = useCallback(
    async (pageIndex = 1) => {
      try {
        const fetchedData = tempData;
        const totalItems = fetchedData?.length || 0;

        const startIndex = (pageIndex - 1) * paginationData.pageSize;
        const endIndex = startIndex + paginationData.pageSize;

        const paginatedData = fetchedData.slice(startIndex, endIndex);

        setProductAttributesList(paginatedData);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex,
          totalCount: totalItems,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );
  return (
    <>
      <ListPageHeader
        moduleName="Product Attributes"
        name="Add Product Attributes"
        navigateUrl={PageRoutes.PRODUCTATTRIBUTES.CREATE}
      />
      <ReactTable
        DATA={productAttributesList}
        COLUMNS={COLUMNS}
        fetchData={getProductAttributesListList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Product-attributes"
        onDelete={() => {}}
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName="Product-attributes"
      />
    </>
  );
};

export default ProductattributeList;
