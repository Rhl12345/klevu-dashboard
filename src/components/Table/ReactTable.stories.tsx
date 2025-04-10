import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import ReactTable from "@/components/Table/ReactTable";
import { IFilterOption, IReactTableProps } from "@/components/Table/types";
import {
  CreateSourceCodeStory,
  downloadCSV,
  formatDateTime,
  sampleColumns,
} from "@/utils/helpers";
import ReactTableSourceCode from "!!raw-loader!./ReactTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { isWithinInterval, parse } from "date-fns";
import DraggableReactTable from "@/components/Table/DraggableReactTable";
import { paginationDetails } from "@/utils/constants";

export default {
  title: "Components/ReactTable",
  component: ReactTable,
  tags: ["autodocs"],
  argTypes: {
    COLUMNS: {
      description:
        "Array defining the column configuration, including IDs, headers, accessors, and custom cell rendering.",
    },
    DATA: {
      description: "Array of objects representing the row data to display.",
    },
    checkboxSelection: {
      description:
        "Boolean flag to enable or disable row selection with checkboxes.",
      control: { type: "boolean" },
      defaultValue: false,
    },
    sortingOptions: {
      description:
        "Configuration for sorting, including column IDs and sort directions.",
      control: { type: "object" },
    },
    setSortingOptions: {
      description:
        "Callback function triggered when sorting changes to update the sort configuration.",
    },
    pageIndex: {
      description: "The current page index (1-based).",
      control: { type: "number" },
      defaultValue: 1,
    },
    pageSize: {
      description: "The number of rows displayed per page.",
      control: { type: "number" },
      defaultValue: 25,
    },
    totalCount: {
      description: "Total number of rows available.",
      control: { type: "number" },
      defaultValue: 50,
    },
    totalPages: {
      description:
        "Total number of pages calculated based on totalCount and pageSize.",
      control: { type: "number" },
    },
    hasPreviousPage: {
      description: "Indicates if there is a previous page of data.",
      control: { type: "boolean" },
    },
    hasNextPage: {
      description: "Indicates if there is a next page of data.",
      control: { type: "boolean" },
    },
    setTablePageSize: {
      description: "Callback to update the number of rows displayed per page.",
    },
    filteringOptions: {
      description: "Array of filter options available for the table.",
      control: { type: "object" },
    },
    setFilteringOptions: {
      description: "Callback to update the filter options.",
    },
    columnFilters: {
      description: "Current state of column filters applied to the table data.",
      control: { type: "object" },
    },
    setColumnFilters: {
      description: "Callback to update the active column filters.",
    },
    fetchData: {
      description:
        "Function to fetch and update the table data based on page, filters, and sorting.",
    },
    globalFilter: {
      description: "Value for the global search filter.",
      control: { type: "text" },
    },
    setGlobalFilter: {
      description: "Callback to update the value for the global search filter.",
    },
    selectedRows: {
      description: "Array of rows currently selected using checkboxes.",
      control: { type: "object" },
    },
    setSelectedRows: {
      description: "Callback to update the selected rows state.",
    },
    showEditColumns: {
      description: "Boolean flag to toggle the column editing functionality.",
      control: { type: "boolean" },
      defaultValue: false,
    },
    showFilters: {
      description: "Boolean flag to toggle the filter options.",
      control: { type: "boolean" },
      defaultValue: false,
    },
    noData: {
      description:
        "Custom component or message displayed when no data is available.",
    },
    displaySearch: {
      description:
        "Position of the search bar within the table. Possible values: `left`, `center`, or `right`.",
      control: { type: "select", options: ["left", "center", "right"] },
      defaultValue: "left",
    },
    hasPageSize: {
      description: "Indicates if the page size can be changed by the user.",
      control: { type: "boolean" },
      defaultValue: true,
    },
    containerClassName: {
      description:
        "Additional CSS classes to be applied to the table container.",
      control: { type: "text" },
    },
    tableClassName: {
      description: "Additional CSS classes to be applied to the table element.",
      control: { type: "text" },
    },
    tableBodyClassName: {
      description:
        "Additional CSS classes to be applied to the table body element.",
      control: { type: "text" },
    },
    headerRowClassName: {
      description: "Additional CSS classes to be applied to the header rows.",
      control: { type: "text" },
    },
    headerCellClassName: {
      description: "Additional CSS classes to be applied to the header cells.",
      control: { type: "text" },
    },
    headerContentClassname: {
      description:
        "Additional CSS classes to be applied to the header content.",
      control: { type: "text" },
    },
    bodyRowClassName: {
      description: "Additional CSS classes to be applied to the body rows.",
      control: { type: "text" },
    },
    bodyCellClassName: {
      description: "Additional CSS classes to be applied to the body cells.",
      control: { type: "text" },
    },
    searchFilterContainerClassName: {
      description:
        "Additional CSS classes to be applied to the search and filter container.",
      control: { type: "text" },
    },
    filterContainerClassName: {
      description:
        "Additional CSS classes to be applied to the filter container.",
      control: { type: "text" },
    },
    renderSubComponent: {
      description: "Function to render the subcomponent.",
    },
    shouldRenderSubComponent: {
      description:
        "Function to determine if the subcomponent should be rendered.",
    },
    getRowCanExpand: {
      description: "Function to determine if a row can be expanded.",
    },
    showExportCSV: {
      description: "Determines if the export CSV button is displayed.",
      control: { type: "boolean" },
      defaultValue: true,
    },
    onExportCSV: {
      description: "Function to handle export CSV.",
    },
  },
} as Meta<IReactTableProps>;

