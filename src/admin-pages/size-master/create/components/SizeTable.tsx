import React, { useMemo } from "react";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { ISizeTableProps } from "@/types/sizemaster/sizemaster.type";
import { ITableColumn } from "@/components/Table/types";

const SizeTable: React.FC<ISizeTableProps> = ({ sizes, onEdit, onRemove }) => {
  const COLUMNS = useMemo<ITableColumn[]>(
    () => [
      {
        id: "sizeName",
        header: "Size Name",
        accessorKey: "sizeName",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "displayOrder",
        header: "Display Order",
        accessorKey: "displayOrder",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (info: any) => (
          <Status type={info.getValue() === "A" ? "active" : "inactive"} />
        ),
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "action",
        cell: ({ row }: any) => (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => onEdit(row.original)}
            >
              <SvgIcon name="Edit" className="size-6" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => onRemove(row.index)}
            >
              <SvgIcon name="Trash" className="size-6" />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onRemove]
  );

  return (
    <ReactTable
      isListPage={false}
      COLUMNS={COLUMNS}
      DATA={sizes}
      totalCount={sizes.length}
      pageSize={sizes.length}
      showEditColumns={false}
      showFilter={false}
      displaySearch={false}
      hasPageSize={false}
    />
  );
};

export default SizeTable; 