import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Loader from "@/components/common/Loader";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import EditColumn from "@/components/Table/Filters/EditColumns";
import TableFilter from "@/components/Table/Filters/TableFilter";
import { TableSearch } from "@/components/Table/Filters/TableSearch";
import TablePagination from "@/components/Table/TablePagination/TablePagination";

import {
  IColumn,
  IReactTableProps,
  ITableColumn,
} from "@/components/Table/types";

const ReactTable: FC<IReactTableProps> = ({
  COLUMNS,
  DATA,
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
  checkBoxAction,
  fetchData,
  renderSubComponent,
  getRowCanExpand,
  hasPageSize = true,
  displaySearch = "left",
  noData,
  useCheckboxSelectionInRowOnly = {
    show: false,
    showStatusList: [],
  },
  containerClassName = "w-full relative border border-gray-light dark:border-gray-dark rounded-none overflow-hidden",
  tableClassName = "table w-full divide-y divide-gray-light dark:divide-gray-dark table-auto",
  headerCellClassName = "text-left rounded-none p-5 text-sm font-semibold text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark capitalize",
  headerContentClassname = "flex items-center hover:cursor-pointer",
  bodyCellClassName = "p-5 text-sm font-normal text-quaternary-dark dark:text-quaternary-light",
  tableBodyClassName = "divide-y divide-gray-light dark:divide-gray-dark",
  searchFilterContainerClassName = "p-4 border-b border-gray-light dark:border-gray-dark w-full flex gap-4 flex-col md:flex-row",
  filterContainerClassName = "inline-flex mr-1 gap-4",
  bodyRowClassName = "",
  onExportCSV,
  showExportCSV,
  onGotoPage = true,
  loading = false,
  calculateFooter = false,
  footerData,
  isListPage = true,
  usedInsideModal = false,
  useCheckboxSelectionInSubRowOnly = false,
}) => {
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
    const checkboxColumn: ITableColumn = {
      id: "rowSelection",
      accessorKey: "rowSelection",
      ...(!useCheckboxSelectionInSubRowOnly
        ? {
            header: ({ table }) => (
              <div className="flex justify-center items-center w-full h-full relative">
                <Label className="sr-only" htmlFor="header-row-selection">
                  Select all
                </Label>
                <Checkbox
                  id="header-row-selection"
                  checked={table.getIsAllRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                  wrapperClassName="items-center"
                />
                <div className="absolute left-full input-check min-w-auto z-20">
                  {selectedRows &&
                    selectedRows.length > 0 &&
                    checkBoxAction &&
                    checkBoxAction()}
                </div>
              </div>
            ),
          }
        : { header: () => null }),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center w-full h-full">
            <Label className="sr-only" htmlFor={`row-selection-${row?.id}`}>
              Select row
            </Label>
            {useCheckboxSelectionInSubRowOnly && row.parentId ? (
              <Checkbox
                id={`row-selection-${row.id}`}
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                wrapperClassName="items-center"
              />
            ) : null}
            {!useCheckboxSelectionInSubRowOnly &&
            !useCheckboxSelectionInRowOnly?.show ? (
              <Checkbox
                id={`row-selection-${row.index}`}
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                wrapperClassName="items-center"
              />
            ) : null}

            {useCheckboxSelectionInRowOnly?.show &&
              useCheckboxSelectionInRowOnly?.showStatusList.includes(
                row.getValue("status")
              ) && (
                <Checkbox
                  id={`row-selection-${row.id}`}
                  checked={row.getIsSelected()}
                  onChange={row.getToggleSelectedHandler()}
                  wrapperClassName="items-center"
                />
              )}
          </div>
        );
      },
      enableSorting: false,
    };

    const expandColumn: ITableColumn = {
      id: "expander",
      accessorKey: "expander",
      header: ({ table }) => {
        // Check if any rows have subRows
        const hasExpandableRows = table
          .getPreFilteredRowModel()
          .rows.some((row) => row.getCanExpand());

        return hasExpandableRows ? (
          <button
            className="w-6 h-6 flex items-center justify-center"
            onClick={() => table.toggleAllRowsExpanded()}
          >
            {table.getIsAllRowsExpanded() ? (
              <SvgIcon name="MinusIcon" className="w-5 h-5" />
            ) : (
              <SvgIcon name="PlusIcon" className="w-5 h-5" />
            )}
          </button>
        ) : null;
      },
      cell: ({ row }) => {
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
          ...sortedColumns,
        ]
      : checkboxSelection
        ? [checkboxColumn, ...sortedColumns]
        : sortedColumns;
  }, [
    COLUMNS,
    visibleColumns,
    sortingOptions,
    checkboxSelection,
    useCheckboxSelectionInSubRowOnly,
  ]);

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
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  useEffect(() => {
    const selectedData = table
      .getSelectedRowModel()
      ?.[
        useCheckboxSelectionInSubRowOnly ? "flatRows" : "rows"
      ].map((row: any) => row.original);

    setSelectedRows?.(selectedData);
  }, [rowSelection, table]);

  useEffect(() => {
    if (!selectedRows?.length) table.resetRowSelection();
  }, [selectedRows?.length]);

  useEffect(() => {
    fetchData?.();
  }, [
    JSON.stringify(filteringOptions),
    pageSize,
    JSON.stringify(sortingOptions),
    ,
  ]);

  return (
    <div
      className={`w-full ${usedInsideModal ? "!p-0" : isListPage ? "lg:py-8 xl:px-8 py-4 px-4" : "lg:py-6 lg:px-6 py-4 px-4"}`}
    >
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
              <div
                className={`flex ${showFilterDirection === "right" ? "ml-auto" : ""}`}
              >
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
            <thead>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id} /* className={headerRowClassName} */>
                  {headerGroup.headers.map((header: any) => (
                    // <th key={header.id} className={headerCellClassName}>
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

            <tbody className={tableBodyClassName}>
              {loading ? (
                <tr>
                  <td
                    colSpan={
                      checkboxSelection ? COLUMNS.length + 1 : COLUMNS.length
                    }
                  >
                    <Loader />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row: any) => {
                  // Generate a unique key by combining row.id with depth
                  const uniqueKey = `${row.id}_${row.depth}`;

                  return (
                    <React.Fragment key={uniqueKey}>
                      <tr
                        className={`
                      ${
                        typeof bodyRowClassName === "function"
                          ? bodyRowClassName(row)
                          : bodyRowClassName
                      }
                    `}
                      >
                        {row.getVisibleCells().map((cell: any) => (
                          <td
                            key={cell.id}
                            className={`${bodyCellClassName} ${cell.column.id === "rowSelection" ? "border-r border-gray-light dark:border-gray-dark text-center" : "text-left"} ${row.depth > 0 ? (row.depth % 2 === 0 ? "bg-gray-200 dark:bg-slate-100/20" : "bg-gray-100 dark:bg-slate-100/15") : "bg-body-light dark:bg-body-dark"}`}
                            // style={{
                            //   paddingLeft:
                            //     cell.column.id ===
                            //     row.getVisibleCells()[0].column.id
                            //       ? `${(row.depth > 0 || row.getIsExpanded() ? (row.depth + 1) * 1.5 : 1) * 1.25}rem`
                            //       : "",
                            // }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                      {row.getIsExpanded() && renderSubComponent && (
                        <tr key={`${uniqueKey}_expanded`}>
                          <td colSpan={row.getVisibleCells().length}>
                            {renderSubComponent({ row })}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
            {calculateFooter && footerData && (
              <tfoot>
                <tr>
                  {COLUMNS.map((column) => (
                    <td
                      key={column.id}
                      className="p-5 text-sm text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark text-left"
                    >
                      {!footerData?.[column.id] ? "" : footerData[column.id]}
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
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

export default ReactTable;