// Mock sample data with nested subrows
const fullData = Array.from({ length: 50 }, (_, i) => {
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - i);
  const updatedAt = new Date();
  updatedAt.setDate(updatedAt.getDate() - (i % 5));

  // Base product data
  const product = {
    productImage: "images/dummy.jpg",
    productName: `Product ${i + 1}`,
    ourSku: `SKU${1000 + i}`,
    vendorSku: `VSKU${2000 + i}`,
    brandName: `Brand ${(i % 5) + 1}`,
    vendorName: `Vendor ${(i % 3) + 1}`,
    ourCost: `$${(80 + i * 8).toFixed(2)}`,
    imap: `$${(90 + i * 9).toFixed(2)}`,
    salePrice: `$${(95 + i * 5).toFixed(2)}`,
    createdDate: formatDateTime(createdAt),
    updatedDate: formatDateTime(updatedAt),
    createdBy: `User ${(i % 5) + 1}`,
    updatedBy: `Admin ${(i % 3) + 1}`,
    status: ["Active", "Staging", "Inactive", "Draft"][i % 4],
    expandable: i % 3 === 0,
    customContent:
      i % 3 === 0 ? (
        <div className="flex items-center justify-center p-8 bg-gray-50">
          Main row custom content for Product {i + 1}
        </div>
      ) : null,
    // Add nested subrows
    subRows:
      i % 3 === 0
        ? Array.from({ length: 2 }, (_, j) => ({
            productImage: "images/dummy.jpg",
            productName: `Variant ${j + 1} of Product ${i + 1}`,
            ourSku: `SKU${1000 + i}-${j + 1}`,
            vendorSku: `VSKU${2000 + i}-${j + 1}`,
            brandName: `Brand ${(i % 5) + 1}`,
            vendorName: `Vendor ${(i % 3) + 1}`,
            ourCost: `$${(70 + j * 5).toFixed(2)}`,
            imap: `$${(80 + j * 5).toFixed(2)}`,
            salePrice: `$${(85 + j * 5).toFixed(2)}`,
            createdDate: formatDateTime(createdAt),
            updatedDate: formatDateTime(updatedAt),
            createdBy: `User ${(i % 5) + 1}`,
            updatedBy: `Admin ${(i % 3) + 1}`,
            status: ["Active", "Staging"][j % 2],
            expandable: true,
            customContent: (
              <div className="flex items-center justify-center p-6 bg-gray-100">
                Subrow custom content for Variant {j + 1} of Product {i + 1}
              </div>
            ),
            // Third level subrows
            subRows: Array.from({ length: 2 }, (_, k) => ({
              productImage: "images/dummy.jpg",
              productName: `Sub-variant ${k + 1} of Variant ${j + 1}, Product ${i + 1}`,
              ourSku: `SKU${1000 + i}-${j + 1}-${k + 1}`,
              vendorSku: `VSKU${2000 + i}-${j + 1}-${k + 1}`,
              brandName: `Brand ${(i % 5) + 1}`,
              vendorName: `Vendor ${(i % 3) + 1}`,
              ourCost: `$${(60 + k * 5).toFixed(2)}`,
              imap: `$${(70 + k * 5).toFixed(2)}`,
              salePrice: `$${(75 + k * 5).toFixed(2)}`,
              createdDate: formatDateTime(createdAt),
              updatedDate: formatDateTime(updatedAt),
              createdBy: `User ${(i % 5) + 1}`,
              updatedBy: `Admin ${(i % 3) + 1}`,
              status: ["Active", "Draft"][k % 2],
              expandable: false,
              customContent: (
                <div className="flex items-center justify-center p-4 bg-gray-200">
                  Third level content for Sub-variant {k + 1}
                </div>
              ),
            })),
          }))
        : undefined,
  };

  return product;
});

