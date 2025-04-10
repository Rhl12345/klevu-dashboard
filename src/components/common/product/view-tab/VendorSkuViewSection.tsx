import Button from "@/components/Button/Button";
import Loader from "@/components/common/Loader";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { getVendorSkuMappingData } from "@/services/product/productVendor.service";
import { IVendorSku } from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const VendorSkuViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mappingData, setMappingData] = useState<IVendorSku[]>([]);

  const fetchVendorSkuMappingData = async (vendorId = "all") => {
    try {
      setIsLoading(true);
      const response = await getVendorSkuMappingData(productId, vendorId);
      setMappingData(response);
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error fetching vendor sku mapping data")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorSkuMappingData();
  }, [productId]);

  const columns: ITableColumn<IVendorSku>[] = useMemo(
    () => [
      {
        id: "vendorName",
        accessorKey: "vendorName",
        header: "VENDOR / PRODUCT NAME",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? row.original.vendorName : "",
      },
      {
        id: "vendorSku",
        accessorKey: "vendorSku",
        header: "VENDOR SKU",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? row.original.vendorSku : "",
      },
      {
        id: "referenceName",
        accessorKey: "referenceName",
        header: "REFERENCE NAME",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? row.original.referenceName : "",
      },
      {
        id: "ourSubSku",
        accessorKey: "ourSubSku",
        header: "OUR SUB SKU",
        enableSorting: false,
      },
      {
        id: "mpn",
        accessorKey: "mpn",
        header: "MPN",
        enableSorting: false,
      },
      {
        id: "isDefault",
        accessorKey: "isDefault",
        header: "DEFAULT VENDOR",
        enableSorting: false,
        cell: ({ row }: { row: any }) =>
          row.getCanExpand() ? (
            <ToggleButton
              id={`isDefault-${row.original.id}`}
              defaultValue={row.original.isDefaultVendor}
              disabled
            />
          ) : (
            ""
          ),
      },
    ],
    []
  );

  return (
    <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Vendor SKU
            </Text>

            <Button
              variant="default"
              size="md"
              onClick={() => handleTabChange(5)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          <ReactTable
            COLUMNS={columns}
            DATA={mappingData}
            usedInsideModal={true}
            showFilter={false}
            showPagination={false}
            displaySearch={false}
            getRowCanExpand={(row) => row.original.subRows?.length > 0}
          />
        </div>
      )}
    </div>
  );
};

export default VendorSkuViewSection;
