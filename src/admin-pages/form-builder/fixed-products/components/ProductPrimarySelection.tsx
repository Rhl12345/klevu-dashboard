import { ProductListImageCell } from "@/admin-pages/product-database/core-product-feed/components/ProductListImageCell";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { fetchPrimarySelectGroupList } from "@/services/form-builder/primary-selecton-group/primarySelectionGroup.service";
import {
  IProductPrimarySelectionProps,
  IPrimarySelectGroupListRequest,
  IPrimarySelectGroupProduct,
} from "@/types/primary-selection-group/primarySelectionGroup.type";
import { IFilterOption } from "@/types/product-tier/productTier.type";
import { paginationDetails } from "@/utils/constants";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductPrimarySelection = (props: IProductPrimarySelectionProps) => {
  const { addedProductData, setAddedProductData } = props;

  const [productData, setProductData] = useState<IPrimarySelectGroupProduct[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "storeName",
      direction: 0,
      priority: 0,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);

  const [selectedRows, setSelectedRows] = useState<
    IPrimarySelectGroupProduct[]
  >([]);

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
        const fallbackImage = "/images/placeholder.png";

        const handleImageError = (
          e: React.SyntheticEvent<HTMLImageElement>
        ) => {
          e.currentTarget.src = fallbackImage;
        };

        if (
          row.original?.productImage &&
          Array.isArray(row.original?.productImage)
        ) {
          return ProductListImageCell(
            row.original?.productImage,
            row.original.id
          );
        }

        return (
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${row.original?.productImage}`}
              width={56}
              height={56}
              objectFit="cover"
              alt={row.original?.name || "Product image"}
              onError={handleImageError}
            />
          </div>
        );
      },
    },
    {
      id: "name",
      header: "PRODUCT NAME",
      accessorKey: "name",
      cell: ({ row }) => <Text size="sm">{row.original.name}</Text>,
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
  ];

  const fetchPrimarySelectGroup = useCallback(
    async (pageIndex = 0): Promise<void> => {
      try {
        let responseData: any;
        setIsLoading(true);
        const request: IPrimarySelectGroupListRequest = {
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions,
        };

        responseData = await fetchPrimarySelectGroupList(request);
        setProductData(responseData.items);
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
    [paginationData.pageSize, sortingOptions, filteringOptions]
  );

  useEffect(() => {
    fetchPrimarySelectGroup();
  }, [fetchPrimarySelectGroup]);

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

  const handleAddSelectedProduct = async () => {
    try {
      if (selectedRows.length === 0) {
        toast.error("Please select at least one product");
        return;
      }

      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAddedProductData([...addedProductData, ...selectedRows]);
      toast.success("Products added successfully");

      setSelectedRows([]);
    } catch (error) {
      toast.error("Failed to add selected products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ListPageHeader moduleName={""}>
        <Button
          type="button"
          variant="primary"
          onClick={() => handleAddSelectedProduct()}
          disabled={selectedRows.length === 0}
        >
          Add Selected Product
          {selectedRows.length > 0 ? ` (${selectedRows.length})` : ""}
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={productData}
        COLUMNS={COLUMNS}
        fetchData={fetchPrimarySelectGroup}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        getRowCanExpand={getRowCanExpand}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        setSelectedRows={setSelectedRows}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection={true}
        showFilter={true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        loading={isLoading}
      />
    </div>
  );
};

export default ProductPrimarySelection;
