import React, { useMemo } from "react";
import { ITableColumn } from "@/components/Table/types";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import listingClone from "@/mock-data/listingClone.json";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Image from "@/components/Image/Image";
import { Label } from "@/components/Label/Label";
import { Row } from "@tanstack/react-table";
import { IAttributeRecord, IAttributeCloneModalProps } from "@/types/core-product-feed/coreProductFeed.type";

const AttributeCloneModal = (props: IAttributeCloneModalProps) => {
  const {
    isOpen,
    onClose,
    handleAttributeClone,
  } = props;
  
  const ATTRIBUTE_COLUMNS = useMemo(
    () => [
      {
        id: "image",
        header: "Color Image",
        cell: ({ row }: { row: Row<IAttributeRecord> }) => (
          <Image
            variant="next"
            src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL_ADMIN}${row.original.imagePath}`}
            alt={row.original.colorName}
            width={50}
            height={50}
            className="rounded-full object-cover w-15 h-15"
          />
        ),
      },
      {
        id: "colorName",
        header: "Color Name",
        accessorKey: "colorName",
      },
      {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
      },
      {
        id: "options",
        header: "Select Option",
        cell: ({ row }: { row: Row<IAttributeRecord> }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.subRows.map((option) => (
              <Label key={option.id}>
                <Checkbox id={option.id.toString()} label={option.name} />
              </Label>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  const renderTable = () => (
    <ReactTable
      usedInsideModal={true}
      isListPage={false}
      COLUMNS={ATTRIBUTE_COLUMNS as ITableColumn<any>[]}
      checkboxSelection
      DATA={listingClone.data}
      showEditColumns={false}
      showFilter={false}
      showMoreFilters={false}
      displaySearch={false}
      hasPageSize={false}
      totalCount={1}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="7xl"
      header={`Attribute Clone`}
      content={renderTable()}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} size="sm" variant="outline-secondary" aria-label="Cancel">
            Cancel
          </Button>
          <Button onClick={handleAttributeClone} size="sm" variant="primary" aria-label="Save">
            Save
          </Button>
        </div>
      }
    />
  );
};

export default AttributeCloneModal;
