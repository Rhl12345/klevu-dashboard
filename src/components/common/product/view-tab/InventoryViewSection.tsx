import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { getProductInventoryData } from "@/services/product/productInventory.service";
import { IProductInventoryData } from "@/types/product/product.type";
import { getFormatDate } from "@/utils/date.util";
import { Row } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const InventoryViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const [data, setData] = useState<IProductInventoryData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const data = await getProductInventoryData(productId, "all");
      setData(data);
    } catch (error) {
      toast.error("Error fetching inventory data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const columns: ITableColumn<IProductInventoryData>[] = useMemo(() => {
    return [
      {
        id: "imageUrl",
        accessorKey: "imageUrl",
        header: "Image",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="w-full max-w-24">
            <Image
              alt={row.original.variant}
              src={row.original.imageUrl}
              objectFit="contain"
              variant="next"
              height={100}
              width={100}
            />
          </div>
        ),
      },
      {
        id: "variant",
        accessorKey: "variant",
        header: "Variant",
        enableSorting: false,
      },
      {
        id: "sku",
        accessorKey: "sku",
        header: "SKU",
        enableSorting: false,
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Quantity",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) =>
          row.getParentRow()?.original?.id ? row?.original?.quantity : "",
      },
      {
        id: "futureInventoryDate",
        accessorKey: "futureInventory",
        header: "Future Inventory Date",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="flex flex-col gap-1">
            {row?.original?.futureInventory?.map((item, index) => (
              <div key={`date_${index}_${row.original.id}`}>
                {getFormatDate(item.date).date}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "futureInventoryQuantity",
        accessorKey: "futureInventory",
        header: "Future Inventory Quantity",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="flex flex-col gap-1">
            {row?.original?.futureInventory?.map((item, index) => (
              <div key={`quantity_${index}_${row.original.id}`}>
                {item.quantity}
              </div>
            ))}
          </div>
        ),
      },
    ];
  }, []);
  return (
    <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      <div className="flex flex-col gap-4 dark:border-gray-dark">
        <div className="flex justify-between items-center">
          <Text size="lg" className="font-semibold">
            Inventory Information
          </Text>

          <Button
            variant="default"
            size="md"
            onClick={() => handleTabChange(6)}
            className="underline"
          >
            Edit
          </Button>
        </div>

        <ReactTable
          COLUMNS={columns}
          DATA={data}
          isListPage={false}
          showFilter={false}
          showPagination={false}
          displaySearch={false}
          getRowCanExpand={(row) => row.original?.subRows?.length > 0}
          loading={loading}
          usedInsideModal
        />
      </div>
    </div>
  );
};

export default InventoryViewSection;