const uniqueValues = (key: string) => {
  return Array.from(new Set(fullData.map((item: any) => item[key])));
};

export const DefaultTable: StoryFn = (args) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [paginationData, setPaginationData] = useState({
    pageIndex: 1,
    pageSize: args.pageSize || 25,
    totalCount: fullData.length,
    hasPreviousPage: false,
    hasNextPage: true,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [tableData, setTableData] = useState(
    fullData.slice(
      (paginationData.pageIndex - 1) * paginationData.pageSize,
      paginationData.pageIndex * paginationData.pageSize
    )
  );

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    if (key === "pageSize") fetchData(1, value, columnFilters);
  };

  const [filteringOptions, setFilteringOptions] = useState<IFilterOption[]>([
    {
      id: "brandName",
      label: "Brand Name",
      type: "select",
      value: uniqueValues("brandName"),
    },
    {
      id: "vendorName",
      label: "Vendor Name",
      type: "select",
      value: uniqueValues("vendorName"),
    },
    {
      id: "createdBy",
      label: "Created By",
      type: "select",
      value: uniqueValues("createdBy"),
    },
    {
      id: "updatedBy",
      label: "Updated By",
      type: "select",
      value: uniqueValues("updatedBy"),
    },
    { id: "createdDate", label: "Created Date", type: "date", value: null },
    { id: "updatedDate", label: "Updated Date", type: "date", value: null },
    {
      id: "status",
      label: "Status",
      type: "select",
      value: uniqueValues("status"),
    },
  ]);

  const applyFilters = (
    data: any[],
    filters: ColumnFiltersState,
    globalFilter: string
  ) => {
    return data.filter((row) => {
      // Global filter logic
      if (globalFilter) {
        const globalMatch = Object.values(row).some((value) =>
          value?.toString().toLowerCase().includes(globalFilter.toLowerCase())
        );
        if (!globalMatch) return false;
      }

      // Column-specific filters
      return filters.every((filter) => {
        const { id, value } = filter;

        if (!value) return true;

        // Custom date filter logic for date-type filters
        if (
          filteringOptions.find(
            (option) => option.id === id && option.type === "date"
          )
        ) {
          const { start, end }: any = value || {};
          const itemDate = parse(row[id], "MM/dd/yyyy hh:mm a", new Date());

          return isWithinInterval(itemDate, {
            start: parse(start, "MM/dd/yyyy", new Date()),
            end: parse(end, "MM/dd/yyyy", new Date()),
          });
        }

        // Default logic for other filter types (e.g., select)
        return Array.isArray(value)
          ? value.includes(row[id])
          : row[id]?.toString().includes(value.toString());
      });
    });
  };

  const fetchData = (
    pageIndex: number = 1,
    pageSize: number = 25,
    columnFilters: ColumnFiltersState = [],
    globalFilter: string = ""
  ) => {
    // Apply filters to fullData
    const filteredData = applyFilters(fullData, columnFilters, globalFilter);

    // Paginate the filtered data
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    const newPageData = filteredData.slice(start, end);

    // Update pagination and table data
    setPaginationData((prev) => ({
      ...prev,
      pageIndex,
      totalCount: filteredData.length,
      hasPreviousPage: pageIndex > 1,
      hasNextPage: end < filteredData.length,
    }));

    setTableData(newPageData);
  };

  const handleExportCSV = async () => {
    // Fetch all data (without pagination)
    const allData = applyFilters(fullData, columnFilters, globalFilter);

    // Download CSV
    downloadCSV(allData, "table-export.csv");
  };

  return (
    <ReactTable
      {...args}
      COLUMNS={sampleColumns}
      sortingOptions={[
        { field: "productName", direction: 0, priority: 1 },
        { field: "ourCost", direction: 0, priority: 2 },
        { field: "salePrice", direction: 0, priority: 3 },
      ]}
      DATA={args.DATA || tableData}
      pageIndex={paginationData.pageIndex}
      pageSize={paginationData.pageSize}
      setTablePageSize={(value: number) => {
        setPaginationDataFunc("pageSize", value);
      }}
      checkboxSelection
      showEditColumns
      showFilter
      renderSubComponent={({
        row,
      }: {
        row: { original: { customContent?: React.ReactNode } };
      }) => (
        <>
          {row.original.customContent && (
            <div>{row.original.customContent}</div>
          )}
        </>
      )}
      getRowCanExpand={(row: { original: { expandable?: boolean } }) =>
        Boolean(row.original.expandable)
      }
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      totalCount={paginationData.totalCount}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      hasPreviousPage={paginationData.hasPreviousPage}
      hasNextPage={paginationData.hasNextPage}
      fetchData={fetchData}
      filteringOptions={filteringOptions}
      setColumnFilteringOptions={setFilteringOptions}
      containerClassName="w-full relative"
      tableClassName="table-auto w-full text-sm text-[#191919]"
      headerRowClassName="border-b bg-neutral-50 dark:bg-dark-body-bg capitalize text-xs font-semibold text-tertiary-dark dark:text-tertiary-light"
      headerCellClassName="font-semibold text-left px-2 first:pl-5 py-4"
      headerContentClassname="flex items-center hover:cursor-pointer"
      bodyCellClassName="px-2 first:pl-5 py-3"
      bodyRowClassName={(row: { depth: number }) => `
        hover:bg-gray-50 
        ${row.depth > 0 ? "bg-gray-50 dark:bg-gray-800" : ""}
        ${row.depth > 1 ? "bg-gray-100 dark:bg-gray-700" : ""}
      `}
      tableBodyClassName="text-sm divide-y divide-slate-200"
      searchFilterContainerClassName="w-full flex flex-wrap sm:auto-cols-max justify-between gap-2 pb-7"
      filterContainerClassName="inline-flex mr-1 gap-2"
      onExportCSV={handleExportCSV}
      showExportCSV
    />
  );
};

