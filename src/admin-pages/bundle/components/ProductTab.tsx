import AvailableProducts from "@/admin-pages/bundle/components/AvailableProducts";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import BundleList from "@/mock-data/BundleList.json";
import {
  IBundleProductTabItem,
  IBundleProductTabTableCellProps,
  IBundleSubRow,
} from "@/types/bundle/bundle.type";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
const ProductTab = () => {
  const [bundleProducts, setBundleProducts] = useState<IBundleSubRow[]>(
    BundleList.bundleList.items[1].subRows
  );
  const [brandProducts, setBrandProducts] = useState<IBundleProductTabItem[]>(
    BundleList.bundleProductTab.items
  );

  const [selectedRows, setSelectedRows] = useState<IBundleSubRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "brandName",
        name: "Select Brand",
        type: "checkbox",
        options: BundleList.availableBrands,
      },
    ],
    []
  );

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBrandProducts(BundleList.bundleProductTab.items);
      setIsLoading(false);
    }, 1000);
  }, [filteringOptions]);

  const ADD_PRODUCT_COLUMNS: ITableColumn<IBundleProductTabItem>[] = [
    {
      id: "image",
      header: "product Image",
      accessorKey: "productImage",
      cell: (props: IBundleProductTabTableCellProps) => {
        return props.row.original.productImage &&
          props.row.original.productImage?.length > 0 ? (
          <>
            <div
              className={`flex -space-x-9 items-center`}
              style={{ width: "160px" }}
            >
              {Array.isArray(props.row.original.productImage) ? (
                props.row.original.productImage.map((ProductMainImg, index) => {
                  return (
                    <div
                      key={index}
                      className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white"
                    >
                      <Image
                        src={`https://redefinecommerce.blob.core.windows.net${ProductMainImg}`}
                        className="max-h-full"
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
                    <Image
                      src={`https://redefinecommerce.blob.core.windows.net${props.row.original.productImage}`}
                      className="max-h-full"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
              <Image src={"/noImage.png"} className="max-h-full" />
            </div>
          </>
        );
      },
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
      cell: (props: IBundleProductTabTableCellProps) => {
        return props.row.original.name ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div>{props.row.original.name}</div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "sku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      cell: (props: IBundleProductTabTableCellProps) => {
        if (!props.row.original.ourSKU) {
          return "";
        } else {
          return props.row.original.ourSKU;
        }
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
      cell: (props: IBundleProductTabTableCellProps) => {
        if (!props.row.original.quantity) {
          return "";
        } else {
          return props.row.original.quantity;
        }
      },
    },
    {
      id: "ourCost",
      header: "Customer Price",
      accessorKey: "ourCost",
      cell: (props: IBundleProductTabTableCellProps) => {
        if (!props.row.original.ourCost) {
          return "";
        } else {
          return props.row.original.ourCost;
        }
      },
    },
  ];
  const handleAddSelectedProducts = () => {
    try {
      setSelectedRows([]);
      toast.success("Products added to bundle successfully");
    } catch (error) {
      toast.error("Error in adding products");
    }
  };

  return (
    <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4">
        <ReactTable
          DATA={brandProducts}
          COLUMNS={ADD_PRODUCT_COLUMNS}
          totalCount={brandProducts.length}
          showPagination={false}
          showEditColumns={false}
          usedInsideModal={true}
          getRowCanExpand={(row) => row.subRows && row.subRows.length > 0}
          checkboxSelection={true}
          moreFilterOption={moreFilterOption}
          setColumnFilteringOptions={setColumnFilteringOptions}
          loading={isLoading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          useCheckboxSelectionInSubRowOnly
        />
        {selectedRows.length ? (
          <div className="flex justify-start">
            <Button
              onClick={handleAddSelectedProducts}
              variant="primary"
              type="button"
            >
              Add Selected Products in Bundle
            </Button>
          </div>
        ) : null}
        <AvailableProducts
          bundleProducts={bundleProducts}
          setBundleProducts={setBundleProducts}
        />
      </div>
    </div>
  );
};

export default ProductTab;
