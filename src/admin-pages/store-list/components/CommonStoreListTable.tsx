"use client";

// Components
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import MyTabs from "@/components/Tab/Tab";
import TableActionPanel from "@/components/common/TableActionPanel";
import Image from "@/components/Image/Image";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import ProductVariantModal from "@/admin-pages/store-list/components/ProductVariantModal";

// Types
import {
  ITableColumn,
  ISortingOption,
  IFilteringOption,
} from "@/components/Table/types";
import {
  IStoreListPageProps,
  IStoreProductList,
  IStoreProductListTableCellProps,
  STORE_LIST_TABS,
} from "@/types/store-product-list/storePorductList";

// Utils & Constants
import { getFormatDate } from "@/utils/date.util";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";

// Services
import { getStoreProductList } from "@/services/store-product-list/storeProductList.service";

// Data
import STOREPRODUCTLISTDATA from "@/mock-data/StoreProductList.json";

// Hooks
import { useCallback, useMemo, useState } from "react";

// Toast
import { toast } from "react-toastify";

// Next
import Link from "next/link";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";

const IMAGE_BASE_URL = "https://storagemedia.corporategear.com";

/**
 * CommonStoreListTable component displays the product list table with filtering and sorting
 * @param {Object} props - Component props
 * @param {IStoreDetail} props.storeDetails - Store details
 * @returns {JSX.Element} Rendered component
 */

