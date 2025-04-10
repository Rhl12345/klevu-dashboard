"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { moreFilterOption } from "@/mock-data/sizeMaster";
import { ISizeMasterEntry } from "@/types/sizemaster/sizemaster.type";
import { paginationDetails } from "@/utils/constants";
import { ColumnFiltersState } from "@tanstack/react-table";
import Link from "next/link";
import { useCallback, useState, memo } from "react";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import { fetchSizeMasterList } from "@/services/size-master/sizeMaster.service";
import { getFormatDate } from "@/utils/date.util";
import { toast } from "react-toastify";
import { ITableColumn } from "@/components/Table/types";

const SizeMasterList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sizeMasterList, setSizeMasterList] = useState<ISizeMasterEntry[]>([]);
  const [deleteConformationError, setDeleteConformationError] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedSizeMaster, setSelectedSizeMaster] =
    useState<ISizeMasterEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "discountName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    sizeMaster: ISizeMasterEntry
  ) => {
    setSelectedSizeMaster(sizeMaster);
    setIsModalOpen({ isOpen: true, type });
  };

  const COLUMNS: ITableColumn<ISizeMasterEntry>[] = [
    {
      id: "productType",
      accessorKey: "productType",
      header: "Product Type",
      cell: (props: { row: { original: ISizeMasterEntry } }) => (
        <Link href={`${PageRoutes.SIZE_MASTER.EDIT}${props.row.original.id}`}>
          {props.row.original.productType}
        </Link>
      ),
    },
    {
      id: "displayOrder",
      accessorKey: "displayOrder",
      header: "Display Order",
    },
    {
      id: "size",
      accessorKey: "size",
      header: "Product Size",
      cell: (props: { row: { original: ISizeMasterEntry } }) => (
        <div>
          {props.row.original.size.map((size, index) => (
            <div key={index}>{size}</div>
          ))}
        </div>
      ),
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ getValue }) => {
        return (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        );
      },
    },
    {
      id: "createdName",
      accessorKey: "createdName",
      header: "Created By",
    },
    {
      id: "modifiedDate",
      accessorKey: "modifiedDate",
      header: "Updated Date",
      cell: ({ getValue }) => {
        return (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        );
      },
    },
    {
      id: "modifiedName",
      accessorKey: "modifiedName",
      header: "Updated By",
    },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      cell: (props: { row: { original: ISizeMasterEntry } }) => (
        <Status type={props.row.original.recStatus} />
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: any) => {
        const sizeMaster = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.SIZE_MASTER.EDIT}${sizeMaster.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", sizeMaster),
            }}
            status={{
              show: true,
              status: sizeMaster.recStatus,
              onClick: () => handleModalOpen("activeInactive", sizeMaster),
            }}
          />
        );
      },
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedSizeMaster(null);
  };

  const handleDelete = async () => {
    try {
      if (deleteInput !== "delete") {
        setDeleteConformationError(
          "Please type 'delete' to verify that you want to delete this record."
        );
        return;
      }
      toast.success("Size master deleted successfully");
      handleModalClose();
    } catch (error) {
      toast.error("Error deleting size master");
      console.error("Error deleting size master:", error);
    }
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

  const getSizeMasterList = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        const response = await fetchSizeMasterList({
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions,
        });

        setSizeMasterList(response.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        }));
      } catch (error) {
        toast.error("Error fetching size master list");
        console.error("Error fetching size master list:", error);
      }
    },
    [paginationData.pageSize, sortingOptions, filteringOptions]
  );

  const handleStatusChange = async () => {
    try {
      handleModalClose();
      toast.success("Size master status updated successfully");
    } catch (error) {
      toast.error("Error updating size master status");
      console.error("Error updating size master status:", error);
    }
  };

  return (
    <>
      <ListPageHeader
        name={"Add Size Master"}
        moduleName={"Product Sizes"}
        navigateUrl={PageRoutes.SIZE_MASTER.CREATE}
      />

      <ReactTable
        DATA={sizeMasterList}
        COLUMNS={COLUMNS}
        fetchData={getSizeMasterList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Size Master"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedSizeMaster?.recStatus === "A" ? "active" : "inactive",
            quantityName: "size master",
            recordName: "size master",
          }}
          title="Change Status"
          message="Do you want to change the status of this size master ?"
        />
      )}
    </>
  );
};

export default SizeMasterList;
