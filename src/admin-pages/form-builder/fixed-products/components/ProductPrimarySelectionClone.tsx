import { ProductListImageCell } from "@/admin-pages/product-database/core-product-feed/components/ProductListImageCell";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { MODAL_TYPES } from "@/mock-data/formBuilder";
import { addSelectedBrand } from "@/services/form-builder/primary-selecton-group/primarySelectionGroup.service";
import {
  IProductPrimarySelectionProps,
  IPrimarySelectGroupListRequest,
  IPrimarySelectGroupProduct,
} from "@/types/primary-selection-group/primarySelectionGroup.type";
import { IModalType } from "@/types/product-tier/productTier.type";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductPrimarySelectionClone = (props: IProductPrimarySelectionProps) => {
  const { addedProductData, storeName, id } = props;

  const [productCloneData, setProductCloneData] = useState<
    IPrimarySelectGroupProduct[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<
    IPrimarySelectGroupProduct[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "storeName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [deleteConformationError, setDeleteConformationError] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<IPrimarySelectGroupProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: IModalType | null;
  }>({ isOpen: false, type: null });

  const handleModalOpen = useCallback(
    (type: IModalType, selectedProduct: IPrimarySelectGroupProduct) => {
      setSelectedProduct(selectedProduct);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedProduct(null);
  };

  const handleStatusChange = async () => {
    try {
      toast.success("Brand product status updated successfully");
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    try {
      if (deleteInput !== "delete") {
        setDeleteConformationError(
          "Please type 'delete' to verify that you want to delete this record."
        );
        return;
      }
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const COLUMNS: ITableColumn<IPrimarySelectGroupProduct>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <Text size="sm">{row.original.id}</Text>,
    },
    {
      id: "productImage",
      header: "PRODUCT IMAGE",
      accessorKey: "productImage",
      cell: ({ row }) => {
        if (
          row.original?.productImage &&
          Array.isArray(row.original?.productImage)
        ) {
          return ProductListImageCell(
            row.original?.productImage,
            row.original.id
          );
        } else if (!Array.isArray(row.original?.productImage)) {
          return (
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${row.original?.productImage}`}
                width={56}
                height={56}
                objectFit="cover"
                alt={row.original?.name}
              />
            </div>
          );
        }
      },
    },
    {
      id: "name",
      header: "PRODUCT NAME",
      accessorKey: "name",
      cell: ({ row }) => (
        <Link
          href={`${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/${id}/edit/${row.original.id}`}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      id: "ourSKU",
      header: "SKU",
      accessorKey: "ourSKU",
      cell: ({ row }) => <Text size="sm">{row.original.ourSKU}</Text>,
    },
    {
      id: "quantity",
      header: "QUANTITY",
      accessorKey: "quantity",
      cell: ({ row }) => <Text size="sm">{row.original.quantity}</Text>,
    },
    {
      id: "salePrice",
      header: "CUSTOMER PRICE",
      accessorKey: "salePrice",
      cell: ({ row }) => (
        <Text size="sm">${row.original?.salePrice?.toFixed(2)}</Text>
      ),
    },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      cell: (props: { row: { original: IPrimarySelectGroupProduct } }) => {
        return <Status type={props.row.original.recStatus} />;
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: { row: { original: IPrimarySelectGroupProduct } }) => {
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.STORE.STORE}/${STORE_TYPES.FORM_BUILDER}/${storeName}/store/${id}/edit/${props.row.original.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", props.row.original),
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
  ];

  const fetchFixedProducts = useCallback(
    async (pageIndex = 0): Promise<void> => {
      try {
        let responseData: any;
        setIsLoading(true);
        const request: IPrimarySelectGroupListRequest = {
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions: [],
        };

        responseData = await addSelectedBrand(request, selectedRows);
        setProductCloneData(responseData.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: responseData?.pageIndex,
          pageSize: responseData?.pageSize,
          totalCount: responseData?.totalCount,
          totalPages: responseData?.totalPages,
          hasPreviousPage: responseData?.hasPreviousPage,
          hasNextPage: responseData?.hasNextPage,
        }));
      } catch (error) {
        toast.error("Failed to fetch primary selection group list");
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, sortingOptions, selectedRows]
  );

  useEffect(() => {
    setSelectedRows((prev) => [...prev, ...addedProductData]);
  }, [addedProductData]);

  useEffect(() => {
    fetchFixedProducts();
  }, [fetchFixedProducts]);

  const getRowCanExpand = (row: any) => {
    return row.original.subRows && row.original.subRows.length > 0;
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

  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div>
      <ReactTable
        DATA={productCloneData}
        COLUMNS={COLUMNS}
        fetchData={fetchFixedProducts}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        getRowCanExpand={getRowCanExpand}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        checkboxSelection={false}
        showFilter={false}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
      />

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Category"
          onDelete={handleDelete}
        />
      )}

      {isModalOpen.isOpen &&
        isModalOpen.type === MODAL_TYPES.ACTIVE_INACTIVE && (
          <StatusChangeModel
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            onConfirm={handleStatusChange}
            currentRowData={{
              recStatus:
                selectedProduct?.recStatus === RecStatusValuebyName.Active
                  ? "active"
                  : "inactive",
              quantityName: "product",
              recordName: "product",
            }}
            title={`${selectedProduct?.recStatus === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
            message={`Are you sure you want to ${selectedProduct?.recStatus === RecStatusValuebyName.Active ? "inactive" : "active"} this product?`}
          />
        )}
    </div>
  );
};

export default ProductPrimarySelectionClone;
