"use client";
import React, { useState } from "react";
import DateCell from "@/components/common/DateCell";
import Link from "next/link";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import storeCategoryList from "@/mock-data/StoreCategoryList.json";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import Button from "@/components/Button/Button";
import { ICategory } from "@/types/store-category/storeCategory.type";
import { PageRoutes } from "@/admin-pages/routes";
import { paginationDetails } from "@/utils/constants";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
// Category
// List component to display a list of categories with actions

const DEFAULT_SORTING = [
  {
    field: "vendorName",
    direction: 0,
    priority: 0,
  },
];

/**
 * CategoryList component to display a list of categories with actions.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.storeType - The type of the store.
 * @param {string} props.storeName - The name of the store.
 * @returns {JSX.Element} The rendered component.
 */
const CategoryList = ({
  storeType,
  storeName,
}: {
  storeType: string; // Type of the store
  storeName: string; // Name of the store
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [sortingOptions, setSortingOptions] = useState(DEFAULT_SORTING);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });


  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [categoryList, setCategoryList] = useState<ICategory[]>(storeCategoryList.storeCategoryList as ICategory[]); // Access storeCategoryList directly
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null); // State to hold the selected category
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean; // Modal open state
    type: "delete" | "activeInactive" | "viewHistory" | null; // Type of modal
  }>({ isOpen: false, type: null });

  /**
   * Opens the modal with the specified type and category.
   * 
   * @param {"delete" | "activeInactive" | "viewHistory"} type - The type of modal to open.
   * @param {ICategory} category - The category object associated with the modal.
   */
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    category: ICategory
  ) => {
    setSelectedCategory(category);
    setIsModalOpen({ isOpen: true, type });
  };

  /**
   * Closes the currently open modal.
   */
  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedCategory(null);
  };

  /**
   * Sets the sorting option for the table.
   * 
   * @param {string} column - The column to sort by.
   * @param {number} direction - The sorting direction (0 for ascending, 1 for descending).
   */
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  // Define columns for the ReactTable
  const columns: ITableColumn<ICategory>[] = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Link
            href={`${PageRoutes.STORE.STORE}/${storeType}/${storeName}/category-master/edit/${category.id}`}
          >
            {category.title}
          </Link>
        );
      },
    },
    {
      id: "products",
      accessorKey: "products",
      header: " #Products",
    },
    {
      id: "createddate",
      accessorKey: "createddate",
      header: "Created Date",
      cell: ({ row }) => {
        const createdDate = row.original.createddate;
        if (!createdDate) return null;
        const { date} = getFormatDate(createdDate);
        return (
          <>
            <DateCell date={date} />
          </>
        );
      },
    },
    { id: "createdby", accessorKey: "createdby", header: "Created By" },
    {
      id: "modifieddate",
      accessorKey: "modifieddate",
      header: "Updated Date",
      cell: ({ row }) => {
        const modifiedDate = row.original.modifieddate;
        if (!modifiedDate) return null;
        const { date} = getFormatDate(modifiedDate);
        return (
          <>
            <DateCell date={date} />
          </>
        );
      },
    },
    { id: "modifiedby", accessorKey: "modifiedby", header: "Updated By" },
    {
      id: "vendorStatus",
      accessorKey: "vendorStatus",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original.recStatus;
        return value ? <Status type={value} /> : null;
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        const category = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.STORE.STORE}/${storeType}/${storeName}/category-master/edit/${category.id}`
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", category),
            }}
            status={{
              show: true,
              status: category.recStatus as "active" | "inactive",
              onClick: () => handleModalOpen("activeInactive", category),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleModalOpen("viewHistory", category),
            }}
            extraAction={
              <Button onClick={() => {}} variant="outline-primary"
              className="!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0"
              >
                Personalize
              </Button>
            }
          />
        );
      },
    },
  ];

  // Function to determine if a row can expand
  const getRowCanExpand = (row: ICategory) => {
    return !!(row.subRows && row.subRows.length > 0);
  };

  return (
    <>
      <ListPageHeader moduleName="Category Master" />
      <ReactTable
        COLUMNS={columns}
        DATA={categoryList}
        checkboxSelection={true}
        totalCount={categoryList.length}
        getRowCanExpand={getRowCanExpand}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        loading={isLoading}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
               
      />
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Category"
          onDelete={() => {}}
        />
      )}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus:
              selectedCategory?.recStatus === "A" ? "active" : "inactive",
            quantityName: "category",
            recordName: "category",
          }}
          title="Change Status"
          message="Do you want to change the status of this category?"
        />
      )}
      {isModalOpen.isOpen && isModalOpen.type === "viewHistory" && (
        <ViewHistoryModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          historyData={DUMMY_VIEW_HISTORY_DATA}
          recordName="Category"
        />
      )}
    </>
  );
};

export default CategoryList;