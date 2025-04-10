import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CSS } from "@dnd-kit/utilities";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import EditColumn from "@/components/Table/Filters/EditColumns";
import TableFilter from "@/components/Table/Filters/TableFilter";
import { TableSearch } from "@/components/Table/Filters/TableSearch";
import TablePagination from "@/components/Table/TablePagination/TablePagination";
import {
  IDraggableReactTableProps,
  IColumn,
  ITableColumn,
} from "@/components/Table/types";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

const DraggableReactTable = ({
  COLUMNS,
  DATA,
  setData,
  checkboxSelection = false,
  pageIndex = 1,
  pageSize = 25,
  totalCount = 50,
  totalPages = Math.ceil(totalCount / pageSize),
  showPagination = true,
  hasPreviousPage,
  hasNextPage,
  showEditColumns = true,
  showFilter = true,
  showMoreFilters = true,
  setTablePageSize,
  moreFilterOption,
  filteringOptions,
  setColumnFilteringOptions,
  columnFilters = [],
  globalFilter,
  setGlobalFilter,
  setColumnFilters,
  sortingOptions,
  showFilterDirection = "right",
  setSortingOptionHandler,
  selectedRows,
  setSelectedRows,
  fetchData,
  renderSubComponent,
  getRowCanExpand,
  hasPageSize = true,
  displaySearch = "left",
  noData,
  containerClassName = "w-full relative border border-gray-light dark:border-gray-dark rounded-none overflow-hidden",
  tableClassName = "table w-full divide-y divide-gray-light dark:divide-gray-dark table-auto",
  headerCellClassName = "text-left rounded-none p-5 text-sm font-semibold text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark capitalize",
  headerContentClassname = "flex items-center hover:cursor-pointer",
  bodyCellClassName = "p-5 text-sm font-normal text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark",
  tableBodyClassName = "divide-y divide-gray-light dark:divide-gray-dark",
  searchFilterContainerClassName = "p-4 border-b border-gray-light dark:border-gray-dark w-full flex gap-4",
  filterContainerClassName = "inline-flex mr-1 gap-4",
  bodyRowClassName = "",
  onExportCSV,
  showExportCSV,
  onGotoPage = true,
  loading = false,
  calculateFooter = false,
  footerData,
}: IDraggableReactTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    COLUMNS.map((col) => col.id)
  );
  const [expanded, setExpanded] = useState({});

  const handleColumnFormatChange = (newColumnsOrder: IColumn[]) => {
    const newVisibleColumns = newColumnsOrder
      .filter((col) => col.isVisible)
      .map((col) => col.id);
    setVisibleColumns(newVisibleColumns);
  };

  const handleSetHiddenColumns = (hiddenColumns: string[]) => {
    setVisibleColumns(
      COLUMNS.map((col) =>
        hiddenColumns.includes(col.id) ? "" : col.id
      ).filter(Boolean)
    );
  };

  const columns: ITableColumn[] = useMemo(() => {
    const dragHandleColumn: ITableColumn = {
      id: "dragHandle",
      accessorKey: "dragHandle",
      header: "",
      enableSorting: false,
    };
    const checkboxColumn: ITableColumn = {
      id: "rowSelection",
      accessorKey: "rowSelection",
      header: ({ table }) => (
        <div className="flex justify-center items-center w-full h-full">
          <Checkbox
            id="rowSelection"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            wrapperClassName="items-center"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center w-full h-full">
          <Checkbox
            id={`rowSelection.${row.index}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            wrapperClassName="items-center"
          />
        </div>
      ),
      enableSorting: false,
    };

    const expandColumn: ITableColumn = {
      id: "expander",
      accessorKey: "expander",
      header: "",
      cell: ({ row }: any) => {
        if (!row.getCanExpand()) return null;

        return (
          <button
            className="w-6 h-6 flex items-center justify-center"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? (
              <SvgIcon name="MinusIcon" className="w-5 h-5" />
            ) : (
              <SvgIcon name="PlusIcon" className="w-5 h-5" />
            )}
          </button>
        );
      },
      enableSorting: false,
    };

    // Reorder COLUMNS based on visibleColumns
    const reorderedColumns: ITableColumn[] = visibleColumns
      .map((visibleColumnId) =>
        COLUMNS.find((column) => column.id === visibleColumnId)
      )
      .filter(Boolean) as ITableColumn[];

    // Add sorting logic for each column
    const sortedColumns = reorderedColumns.map((column) => ({
      ...column,
      enableSorting:
        column.id === "action"
          ? false
          : sortingOptions?.some(
              (sortField) => sortField.field === column.id
            ) || column.enableSorting,
    }));

    return getRowCanExpand
      ? [
          ...(checkboxSelection ? [checkboxColumn] : []),
          expandColumn,
          dragHandleColumn,
          ...sortedColumns,
        ]
      : checkboxSelection
        ? [checkboxColumn, dragHandleColumn, ...sortedColumns]
        : [dragHandleColumn, ...sortedColumns];
  }, [COLUMNS, visibleColumns, sortingOptions, checkboxSelection]);

  const data = useMemo(() => {
    // Transform the data to include subRows property
    return DATA.map((item) => ({
      ...item,
      // The subRows property should be present only if the row has children
      ...(item.subRows && { subRows: item.subRows }),
    }));
  }, [DATA, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      expanded,
    },
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    getSubRows: (row: any) => row.subRows,
    getRowCanExpand: getRowCanExpand,
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: (row: any) => row.id,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  useEffect(() => {
    const selectedData = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    setSelectedRows?.(selectedData);
  }, [rowSelection, table]);

  useEffect(() => {
    fetchData?.();
  }, [
    JSON.stringify(filteringOptions),
    pageSize,
    JSON.stringify(sortingOptions),
    ,
  ]);

  const renderTableHeader = () => {
    return (
      <thead>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                className={twMerge(
                  headerCellClassName,
                  header.column.id === "rowSelection"
                    ? "border-r border-gray-light dark:border-gray-dark"
                    : ""
                )}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={headerContentClassname}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      typeof header.column.columnDef.header === "string"
                        ? header.column.columnDef.header.toUpperCase()
                        : header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortingOptions?.some(
                      (sortField) => sortField.field === header.column.id
                    ) || header.column.getCanSort() ? (
                      <div className="flex flex-col pl-2">
                        <SvgIcon
                          name="ArrowUp"
                          className={`w-3 h-3 ${
                            header.column.getIsSorted() === "asc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                        <SvgIcon
                          name="ArrowDown"
                          className={`w-3 h-3 ${
                            header.column.getIsSorted() === "desc"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    ) : null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor)
  );

  const handleDragEndDnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const updatedData = reorderNestedData(data, active.id, over.id);
      setData(updatedData);
    }
  };

  const reorderNestedData = (
    data: any,
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ): any => {
    const result = [...data];
    let activeIndex = -1;
    let overIndex = -1;

    // Find active and over indices
    result.forEach((item, index) => {
      if (item.id === activeId) {
        activeIndex = index;
      }
      if (item.id === overId) {
        overIndex = index;
      }

      // Recursively find in subRows if the current item has them
      if (item.subRows && item.subRows.length > 0) {
        item.subRows = reorderNestedData(item.subRows, activeId, overId); // Recursive call
      }
    });

    // Reorder only if activeIndex and overIndex are found
    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      const [movedItem] = result.splice(activeIndex, 1);
      result.splice(overIndex, 0, movedItem);
    }

    return result;
  };

  const DraggableRow = ({ row }: { row: any }) => {
    const { id } = row;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
      data: {
        row,
      },
    });

    const { setNodeRef: setDropRef } = useDroppable({
      id,
    });

    return (
      <tr
        style={{
          tableLayout: "fixed",
          transform: CSS.Transform.toString(transform),
          touchAction: "none", // Prevent scrolling while dragging on mobile
        }}
        className={`${bodyRowClassName} select-none`} // Add select-none to prevent text selection while dragging
      >
        {row.getVisibleCells().map((cell: any, cellIndex: any) => {
          const cellContent =
            cell.column.id === "dragHandle" ? (
              <span
                ref={(node) => {
                  setNodeRef(node);
                  setDropRef(node);
                }}
                {...listeners}
                {...attributes}
                className="inline-flex w-5 h-5 touch-none" // Add touch-none to prevent touch events from bubbling
              >
                <SvgIcon name="DragIndicator" className="w-5 h-5 cursor-move" />
              </span>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            );

          return (
            <td
              key={cell.id}
              className={`${bodyCellClassName} ${
                cell.column.id === "rowSelection"
                  ? "border-r border-gray-light dark:border-gray-dark text-center"
                  : "text-left"
              } ${
                row.depth > 0
                  ? row.depth % 2 === 0
                    ? "bg-gray-200 dark:bg-slate-100/20"
                    : "bg-gray-100 dark:bg-slate-100/15"
                  : "bg-body-light dark:bg-body-dark"
              }`}
            >
              {cellContent}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderTableBodyDnd = () => {
    return (
      <DndContext sensors={sensors} onDragEnd={handleDragEndDnd}>
        <tbody className={`${tableBodyClassName} relative`}>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} />
          ))}
        </tbody>
      </DndContext>
    );
  };

  const renderTableFooter = () => {
    if (!calculateFooter || !footerData) return null;

    return (
      <tfoot>
        <tr>
          {COLUMNS.map((column) => (
            <td
              key={column.id}
              className="p-5 text-sm text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark text-left font-bold"
            >
              {!footerData?.[column.id] ? "" : footerData[column.id]}
            </td>
          ))}
        </tr>
      </tfoot>
    );
  };

  return (
    <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
      <div className={containerClassName}>
        {!displaySearch && !showFilter ? null : (
          <div className={searchFilterContainerClassName}>
            {displaySearch && displaySearch === "left" && (
              <TableSearch
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
                fetchData={fetchData}
                pageSize={pageSize}
                columnFilters={columnFilters}
                setColumnFilteringOptions={setColumnFilteringOptions}
              />
            )}
            {showFilter && (
              <div className={showFilterDirection === "right" ? "ml-auto" : ""}>
                <div className={filterContainerClassName} role="group">
                  {showEditColumns && (
                    <EditColumn
                      allColumns={COLUMNS}
                      columns={COLUMNS.map((col) => ({
                        ...col,
                        isVisible: visibleColumns.includes(col.id),
                      }))}
                      changeColumnFormat={handleColumnFormatChange}
                      saveFilterOptionsHandler={() => {}}
                      setHiddenColumns={handleSetHiddenColumns}
                    />
                  )}
                  {showMoreFilters && (
                    <TableFilter
                      filteringOptions={filteringOptions || []}
                      setColumnFilteringOptions={setColumnFilteringOptions}
                      moreFilterOption={moreFilterOption || []}
                    />
                  )}
                  {showExportCSV && (
                    <Button
                      onClick={onExportCSV}
                      variant="outline-secondary"
                      icon={<SvgIcon name="DownloadIcon" className="w-4 h-4" />}
                    >
                      Export CSV
                    </Button>
                  )}
                </div>
              </div>
            )}
            {displaySearch && displaySearch === "right" && (
              <TableSearch
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
                setColumnFilteringOptions={setColumnFilteringOptions}
              />
            )}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className={tableClassName}>
            {renderTableHeader()}
            {renderTableBodyDnd()}
            {renderTableFooter()}
          </table>
          {totalCount === 0 && (
            <>
              <div className="text-center py-6 border-t border-gray-light dark:border-gray-dark text-danger font-semibold">
                {noData ? noData : "No data found as of now!"}
              </div>
            </>
          )}
        </div>
      </div>

      {showPagination && totalCount > 0 && (
        <TablePagination
          totalCount={totalCount}
          pageSize={pageSize}
          totalPages={totalPages}
          pageIndex={pageIndex}
          setTablePageSize={setTablePageSize}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          hasPageSize={hasPageSize}
          fetchData={fetchData}
          onGotoPage={onGotoPage}
        />
      )}
    </div>
  );
};

export default DraggableReactTable;
