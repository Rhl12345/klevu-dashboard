"use client";
import { PageRoutes } from "@/admin-pages/routes";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import MyTabs from "@/components/Tab/Tab";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";
import ProductData from "@/mock-data/ProductList.json";
import {
  IProductDatabaseList,
  IProductDatabaseListCellProps,
  PRODUCT_LIST_TABS,
} from "@/types/product-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import {
  defaultImage,
  paginationDetails,
  userNameValues,
} from "@/utils/constants";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ProductVariantTable from "@/admin-pages/product-database/product-feed/components/ProductVariantTable";
import { useRouter } from "next/navigation";
import DateCell from "@/components/common/DateCell";

const ProductDataList = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [productData, setProductData] = useState(
    ProductData.allProductList.items
  );

  const [selectedProduct, setSelectedProduct] =
    useState<IProductDatabaseList | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });

  const [openProductModal, setOpenProductModal] = useState(false);

  const router = useRouter();

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    product: IProductDatabaseList
  ) => {
    setSelectedProduct(product);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedProduct(null);
  };

  const COLUMNS = useMemo(
    () => [
      {
        id: "add",
        header: "",
        accessorKey: "",
        cell: (props: IProductDatabaseListCellProps) => {
          return (
            <>
              <SvgIcon
                name="PlusIcon"
                width={24}
                height={24}
                onClick={() => setOpenProductModal(true)}
              />
            </>
          );
        },
      },
      {
        id: "productImage",
        header: "Product Image",
        accessorKey: "productImage",
        cell: (props: IProductDatabaseListCellProps) => {
          return props?.row?.original?.productImage ? (
            <>
              <div
                className="flex -space-x-9 items-center"
                style={{ width: "125px" }}
              >
                {Array.isArray(props?.row?.original?.productImage) ? (
                  props?.row?.original?.productImage?.map(
                    (ProductMainImg, index) => {
                      return (
                        <Link
                          href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
                          key={index}
                        >
                          <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                            <Image
                              src={`https://storagemedia.corporategear.com${ProductMainImg}`}
                            />
                          </div>
                        </Link>
                      );
                    }
                  )
                ) : (
                  <Link
                    href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
                  >
                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                      <Image src={defaultImage} />
                    </div>
                  </Link>
                )}
                {props?.row?.original?.subRows &&
                  props?.row?.original?.subRows?.length !== 0 && (
                    <div>
                      <span className="w-14 h-14 rounded-full box-content bg-neutral-200 flex items-center justify-center">
                        +{props?.row?.original?.subRows?.length}
                      </span>
                    </div>
                  )}
              </div>
            </>
          ) : props?.row?.original?.id ? (
            <Link
              href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
            >
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content">
                <Image src={defaultImage} />
              </div>
            </Link>
          ) : (
            // <div className="flex -space-x-9 items-center" style={{ width: "125px" }}>
            <>
              <Link
                href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
              >
                <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content">
                  <Image src={defaultImage} />
                </div>
              </Link>

              {props?.row?.original?.subRows &&
                props?.row?.original?.subRows?.length !== 0 && (
                  <div>
                    <span className="w-14 h-14  box-content inline-flex items-center justify-center">
                      +{props?.row?.original?.subRows?.length}
                    </span>
                  </div>
                )}
            </>
          );
        },
      },
      {
        id: "name",
        header: "Product Name",
        accessorKey: "name",
        cell: (props: IProductDatabaseListCellProps) => {
          return props?.row?.original?.name ? (
            <>
              <div className="w-full flex justify-start items-center group">
                <Link
                  href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
                >
                  {props?.row?.original?.name}
                </Link>
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
        cell: (props: IProductDatabaseListCellProps) => {
          if (!props?.row?.original?.ourSKU) {
            return "";
          } else {
            return props?.row?.original?.ourSKU;
          }
        },
      },
      {
        id: "vendorSku",
        header: "VENDOR SKU",
        accessorKey: "vendorSKU",
        cell: (props: IProductDatabaseListCellProps) => {
          if (!props?.row?.original?.vendorSKU) {
            return "";
          } else {
            return props?.row?.original?.vendorSKU;
          }
        },
      },
      {
        id: "brandName",
        header: "Brand NAME",
        accessorKey: "brandName",
        cell: (props: IProductDatabaseListCellProps) => {
          return props?.row?.original?.brandName
            ? props?.row?.original?.brandName
            : "";
        },
      },
      {
        id: "vendorName",
        header: "VENDOR NAME",
        accessorKey: "vendorName",
        cell: (props: IProductDatabaseListCellProps) => {
          return props?.row?.original?.vendorName
            ? props?.row?.original?.vendorName
            : "";
        },
      },
      {
        id: "ourCost",
        header: `our Cost $`,
        accessorKey: "ourcost",
        cell: (props: IProductDatabaseListCellProps) => {
          // return (value ? parseFloat(value).toFixed(2) : "")
          return (
            <div>
              {props?.row?.original?.ourcost
                ? parseFloat(props?.row?.original?.ourcost.toString()).toFixed(
                    2
                  )
                : "0.00"}
            </div>
          );
        },
      },
      {
        id: "msrp",
        header: `MSRP $`,
        accessorKey: "msrp",
        cell: (props: IProductDatabaseListCellProps) => {
          return (
            <div>
              {props?.row?.original?.msrp
                ? parseFloat(props?.row?.original?.msrp.toString()).toFixed(2)
                : "0.00"}
            </div>
          );
        },
      },
      {
        id: "imap",
        header: `IMAP $`,
        accessorKey: "imap",
        cell: (props: IProductDatabaseListCellProps) => {
          return (
            <div>
              {props?.row?.original?.imap
                ? parseFloat(props?.row?.original?.imap.toString()).toFixed(2)
                : "0.00"}
            </div>
          );
        },
      },
      {
        id: "salePrice",
        header: `Sale Price $`,
        accessorKey: "salePrice",
        cell: (props: IProductDatabaseListCellProps) => {
          return (
            <div>
              {props?.row?.original?.salePrice
                ? parseFloat(
                    props?.row?.original?.salePrice.toString()
                  ).toFixed(2)
                : "0.00"}
            </div>
          );
        },
      },
      {
        id: "createdDate",
        header: "Created date",
        accessorKey: "createdDate",
        cell: (props: IProductDatabaseListCellProps) => (
          <DateCell date={props?.row?.original?.createdDate} />
        ),
      },
      {
        id: "createdBy",
        header: "Created By",
        accessorKey: "createdName",
        Footer: "Created By",
        column_name: "createdName",
      },
      {
        id: "updatedDate",
        header: "Updated Date",
        accessorKey: "modifiedDate",
        cell: (props: IProductDatabaseListCellProps) => (
          <DateCell date={props?.row?.original?.modifiedDate || ""} />
        ),
      },
      {
        id: "updatedBy",
        header: "Updated By",
        accessorKey: "modifiedName",
        Footer: "Updated By",
        column_name: "modifiedName",
      },
      {
        id: "recStatus",
        header: "status",
        accessorKey: "recStatus",
        cell: (props: IProductDatabaseListCellProps) => {
          return <Status type={props?.row?.original?.recStatus} />;
        },
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "",
        cell: (props: IProductDatabaseListCellProps) => {
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", props?.row?.original),
              }}
              status={{
                show: true,
                status: props?.row?.original?.recStatus as
                  | "active"
                  | "inactive"
                  | "pending"
                  | "rejected"
                  | "approved"
                  | "draft",
                onClick: () =>
                  handleModalOpen("activeInactive", props?.row?.original),
              }}
              viewHistory={{
                show: true,
                onClick: () => console.log("View History"),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

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

  const getProductData = useCallback(
    async (
      pageIndex = 1,
      productsData: IProductDatabaseList[] = ProductData.allProductList.items
    ): Promise<void> => {
      try {
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = productsData.slice(startIndex, endIndex);

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: productsData.length,
              totalPages: Math.ceil(
                productsData.length / paginationData.pageSize
              ),
              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < productsData.length,
            });
          }, 1000);
        });

        const result = await response;
        setProductData(result.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: result.pageIndex,
          pageSize: result.pageSize,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          hasPreviousPage: result.hasPreviousPage,
          hasNextPage: result.hasNextPage,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [paginationData.pageSize]
  );

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Brand",
        options: [],
        columnName: "brandId",
        type: "checkbox",
        conditionalSearch: true,
      },
      {
        name: "Vendor",
        columnName: "vendorId",
        options: [],
        type: "checkbox",
      },

      {
        name: "Product Type",
        columnName: "producttypeId",
        options: [],
        type: "checkbox",
        conditionalSearch: true,
      },
      {
        name: "Created Date",
        columnName: "createddate",
        options: [],
        type: "date",
      },
      {
        name: "Updated Date",
        columnName: "modifieddate",
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
        name: "Updated By",
        options: userNameValues,
        columnName: "modifiedBy",
        type: "checkbox",
      },
    ],
    []
  );

  const handleTabClick = useCallback(
    (tabId: number) => {
      setActiveTab(PRODUCT_LIST_TABS[tabId].id || 0);
      const productMap: any = {
        0: ProductData.allProductList.items,

        1: ProductData.activeProductList.items,
        2: ProductData.inactiveProductList.items,
        3: ProductData.draftProductList.items,
      } as const;

      getProductData(1, productMap[tabId]);
    },
    [getProductData]
  );

  const handleDelete = async (): Promise<void> => {
    // Don't proceed if no vendor selected
    if (!selectedProduct?.id) {
      toast.error("No product selected for deletion");
      return;
    }

    try {
      //   await deleteProduct(selectedProduct.id);
      toast.success("Product deleted successfully");
      handleModalClose();
      // Refresh the list to show updated dat
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async () => {
    // Don't proceed if no vendor selected
    if (!selectedProduct?.id) {
      toast.error("No product selected for status change");
      return;
    }

    try {
      // TODO: Implement API call to update vendor status
      // For now just show success message

      toast.success("Product status updated successfully");
      handleModalClose();
      // Refresh the list to show updated data
      await getProductData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExport = () => {
    router.push(PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EXPORT);
  };

  const handleImport = () => {
    router.push(PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.IMPORT);
  };

  return (
    <>
      <ListPageHeader
        moduleName="Product Database"
        navigateUrl={PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.CREATE}
        name="Add Product"
      >
        <Button onClick={handleExport}>Export</Button>
        <Button onClick={handleImport}>Import</Button>
      </ListPageHeader>

      <MyTabs
        options={PRODUCT_LIST_TABS}
        activeTab={PRODUCT_LIST_TABS.findIndex((tab) => tab.id === activeTab)}
        onTabClick={(index: number) => handleTabClick(index)}
      />
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={productData}
        {...paginationData}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        fetchData={getProductData}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOptions}
        checkboxSelection={true}
        // tablePadding={true}
      />

      {openProductModal && (
        <ProductVariantTable
          setOpenProductModal={setOpenProductModal}
          openProductModal={openProductModal}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete Vendor"
          itemName="Vendor"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={true} // No need to check isOpen again since we already check in condition
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedProduct?.recStatus === "A" ? "active" : "inactive",
            quantityName: "product",
            recordName: "product",
          }}
          title={`${selectedProduct?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedProduct?.recStatus === "A" ? "inactive" : "active"} this product?`}
        />
      )}
    </>
  );
};

export default ProductDataList;
