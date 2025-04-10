"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import Dropdown from "@/components/DropDown/DropDown";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import contactUsDummyData from "@/mock-data/contactUsDummyData.json";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import {
  IFilterOption,
  IContactUsListReport,
  ISortingOption,
  IFilterOptions,
  IContactUsData,
} from "@/types/contact-us/contactUs.type";
import { getFormatDate } from "@/utils/date.util";
import { messageKeyOptions } from "@/utils/Dummy";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import ViewContactUsModal from "@/admin-pages/contact-us/components/ViewContactUsModal";

const ContactUsList = () => {
  const [data, setData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOptions[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [store, setStore] = useState<string>("0");
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [modalInformation, setModalInformation] =
    useState<IContactUsListReport | null>(null);

  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: contactUsDummyData.data.length,
  });
  // Memoized handlers

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([
        {
          field: column,
          direction: direction,
          priority: 0,
        },
      ]);
    },
    []
  );
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getContactUsList = useCallback(async () => {
    // API call implementation
    setIsLoading(true);
    try {
      setData(contactUsDummyData.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized filter options
  const moreFilterOptions = useMemo<IFilterOption[]>(
    () => [
      {
        name: "Country",
        options: countries,
        columnName: "country",
        type: "checkbox",
      },
      {
        name: "States",
        options: states,
        columnName: "state",
        type: "checkbox",
      },
    ],
    [countries, states]
  );

  // Memoized columns definition
  const COLUMNS: ITableColumn<IContactUsData>[] = [
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
      id: "company",
      header: "Company Name",
      accessorKey: "company",
    },
    {
      id: "subject",
      header: "Subject",
      accessorKey: "subject",
    },
    {
      id: "country",
      header: "country",
      accessorKey: "country",
    },
    {
      id: "state",
      header: "state",
      accessorKey: "state",
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "date",
      cell: ({ row }) => {
        return row?.original?.createdDate ? (
          <>
            <div>{getFormatDate(row?.original?.createdDate).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.createdDate).time}
            </div>
          </>
        ) : null;
      },
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
        >
          <SvgIcon name="EyeOpen" height={24} width={24} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <ListPageHeader moduleName="Contact Us" name="Contact Us">
        <Dropdown
          defaultValue={store}
          isClearable={false}
          className="w-64"
          options={messageKeyOptions}
          isMulti={false}
        />
      </ListPageHeader>

      <ReactTable
        DATA={data}
        COLUMNS={COLUMNS}
        fetchData={getContactUsList}
        sortingOptions={sortingOptions}
        {...paginationData}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOptions}
        loading={isLoading}
      />
      <ViewContactUsModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalInformation={modalInformation}
      />
    </>
  );
};

export default ContactUsList;
