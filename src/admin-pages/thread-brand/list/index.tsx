"use client";
import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { IFilterOption, ITableColumn } from "@/components/Table/types";
import ThreadBrandListData from "@/mock-data/ThreadBrandData.json";
import { paginationDetails } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

import ThreadBrandModel from "@/admin-pages/thread-brand/components/ThreadBrandModel";
import Loader from "@/components/common/Loader";
import { IThreadBrandListData } from "@/types/thread-brand/thread-brand.types";
import { getErrorMessage } from "@/utils/common.util";
import { getFormatDate } from "@/utils/date.util";
import { toast } from "react-toastify";

const ThreadBrandListPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [threadBrandList, setThreadBrandList] = useState<
    IThreadBrandListData[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "brandValue",
      direction: 0,
      priority: 0,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "edit" | "add" | null;
  }>({ isOpen: false, type: null });

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 2,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);

  const [selectedThreadBrand, setSelectedThreadBrand] =
    useState<IThreadBrandListData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const COLUMNS: ITableColumn<IThreadBrandListData>[] = [
    {
      id: "brandValue",
      accessorKey: "brandValue",
      header: "Brand Value",
      cell: (props: {
        getValue: () => string;
        row: { original: IThreadBrandListData };
      }) => (
        <>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleModalOpen("edit", props?.row?.original);
            }}
          >
            {props.getValue()}
          </div>
        </>
      ),
    },
    {
      id: "logoGroupDescriptionName",
      accessorKey: "logoGroupDescriptionName",
      header: "Group Description",
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
      cell: (props) => {
        const { date, time } = getFormatDate(props?.row?.original?.createdDate);
        return date ? (
          <>
            <div>{date}</div>
            <div className=" text-xs font-normal">{time}</div>
          </>
        ) : (
          ""
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
      cell: (props) => {
        const { date, time } = getFormatDate(
          props?.row?.original?.modifiedDate
        );
        return date ? (
          <>
            <div>{date}</div>
            <div className=" text-xs font-normal">{time}</div>
          </>
        ) : (
          ""
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
      cell: (props) => {
        return props.row?.original?.recStatus ? (
          <Status type={props.row?.original?.recStatus} />
        ) : (
          ""
        );
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        const currentBrand = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => handleModalOpen("edit", currentBrand),
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", currentBrand),
            }}
            status={{
              show: true,
              status: currentBrand.recStatus as "active" | "inactive",
              onClick: () => handleModalOpen("activeInactive", currentBrand),
            }}
          />
        );
      },
    },
  ];

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const getThreadBrandList = useCallback(async () => {
    setIsLoading(true);
    try {
      // API call would go here
      setThreadBrandList(ThreadBrandListData.threadBrandList);
    } catch (error) {
      toast.error(getErrorMessage("Failed to load thread brand list"));
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getThreadBrandList();
  }, [getThreadBrandList]);

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "edit" | "add" | null,
    brand: IThreadBrandListData | null
  ) => {
    setSelectedThreadBrand(brand);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedThreadBrand(null);
  };

  const deleteBrand = async (brand: IThreadBrandListData) => {
    setIsLoading(true);
    try {
      // API call implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Thread brand deleted successfully");
      getThreadBrandList();
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage("Failed to delete thread brand"));
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (brand: IThreadBrandListData) => {
    setIsLoading(true);
    try {
      // API implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Status updated successfully");
      getThreadBrandList();
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage("Failed to update status"));
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ListPageHeader name="Add Thread Brand" moduleName="Thread Brand">
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleModalOpen("add", null)}
        >
          Add Thread Brand
        </Button>
      </ListPageHeader>

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={threadBrandList}
        fetchData={getThreadBrandList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        totalCount={paginationData.totalCount}
        setTablePageSize={(value) =>
          setPaginationData((prev) => ({ ...prev, pageSize: value }))
        }
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showFilter={false}
        displaySearch={false}
        checkboxSelection={true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />

      <ThreadBrandModel
        isOpen={
          isModalOpen.isOpen &&
          (isModalOpen.type === "edit" || isModalOpen.type === "add")
        }
        onClose={handleModalClose}
        getList={getThreadBrandList}
        editId={selectedThreadBrand?.id}
      />

      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        onDelete={() =>
          deleteBrand(selectedThreadBrand as IThreadBrandListData)
        }
        title="Delete"
        itemName="Thread Brand"
      />

      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() =>
          handleStatusChange(selectedThreadBrand as IThreadBrandListData)
        }
        currentRowData={selectedThreadBrand as any}
        title="Change Status"
        message="Do you want to change the status of this thread brand?"
      />
    </>
  );
};

export default ThreadBrandListPage;
