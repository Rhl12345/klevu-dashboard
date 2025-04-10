"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails, userNameValues } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import productTagsData from "@/mock-data/productTagsData.json";
import { IPaginationState } from "@/types/special-request/specialRequest.type";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { IModalState } from "@/types/admin-stores/storeForm.types";
import { customerOptions } from "@/utils/Dummy";
import ProductTagsCreateModal from "@/admin-pages/product-tags/components/CreateModal";
import {
  IEnhancedICellPropss,
  IModalTypes,
  IProductTagsList,
  IProductTagsListColumnType,
} from "@/types/product-tags/productTags.type";
import Image from "@/components/Image/Image";

const ProductTagsList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
  });

  const [productTagsList, setProductTagsList] = useState<IProductTagsList[]>(
    []
  );

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "ProductTags",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState<IPaginationState>({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const getProductTags = useCallback(async () => {
    try {
      setProductTagsList(productTagsData);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    }
  }, []);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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

  const handleModalOpen = useCallback((type: IModalTypes["type"]) => {
    setModalState({ isOpen: true, type: type as IModalTypes["type"] });
  }, []);
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
  };
  const moreFilterOption = [
    {
      columnName: "ProductTags",
      name: "Name",
      type: "checkbox",
      options: customerOptions,
    },
    {
      columnName: "createddate",
      name: "Created Date",
      type: "date",
      options: null,
    },
    {
      columnName: "modifieddate",
      name: "Updated Date",
      type: "date",
      options: null,
    },
    {
      columnName: "createdby",
      name: "Created By",
      type: "checkbox",
      options: userNameValues,
      conditionalSearch: true,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: userNameValues,
      conditionalSearch: true,
    },
  ];
  const COLUMNS: ITableColumn<IProductTagsListColumnType>[] = useMemo(
    () => [
      {
        id: "image",
        header: "IMAGE",
        accessorKey: "image",
        enableSorting: false,
        cell: ({ row }) => {
          const value = row?.original?.name;
          return (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <Image
                  src={row?.original?.image}
                  alt={`${row?.original?.image}'s avatar`}
                  height={10}
                  width={10}
                  aspectRatio="landscape"
                  objectFit="contain"
                  rounded="sm"
                  variant="next"
                />
              </div>
            </div>
          );
        },
      },
      {
        id: "name",
        accessorKey: "name",
        header: "NAME",
        cell: (props: IEnhancedICellPropss) => (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditId(props.row.original.id);
                handleModalOpen("edit");
              }}
            >
              {props.getValue()}
            </div>
          </>
        ),
      },

      { id: "storeName", accessorKey: "storeName", header: "STORE NAME" },
      {
        id: "imagePosition",
        accessorKey: "imagePosition",
        header: "Image Position",
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "Created Date",
        cell: (props: IEnhancedICellPropss) => (
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
      { id: "createdBy", accessorKey: "createdBy", header: "CREATED BY" },
      {
        id: "updateDate",
        accessorKey: "updateDate",
        header: "UPDATED DATE",
        filterFn: "customDateFilter",
        cell: (props: IEnhancedICellPropss) => (
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

      { id: "updatedBy", accessorKey: "updatedBy", header: "UPDATED BY" },
      {
        id: "status",
        accessorKey: "status",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: (props: IEnhancedICellPropss) => {
          const status = props.getValue();
          if (status === undefined || status === null) return null;
          return <Status type={status} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: IEnhancedICellPropss) => {
          const productTagsTemplate = props.row.original;
          return (
            <>
              <TableActionPanel
                edit={{
                  show: true,
                  onClick: () => {
                    setEditId(productTagsTemplate.id);
                    handleModalOpen("edit");
                  },
                }}
                remove={{
                  show: true,
                  onClick: () => handleModalOpen("delete"),
                }}
                status={{
                  show: true,
                  status: productTagsTemplate.recStatus as
                    | "inactive"
                    | "active"
                    | "pending"
                    | "rejected"
                    | "approved"
                    | "draft",
                  onClick: () => handleModalOpen("activeInactive"),
                }}
              />
            </>
          );
        },
      },
    ],
    [productTagsList]
  );

  return (
    <>
      <ListPageHeader name={"Product Tags"} moduleName={"Product Tags"}>
        <Button
          size="md"
          variant="primary"
          onClick={() => setModalState({ isOpen: true, type: "createModal" })}
        >
          <span className="ml-1">Add Product Tags</span>
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={productTagsList}
        COLUMNS={COLUMNS}
        fetchData={getProductTags}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />
      <ProductTagsCreateModal
        isOpen={
          modalState.isOpen &&
          (modalState.type === "createModal" || modalState.type === "edit")
        }
        handleModalClose={handleModalClose}
        editId={editId}
      />
      <DeleteModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        onDelete={() => {}}
      />
      <StatusModal
        isOpen={modalState.isOpen && modalState.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{
          recStatus: "inactive",
          recordName: "Product Tags",
        }}
        title="Inactive this Product Tags"
        message="Do you want to Inactive this Product Tags?"
      />
    </>
  );
};

export default ProductTagsList;
