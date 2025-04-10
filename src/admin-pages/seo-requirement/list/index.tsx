"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import RequirementListActionModals from "@/components/product-seo-requirement/RequirementListActionModals";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import {
  activeInactiveSeoRequirement,
  deleteSeoRequirement,
  getSeoRequirementList,
} from "@/services/seo-requirement/seoRequirement.service";
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

const SeoRequirementList = () => {
  const [seoRequirementList, setSeoRequirementList] =
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
            href={`${PageRoutes.SEO_REQUIREMENT.EDIT}${props.row.original.id}`}
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
        cell: (props: { getValue: () => string | null }) => {
          const { date, time } = getFormatDate(props.getValue());
          return (
            <div>
              {date && time ? (
                <>
                  <div>{date}</div>
                  <div className="text-xs font-normal">{time}</div>
                </>
              ) : (
                "-"
              )}
            </div>
          );
        },
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
        cell: (props: { getValue: () => string | null }) => {
          const { date, time } = getFormatDate(props.getValue());
          return (
            <div>
              {date && time ? (
                <>
                  <div>{date}</div>
                  <div className="text-xs font-normal">{time}</div>
                </>
              ) : (
                "-"
              )}
            </div>
          );
        },
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
                url: `${PageRoutes.SEO_REQUIREMENT.EDIT}${row.id}`,
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
  const fetchSeoRequirements = useCallback(
    async (pageIndex?: number) => {
      setIsLoading(true);
      try {
        const response = await getSeoRequirementList({
          pageIndex: pageIndex || seoRequirementList.pageIndex,
          pageSize: seoRequirementList.pageSize,
          sortingOptions,
        });
        setSeoRequirementList({
          ...seoRequirementList,
          items: response.items,
          totalCount: response.totalCount,
          pageIndex: response.pageIndex,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
          totalPages: response.totalPages,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Error fetching seo requirements"));
      } finally {
        setIsLoading(false);
      }
    },
    [seoRequirementList.pageIndex, seoRequirementList.pageSize, sortingOptions]
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
      await deleteSeoRequirement(isModalOpen.requirement!.id!);
      toast.success("Seo requirement deleted successfully");
      handleModalClose();
      fetchSeoRequirements();
    } catch (error) {
      toast.error(getErrorMessage(error, "Error deleting seo requirement"));
    }
  };

  // Memoize handlers
  const handleStatusChange = useCallback(async () => {
    try {
      await activeInactiveSeoRequirement(
        isModalOpen.requirement!.id!,
        isModalOpen.requirement!.recStatus === "A" ? "I" : "A"
      );
      toast.success("Seo requirement status updated successfully");
      handleModalClose();
      fetchSeoRequirements();
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error updating seo requirement status")
      );
    }
  }, [isModalOpen.requirement, fetchSeoRequirements]);

  useEffect(() => {
    fetchSeoRequirements();
  }, []);

  return (
    <>
      <div>
        <ListPageHeader
          name="Add SEO Requirement"
          moduleName="SEO Requirement"
          navigateUrl={PageRoutes.SEO_REQUIREMENT.CREATE}
        />
        <ReactTable
          COLUMNS={COLUMNS}
          DATA={seoRequirementList.items}
          hasNextPage={seoRequirementList.hasNextPage}
          hasPreviousPage={seoRequirementList.hasPreviousPage}
          pageIndex={seoRequirementList.pageIndex}
          pageSize={seoRequirementList.pageSize}
          totalCount={seoRequirementList.totalCount}
          setTablePageSize={(size: number) =>
            setSeoRequirementList({
              ...seoRequirementList,
              pageSize: size,
            })
          }
          fetchData={fetchSeoRequirements}
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
        isProductRequirement={false}
      />
    </>
  );
};

export default SeoRequirementList;
