import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Image from "@/components/Image/Image";
import { Label } from "@/components/Label/Label";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";

import { paginationDetails } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";

import {
  IProduct,
  IProductVariation,
} from "@/types/form-builder/formReport.type";
import { IPaginationData } from "@/types/form-builder/formBuilder.type";

const ProductReportList = ({
  showProductArtwork,
  DATA,
}: {
  showProductArtwork: boolean;
  DATA: IProduct[];
}) => {
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const COLUMNS: ITableColumn<IProductVariation>[] = useMemo(
    () => [
      {
        id: "color",
        accessorKey: "color",
        header: "COLOR",
      },
      {
        id: "size",
        accessorKey: "size",
        header: "SIZE",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "QTY.",
      },
      {
        id: "paid",
        accessorKey: "paid",
        header: "PAID ($)",
      },
      {
        id: "base",
        accessorKey: "base",
        header: "BASE ($)",
      },
    ],
    []
  );

  // Calculate total amount
  const { quantity, paid } = useMemo(() => {
    return DATA.reduce(
      (acc: any, order: any) => {
        acc.paid += order.totalPaid || 0; // Accumulate total amount
        acc.quantity += order.totalQuantity || 0; // Accumulate total quantity
        return acc;
      },
      { paid: 0, quantity: 0 } // Initial values
    );
  }, [DATA]);

  const footerData = {
    size: "Product Total",
    quantity,
    paid: `$${paid.toFixed(2)}`,
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {DATA && DATA.length > 0 ? (
        DATA.map((product: IProduct) => (
          <div key={product.id}>
            <div className="bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark p-4 lg:p-6">
              <Label>
                {product.name} ({product.style})
              </Label>
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Display all images */}
              {showProductArtwork &&
                product.image &&
                product.image.length > 0 && (
                  <div className="flex flex-wrap gap-4 lg:gap-6">
                    {Array.isArray(product.image) &&
                    product.image.length > 0 ? (
                      product.image.map((image, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            className="w-24 h-24 object-cover"
                          />
                          <div>
                            <Label>{image.name}</Label>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Image
                        src={product.image[0].url}
                        alt={product.name}
                        className="w-24 h-24 object-cover"
                      />
                    )}
                  </div>
                )}

              <ReactTable
                DATA={product.variations}
                COLUMNS={COLUMNS}
                sortingOptions={sortingOptions}
                setSortingOptionHandler={setSortingOptionHandler}
                pageIndex={paginationData.pageIndex}
                pageSize={paginationData.pageSize}
                setTablePageSize={(value) => {
                  setPaginationDataFunc("pageSize", value);
                }}
                showEditColumns={false}
                showFilter={false}
                showMoreFilters={false}
                displaySearch={false}
                calculateFooter={true}
                footerData={footerData}
                totalCount={paginationData.totalCount}
                hasPreviousPage={paginationData.hasPreviousPage}
                hasNextPage={paginationData.hasNextPage}
                usedInsideModal={true}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No data found as of now.</div>
      )}
    </div>
  );
};

export default ProductReportList;
