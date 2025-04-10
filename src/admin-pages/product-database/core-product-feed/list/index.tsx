"use client";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Tab from "@/components/Tab/Tab";
import ReactTable from "@/components/Table/ReactTable";
import {
  IFilteringOption,
  ISortingOption,
  ITableColumn,
} from "@/components/Table/types";
import Loading from "@/components/common/Loader";
import {
  IMasterProduct,
  IModalState,
} from "@/types/core-product-feed/coreProductFeed.type";
import {
  coreProductFeedTabs,
  DUMMY_VIEW_HISTORY_DATA,
  inventoryFeedOptions,
} from "@/utils/Dummy";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ProductListHeader } from "@/admin-pages/product-database/core-product-feed/components/ProductListHeader";
import { ProductListImageCell } from "@/admin-pages/product-database/core-product-feed/components/ProductListImageCell";
import ProductVariantModel from "@/admin-pages/product-database/core-product-feed/components/ProductVariantModel";
import { PageRoutes } from "@/admin-pages/routes";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import TableActionPanel from "@/components/common/TableActionPanel";
import {
  deleteProduct,
  getProductList,
  updateProductStatus,
} from "@/services/core-product-feed/coreProductFeed.service";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { toast } from "react-toastify";
import AttributeCloneModal from "@/admin-pages/product-database/core-product-feed/components/AttributeCloneModal";
import MultipleCloneModal from "@/admin-pages/product-database/core-product-feed/components/MultipleCloneModal";
import CheckBoxAction from "@/components/common/CheckBoxAction";

