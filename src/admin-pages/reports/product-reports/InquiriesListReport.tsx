"use client";
import React, { useMemo, useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { inquiriesListReport } from "@/mock-data/inquiriesListReport.json";
import InquiriesListViewModal from "@/admin-pages/reports/product-reports/components/InquiriesListViewModal";
import Dropdown from "@/components/DropDown/DropDown";
import ReportsData from "@/mock-data/reports.json";
import InquiriesListReplyModal from "@/admin-pages/reports/product-reports/components/InquiriesListReplyModal";
import ChartHeader from "@/components/charts/ChartHeader";
import Button from "@/components/Button/Button";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  IInquiriesListReport,
  IReportsStore,
} from "@/types/reports/reports";
import DateCell from "@/components/common/DateCell";
import { toast } from "react-toastify";

/**
 * InquiriesListReport Component
 * Displays a list of inquiries with filtering and pagination capabilities
 * @returns React Component
 */
const InquiriesListReport = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storeData = useMemo(() => ReportsData.storeData, []);
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [data, setData] = useState<IInquiriesListReport[]>(
    inquiriesListReport.data
  );
  const [dateRange, setDateRange] = useState({
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
  });
  const [modalInformation, setModalInformation] =
    useState<IInquiriesListReport | null>(null);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: inquiriesListReport.data.length,
  });

  /**
   * Updates pagination data with new values
   * @param key - The pagination property to update
   * @param value - The new value for the property
   */
  const setPaginationDataFunc = (key: string, value: number | string) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  /**
   * Table column definitions with cell renderers
   */
  const COLUMNS: ITableColumn<IInquiriesListReport>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "subject",
      header: "Subject",
      accessorKey: "subject",
    },
    {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.date;
        if (!date) return null;

        return <DateCell date={date} />;
      },
      accessorKey: "date",
    },
    {
      id: "view",
      header: "View",
      accessorKey: "view",
      enableSorting: false,
      cell: ({ row }) => (
        <Button
          variant="default"
          onClick={() => {
            setModalInformation(row.original);
            setShowModal(true);
          }}
          icon={<SvgIcon name="EyeOpen" height={24} width={24} />}
        />
      ),
    },
    {
      id: "reply",
      header: "Reply",
      accessorKey: "reply",
      cell: ({ row }) => (
        <Button
          variant="default"
          onClick={() => {
            setModalInformation(row.original);
            setShowReplyModal(true);
          }}
          icon={<SvgIcon name="send-03" height={24} width={24} />}
        />
      ),
    },
  ];

  /**
   * Handles store selection change
   * @param newStore - The newly selected store
   */
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

  /**
   * Handles date range changes
   * @param type - Whether it's the start or end date being changed
   * @returns Function that updates the date range state
   */
  const handleDateChange = (type: "start" | "end") => (date: Date) => {
    setDateRange((prev) => ({
      ...prev,
      [type === "start" ? "startDate" : "endDate"]: date,
    }));
  };

  return (
    <>
      <ListPageHeader moduleName="Inquiries List ">
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

      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent">
        <ChartHeader
          title={`Summary for sales on : ${store.label}`}
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
        DATA={data}
        COLUMNS={COLUMNS}
        pageIndex={paginationData.pageIndex}
        displaySearch={false}
        showFilter={false}
        totalCount={paginationData.totalCount}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        pageSize={paginationData.pageSize}
        loading={isLoading}
      />
      <InquiriesListViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInformation={modalInformation}
      />
      <InquiriesListReplyModal
        showModal={showReplyModal}
        setShowModal={setShowReplyModal}
        modalInformation={modalInformation}
      />
    </>
  );
};

export default InquiriesListReport;
