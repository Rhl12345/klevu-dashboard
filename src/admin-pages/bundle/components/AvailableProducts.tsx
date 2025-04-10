import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import InputNumber from "@/components/Input/InputNumber";
import DeleteModal from "@/components/Modal/DeleteModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import {
  IBundleProductTableCellProps,
  IBundleSubRow,
} from "@/types/bundle/bundle.type";
import { useState } from "react";
import { toast } from "react-toastify";

interface IAvailableProductsProps {
  bundleProducts: IBundleSubRow[];
  setBundleProducts: (products: IBundleSubRow[]) => void;
  isEditPage?: boolean;
}

const AvailableProducts = ({
  bundleProducts,
  setBundleProducts,
  isEditPage = true,
}: IAvailableProductsProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [product, setProduct] = useState<IBundleSubRow | null>(null);

  const submitHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    console.log(e.target.value);
    setBundleProducts(
      bundleProducts.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Number(e.target.value) };
        }
        return item;
      })
    );

    toast.success("Quantity updated successfully");
  };

  const handleDelete = (id: number) => {
    setBundleProducts(bundleProducts.filter((item) => item.id !== id));
    toast.success("Product deleted successfully");
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setProduct(null);
  };

  const COLUMNS: ITableColumn<IBundleSubRow>[] = [
    {
      id: "image",
      header: "product Image",
      accessorKey: "productImage",
      cell: (props: IBundleProductTableCellProps) => {
        return props.row.original.productImage ? (
          <>
            <div
              className={`flex -space-x-9 items-center`}
              style={{ width: "120px" }}
            >
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content">
                <Image
                  src={`https://storagemedia.corporategear.com/${props.row.original.productImage}`}
                  className="max-h-full"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content">
            <Image src={"/noImage.png"} className="max-h-full" />
          </div>
        );
      },
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: (props: IBundleProductTableCellProps) => {
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
      id: "quantity",
      header: "Qty",
      accessorKey: "quantity",
      cell: (props: IBundleProductTableCellProps) => {
        return props.row.original.quantity ? (
          <>
            <div style={{ width: "120px" }}>
              <InputNumber
                id={props.row.original.id}
                className="rounded-lg"
                name={props.row.original.name}
                value={props.row.original.quantity}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                  submitHandler(e, props.row.original.id)
                }
                disabled={!isEditPage}
              />
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "attribute",
      header: "Attribute",
      accessorKey: "color",
      cell: (props: IBundleProductTableCellProps) => {
        if (!props.row.original.color) {
          return "";
        } else {
          return props.row.original.color;
        }
      },
    },
    {
      id: "sku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      cell: (props: IBundleProductTableCellProps) => {
        if (!props.row.original.ourSKU) {
          return "";
        } else {
          return props.row.original.ourSKU;
        }
      },
    },
    {
      id: "salePrice",
      header: "Sale Price",
      accessorKey: "salePrice",
      cell: (props: IBundleProductTableCellProps) => {
        if (!props.row.original.salePrice) {
          return null;
        } else {
          return props.row.original.salePrice;
        }
      },
    },
    {
      id: "msrp",
      header: "MSRP",
      accessorKey: "msrp",
      cell: (props: IBundleProductTableCellProps) => {
        if (!props.row.original.msrp) {
          return null;
        } else {
          return props.row.original.msrp;
        }
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "recStatus",
      cell: (props: IBundleProductTableCellProps) => {
        return <Status type={props.row.original.recStatus} />;
      },
    },
    ...(!isEditPage
      ? []
      : [
          {
            id: "action",
            header: "Action",
            accessorKey: "id",
            cell: (props: IBundleProductTableCellProps) => {
              return (
                <>
                  <SvgIcon
                    name="CrossIcon"
                    className="cursor-pointer"
                    width={30}
                    height={30}
                    onClick={() => {
                      setProduct(props.row.original);
                      setOpenDeleteModal(true);
                    }}
                  />
                </>
              );
            },
          },
        ]),
  ];

  return (
    <>
      <ReactTable
        DATA={bundleProducts}
        COLUMNS={COLUMNS}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        usedInsideModal={true}
      />
      {openDeleteModal && product && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={() => handleDelete(product?.id)}
        />
      )}
    </>
  );
};

export default AvailableProducts;
