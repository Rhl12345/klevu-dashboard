"use client";
import React, { useState, useMemo, useCallback } from "react";

import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import TableActionPanel from "@/components/common/TableActionPanel";

import {
  IConsultationRequest,
  IConsultationRequestData,
} from "@/types/company/company.type";
import { getFormatDate } from "@/utils/date.util";
import { ITableColumn } from "@/components/Table/types";
import Image from "@/components/Image/Image";
import consultationRequestData from "@/mock-data/consultationRequest.json";
import { IFilterOption, IModalState } from "@/types/consultation.type";
import Button from "@/components/Button/Button";
import NewModal from "@/admin-pages/company/components/NewModal";

const ConsultationRequest = () => {
  const [data, setData] = useState<IConsultationRequestData[]>(
    consultationRequestData as unknown as IConsultationRequestData[]
  );
  const [selectedConsultationRequest, setSelectedConsultationRequest] =
    useState<IConsultationRequestData | null>(null);
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
    selectedRequest: null,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderStatus",
      direction: 0,
      priority: 0,
    },
    {
      field: "order",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 1,
  });

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = useCallback(
    (
      type:
        | "new"
        | "In Progress"
        | "Approved"
        | "Junk"
        | "Rejected"
        | "delete"
        | "activeInactive"
        | "viewHistory",
      request: IConsultationRequestData
    ) => {
      setSelectedConsultationRequest(request);
      setModalState({ isOpen: true, type, selectedRequest: request });
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null, selectedRequest: null });
    setSelectedConsultationRequest(null);
  }, []);

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([{ field: column, direction, priority: 0 }]);
    },
    []
  );

  const COLUMNS = useMemo<ITableColumn<IConsultationRequest>[]>(
    () => [
      {
        id: "submissionDate",
        accessorKey: "submissionDate",
        
        header: "Submission Date",
        cell: ({ row }) => {
          return row?.original?.submissionDate ? (
            <>
              <div>{getFormatDate(row.original.submissionDate).date}</div>
              <div className=" text-xs ">
                {getFormatDate(row.original.submissionDate).time}
              </div>
            </>
          ) : null;
        }
      },
      {
        id: "firstName",
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email ",
      },
      {
        id: "phone",
        accessorKey: "phone",
        header: "Phone ",
      },
      {
        id: "inHandsDate",
        accessorKey: "inHandsDate",
        header: "in Hands Date",
        cell: ({ row }) => {
          return row?.original?.inHandsDate ? (
            <>
              <div>{getFormatDate(row.original.inHandsDate).date}</div>
              <div className=" text-xs ">
                {getFormatDate(row.original.inHandsDate).time}
              </div>
            </>
          ) : null;
        },
      },
      {
        id: "storeLogoUrl",
        accessorKey: "storeLogoUrl",
        header: "Store Logo",
        cell: ({ row }) => {
          return (
            <div className="flex items-center w-20 h-20">
              <Image
                src={row.original.storeLogoUrl}
                alt={`${row.original.storeName} logo`}
                height={30}
                width={30}
                aspectRatio="landscape"
                objectFit="contain"
                rounded="sm"
                variant="next"
              />
            </div>
          );
        },
      },
      {
        id: "storeName",
        accessorKey: "storeName",
        header: "Store Name",
      },
      {
        id: "productName",
        accessorKey: "productName",
        header: "Product Name",
        cell: ({ row }) => {
          return (
            <a
              href={`/product/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {row.original.productName}
            </a>
          );
        },
      },
      {
        id: "logoUrl",
        accessorKey: "logoUrl",
        header: "Logo Url",
      },
      {
        id: "desiredQuantity",
        accessorKey: "desiredQuantity",
        header: "Desired Quantity",
      },
      {
        id: "message",
        accessorKey: "message",
        header: "Message",
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Consultation Status",
        cell: ({ row }) => {
          const value = row.original.status;
          return value !== undefined ? <Status type={value} /> : null;
        },
      },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        cell: (props: any) => {
          if (props.getValue() !== undefined) {
            return <Status type={props.getValue()} />;
          } else {
            return "";
          }
        },
      },
      {
        id: "gclid",
        accessorKey: "gclid",
        header: "GCLID",
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const request = row.original;
          return (
            <TableActionPanel
              extraAction={
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleModalOpen("new", request)}
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}

                  >
                    New
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleModalOpen("In Progress", request)}
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}

                  >
                    In Progress
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleModalOpen("Approved", request)}
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}

                  >
                    Approved
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleModalOpen("Junk", request)}
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}

                  >
                    Junk
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleModalOpen("Rejected", request)}
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}

                  >
                    Rejected
                  </Button>
                </>
              }
            />
          );
        },
      },
    ],
    [handleModalOpen]
  );

  return (
    <>
      <ReactTable
        DATA={data}
        COLUMNS={COLUMNS}
        fetchData={() => {}}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        displaySearch="left"
      />

      
      {modalState.isOpen && modalState.type === `${modalState.type}` && (
        <NewModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title={modalState.type}
          message={`Do you want to change by this ${modalState.type}?`}
        />
      )}
    </>
  );
};

export default ConsultationRequest;
