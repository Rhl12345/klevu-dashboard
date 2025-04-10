"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import storeConfiguration from "@/services/store-configuration/storeConfiguration.service";
import { paginationDetails } from "@/utils/constants";
import { StoreTypeFilter } from "@/utils/Dummy";
import { ColumnFiltersState } from "@tanstack/react-table";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import StatusChangeModel from "@/components/Modal/StatusModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { getAllShippingCharges } from "@/services/shipping-charges/shippingCharges.service";
import {
  IModalOpenState,
  IShippingChargeItem,
} from "@/types/shipping-charges/shippingCharges.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { getFilterOption } from "@/utils/helpers";
import DateCell from "@/components/common/DateCell";
import Status from "@/components/DisplayStatus/Status";
import TableActionPanel from "@/components/common/TableActionPanel";
import Button from "@/components/Button/Button";
import CreateShippingCost from "@/admin-pages/shipping-charges/create/index";
import { IStoreDropDownData } from "@/types/store-configuration/storeConfiguration.type";

const INITIAL_SORTING_OPTIONS = [
  {
    field: "name",
    direction: 0,
    priority: 0,
  },
];

const ShippingChargesList = () => {
  const [data, setData] = useState<IShippingChargeItem[]>([]);
  const [shippingChargeData, setShippingChargeData] =
    useState<IShippingChargeItem>();
  const [dropDownData, setDropDownData] = useState<IStoreDropDownData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    ColumnFiltersState[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<IModalOpenState>({
    isOpen: false,
    type: null,
  });
  const [sortingOptions, setSortingOptions] = useState(INITIAL_SORTING_OPTIONS);

  const columns: ITableColumn<IShippingChargeItem>[] = useMemo(() => {
    return [
      {
        id: "charge",
        header: "Charge",
        accessorKey: "charge",
        cell: ({ row }) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                getShippingChargeData(row?.original);
                handleOpenModel("edit");
              }}
            >
              {row?.original?.charge}
            </div>
          );
        },
      },
      {
        id: "orderTotalMin",
        header: "Order Total Minimum",
        accessorKey: "orderTotalMin",
      },
      {
        id: "orderTotalMax",
        header: "Order Total Maximum",
        accessorKey: "orderTotalMax",
      },
      {
        id: "storeName",
        header: "STORE NAME",
        accessorKey: "storeName",
      },
      {
        id: "createdDate",
        header: "CREATED date",
        accessorKey: "createdDate",
        cell: ({ row }) => <DateCell date={row?.original?.createdDate || ""} />,
      },
      {
        id: "createdName",
        header: "Created By",
        accessorKey: "createdName",
      },
      {
        id: "modifiedDate",
        header: "UPDATED date",
        accessorKey: "modifiedDate",
        cell: ({ row }) => (
          <DateCell date={row?.original?.modifiedDate || ""} />
        ),
      },
      {
        id: "updatedBy",
        header: "Updated By",
        accessorKey: "modifiedName",
      },
      {
        id: "recStatus",
        header: "Status",
        accessorKey: "recStatus",
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return value ? <Status type={value} /> : null;
        },
      },
      {
        id: "action2",
        accessorKey: "action2",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => handleOpenModel("edit", row?.original),
            }}
            remove={{
              show: true,
              onClick: () => handleOpenModel("delete"),
            }}
            status={{
              show: true,
              status: "active",
              onClick: () => handleOpenModel("activeInactive"),
            }}
          />
        ),
      },
    ];
  }, []);

  const setPaginationDataFunc = (key: string, value: number) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getStoreList = async (pageIndex = 1) => {
    try {
      const response = await getAllShippingCharges({
        args: {
          pageSize: pagination.pageSize,
          pageIndex: pageIndex || pagination.pageIndex,
          filteringOptions,
        },
      });
      setData(response.items);
      setPagination((prevState) => ({
        ...prevState,
        pageIndex: response.pageIndex,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        hasPreviousPage: response.hasPreviousPage,
        hasNextPage: response.hasNextPage,
      }));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getDropDownForStores = async () => {
    try {
      const response = await storeConfiguration.getDropDownValues();
      setDropDownData(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  const handleOpenModel = (
    type: IModalOpenState["type"],
    data?: IShippingChargeItem
  ) => {
    setIsModalOpen({ isOpen: true, type });
    if (data) {
      getShippingChargeData(data);
    }
  };

  useEffect(() => {
    getDropDownForStores();
  }, []);

  const getShippingChargeData = (data: IShippingChargeItem | {}) => {
    setShippingChargeData(data as IShippingChargeItem);
  };

  const moreFilterOptions = [
    getFilterOption("Created By", "id", "checkbox", dropDownData),
    getFilterOption("Created Date", "storeTypeId", "checkbox", StoreTypeFilter),
    getFilterOption("Updated By", "createdDate", "date"),
    getFilterOption("Updated Date", "createdBy", "checkbox"),
  ];

  return (
    <>
      <ListPageHeader name={"Add Shipping Cost"} moduleName={"Shipping Costs"}>
        <Button
          size="sm"
          onClick={() => {
            setIsModalOpen({ isOpen: true, type: "add" });
            getShippingChargeData({});
          }}
        >
          Add Shipping Cost
        </Button>
      </ListPageHeader>

      <ReactTable
        COLUMNS={columns}
        DATA={data}
        showEditColumns
        showFilter
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        sortingOptions={sortingOptions}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        setSortingOptionHandler={(column: string, direction: number) =>
          setSortingOptions([
            { field: column, direction: direction, priority: 0 },
          ])
        }
        fetchData={getStoreList}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        moreFilterOption={moreFilterOptions}
        totalCount={data.length}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal isOpen={true} onClose={handleClose} onDelete={() => {}} />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={true}
          onClose={handleClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus: "inactive",
            recordName: "Shipping Cost",
          }}
          title="Change Status"
          message="Do you want to Inactive this Shipping Cost?"
        />
      )}
      {isModalOpen.isOpen &&
        (isModalOpen.type === "add" || isModalOpen.type === "edit") && (
          <CreateShippingCost
            isModalOpen={isModalOpen}
            handleClose={handleClose}
            shippingChargeData={shippingChargeData}
          />
        )}
    </>
  );
};

export default ShippingChargesList;
