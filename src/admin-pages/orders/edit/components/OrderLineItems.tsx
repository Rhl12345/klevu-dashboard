import React, { useCallback, useState } from "react";

import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import OrderUploadLogo from "./OrderUploadLogo";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

import OrderDetailMock from "@/mock-data/OrdersEditData.json";
import { CURRENCY_SYMBOLS_BY_CODE } from "@/utils/constants";

import { IOrderDetail, IOrderLineItem } from "@/types/orders/orders.type";
import { ITableColumn } from "@/components/Table/types";
import OrderHistory from "./OrderHistory";

const OrderLineItems = ({ orderDetail }: { orderDetail: IOrderDetail }) => {
  const [Data, setData] = useState(OrderDetailMock.orderLineItems);

  // Add loading states for better UX
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUploadLogo, setShowUploadLogo] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "edit" | null;
  }>({ isOpen: false, type: null });

  const OrderLineItemsColumns: ITableColumn<IOrderLineItem>[] = [
    {
      id: "colorImage",
      header: "Line Item",
      accessorKey: "colorImage",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <>
            <div className="h-24 w-24 flex items-center justify-center overflow-hidden box-content border bg-white">
              <div className="h-24 w-24 p-2 border border-neutral-200 flex justify-center items-center">
                <Image
                  className="max-h-24"
                  src={
                    row.original.colorImage
                      ? `https://storagemedia.corporategear.com/${row.original.colorImage}`
                      : "/path/to/default/image.jpg"
                  }
                  alt={row.original.productName || "No Image"}
                />
              </div>
            </div>
          </>
        );
      },
    },
    {
      id: "lineItems",
      header: "",
      accessorKey: "lineItems",
      enableSorting: false,
      cell: ({ row }) => {
        const item = row.original;

        const LineAttributeData =
          item?.displayLineAttributeOptions?.flatMap(
            (myParentObj) =>
              myParentObj.linePersonalizeDetails?.map((myChildObj) => ({
                ...myChildObj,
                attributeOptionName: myParentObj.attributeOptionName,
              })) || []
          ) || [];

        return (
          <>
            <div className="w-full">
              <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark">
                {item.productName}
              </div>
              <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark">
                Color: {item.color}
              </div>
              <div className="text-sm font-normal text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark">
                SKU: {item.sku}
              </div>
              {item?.itemNotes && (
                <div className="text-[#707070] text-sm font-normal text-justify">
                  Item Notes: {item?.itemNotes}
                </div>
              )}

              {/* Decoration table */}
              <div className="pb-4 pt-4">
                {item?.shoppingCartLogoPersonViewModels &&
                item.shoppingCartLogoPersonViewModels.length > 0 ? (
                  <DecorationTable
                    item={item}
                    OrderDetailMock={OrderDetailMock}
                    setShowUploadLogo={setShowUploadLogo}
                  />
                ) : (
                  ""
                )}
              </div>

              {/* Size table */}
              <div className="divide-y divide-gray-light dark:divide-gray-dark w-80">
                {row?.original?.shoppingCartLineSizeListViewModel &&
                  row?.original?.shoppingCartLineSizeListViewModel.map(
                    (value, index) => {
                      return (
                        <div
                          className="flex flex-wrap gap-4 justify-between py-1"
                          key={row?.original?.attributeOptionId + index}
                        >
                          <div className="">Size: {value?.sizeName || "-"}</div>
                          <div className="">Qty: {value?.qty || 0}</div>
                          <div className="">
                            {CURRENCY_SYMBOLS_BY_CODE.USD}
                            {value?.price / value?.qty > 0
                              ? (value?.price / value?.qty).toFixed(2)
                              : "0.00"}
                            /Qty
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>

            {/* Line Personalization Table */}
            {LineAttributeData && LineAttributeData.length > 0 && (
              <LinePersonalizationTable lineAttributeData={LineAttributeData} />
            )}
          </>
        );
      },
    },
    {
      id: "qty",
      header: "Qty",
      accessorKey: "qty",
      enableSorting: false,
      cell: ({ row }) => {
        return <div className="">{row.original.qty}</div>;
      },
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="">
            {CURRENCY_SYMBOLS_BY_CODE.USD}
            {row.original.price.toFixed(2) || "0.00"}
          </div>
        );
      },
    },
    {
      id: "subTotal",
      header: "Sub Total",
      accessorKey: "subTotal",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="">
            {CURRENCY_SYMBOLS_BY_CODE.USD}
            {row.original.subTotal.toFixed(2) || "0.00"}
          </div>
        );
      },
    },
    {
      id: "Shipped",
      header: "Shipped Qty",
      accessorKey: "Shipped",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="">
            {row.original.shippedQty}/{row.original.qty}
            <SvgIcon name="truck-01" />
          </div>
        );
      },
    },
    {
      id: "action",
      header: "",
      accessorKey: "action",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <TableActionPanel
            extraAction={
              <>
                <Button
                  variant="default"
                  size="sm"
                  className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                  onClick={() => handleModalOpen("edit")}
                >
                  Edit
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                  onClick={() => handleModalOpen("delete")}
                >
                  Delete
                </Button>
              </>
            }
          />
        );
      },
    },
  ];

  const handleModalOpen = useCallback((type: "delete" | "edit") => {
    setIsModalOpen({ isOpen: true, type });
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen({ isOpen: false, type: null });
  }, []);

  return (
    <>
      <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
        <div className="w-full flex flex-col gap-4 lg:gap-6 justify-between border bg-body-light dark:bg-body-dark border-gray-light dark:border-gray-dark p-4 rounded-none">
          <div className="w-full flex flex-col gap-4">
            <div className="lg:flex items-center justify-between">
              <div className="text-base text-quaternary-dark dark:text-quaternary-light text-left">
                Line Items
              </div>
              <div className="xl:flex items-center justify-end gap-2">
                <div className="flex flex-col">
                  <div className="w-64">
                    <Dropdown
                      label="Order Proofing Status"
                      options={OrderDetailMock.proofingStatus}
                      onChange={(value) => {}}
                      defaultValue={orderDetail.orderProofingStatus}
                      placeholder="Select Proofing Status"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                Save All
              </Button>
              <Button variant="primary" size="sm" disabled={true}>
                Submit to Graph X Source
              </Button>
              <Button variant="primary" size="sm">
                Download Payload
              </Button>
              <Button variant="primary" size="sm" disabled={true}>
                Import Order in BC
              </Button>
            </div>
          </div>
          <ReactTable
            DATA={Data}
            COLUMNS={OrderLineItemsColumns}
            fetchData={() => {}}
            loading={isLoading}
            showPagination={false}
            showFilter={false}
            displaySearch={false}
            usedInsideModal={true}
          />
        </div>
      </div>
      {showUploadLogo && (
        <OrderUploadLogo
          item={{
            id: 0,
            mainId: 0,
            logoLocation: "",
            logoNumber: "",
            logoImagePath: "",
            itemDecorationID: "",
            logo: "",
            logoName: "",
            logoPositionImage: "",
            rowVersion: "",
          }}
          showUploadLogo={showUploadLogo}
          setShowUploadLogo={setShowUploadLogo}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "edit" && (
        <OrderHistory handleModalClose={handleModalClose} />
      )}

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete Order Item"
          onDelete={handleModalClose}
        />
      )}
    </>
  );
};

