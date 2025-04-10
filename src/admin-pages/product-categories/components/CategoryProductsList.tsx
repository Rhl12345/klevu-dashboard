import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getProductsWithCategories } from "@/services/product-category/category.service";
import { IProductWithCategoryList } from "@/types/product-category/productCategory.type";
import { getErrorMessage } from "@/utils/common.util";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoryProductsList = ({ id }: { id: string }) => {
  const [productData, setProductData] = useState<IProductWithCategoryList>({
    pageIndex: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
    items: [],
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const COLUMNS: ITableColumn[] = [
    {
      id: "image",
      header: "Image",
      accessorKey: "productImage",
      cell: (props: { getValue: () => string[] }) => (
        <div className="flex items-center" style={{ width: "100px" }}>
          <div className="h-24 w-40 p-2 border border-neutral-200 flex justify-center items-center">
            <div className="flex justify-center items-center h-16">
              <Image
                src={
                  props?.getValue()?.[0]
                    ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${props?.getValue()[0]}`
                    : "/noImage.png"
                }
                alt="No Image"
                className="max-h-16"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (props: { getValue: () => string }) => (
        <div>{props.getValue()}</div>
      ),
    },
    {
      id: "sku",
      header: "SKU",
      accessorKey: "ourSKU",
      cell: (props: { getValue: () => string }) => (
        <div>{props.getValue()}</div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "recStatus",
      cell: (props: { getValue: () => string }) => (
        <div className="text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">
          {props.getValue() === "A" ? "Active" : "Inactive"}
        </div>
      ),
    },
  ];

  const fetchProductData = useCallback(
    async (pageIndex?: number) => {
      setIsLoading(true);
      try {
        const response = await getProductsWithCategories({
          pageIndex: pageIndex || productData.pageIndex,
          pageSize: productData.pageSize,
          sortingOptions: [],
          categoryId: id!,
        });
        setProductData({
          ...productData,
          items: response.items,
          totalCount: response.totalCount,
          pageIndex: response.pageIndex,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [globalFilter, productData.pageIndex, productData.pageSize]
  );

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);
  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <ContentHeader name="Products" />
      <ReactTable
        isListPage={false}
        COLUMNS={COLUMNS}
        DATA={productData.items}
        hasNextPage={productData.hasNextPage}
        hasPreviousPage={productData.hasPreviousPage}
        pageIndex={productData.pageIndex}
        pageSize={productData.pageSize}
        setTablePageSize={(size: number) =>
          setProductData({ ...productData, pageSize: size })
        }
        totalCount={productData.totalCount}
        fetchData={fetchProductData}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        displaySearch="left"
        setColumnFilteringOptions={() => {}}
        showFilter={false}
        loading={isLoading}
      />
    </div>
  );
};

export default memo(CategoryProductsList);
