"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import RequirementListActionModals from "@/components/product-seo-requirement/RequirementListActionModals";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import {
  activeInactiveProductRequirement,
  deleteProductRequirement,
  getProductRequirementList,
} from "@/services/product-requirement/productRequirement.service";
import { TSortDirection } from "@/types/common/common.type";
import {
  IModelState,
  IProductSeoRequirement,
  IProductSeoRequirementList,
  ISortOption,
} from "@/types/product-seo-requirement/productSeoRequirement.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  DEFAULT_PAGE_SIZE,
  PRODUCT_SEO_REQUIREMENT_INITIAL_SORTING,
  RecStatusValuebyName,
} from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const ProductRequirementList = () => {
  const [productRequirementList, setProductRequirementList] =
    useState<IProductSeoRequirementList>({
      pageIndex: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalCount: 0,
      items: [],
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sortingOptions, setSortingOptions] = useState<ISortOption[]>(
    PRODUCT_SEO_REQUIREMENT_INITIAL_SORTING
  );

  const [isModalOpen, setIsModalOpen] = useState<IModelState>({
    isOpen: false,
    type: null,
    requirement: null,
  });

  // Add loading states for better UX
  const [isLoading, setIsLoading] = useState(false);

  // Add memoization for expensive computations and callbacks
  const COLUMNS = useMemo<ITableColumn[]>(
    () => [
      {
        id: "storeName",
        header: "Store Name",
        accessorKey: "storeName",
        filterFn: "includesString",
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        filterFn: "includesString",
        cell: (props: {
          getValue: () => string | null;
          row: Record<string, any>;
        }) => (
          <Link
            href={`${PageRoutes.PRODUCT_REQUIREMENT.EDIT}${props.row.original.id}`}
            className="whitespace-pre"
          >
            {props.getValue()}
          </Link>
        ),
      },
      {
        id: "percentage",
        header: "Percentage ( % )",
        accessorKey: "percentage",
      },
      {
        id: "createdDate",
        header: "Created Date",
        accessorKey: "createdDate",
        filterFn: "customDateFilter",
        cell: (props: { getValue: () => string | null }) => (
          <div>
            {props.getValue() ? (
              <>
                <div>{getFormatDate(props.getValue()).date}</div>
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
      },
      {
        id: "modifiedDate",
        header: "Updated Date",
        accessorKey: "modifiedDate",
        filterFn: "customDateFilter",
        cell: (props: { getValue: () => string | null }) => (
          <div>
            {props.getValue() ? (
              <>
                <div>{getFormatDate(props.getValue()).date}</div>
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
      },
      {
        id: "recStatus",
        header: "Status",
        accessorKey: "recStatus",
        filterFn: "arrIncludesSome",
        cell: (props: { getValue: () => string | null }) => (
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
        header: "Action",
        accessorKey: "action",
        cell: (props: { row: Record<string, any> }) => {
          const row = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.PRODUCT_REQUIREMENT.EDIT}${row.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", row),
              }}
              status={{
                show: true,
                status: row.recStatus,
                onClick: () => handleModalOpen("activeInactive", row),
              }}
              viewHistory={{
                show: true,
                onClick: () => handleModalOpen("viewHistory", row),
              }}
            />
          );
        },
      },
    ],
    []
  );

  // Update fetchProductRequirements implementation
  const fetchProductRequirements = useCallback(
    async (pageIndex?: number) => {
      setIsLoading(true);
      try {
        const response = await getProductRequirementList({
          pageIndex: pageIndex || productRequirementList.pageIndex,
          pageSize: productRequirementList.pageSize,
          sortingOptions,
        });
        setProductRequirementList({
          ...productRequirementList,
          items: response.items,
          totalCount: response.totalCount,
          pageIndex: response.pageIndex,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error("Error fetching product requirements:", error);
        toast.error("Error fetching product requirements");
      } finally {
        setIsLoading(false);
      }
    },
    [
      productRequirementList.pageIndex,
      productRequirementList.pageSize,
      sortingOptions,
    ]
  );

  // Modal handling functions
  const handleModalOpen = useCallback(
    (
      type: "delete" | "activeInactive" | "viewHistory",
      requirement: IProductSeoRequirement
    ): void => {
      setIsModalOpen({ isOpen: true, type, requirement });
    },
    []
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null, requirement: null });
  };

  const handleDelete = async () => {
    try {
      await deleteProductRequirement(isModalOpen.requirement!.id!);
      toast.success("Product requirement deleted successfully");
      handleModalClose();
      fetchProductRequirements();
    } catch (error) {
      toast.error(getErrorMessage(error, "Error deleting product requirement"));
    }
  };

  // Memoize handlers
  const handleStatusChange = useCallback(async () => {
    try {
      await activeInactiveProductRequirement(
        isModalOpen.requirement!.id!,
        isModalOpen.requirement!.recStatus === "A" ? "I" : "A"
      );
      toast.success("Product requirement status updated successfully");
      handleModalClose();
      fetchProductRequirements();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error updating product requirement status")
      );
    }
  }, [isModalOpen.requirement, fetchProductRequirements]);

  useEffect(() => {
    fetchProductRequirements();
  }, []);

  // Create separate components for modals
  const DeleteRequirementModal = ({
    isOpen,
    onClose,
    onDelete,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }) => (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product Requirement"
      itemName="product requirement"
      onDelete={onDelete}
    />
  );

  return (
    <>
      <div>
        <ListPageHeader
          name="Add Product Requirement"
          moduleName="Product Requirements"
          navigateUrl={PageRoutes.PRODUCT_REQUIREMENT.CREATE}
        />
        <ReactTable
          COLUMNS={COLUMNS}
          DATA={productRequirementList.items}
          hasNextPage={productRequirementList.hasNextPage}
          hasPreviousPage={productRequirementList.hasPreviousPage}
          pageIndex={productRequirementList.pageIndex}
          pageSize={productRequirementList.pageSize}
          totalCount={productRequirementList.totalCount}
          setTablePageSize={(size: number) =>
            setProductRequirementList({
              ...productRequirementList,
              pageSize: size,
            })
          }
          fetchData={fetchProductRequirements}
          sortingOptions={sortingOptions}
          setSortingOptionHandler={(column: string, direction: number) =>
            setSortingOptions([
              {
                field: column,
                direction: direction as TSortDirection,
                priority: 0,
              },
            ])
          }
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          displaySearch="left"
          showFilter={false}
          loading={isLoading}
        />
      </div>

      <RequirementListActionModals
        isOpen={isModalOpen.isOpen}
        type={isModalOpen.type}
        requirement={isModalOpen.requirement}
        handleModalClose={handleModalClose}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        isProductRequirement
      />
    </>
  );
};

export default ProductRequirementList;
