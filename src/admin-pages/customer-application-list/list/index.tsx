"use client";
import { useState } from "react";
import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import CustomerApplicationModal from "@/admin-pages/customer-application-list/components/CustomerAppListmodal";
import CustomerApplList from "@/mock-data/CustomerAppList.json";
import {
  ICustomerApplicationList,
  IFilterOption,
  ISortingOption,
} from "@/types/customer/customer-application-list/customerApplicationList.type";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { toast } from "react-toastify";
import { ITableColumn } from "@/components/Table/types";
import DateCell from "@/components/common/DateCell";

// Move to types/customer-application/customer-application-list.type.ts

// Move to constants/filter-options.ts
const MORE_FILTER_OPTIONS: IFilterOption[] = [
  {
    columnName: "customerName",
    name: "Name",
    type: "checkbox",
    options: [],
  },
  {
    columnName: "createdDate",
    name: "Created Date",
    type: "date",
    options: null,
  },
  {
    columnName: "recStatus",
    name: "Status",
    type: "select",
    options: [],
  },
  {
    columnName: "createdby",
    name: "Created By",
    type: "checkbox",
    options: [],
    conditionalSearch: true,
  },
  {
    columnName: "modifiedby",
    name: "Updated By",
    type: "checkbox",
    options: [],
    conditionalSearch: true,
  },
];

const CustomerApplicationList = () => {
  const [customerApplicationList] = useState<ICustomerApplicationList[]>(
    CustomerApplList.customerApplicationList as ICustomerApplicationList[]
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<ICustomerApplicationList | null>(null);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: customerApplicationList.length,
  });
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
  ]);

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const setPaginationDataFunc = (key: string, value: number | string) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS: ITableColumn<ICustomerApplicationList>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "organizationName",
      header: " Organization Name",
      accessorKey: "organizationName",
      cell: (props: {
        row: { original: ICustomerApplicationList };
        getValue: () => string;
      }) => (
        <Button
          variant="default"
          className="!font-normal"
          size="md"
          onClick={() => {
            setSelectedCustomer(props.row.original);
            setIsModalOpen(true);
          }}
        >
          {props.getValue()}
        </Button>
      ),
    },
    {
      id: "customerName",
      header: " Customer Name",
      accessorKey: "customerName",
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      filterFn: "customDateFilter",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },

    {
      id: "recStatus",
      header: "Status",
      accessorKey: "recStatus",
      filterFn: "arrIncludesSome",
      cell: (props: { getValue: () => string }) => (
        <Status
          type={
            props.getValue() === "A"
              ? RecStatusValuebyName.Active
              : props.getValue() === "Pending"
                ? RecStatusValuebyName.Pending
                : props.getValue() === "Rejected"
                  ? RecStatusValuebyName.Disapproved
                  : RecStatusValuebyName.Inactive
          }
        />
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: { row: { original: ICustomerApplicationList } }) => {
        const customer = props.row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              onClick={() => {
                setSelectedCustomer(customer);
                setIsModalOpen(true);
              }}
            >
              <SvgIcon name="EyeOpen" height={24} width={24} />
            </Button>
            <TableActionPanel
              collapsible={customer.recStatus === "Pending"}
              extraAction={
                <>
                  {customer.recStatus === "Pending" && (
                    <>
                      <Button
                        title="Approve"
                        variant="rounded-outline-primary"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsModalOpen(true);
                        }}
                        icon={<SvgIcon name="CheckmarkWithCircle" />}
                        className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                      >
                        Approve
                      </Button>
                      <Button
                        title="Reject"
                        variant="rounded-outline-primary"
                        icon={<SvgIcon name="CrossIcon" />}
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsModalOpen(true);
                        }}
                        className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark`}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </>
              }
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <ListPageHeader moduleName="Customer Application List" name="">
        <div className="flex items-center gap-4 lg:gap-6">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              toast.success("Exported successfully");
            }}
          >
            Export
          </Button>
          <Dropdown
            options={CustomerApplList.vendorOptions}
            className="lg:w-48"
            placeholder="Select..."
          />
        </div>
      </ListPageHeader>
      <ReactTable
        DATA={customerApplicationList}
        COLUMNS={COLUMNS}
        fetchData={() => {}}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection={false}
        showEditColumns
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={MORE_FILTER_OPTIONS}
      />
      {isModalOpen && (
        <CustomerApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customer={selectedCustomer}
        />
      )}
    </>
  );
};

export default CustomerApplicationList;