export default OrderLineItems;

const DecorationTable = ({
  item,
  OrderDetailMock,
  setShowUploadLogo,
}: {
  item: IOrderLineItem;
  OrderDetailMock: any;
  setShowUploadLogo: (value: boolean) => void;
}) => {
  return (
    <table className="table-auto w-full text-sm overflow-x-auto border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <thead className="text-sm uppercase">
        <tr role="row">
          {[
            "Decoration Location",
            "Logo No",
            "Logo",
            "Decoration Type",
            "Action",
          ].map((header) => (
            <th
              key={header}
              className="py-4 px-2 cursor-pointer text-center border-b border-r border-gray-light dark:border-gray-dark"
            >
              <Text size="sm" align="center" weight="font-semibold">
                {header}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm text-quaternary-dark dark:text-quaternary-light bg-body-light dark:bg-body-dark">
        {item?.shoppingCartLogoPersonViewModels?.map((logo) => (
          <tr key={logo.id}>
            <td className="py-3 px-2 border-b border-r border-gray-light dark:border-gray-dark">
              <Dropdown
                options={OrderDetailMock.decorationLocationOptions}
                onChange={(value) => {}}
                defaultValue={logo?.logoLocation}
                isFormikField={false}
              />
            </td>
            <td className="py-3 px-2 border-b border-r border-gray-light dark:border-gray-dark">
              <Dropdown
                options={OrderDetailMock.logoNoOptions}
                onChange={(value) => {}}
                defaultValue={logo?.logoNumber}
                isFormikField={false}
              />
            </td>
            <td className="py-3 px-2 w-40 border-b border-r border-gray-light dark:border-gray-dark">
              <div className="'h-24 w-40 p-2 border border-gray-light dark:border-gray-dark flex justify-center items-center">
                <div className="flex justify-center items-center h-16">
                  <Image
                    src={logo?.logoImagePath}
                    alt={logo?.logoImagePath}
                    className="max-h-16"
                  />
                </div>
              </div>
            </td>
            <td className="py-3 px-2 border-b border-r border-gray-light dark:border-gray-dark">
              <Dropdown
                options={OrderDetailMock.decorationTypeOptions}
                onChange={(value) => {}}
                defaultValue={logo?.itemDecorationID}
                isFormikField={false}
              />
            </td>

            <td className="py-3 px-2 text-center border-b border-r border-gray-light dark:border-gray-dark">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowUploadLogo(true)}
              >
                Upload Logo
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const LinePersonalizationTable = ({
  lineAttributeData,
}: {
  lineAttributeData: any;
}) => {
  return (
    <>
      <div className="mt-2">
        <Label>Line Personalization</Label>
        <div className="mt-2 max-h-[300px] overflow-y-auto">
          <div className="divide-y divide-gray-light dark:divide-gray-dark">
            <table className="w-full border border-gray-light dark:border-gray-dark">
              <thead className="sticky top-0 bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
                <tr className="text-center border border-gray-light dark:border-gray-dark h-10">
                  <th>
                    <Text
                      size="sm"
                      className="min-w-[20px]"
                      align="center"
                      weight="font-semibold"
                    >
                      Sr no.
                    </Text>
                  </th>
                  <th>
                    <Text
                      size="sm"
                      className="min-w-[50px]"
                      align="center"
                      weight="font-semibold"
                    >
                      Size
                    </Text>
                  </th>
                  <th>
                    <Text size="sm" align="center" weight="font-semibold">
                      Personalized Text
                    </Text>
                  </th>
                  <th>
                    <Text size="sm" align="center" weight="font-semibold">
                      Personalized Location
                    </Text>
                  </th>
                  <th>
                    <Text size="sm" align="center" weight="font-semibold">
                      Color
                    </Text>
                  </th>
                  <th>
                    <Text size="sm" align="center" weight="font-semibold">
                      Font
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineAttributeData && Array.isArray(lineAttributeData)
                  ? lineAttributeData.map((item: any, index: number) => (
                      <tr
                        key={item.attributeOptionName}
                        className="text-center border-b border-gray-light dark:border-gray-dark"
                      >
                        <td className="text-center">{index + 1 + "."}</td>
                        <td className="text-center">
                          {item.attributeOptionName}
                        </td>
                        <td className="flex flex-col gap-0.5 items-center">
                          <Label size="small">
                            <Text size="sm" weight="font-semibold">
                              Line 1 :
                            </Text>
                            <Text size="sm" weight="font-normal">
                              {item?.line1Text || ""}
                            </Text>
                          </Label>
                          <Label size="small">
                            <Text size="sm" weight="font-semibold">
                              Line 2 :
                            </Text>
                            <Text size="sm" weight="font-normal">
                              {item?.line2Text || ""}
                            </Text>
                          </Label>
                        </td>
                        <td>
                          <Text size="sm" weight="font-normal" align="center">
                            {item?.location || ""}
                          </Text>
                        </td>
                        <td>
                          <Text size="sm" weight="font-normal" align="center">
                            {item?.color || ""}
                          </Text>
                        </td>
                        <td>
                          <Text size="sm" weight="font-normal" align="center">
                            {item?.font || ""}
                          </Text>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
