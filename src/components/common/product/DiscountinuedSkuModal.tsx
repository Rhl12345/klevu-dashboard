import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { IDiscontinuedSku } from "@/types/product/product.type";
import { getErrorMessage } from "@/utils/common.util";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DiscountinuedSkuModal = ({
  productId,
  isOpen,
  onClose,
}: {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [data, setData] = useState<IDiscontinuedSku[]>([
    {
      store: "Corporate Gear",
      sku1: "",
      sku2: "",
      sku3: "",
      productId: "123",
      storeLogo:
        "https://redefinecommerce.blob.core.windows.net/storagemedia/1/store/logo_5.svg",
    },
  ]);

  const handleInputChange = useCallback(
    (rowId: number, field: keyof IDiscontinuedSku, value: string) => {
      setData((prevData) => {
        return prevData.map((item, index) => {
          if (index === rowId) {
            return { ...item, [field]: value };
          }
          return item;
        });
      });
    },
    []
  );

  const renderInputCell = useCallback(
    ({ row, field }: { row: any; field: keyof IDiscontinuedSku }) => {
      const value = row.original[field] || "";

      return (
        <Input
          key={`${field}-${row.index}`}
          name={`${field}-${row.index}`}
          value={value}
          placeholder="SKU"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(row.index, field, e.target.value);
          }}
          formik={false}
        />
      );
    },
    [handleInputChange]
  );

  const columns: ITableColumn<IDiscontinuedSku>[] = useMemo(
    () => [
      {
        id: "store",
        accessorKey: "store",
        header: "Store",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Image
              src={row.original.storeLogo}
              alt={row.original.store}
              width={32}
              height={32}
              className="w-10 h-10"
              variant="next"
              rounded="full"
              objectFit="contain"
            />
            {row.original.store}
          </div>
        ),
      },
      {
        id: "sku1",
        accessorKey: "sku1",
        header: "SKU",
        enableSorting: false,
        cell: (props) => renderInputCell({ ...props, field: "sku1" }),
      },
      {
        id: "sku2",
        accessorKey: "sku2",
        header: "SKU",
        enableSorting: false,
        cell: (props) => renderInputCell({ ...props, field: "sku2" }),
      },
      {
        id: "sku3",
        accessorKey: "sku3",
        header: "SKU",
        enableSorting: false,
        cell: (props) => renderInputCell({ ...props, field: "sku3" }),
      },
    ],
    [renderInputCell]
  );

  const handleSave = () => {
    try {
      toast.success("Related products Sku updated successfully");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to update related products Sku")
      );
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Discontinue Product"
      size="xl"
      content={
        <div className="flex flex-col gap-4">
          <Text>
            This product is already cloned in below store. Please share related
            Product SKU
          </Text>
          <ReactTable
            usedInsideModal
            COLUMNS={columns}
            DATA={data}
            isListPage={false}
            showFilter={false}
            showPagination={false}
            displaySearch={false}
          />
        </div>
      }
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="outline-secondary"
            type="button"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            form="couponForm"
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      }
    />
  );
};

export default DiscountinuedSkuModal;
