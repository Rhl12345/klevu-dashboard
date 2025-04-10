"use client";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import {
  activeInactiveCategory,
  deleteCategory,
  getCategoryList,
} from "@/services/product-category/category.service";

import TableActionPanel from "@/components/common/TableActionPanel";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { ITableColumn } from "@/components/Table/types";
import {
  IProductCategory,
  IProductCategoryList,
} from "@/types/product-category/productCategory.type";
import { getErrorMessage } from "@/utils/common.util";
import { RecStatusValuebyName, STATUS_VALUES } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const INITIAL_SORTING_OPTIONS = [
  {
    field: "name",
    direction: 0,
    priority: 0,
  },
  {
    field: "productCount",
    direction: 0,
    priority: 0,
  },
  {
    field: "createdDate",
    direction: 0,
    priority: 0,
  },
  {
    field: "createdName",
    direction: 0,
    priority: 0,
  },
  {
    field: "modifiedDate",
    direction: 0,
    priority: 0,
  },
  {
    field: "modifiedName",
    direction: 0,
    priority: 0,
  },
  {
    field: "recStatus",
    direction: 0,
    priority: 0,
  },
];

const ProductCategoryList = () => {
  // State for table data
  const [categoryData, setCategoryData] = useState<IProductCategoryList>({
    pageIndex: 1,
    pageSize: 25,
    totalCount: 0,
    items: [],
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<IProductCategory[]>([]);
  const [sortingOptions, setSortingOptions] = useState(INITIAL_SORTING_OPTIONS);

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });
  const [selectedCategory, setSelectedCategory] =
    useState<IProductCategory | null>(null);

  const removeDuplicates = (arr: Array<{ value: string; label: string }>) => {
    const seen: { [key: string]: boolean } = {};
    return arr.filter((item) => {
      if (seen[item.label]) {
        return false;
      }
      seen[item.label] = true;
      return true;
    });
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "name",
        name: "Name",
        type: "checkbox",
        options: removeDuplicates(
          categoryData?.items?.reduce(
            (
              acc: { label: string; value: string }[],
              item: IProductCategory
            ) => {
              acc.push({ value: item.id.toString(), label: item.name });
              if (item.subRows && item.subRows.length > 0) {
                item.subRows.forEach((subRow: IProductCategory) => {
                  acc.push({ value: subRow.id.toString(), label: subRow.name });
                });
              }
              return acc;
            },
            []
          )
        ),
      },
      {
        columnName: "createdDate",
        name: "Created Date",
        type: "date",
        options: null,
      },
      {
        columnName: "createdName",
        name: "Created By",
        type: "checkbox",
        options: removeDuplicates(
          categoryData?.items?.reduce(
            (
              acc: { label: string; value: string }[],
              item: IProductCategory
            ) => {
              if (item.createdName && item.createdBy)
                acc.push({
                  value: item.createdBy.toString(),
                  label: item.createdName,
                });
              if (item.subRows && item.subRows.length > 0) {
                item.subRows.forEach((subRow: IProductCategory) => {
                  if (subRow.createdName && subRow.createdBy)
                    acc.push({
                      value: subRow.createdBy.toString(),
                      label: subRow.createdName,
                    });
                });
              }
              return acc;
            },
            []
          )
        ),
        conditionalSearch: true,
      },
      {
        columnName: "modifiedDate",
        name: "Updated Date",
        type: "date",
        options: null,
      },
      {
        columnName: "modifiedName",
        name: "Updated By",
        type: "checkbox",
        options: removeDuplicates(
          categoryData?.items?.reduce(
            (
              acc: { label: string; value: string }[],
              item: IProductCategory
            ) => {
              if (item.modifiedName && item.modifiedBy)
                acc.push({
                  value: item.modifiedBy.toString(),
                  label: item.modifiedName,
                });
              if (item.subRows && item.subRows.length > 0) {
                item.subRows.forEach((subRow: IProductCategory) => {
                  if (subRow.modifiedName && subRow.modifiedBy)
                    acc.push({
                      value: subRow.modifiedBy.toString(),
                      label: subRow.modifiedName,
                    });
                });
              }
              return acc;
            },
            []
          )
        ),
        conditionalSearch: true,
      },
      {
        columnName: "recStatus",
        name: "Status",
        type: "radio",
        options: STATUS_VALUES,
      },
    ],
    [categoryData]
  );

  const COLUMNS: ITableColumn[] = [
    {
      id: "name",
      header: "Title",
      accessorKey: "name",
      cell: (props: any) => (
        <Link
          href={`${PageRoutes.PRODUCT_CATEGORY.EDIT}${props.row.original.id}`}
          className="font-medium"
        >
          {props.getValue()}
        </Link>
      ),
      filterFn: "includesString",
    },
    {
      id: "productCount",
      header: "# Products",
      accessorKey: "productCount",
      cell: (props: any) => (
        <div className="whitespace-pre">{props.getValue()}</div>
      ),
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      filterFn: "customDateFilter",
      cell: (props: any) => (
        <div>
          {props.getValue() ? (
            <>
              <div>{getFormatDate(props.getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(props.getValue()).time}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      id: "createdName",
      header: "Created By",
      accessorKey: "createdName",
      filterFn: "arrIncludesSome",
      cell: (props: any) => <div>{props.getValue() || "-"}</div>,
    },
    {
      id: "modifiedDate",
      header: "Updated Date",
      accessorKey: "modifiedDate",
      filterFn: "customDateFilter",
      cell: (props: any) => (
        <div>
          {props.getValue() ? (
            <>
              <div>{getFormatDate(props.getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(props.getValue()).time}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      id: "modifiedName",
      header: "Updated By",
      accessorKey: "modifiedName",
      filterFn: "arrIncludesSome",
      cell: (props: any) => <div>{props.getValue() || "-"}</div>,
    },
    {
      id: "recStatus",
      header: "Status",
      accessorKey: "recStatus",
      filterFn: "arrIncludesSome",
      cell: (props: any) => (
        <Status
          type={
            props.getValue() === "A"
              ? RecStatusValuebyName.Active
              : RecStatusValuebyName.Inactive
          }
        />
      ),
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: any) => {
        const category = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.PRODUCT_CATEGORY.EDIT}${category.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", category),
            }}
            status={{
              show: true,
              status: category.recStatus,
              onClick: () => handleModalOpen("activeInactive", category),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleModalOpen("viewHistory", category),
            }}
          />
        );
      },
    },
  ];

  const fetchCategoryData = useCallback(
    async (pageIndex?: number) => {
      try {
        const response = await getCategoryList({
          pageIndex: pageIndex || categoryData.pageIndex,
          pageSize: categoryData.pageSize,
          sortingOptions,
          filteringOptions,
        });
        setCategoryData({
          ...categoryData,
          items: response.items,
          totalCount: response.totalCount,
          pageIndex: response.pageIndex,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
          totalPages: response.totalPages,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Error fetching category data"));
      }
    },
    [
      globalFilter,
      categoryData.pageIndex,
      categoryData.pageSize,
      sortingOptions,
      filteringOptions,
    ]
  );

  useEffect(() => {
    fetchCategoryData();
  }, []);

  // Function to determine if a row can expand
  const getRowCanExpand = (row: any) => {
    return row.original.subRows && row.original.subRows.length > 0;
  };

  // Modal handling functions
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    category: IProductCategory
  ) => {
    setSelectedCategory(category);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedCategory(null);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory?.id!);
      toast.success("Category deleted successfully");
      handleModalClose();
      fetchCategoryData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Error deleting category"));
    }
  };

  const handleStatusChange = async () => {
    try {
      await activeInactiveCategory(
        selectedCategory?.id!,
        selectedCategory?.recStatus === "A" ? "I" : "A"
      );
      handleModalClose();
      fetchCategoryData();
      toast.success("Category status updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Error updating category status"));
    }
  };

  return (
    <>
      <div>
        <ListPageHeader
          moduleName="Product Categories"
          name="Add Category"
          navigateUrl={PageRoutes.PRODUCT_CATEGORY.CREATE}
        />
        <ReactTable
          COLUMNS={COLUMNS}
          DATA={categoryData.items}
          hasNextPage={categoryData.hasNextPage}
          hasPreviousPage={categoryData.hasPreviousPage}
          pageIndex={categoryData.pageIndex}
          pageSize={categoryData.pageSize}
          setTablePageSize={(size: number) =>
            setCategoryData({ ...categoryData, pageSize: size })
          }
          totalCount={categoryData.totalCount}
          fetchData={fetchCategoryData}
          sortingOptions={sortingOptions}
          setSortingOptionHandler={(column: string, direction: number) =>
            setSortingOptions([
              { field: column, direction: direction, priority: 0 },
            ])
          }
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          displaySearch="left"
          checkboxSelection
          showEditColumns
          showFilter
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          getRowCanExpand={getRowCanExpand}
          setColumnFilteringOptions={setColumnFilteringOptions}
          filteringOptions={filteringOptions}
          moreFilterOption={moreFilterOption}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Category"
        onDelete={handleDelete}
      />

      {/* Active/Inactive Modal */}
      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={handleStatusChange}
        currentRowData={{
          recStatus:
            selectedCategory?.recStatus === "A" ? "active" : "inactive",
          recordName: "category",
        }}
        title="Change Status"
        message="Do you want to change the status of this category ?"
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName={selectedCategory?.name || ""}
      />
    </>
  );
};

export default ProductCategoryList;
