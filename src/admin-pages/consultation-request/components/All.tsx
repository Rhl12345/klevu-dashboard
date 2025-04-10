"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails, STATUS_VALUES } from "@/utils/constants";
import { ColumnFiltersState } from "@tanstack/react-table";
import Image from "@/components/Image/Image";
import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";
import {
  consultationRequestCustomerData,
  shipToMultipleLocations,
} from "@/mock-data/consultationRequestCustomer.json";
import DateCell from "@/components/common/DateCell";
import TableActionPanel from "@/components/common/TableActionPanel";
import Button from "@/components/Button/Button";
import NewModal from "@/admin-pages/consultation-request/components/NewModal";
import {
  IConsultationRequestCustomer,
  IFilterOption,
  IModalState,
} from "@/types/consultation-request/consultationRequest.type";
import ViewModal from "@/admin-pages/consultation-request/components/View";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const All = ({ activeTab, tab }: { activeTab: number; tab: string }) => {
  const [data, setData] = useState<IConsultationRequestCustomer[]>([]);
  const [pagination, setPagination] = useState(paginationDetails);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedConsultationRequest, setSelectedConsultationRequest] =
    useState<IConsultationRequestCustomer | null>(null);

  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
    selectedRequest: null,
  });

  const setPaginationDataFunc = (
    key: keyof typeof paginationDetails,
    value: number
  ) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "submissionDate",
        name: "Submission Date",
        type: "date",
        options: null,
        filterFn: "customDateFilter",
      },
      {
        columnName: "inHandsDate",
        name: "In Hands Date",
        type: "date",
        options: null,
        filterFn: "customDateFilter",
      },
      {
        columnName: "shipToMultipleLocations",
        name: "Ship To Multiple Locations",
        type: "radio",
        options: shipToMultipleLocations,
        conditionalSearch: true,
      },
      {
        columnName: "recStatus",
        name: "Status",
        type: "radio",
        options: STATUS_VALUES,
        conditionalSearch: true,
      },
    ],
    [shipToMultipleLocations, STATUS_VALUES]
  );

  const handleModalOpen = useCallback(
    (
      type:
        | "new"
        | "In Progress"
        | "Approved"
        | "Junk"
        | "Rejected"
        | "delete"
        | "view",
      request: IConsultationRequestCustomer
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

  const columns: ITableColumn<IConsultationRequestCustomer>[] = useMemo(
    () => [
      {
        id: "storeLogoUrl",
        header: "Store Image",
        accessorKey: "storeLogoUrl",
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="w-16 h-16">
              <Image
                src={row.original.storeLogoUrl}
                alt={`${row.original.storeLogoUrl}'s avatar`}
                height={10}
                width={10}
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
        header: "Store Name",
        accessorKey: "storeName",
      },
      {
        id: "firstname",
        header: "Name",
        accessorKey: "firstname",
      },
      {
        id: "lastname",
        header: "Last Name",
        accessorKey: "lastname",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
      },
      {
        id: "companyPhone",
        header: "Company Phone",
        accessorKey: "companyPhone",
      },
      {
        id: "submissionDate",
        header: "Submission Date",
        accessorKey: "submissionDate",
        cell: ({ getValue }) => <DateCell date={getValue()} />,
      },
      {
        id: "inHandsDate",
        header: "In Hands Date",
        accessorKey: "inHandsDate",
        cell: ({ getValue }) => <DateCell date={getValue()} />,
      },
      {
        id: "productName",
        header: "Product Name",
        accessorKey: "productName",
      },
      {
        id: "logoUrl",
        header: "Logo Url",
        accessorKey: "logoUrl",
        enableSorting: false,
      },
      {
        id: "consultationStatus",
        header: "Consultation Status",
        accessorKey: "consultationStatus",
        cell: ({ getValue }: { getValue: () => string }) => {
          const value = getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
      },
      {
        id: "desiredQuantity",
        header: "Desired Quantity",
        accessorKey: "desiredQuantity",
      },
      {
        id: "message",
        header: "Message",
        accessorKey: "message",
      },
      {
        id: "gclid",
        header: "GCLID",
        accessorKey: "gclid",
      },
      {
        id: "shipToMultipleLocations",
        header: "Ship To Multiple Locations",
        accessorKey: "shipToMultipleLocations",
      },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        cell: ({ getValue }: { getValue: () => string }) => {
          const value = getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
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
                  {tab !== "New" && (
                    <Button
                      variant="default"
                      size="sm"
                      className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      onClick={() => handleModalOpen("new", request)}
                      icon={<SvgIcon name="PlusIcon" />}
                    >
                      New
                    </Button>
                  )}

                  {tab !== "Inprogress" && (
                    <Button
                      variant="default"
                      size="sm"
                      className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      onClick={() => handleModalOpen("In Progress", request)}
                      icon={<SvgIcon name="TickCircle" />}
                    >
                      In Progress
                    </Button>
                  )}

                  {tab !== "Approved" && (
                    <Button
                      variant="default"
                      size="sm"
                      className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      onClick={() => handleModalOpen("Approved", request)}
                      icon={<SvgIcon name="CheckmarkWithCircle" />}
                    >
                      Approved
                    </Button>
                  )}

                  {tab !== "Junk" && (
                    <Button
                      variant="default"
                      className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      size="sm"
                      onClick={() => handleModalOpen("Junk", request)}
                      icon={<SvgIcon name="Trash" />}
                    >
                      Junk
                    </Button>
                  )}

                  <Button
                    variant="default"
                    className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                    size="sm"
                    onClick={() => handleModalOpen("view", request)}
                    icon={<SvgIcon name="EyeOpen" />}
                  >
                    View
                  </Button>

                  {tab !== "Reject" && (
                    <Button
                      variant="default"
                      className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      size="sm"
                      onClick={() => handleModalOpen("Rejected", request)}
                      icon={<SvgIcon name="CrossIcon" />}
                    >
                      Rejected
                    </Button>
                  )}
                </>
              }
            />
          );
        },
      },
    ],
    []
  );

  const fetchConsultationRequest = useCallback(() => {
    try {
      if (activeTab === 0) {
        setData(
          consultationRequestCustomerData as IConsultationRequestCustomer[]
        );
      } else {
        setData(
          consultationRequestCustomerData.filter(
            (value) => value.consultationStatus === tab
          ) as IConsultationRequestCustomer[]
        );
      }
    } catch (error) {}
  }, [tab, activeTab]);

  return (
    <>
      <ReactTable
        COLUMNS={columns}
        DATA={data}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={fetchConsultationRequest}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        totalCount={data?.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        moreFilterOption={moreFilterOption}
      />
      {modalState.isOpen &&
        modalState.type != "view" &&
        modalState.type === `${modalState.type}` && (
          <NewModal
            isOpen={modalState.isOpen}
            onClose={handleModalClose}
            title={modalState.type}
            message={`Do you want to change by this ${modalState.type}?`}
          />
        )}
      {modalState.isOpen && modalState.type == "view" && (
        <ViewModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          initialData={
            selectedConsultationRequest as IConsultationRequestCustomer
          }
        />
      )}
    </>
  );
};

export default All;
