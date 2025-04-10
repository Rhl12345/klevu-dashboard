import React from "react";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import Text from "@/components/Text/Text";
import Image from "@/components/Image/Image";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { EXISTING_PRODUCT_DATA } from "@/mock-data/customerQuoteList";
import { IAddExistingProductProps } from "@/types/customer-quote/customerQuote.type";

const AddExistingProduct = ({ isOpen, onClose }: IAddExistingProductProps) => {
  const COLUMNS = [
    {
      id: "quantity",
      Header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }: { row: { original: any } }) => (
        <div>
          <Input
            name={`listData[${row.original.id}].quantity`}
            type="text"
            value="1"
          />
        </div>
      ),
    },
    {
      id: "variant",
      Header: "Variant",
      accessorKey: "variant",
      cell: ({ row }: { row: { original: any } }) => (
        <Dropdown
          name={`listData[${row.original.id}].variant`}
          options={[
            { value: "", label: "Select..." },
            // Add your variant options here
          ]}
          defaultValue=""
        />
      ),
    },
    {
      id: "image",
      Header: "Image",
      accessorKey: "image",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="h-20 w-20 flex items-center justify-center overflow-hidden box-content border bg-white">
          <Image src={row.original.image} alt="Store" />
        </div>
      ),
    },
    {
      id: "productName",
      Header: "Product Name",
      accessorKey: "productName",
    },
    {
      id: "sku",
      Header: "SKU",
      accessorKey: "sku",
    },
    {
      id: "price",
      Header: "Price",
      accessorKey: "price",
      cell: ({ row }: { row: { original: any } }) => (
        <div>${`${row.original.price.toFixed(2)}`}</div>
      ),
    },
  ];

  const modalContent = (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-full xl:col-span-12 rounded-md">
        <div className="w-full">
          <div className="p-5">
            <div>
              <ReactTable
                COLUMNS={COLUMNS}
                DATA={EXISTING_PRODUCT_DATA}
                totalCount={84}
                pageSize={25}
                pageIndex={1}
                totalPages={1}
                hasNextPage={false}
                hasPreviousPage={false}
                fetchData={() => {}}
                setTablePageSize={() => {}}
                checkboxSelection={true}
                showEditColumns={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={<Text size="xl">Add Existing Product</Text>}
      content={modalContent}
      size="7xl"
    />
  );
};

export default AddExistingProduct;
