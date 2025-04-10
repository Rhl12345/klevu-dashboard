import { PageRoutes } from "@/admin-pages/routes";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import ProductData from "@/mock-data/ProductList.json";
import {
  IProductByIdCellProps,
  IProductVariantTableProps,
} from "@/types/product-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
const ProductVariantTable = ({
  openProductModal,
  setOpenProductModal,
}: IProductVariantTableProps) => {
  const [productVariants, setProductVariants] = useState(
    ProductData.productList
  );

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const PRODUCT_COLUMNS = useMemo(
    () => [
      {
        id: "product Image",
        header: "Product Image",
        accessorKey: "productImage",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.productImage &&
            props?.row?.original?.productImage?.length > 0 ? (
            <>
              <div className={`flex -space-x-9 items-center w-[160px]`}>
                {
                  Array.isArray(props?.row?.original?.productImage) ? (
                    props?.row?.original?.productImage?.map(
                      (ProductMainImg, index) => {
                        return (
                          // <Link to={`${PageRoutes.PRODUCT_DATABASE.EDIT}${row.original.id}`} key={index}>
                          <div className={`flex -space-x-9 items-center`}>
                            <Image
                              src={ProductMainImg}
                              className="max-h-full"
                            />
                            {/* <img key={index} className="max-h-full" src={`${AdminAppConfigReducers["azure:BlobUrl"]}${ProductMainImg}`} alt="No Image" /> */}
                          </div>
                          // </Link>
                        );
                      }
                    )
                  ) : (
                    // <Link to={`${PageRoutes.PRODUCT_DATABASE.EDIT}${row?.original.productId}`}>
                    <>
                      <div className="h-14 w-14 flex items-center justify-center overflow-hidden ">
                        <Image
                          src={props?.row?.original?.productImage}
                          className={"max-h-full"}
                        />
                      </div>
                    </>
                  )
                  // <img className="w-14 h-14 shrink-0 mr-2 sm:mr-3 bg-white rounded-full border text-center" src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value}`} alt="not available" />
                  //  </Link>
                }
                {props?.row?.original?.subRows &&
                  props?.row?.original?.subRows?.length !== 0 && (
                    <div>
                      <span className="w-14 h-14 box-content  flex items-center justify-center text-center">
                        +{props?.row?.original?.subRows?.length}
                      </span>
                    </div>
                  )}
              </div>
            </>
          ) : props?.row?.original?.productId ? (
            <Link
              href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.productId}`}
            >
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content ">
                <Image
                  src={props?.row?.original?.productImage}
                  className="max-h-full"
                />
              </div>
            </Link>
          ) : (
            // <div className="flex -space-x-9 items-center" style={{ width: "125px" }}>
            <>
              <Link
                href={`${PageRoutes.MASTER_PRODUCT_FEED.PRODUCT_FEED.EDIT}${props?.row?.original?.id}`}
              >
                <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content">
                  <Image
                    src={props?.row?.original?.productImage}
                    className="max-h-full"
                  />
                </div>
              </Link>
              {props?.row?.original?.subRows &&
                props?.row?.original?.subRows?.length !== 0 && (
                  <div>
                    <span className="w-14 h-14 box-content  inline-flex items-center justify-center text-center">
                      +{props?.row?.original?.subRows?.length}
                    </span>
                  </div>
                )}
            </>
          );
          // </div>
        },
      },
      {
        id: "name",
        header: "Product Name",
        accessorKey: "name",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.name ? (
            <>
              <div className=" flex justify-start items-center group w-[200px]">
                <div>{props?.row?.original?.name}</div>
              </div>
            </>
          ) : (
            " "
          );
        },
      },
      {
        id: "ourSku",
        header: "Our SKU",
        accessorKey: "ourSKU",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.ourSKU
            ? props?.row?.original?.ourSKU
            : "";
        },
      },

      {
        id: "upc",
        header: "UPC",
        accessorKey: "upc",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.upc ? props?.row?.original?.upc : "";
        },
      },

      {
        id: "createdDate",
        header: "CREATED Date",
        accessorKey: "createdDate",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.createdDate ? (
            <>
              <div>
                {getFormatDate(props?.row?.original?.createdDate).date}{" "}
              </div>
              <div>{getFormatDate(props?.row?.original?.createdDate).time}</div>
            </>
          ) : (
            " "
          );
        },
      },
      {
        id: "createdBy",
        header: "Created BY",
        accessorKey: "createdBy",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.createdBy ? (
            <>
              <div>{props?.row?.original?.createdBy}</div>
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
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.modifiedDate ? (
            <>
              <div>
                {getFormatDate(props?.row?.original?.modifiedDate).date}{" "}
              </div>
              <div>
                {getFormatDate(props?.row?.original?.modifiedDate).time}
              </div>
            </>
          ) : (
            " "
          );
        },
      },
      {
        id: "modifiedBy",
        header: "UPDATED BY",
        accessorKey: "modifiedBy",
        cell: (props: IProductByIdCellProps) => {
          return props?.row?.original?.modifiedBy ? (
            <>
              <div>{props?.row?.original?.modifiedBy}</div>
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
        cell: (props: IProductByIdCellProps) => {
          return <Status type={props?.row?.original?.recStatus} />;
        },
      },
    ],
    []
  );

  const getProductVariantData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        // Simulating API call with mock data
        const response = new Promise<any>((resolve) => {
          setTimeout(() => {
            const startIndex = (pageIndex - 1) * paginationData.pageSize;
            const endIndex = startIndex + paginationData.pageSize;
            const paginatedItems = productVariants.slice(startIndex, endIndex);

            resolve({
              items: paginatedItems,
              pageIndex: pageIndex,
              pageSize: paginationData.pageSize,
              totalCount: productVariants.length,
              totalPages: Math.ceil(
                productVariants.length / paginationData.pageSize
              ),

              hasPreviousPage: pageIndex > 1,
              hasNextPage: endIndex < productVariants.length,
            });
          }, 1000);
        });

        const result = await response;
        setProductVariants(result.items);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    []
  );

  return (
    <Modal
      isOpen={openProductModal}
      onClose={() => setOpenProductModal(false)}
      header={"Product Variants"}
      size="9xl"
      content={
        <ReactTable
          usedInsideModal={true}
          COLUMNS={PRODUCT_COLUMNS}
          DATA={productVariants}
          fetchData={getProductVariantData}
          {...paginationData}
          hasNextPage={false}
          hasPreviousPage={false}
          totalCount={productVariants.length}
          pageSize={paginationData.pageSize}
          showFilter={false}
          setTablePageSize={(value) => {
            setPaginationDataFunc("pageSize", value);
          }}
          displaySearch={false}
          showMoreFilters={false}
          showEditColumns={false}
          // tablePadding={true}
        />
      }
    />
  );
};

export default ProductVariantTable;
