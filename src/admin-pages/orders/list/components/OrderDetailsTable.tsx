import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import { useState, useMemo, useEffect } from "react";
import { ORDER_DETAILS_COLUMNS } from "./orderDetails.config";
import { IGetOrdersItem } from "@/services/order/getOrders.service";
import { getOrderDetails } from "@/services/order/getOrderDetails.service";
import Image from "@/components/Image/Image";

const OrderDetailsTable = ({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) => {
  const [orderDetails, setOrderDetails] = useState<IGetOrdersItem["items"]>([]);

  const getOrderDetailsData = async () => {
    const response = await getOrderDetails(orderId);
    setOrderDetails(response.items);
  };

  const memoizedOrderDetailsColumns = useMemo(
    () =>
      ORDER_DETAILS_COLUMNS.map((column) => {
        if (column.accessorKey === "productName") {
          column.cell = (props: any) => {
            const product = props.row.original as IGetOrdersItem["items"][0];

            const productImage = (
              <Image
                src={product?.productImage}
                width={500}
                height={300}
                alt="Password strength measurement guide"
              />
            );

            return (
              <div className="flex items-center gap-2">
                <div>{productImage} </div>
                <div className="flex flex-col gap-2">
                  <span>{product?.productName || "-"}</span>{" "}
                  <span>Color: {product?.productColor || "-"}</span>
                  <span>SKU: {product?.productSku || "-"}</span>
                  <span>Qty: {product?.productQuantity || "-"}</span>
                </div>
              </div>
            );
          };
        }

        return column;
      }),
    []
  );

  useEffect(() => {
    getOrderDetailsData();
  }, [orderId]);

  if (!orderDetails) {
    return null;
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      header={<div>Order Details #{orderId}</div>}
      size="7xl"
      content={
        <ReactTable
          COLUMNS={memoizedOrderDetailsColumns}
          DATA={orderDetails}
          fetchData={getOrderDetailsData}
          hasNextPage={false}
          hasPreviousPage={false}
          totalCount={orderDetails.length}
          hasPageSize={false}
          displaySearch={false}
          showMoreFilters={false}
          showEditColumns={false}
          showFilter={false}
          showPagination={false}
          usedInsideModal={true}
        />
      }
    />
  );
};

export default OrderDetailsTable;
