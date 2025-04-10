"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { IUserRequestDetails } from "@/types/special-request/specialRequest.type";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import SpecialRequestDataModal from "@/admin-pages/special-request/components/SpecialRequestDataModal";
import SpecialRequestDummayData from "@/mock-data/specialRequest.json";
import { messageKeyOptions } from "@/utils/Dummy";
import Dropdown from "@/components/DropDown/DropDown";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
// Move columns outside component to prevent recreating on each render

const SpecialRequestList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [store, setStore] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [userRequestDetails, setUserRequestDetails] = useState<
    IUserRequestDetails[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInformation, setModalInformation] = useState<
    IUserRequestDetails | undefined
  >();
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setFilteringOptions] = useState<
    Record<string, unknown>[]
  >([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: SpecialRequestDummayData.data.length,
  });
  // Use callback to prevent recreation on each render
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
  // Handle row click with proper typing
  const handleRowClick = (rowData: IUserRequestDetails) => {
    setModalInformation(rowData);
    toggleModal();
  };

  const getSpecialRequestList = useCallback(async () => {
    // API call implementation
    try {
      setIsLoading(true);
      setUserRequestDetails(
        SpecialRequestDummayData.data as IUserRequestDetails[]
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);
  const COLUMNS: ITableColumn<IUserRequestDetails>[] = [
    {
      id: "first_name",
      header: "FIRST NAME",
      accessorKey: "first_name",
      cell: ({ row }) =>
        row?.original?.first_name ? <div>{row.original.first_name}</div> : null,
    },
    {
      id: "last_name",
      header: "LAST NAME",
      accessorKey: "last_name",
      cell: ({ row }) => {
        return row?.original?.last_name ? (
          <div>{row.original.last_name}</div>
        ) : null;
      },
    },
    {
      id: "email",
      header: "EMAIL",
      accessorKey: "email",
      cell: ({ row }) => {
        return row?.original?.email ? <div>{row?.original?.email}</div> : null;
      },
    },
    {
      id: "phone",
      header: "PHONE",
      accessorKey: "phone",
      cell: ({ row }) => {
        return row?.original?.phone ? <div>{row?.original?.phone}</div> : null;
      },
    },
    {
      id: "created_date",
      header: "CREATED DATE",
      accessorKey: "created_date",
      cell: ({ getValue }) => {
        return getValue() ? (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "view",
      header: "VIEW",
      accessorKey: "view",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Button
            variant="default"
            onClick={() => handleRowClick(row.original)}
          >
            <SvgIcon name="EyeOpen" />
          </Button>
        );
      },
    },
  ];
  // Add data fetching

  useEffect(() => {
    getSpecialRequestList();
  }, [paginationData.pageIndex, paginationData.pageSize, sortingOptions]);

  return (
    <>
      <ListPageHeader moduleName="Special Request" name="Special Request">
        <Dropdown
          placeholder="Select your store name"
          defaultValue={store}
          isClearable={false}
          className="w-64"
          options={messageKeyOptions}
          isMulti={false}
          onChange={(value: string) => {
            setStore(value);
            getSpecialRequestList();
          }}
        />
      </ListPageHeader>
      <ReactTable
        DATA={userRequestDetails}
        COLUMNS={COLUMNS}
        fetchData={getSpecialRequestList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        {...paginationData}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        showEditColumns
        showFilter
        loading={isLoading}
      />

      <SpecialRequestDataModal
        isOpen={isModalOpen}
        handleShowModal={toggleModal}
        modalInformation={modalInformation}
      />
    </>
  );
};

export default SpecialRequestList;