const CoreProductFeedList = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([]);
  const [filteringOptions, setFilteringOptions] = useState<IFilteringOption[]>(
    []
  );
  const [selectedRows, setSelectedRows] = useState<IMasterProduct[]>([]);
  const [productDiscontinue, setProductDiscontinue] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [productListData, setProductListData] = useState<IMasterProduct[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<IModalState>({
    isOpen: false,
    type: null,
  });

  const [selectedStoreInventory, setSelectedStoreInventory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<IMasterProduct | null>(
    null
  );

  const getCoreProductList = useCallback(async () => {
    try {
      const response = await getProductList({
        args: {
          pageSize: pagination.pageSize,
          pageIndex: pagination.pageIndex,
          sortingOptions,
          filteringOptions,
        },
      });
      if (response.items.length) {
        setProductListData(response.items);
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

  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPagination((prevState) => ({
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

  const onTabClick = (index: number) => {
    setActiveTab(index);
    let filterValue = "";

    switch (index) {
      case 1: // All
        setFilteringOptions([]);
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
        filterValue = "synced";
        break;
      case 7: // Resync with BC
        filterValue = "resync";
        break;
      case 8: // BC Sync Pending
        filterValue = "sync_pending";
        break;
      case 9: // Color Discontinue
        filterValue = "color_discontinue";
        break;
    }

    setFilteringOptions([
      { field: "status", operator: 0, value: filterValue, type: "moreFilter" },
    ]);
  };

  const handleExport = () => {
    router.push(PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.EXPORT);
  };

  const handleImport = () => {
    router.push(PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.IMPORT);
  };

  const handleManualBrandInventory = () => {
    // Handle manual brand inventory logic
    router.push(
      PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.MANUAL_BRAND_INVENTORY
    );
  };

  const handleCloneProduct = () => {
    // Handle clone product logic
    toast.success("Clone Product clicked");
  };

  const handleCreateListing = () => {
    // Handle create listing logic
    toast.success("Create Listing clicked");
  };

  const handleAddProduct = () => {
    // Handle add product logic
    router.push(PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.CREATE);
  };

  const handleSyncInventory = () => {
    // Handle sync inventory logic

    if (!selectedStoreInventory)
      toast.warning("Please select an option to sync inventory");
    else {
      router.push(
        `${PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.LIST}/${selectedStoreInventory || ""}`
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedProduct(null);
  };

  const MASTER_PRODUCT_LIST_COLUMNS: ITableColumn<IMasterProduct>[] = [
    {
      id: "id",
      header: "",
      accessorKey: "id",
      enableSorting: false,
      cell: () => {
        return (
          <SvgIcon
            name="PlusIcon"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setIsModalOpen({ isOpen: true, type: "productVariant" });
            }}
          />
        );
      },
    },
    {
      id: "productImage",
      header: "Product Image",
      accessorKey: "productImage",
      enableSorting: false,
      cell: ({ row }) => {
        return ProductListImageCell(row.original.productImage, row.original.id);
      },
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <Link
            href={`${PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.EDIT}${row?.original?.id}`}
          >
            {row?.original?.name}
          </Link>
        );
      },
    },
    {
      id: "ourSku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      cell: ({ row }) => row.original.ourSKU,
    },
    {
      id: "vendorSku",
      header: "Vendor SKU",
      accessorKey: "vendorSKU",
      cell: ({ row }) => row.original.vendorSKU,
    },
    {
      id: "brandName",
      header: "Brand Name",
      accessorKey: "brandName",
      cell: ({ row }) => row.original.brandName,
    },
    {
      id: "vendorName",
      header: "Vendor Name",
      accessorKey: "vendorName",
      cell: ({ row }) => row.original.vendorName,
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      enableSorting: false,
      cell: ({ row }) => row.original.category,
    },
    {
      id: "storeLogoUrl",
      header: "Store",
      accessorKey: "storeLogoUrl",
      enableSorting: false,
      cell: ({ row }) => {
        return ProductListImageCell(row.original.storeLogoUrl, row.original.id);
      },
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      cell: ({ row }) => row.original.gender,
    },
    {
      id: "ourcost",
      header: "Our Cost ($)",
      accessorKey: "ourcost",
      cell: ({ row }) => `${row.original.ourcost.toFixed(2)}`,
    },
    {
      id: "msrp",
      header: "MSRP ($)",
      accessorKey: "msrp",
      cell: ({ row }) => `${row.original.msrp.toFixed(2)}`,
    },
    {
      id: "imap",
      header: "IMAP ($)",
      accessorKey: "imap",
      cell: ({ row }) => `${row.original.imap.toFixed(2)}`,
    },
    {
      id: "salePrice",
      header: "Sale Price ($)",
      accessorKey: "salePrice",
      cell: ({ row }) => `${row.original.salePrice.toFixed(2)}`,
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row?.original?.createdDate);
        return (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    {
      id: "createdName",
      header: "Created By",
      accessorKey: "createdName",
      cell: ({ row }) => row?.original?.createdName,
    },
    {
      id: "modifiedDate",
      header: "Updated Date",
      accessorKey: "modifiedDate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row?.original?.modifiedDate);
        return (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    {
      id: "modifiedName",
      header: "Updated By",
      accessorKey: "modifiedName",
      cell: ({ row }) => row?.original?.modifiedName,
    },
    {
      id: "lastNavSyncDate",
      header: "Last BC Sync Date",
      accessorKey: "lastNavSyncDate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row?.original?.lastNavSyncDate);
        return (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    {
      id: "navSyncStatus",
      header: "BC Sync Status",
      accessorKey: "navSyncStatus",
      cell: ({ row }) => <Status type={row?.original?.navSyncStatus} />,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "recStatus",
      cell: ({ row }) => <Status type={row?.original?.recStatus} />,
    },
    {
      id: "discontinue",
      header: "Discontinue",
      accessorKey: "discontinue",
      cell: ({ row }) => (
        <Status type={row?.original?.isDiscontinue ? "discontinue" : ""} />
      ),
    },

    {
      id: "actions",
      header: "Action",
      accessorKey: "actions",
      enableSorting: false,
      cell: ({ row }) => {
        const product = row?.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.EDIT}${product?.id}`,
            }}
            remove={{
              show: true,
              onClick: () => {
                setIsModalOpen({
                  isOpen: true,
                  type: "delete",
                });
              },
            }}
            status={{
              show: true,
              status: "active",
              onClick: () => {
                setIsModalOpen({
                  isOpen: true,
                  type: "activeInactive",
                });
              },
            }}
            viewHistory={{
              show: true,
              onClick: () => {
                setSelectedProduct(row?.original);
                setIsModalOpen({
                  isOpen: true,
                  type: "viewHistory",
                });
              },
            }}
          />
        );
      },
    },
  ];

  const handleStatusChange = async () => {
    try {
      await updateProductStatus(
        selectedProduct?.id!,
        selectedProduct?.recStatus === "A" ? "inactive" : "active"
      );
      handleModalClose();
      getCoreProductList();
      toast.success("Product status updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Error updating product status"));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct?.id!);
      toast.success("Product deleted successfully");
      handleModalClose();
      getCoreProductList();
    } catch (error) {
      toast.error(getErrorMessage(error, "Error deleting product"));
    }
  };

  const handleAttributeClone = () => {
    setIsModalOpen((prev) => ({ ...prev, isOpen: true, type: "multipleClone" }));
  };

  useEffect(() => {
    getCoreProductList();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sortingOptions,
    filteringOptions,
  ]);

  // Memoized table data
  const tableData = useMemo(() => {
    return productListData;
  }, [productListData]);

  const handleHeaderActions = {
    onExport: handleExport,
    onImport: handleImport,
    onManualBrand: handleManualBrandInventory,
    onClone: handleCloneProduct,
    onCreateListing: handleCreateListing,
    onAdd: handleAddProduct,
    onSync: handleSyncInventory,
  };

  const handleProductDiscontinue = () => {
    setProductDiscontinue((prev) => !prev);
    toast.success("Product discontinued successfully");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Product List Header */}
      <ProductListHeader
        {...handleHeaderActions}
        inventoryOptions={inventoryFeedOptions}
        setSelectedStoreInventory={setSelectedStoreInventory}
      />
      <Tab
        options={coreProductFeedTabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
      {/* Product List Table */}
      <ReactTable
        checkBoxAction={() => <CheckBoxAction 
          selectedFlatRows={selectedRows}
          attributeClone={{
            show: true,
            onClick: () => setIsModalOpen({
              isOpen: true,
              type: "attributeClone",
            }),
          }}
          cloneMultiple={{
            show: true,
            onClick: () => setIsModalOpen({
              isOpen: true,
              type: "multipleClone",
            }),
          }}
          productDiscontinue={{
            show: true,
            onClick: handleProductDiscontinue,
          }}
        />}
        useCheckboxSelectionInRowOnly={{
            show: true,
            showStatusList: ["A"],
        }}
        COLUMNS={MASTER_PRODUCT_LIST_COLUMNS}
        DATA={tableData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        checkboxSelection
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getCoreProductList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={handleStatusChange}
        currentRowData={{
          recStatus: selectedProduct?.recStatus === "A" ? "inactive" : "active",
          recordName: "product",
        }}
        title="Change Status"
        message="Do you want to change the status of this product ?"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Product"
        onDelete={handleDelete}
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        recordName={selectedProduct?.name || ""}
        historyData={DUMMY_VIEW_HISTORY_DATA}
      />

      {/* Product Variant Model */}
      <ProductVariantModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "productVariant"}
        onClose={handleModalClose}
      />

      {/* Attribute Clone Modal */}
      <AttributeCloneModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "attributeClone"}
        onClose={handleModalClose}
        handleAttributeClone={handleAttributeClone}
      />

      {/* Multiple Clone Modal */}
      <MultipleCloneModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "multipleClone"}
        onClose={handleModalClose}
      />
      
      
    </>
  );
};

export default CoreProductFeedList;