const CommonStoreListTable = ({ storeDetails }: IStoreListPageProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([]);
  const [filteringOptions, setFilteringOptions] = useState<IFilteringOption[]>([
    { field: "status", operator: 0, value: "all", type: "moreFilter" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | "productVariant" | null;
  }>({ isOpen: false, type: null });

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory" | "productVariant",
    product: IStoreProductList
  ) => {
    setSelectedProduct(product);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedProduct(null);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [BrandOption, setBrandOption] = useState([]);
  const [ProductTypeOption, setProductTypeOption] = useState([]);
  const [CategoryOption, setCategoryOption] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [GMCProductStatusFormOption, setGMCProductStatusFormOption] = useState(
    []
  );
  const [userNameValues, setUserNameValues] = useState([]);

  const [storeProductListData, setStoreProductListData] = useState<
    IStoreProductList[]
  >(STOREPRODUCTLISTDATA.active.items);

  const [selectedProduct, setSelectedProduct] =
    useState<IStoreProductList | null>(null);

  const onTabClick = (index: number) => {
    setActiveTab(index);
    let filterValue = "";

    switch (index) {
      case 1: // All
        filterValue = "all";
        return;
      case 2: // Active
        filterValue = "active";
        break;
      case 3: // Inactive
        filterValue = "inactive";
        break;
      case 4: // Draft
        filterValue = "draft";
        break;
      case 5: // Discontinued
        filterValue = "discontinued";
        break;
      case 6: // Synced with BC
        filterValue = "bundle";
        break;
    }

    setFilteringOptions([
      { field: "status", operator: 0, value: filterValue, type: "moreFilter" },
    ]);
  };

  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const confirmDelete = () => {
    toast.success("Product deleted successfully");
    handleModalClose();
  };

  const confirmStatusChange = () => {
    toast.success("Product status changed successfully");
    handleModalClose();
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

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Brand",
        options: BrandOption,
        columnName: "brandId",
        type: "checkbox",
        conditionalSearch: true,
      },
      {
        name: "Vendor",
        columnName: "vendorId",
        options: vendors,
        type: "checkbox",
      },
      {
        name: "Category",
        columnName: "categoryId",
        options: CategoryOption,
        type: "checkbox",
      },
      {
        name: "Product Type",
        columnName: "producttypeid",
        options: ProductTypeOption,
        type: "checkbox",
        conditionalSearch: true,
      },
      {
        name: "Pending Readiness",
        // columnName: "createddate",
        options: [
          { label: "SEO Readiness", value: "0" },
          { label: "Product Readiness", value: "1" },
        ],
        type: "checkbox",
      },
      {
        name: "Gender",
        columnName: "gender",
        options: genderOptions,
        type: "checkbox",
        conditionalSearch: false,
      },
      {
        name: "Created Date",
        columnName: "createddate",
        options: [],
        type: "date",
      },
      {
        name: "Created By",
        options: userNameValues,
        columnName: "createdBy",
        type: "checkbox",
      },
      {
        name: "Updated Date",
        columnName: "modifieddate",
        options: [],
        type: "date",
      },
      {
        name: "Updated By",
        options: userNameValues,
        columnName: "modifiedBy",
        type: "checkbox",
      },
      {
        name: "Status",
        columnName: "recStatus",
        options: GMCProductStatusFormOption,
        type: "checkbox",
        conditionalSearch: true,
      },
    ],
    [userNameValues, BrandOption, vendors, CategoryOption, ProductTypeOption]
  );

  const STORE_PRODUCT_LIST_COLUMNS: ITableColumn<IStoreProductList>[] = [
    {
      id: "expander",
      accessorKey: "",
      header: "",
      enableSorting: false,
      cell: (props: IStoreProductListTableCellProps) => {
        return (
          <SvgIcon
            name="PlusIcon"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setIsModalOpen({ isOpen: true, type: "productVariant" });
              setSelectedProduct(props.row.original);
            }}
          />
        );
      },
    },
    {
      id: "image",
      header: "image",
      accessorKey: "productImage",
      enableSorting: false,
      cell: (props: IStoreProductListTableCellProps) => {
        return props?.row?.original?.productImage &&
          props?.row?.original?.productImage?.length > 0 ? (
          <Image
            src={`${IMAGE_BASE_URL}${props.row.original.productImage[0]}`}
          />
        ) : (
          <Image src={"/noImage.png"} />
        );
      },
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.name ? (
          <>
            <div className="w-[200px] flex justify-start items-center group">
              <div className="break-all">
                <Link
                  href={
                    storeDetails.storeType === STORE_TYPES.FORM_BUILDER ||
                    storeDetails.storeType === STORE_TYPES.STORE_BUILDER
                      ? `/admin/stores/${storeDetails.storeType}/${storeDetails.storeName}/store/${storeDetails.id}/edit/${props.row.original.id}`
                      : `/admin/stores/${storeDetails.storeType}/${storeDetails.storeName}/products/edit/${props.row.original.id}`
                  }
                >
                  {props.row.original.name}
                </Link>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "ourSku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.ourSKU ? props.row.original.ourSKU : "";
      },
    },
    {
      id: "vendorSku",
      header: "vendor SKU",
      accessorKey: "vendorSKU",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.vendorSKU ? props.row.original.vendorSKU : "";
      },
    },
    {
      id: "brandName",
      header: "Brand NAME",
      accessorKey: "brandName",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.brandName ? props.row.original.brandName : "";
      },
    },
    {
      id: "vendorName",
      header: "vendor Name",
      accessorKey: "vendorName",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.vendorName
          ? props.row.original.vendorName
          : "";
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      enableSorting: true,
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.category ? props.row.original.category : "";
      },
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      enableSorting: true,
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.gender ? (
          <>
            <div>{props.row.original.gender}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "ourCost",
      header: `our Cost $`,
      accessorKey: "ourCost",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.ourCost ? props.row.original.ourCost : "";
      },
    },
    {
      id: "msrp",
      header: `MSRP $`,
      accessorKey: "msrp",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.msrp ? props.row.original.msrp : "";
      },
    },
    {
      id: "imap",
      header: `IMAP $`,
      accessorKey: "imap",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.imap ? props.row.original.imap : "";
      },
    },
    {
      id: "salePrice",
      header: `Sale Price $`,
      accessorKey: "salePrice",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.salePrice ? props.row.original.salePrice : "";
      },
    },
    {
      id: "createdDate",
      header: "CREATED Date",
      accessorKey: "createdDate",
      cell: (props: IStoreProductListTableCellProps) => {
        const { date, time } = getFormatDate(props.row.original.createdDate);
        return props.row.original.createdDate ? (
          <>
            <div>{date} </div>
            <div className="text-xs">{time}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "createdBy",
      header: "Created BY",
      accessorKey: "createdName",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.createdName ? (
          <>
            <div>{props.row.original.createdName}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "updatedDate",
      header: "UPDATED Date",
      accessorKey: "modifiedDate",
      cell: (props: IStoreProductListTableCellProps) => {
        const { date, time } = getFormatDate(props.row.original.modifiedDate);
        return props.row.original.modifiedDate ? (
          <>
            <div>{date} </div>
            <div>{time}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "updatedBy",
      header: "UPDATED BY",
      accessorKey: "modifiedName",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.modifiedName ? (
          <>
            <div>{props.row.original.modifiedName}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "recStatus",
      header: "status",
      accessorKey: "recStatus",
      cell: (props: IStoreProductListTableCellProps) => {
        return props.row.original.recStatus &&
          props.row.original.recStatus?.toLowerCase() === "s" ? (
          <div className="text-xs inline-block font-medium border border-yellow-300 bg-yellow-100 text-yellow-600 rounded-md text-center px-2.5 py-1 w-28">
            Staging
          </div>
        ) : (
          <Status type={props.row.original.recStatus} />
        );
      },
    },
    {
      id: "isPreview",
      header: "Ready for review",
      accessorKey: "isPreview",
      cell: (props: IStoreProductListTableCellProps) => {
        return <>{props.row.original.isPreview === true ? "Yes" : "No"}</>;
      },
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "id",
      cell: (props: IStoreProductListTableCellProps) => {
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `products/edit/${props.row.original.id}`,
            }}
            remove={{
              show: true,
              onClick: () => {
                handleModalOpen("delete", props.row.original);
              },
            }}
            status={{
              show: true,
              status: "active",
              onClick: () => {
                handleModalOpen("activeInactive", props.row.original);
              },
            }}
            viewHistory={{
              show: true,
              onClick: () => {
                handleModalOpen("viewHistory", props.row.original);
              },
            }}
          />
        );
      },
    },
  ];
  const getStoreProductListData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getStoreProductList({
        args: {
          storeId: storeDetails.id,
          storeType: storeDetails.storeType,
          storeName: storeDetails.storeName,
          pageSize: pagination.pageSize,
          pageIndex: pagination.pageIndex,
          sortingOptions,
          filteringOptions,
        },
      });
      if (response.items.length) {
        setStoreProductListData(response.items);
        setPagination((prevState) => ({
          ...prevState,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        }));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sortingOptions,
    filteringOptions,
  ]);

  return (
    <>
      <MyTabs
        options={STORE_LIST_TABS}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />

      <ReactTable
        COLUMNS={STORE_PRODUCT_LIST_COLUMNS}
        DATA={storeProductListData}
        loading={isLoading}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        totalCount={pagination.totalCount}
        moreFilterOption={moreFilterOptions}
        checkboxSelection
        setSortingOptionHandler={setSortingOptionHandler}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getStoreProductListData}
        sortingOptions={sortingOptions}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {isModalOpen.isOpen &&
        isModalOpen.type === "productVariant" &&
        selectedProduct !== null && (
          <ProductVariantModal
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            product={selectedProduct}
          />
        )}

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onDelete={confirmDelete}
        />
      )}

      {isModalOpen.isOpen &&
        isModalOpen.type === "activeInactive" &&
        selectedProduct !== null && (
          <StatusChangeModel
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            onConfirm={confirmStatusChange}
            currentRowData={{
              ...selectedProduct,
              recStatus:
                selectedProduct.recStatus === "A" ? "active" : "inactive",
              recordName: selectedProduct.name,
            }}
          />
        )}

      {isModalOpen.isOpen &&
        isModalOpen.type === "viewHistory" &&
        selectedProduct !== null && (
          <ViewHistoryModal
            historyData={STOREPRODUCTLISTDATA.history}
            recordName={selectedProduct.name}
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
          />
        )}
    </>
  );
};

export default CommonStoreListTable;
