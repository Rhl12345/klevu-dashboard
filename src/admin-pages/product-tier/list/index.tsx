"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import {
  IFilterOption,
  IModalType,
  IProductTierEntry,
} from "@/types/product-tier/productTier.type";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import Link from "next/link";
import { useCallback, useState, useMemo } from "react";
import { fetchProductTierList } from "@/services/product-tier/productTier.service";
import { getFormatDate } from "@/utils/date.util";
import { toast } from "react-toastify";
import StatusChangeModel from "@/components/Modal/StatusModal";
import { MODAL_TYPES } from "@/mock-data/formBuilder";
import Text from "@/components/Text/Text";
import { ITableColumn } from "@/components/Table/types";

const ProductTierList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [productTierList, setProductTierList] = useState<IProductTierEntry[]>(
    []
  );
  const [selectedProductTier, setSelectedProductTier] =
    useState<IProductTierEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: IModalType | null;
  }>({ isOpen: false, type: null });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "storeName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = useCallback(
    (type: IModalType, productTier: IProductTierEntry) => {
      setSelectedProductTier(productTier);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const COLUMNS: ITableColumn<IProductTierEntry>[] = useMemo(
    () => [
      {
        id: "storeName",
        accessorKey: "storeName",
        header: "Store Name",
        cell: (props) => (
          <Link
            href={`${PageRoutes.PRODUCT_TIER.EDIT}${props.row.original.id}`}
          >
            {props.row.original.storeName}
          </Link>
        ),
      },
      {
        id: "tier",
        accessorKey: "tier",
        header: "Tier",
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "Created Date",
        cell: ({ getValue }) => {
          return getValue() ? (
            <>
              <div>{getFormatDate(getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(getValue()).time}
              </div>
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
        cell: ({ getValue }) => {
          return getValue() ? (
            <>
              <div>{getFormatDate(getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(getValue()).time}
              </div>
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
          return <Status type={props.row.original.recStatus} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props) => {
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.PRODUCT_TIER.EDIT}${props.row.original.id}`,
              }}
              status={{
                show: true,
                status:
                  props.row.original.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen("activeInactive", props.row.original),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedProductTier(null);
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

  const handleStatusChange = async () => {
    try {
      toast.success("Product tier status updated successfully");
      handleModalClose();
    } catch (error) {
      console.error("Error updating product tier status:", error);
    }
  };

  const getProductTierList = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetchProductTierList({
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions,
        });

        setProductTierList(response.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        }));
      } catch (error) {
        toast.error("Failed to fetch product tier list");
        console.error("Error fetching product tier list:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, sortingOptions, filteringOptions]
  );

  return (
    <>
      <ListPageHeader
        name={"Add Tier"}
        moduleName={"Product Tiers"}
        navigateUrl={PageRoutes.PRODUCT_TIER.CREATE}
      />
      <ReactTable
        DATA={productTierList}
        COLUMNS={COLUMNS}
        fetchData={getProductTierList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
      />

      {isModalOpen.isOpen &&
        isModalOpen.type === MODAL_TYPES.ACTIVE_INACTIVE && (
          <StatusChangeModel
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            onConfirm={handleStatusChange}
            currentRowData={{
              recStatus:
                selectedProductTier?.recStatus === RecStatusValuebyName.Active
                  ? "active"
                  : "inactive",
              quantityName: "productTier",
              recordName: "productTier",
            }}
            title={`${selectedProductTier?.recStatus === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
            message={`Are you sure you want to ${selectedProductTier?.recStatus === RecStatusValuebyName.Active ? "inactive" : "active"} this product tier?`}
          />
        )}
    </>
  );
};

export default ProductTierList;
