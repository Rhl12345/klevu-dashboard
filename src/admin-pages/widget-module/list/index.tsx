"use client";
import React, { useState, useCallback, useMemo } from "react";
import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import DeleteModal from "@/components/Modal/DeleteModal";
import { ITableColumn } from "@/components/Table/types";
import { ColumnFiltersState } from "@tanstack/react-table";
import { paginationDetails } from "@/utils/constants";
import widgetModule from "@/mock-data/widgetModule.json";
import AddWidgetModal from "@/admin-pages/widget-module/create/addWidgetModal";
import {
  IModalState,
  IWidgetModule,
  IPaginationData,
} from "@/types/WidgetModule/widgetModule.type";

const WidgetModuleList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [data, setData] = useState(widgetModule.widgets as IWidgetModule[]);
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
  });
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [selectedWidgetModule, setSelectedWidgetModule] =
    useState<IWidgetModule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<IModalState>({
    isOpen: false,
    type: null,
  });

  const [selectedWidget, setSelectedWidget] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const handleModalOpen = useCallback(
    (type: IModalState["type"], widgetModule: IWidgetModule) => {
      const widgetData = data.find((item) => item.id === widgetModule.id);
      setSelectedWidgetModule(widgetData || null);
      setIsModalOpen({ isOpen: true, type });
    },
    [data]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedWidgetModule(null);
  }, []);

  const handleWidgetChange = useCallback((value: string) => {
    setSelectedWidget(value);
  }, []);

  const handleModulesChange = useCallback((values: string[]) => {
    setSelectedModules(values);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!selectedWidgetModule) return;

    try {
      // TODO: Add API integration
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedWidgetModule.id)
      );
      handleModalClose();
    } catch (error) {
      console.error("Error deleting widget module:", error);
      // TODO: Add error handling
    }
  }, [selectedWidgetModule, handleModalClose]);

  const columns: ITableColumn<IWidgetModule>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => handleModalOpen("viewEdit", row.original)}
          >
            {row.original.name}
          </div>
        ),
      },
      {
        id: "moduleName",
        header: "Module Name",
        accessorKey: "moduleName",
        enableSorting: false,
        cell: ({ row }) => {
          const moduleNames = Array.isArray(row?.original?.moduleName)
            ? row.original.moduleName
            : [row?.original?.moduleName];

          return (
            <div className="w-[400px] flex justify-start items-center group">
              {moduleNames.map((name: string, index: number) =>
                name ? (
                  <span
                    key={index}
                    className="inline-flex border border-gray-light dark:border-gray-dark text-center px-2.5 py-1 ml-1"
                  >
                    {name}
                  </span>
                ) : null
              )}
            </div>
          );
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => handleModalOpen("viewEdit", row.original),
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", row.original),
            }}
          />
        ),
      },
    ],
    [handleModalOpen]
  );

  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationDetails,
      value: (typeof paginationDetails)[keyof typeof paginationDetails]
    ) => {
      setPaginationData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );

  // Add pagination memoization
  const paginationState = useMemo(
    () => ({
      pageIndex: paginationData.pageIndex,
      pageSize: paginationData.pageSize,
      hasPreviousPage: paginationData.hasPreviousPage,
      hasNextPage: paginationData.hasNextPage,
    }),
    [paginationData]
  );

  // Memoize data transformations
  const tableData = useMemo(() => data, [data]);

  return (
    <>
      <ListPageHeader name={"Add Widget"} moduleName={"Widget Module Mapping"}>
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            setSelectedWidgetModule(null);
            setIsModalOpen({ isOpen: true, type: "view" });
          }}
        >
          Add Widget
        </Button>
      </ListPageHeader>

      <ReactTable
        COLUMNS={columns}
        DATA={tableData}
        pageIndex={paginationState.pageIndex}
        pageSize={paginationState.pageSize}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        fetchData={() => {}} // TODO: Add API integration
        setSelectedRows={(rows) => setSelectedRows(rows)}
        selectedRows={selectedRows}
        hasPreviousPage={paginationState.hasPreviousPage}
        hasNextPage={paginationState.hasNextPage}
        showFilter={false}
        totalCount={data.length}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {isModalOpen.isOpen && (
        <>
          {isModalOpen.type === "delete" && (
            <DeleteModal
              isOpen={isModalOpen.isOpen}
              onClose={handleModalClose}
              title="Delete"
              itemName="Widget Module"
              onDelete={handleDelete}
            />
          )}
          {isModalOpen.isOpen &&
            (isModalOpen.type === "view" ||
              isModalOpen.type === "viewEdit") && (
              <AddWidgetModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                selectedWidgetModule={selectedWidgetModule}
                selectedWidget={selectedWidget}
                selectedModules={selectedModules}
                handleWidgetChange={handleWidgetChange}
                handleModulesChange={handleModulesChange}
                moduleOptions={widgetModule.moduleOptions}
              />
            )}
        </>
      )}
    </>
  );
};

export default WidgetModuleList;