export const RowDraggable: StoryFn = (args) => {
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [tableData, setTableData] = useState(
    fullData.slice(
      (paginationData.pageIndex - 1) * paginationData.pageSize,
      paginationData.pageIndex * paginationData.pageSize
    )
  );

  return (
    <DraggableReactTable
      DATA={tableData}
      setData={setTableData}
      COLUMNS={sampleColumns}
      showFilter={false}
      showMoreFilters={false}
      showEditColumns={false}
      showPagination={false}
      hasPageSize={false}
      hasPreviousPage={false}
      hasNextPage={false}
      pageIndex={1}
      pageSize={25}
      totalCount={50}
      setTablePageSize={() => {}}
      fetchData={() => {}}
      onGotoPage={false}
    />
  );
};

export const NoDataState: StoryFn = (args) => {
  return (
    <ReactTable
      {...args}
      showEditColumns
      showFilter
      COLUMNS={sampleColumns}
      DATA={[]}
      totalCount={0}
      noData="No data available"
      containerClassName="w-full relative"
      tableClassName="table-auto w-full text-sm text-[#191919]"
      headerRowClassName="border-b bg-neutral-50 dark:bg-dark-body-bg capitalize text-xs font-semibold text-tertiary-dark dark:text-tertiary-light"
      headerCellClassName="font-semibold text-left px-2 first:pl-5 py-4"
      headerContentClassname="flex items-center hover:cursor-pointer"
      bodyCellClassName="px-2 first:pl-5 py-3"
      tableBodyClassName="text-sm divide-y divide-slate-200"
      searchFilterContainerClassName="w-full flex flex-wrap sm:auto-cols-max justify-between gap-2 pb-7"
      filterContainerClassName="inline-flex mr-1 gap-2"
    />
  );
};

export const SourceCode = CreateSourceCodeStory(ReactTableSourceCode);
