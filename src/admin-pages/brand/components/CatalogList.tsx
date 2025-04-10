import React, { useMemo } from "react";
import { ICatalogData, ICatalogListProps } from "@/types/brand/brand.types";
import ReactTable from "@/components/Table/ReactTable";
import type { ITableColumn } from "@/components/Table/types";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import TableActionPanel from "@/components/common/TableActionPanel";
import Button from "@/components/Button/Button";

const CatalogList = ({
  catalogData,
  onEdit,
  onDelete,
  paginationData,
}: ICatalogListProps) => {
  const COLUMNS: ITableColumn<ICatalogData>[] = useMemo(
    () => [
      {
        id: "displayInFront",
        header: "Display in Front",
        accessorKey: "displayInFront",
        cell: ({ row }) => (
          <div className="relative text-center">
            <div className="text-black-500 cursor-default">
              {row.original.displayInFront ? (
                <SvgIcon
                  name="CheckmarkWithCircle"
                  className="w-6 h-6 text-green-500"
                />
              ) : (
                <SvgIcon name="CrossIcon" className="w-6 h-6 text-red-500" />
              )}
            </div>
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "vendorName",
        header: "Vendor Name",
        accessorKey: "vendorName",
        cell: ({ row }) => (
          <div className="truncate">{row.original?.vendorName || ""}</div>
        ),
        enableSorting: false,
      },
      {
        id: "catalogName",
        header: "Catalog Name",
        accessorKey: "catalogName",
        cell: ({ row }) => (
          <div className="truncate max-w-xs">
            {row.original?.catalogName || ""}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "startDate",
        header: "Start Date",
        accessorKey: "startDate",
        cell: ({ row }) => (
          <div>
            {row.original?.startDate
              ? getFormatDate(row.original.startDate).date
              : "-"}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "releasedDate",
        header: "Release Date",
        accessorKey: "releasedDate",
        cell: ({ row }) => (
          <div>
            {row.original?.releasedDate
              ? getFormatDate(row.original.releasedDate).date
              : "-"}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "uploadCatalog",
        header: "Upload Catalog",
        accessorKey: "uploadCatalogURL",
        cell: ({ row }) => {
          const catalogFileUrl = row.original?.uploadCatalogURL?.split("/");
          const fileName = catalogFileUrl?.[catalogFileUrl.length - 1];

          return fileName ? (
            <div className="truncate max-w-xs">
              <Link
                href={row.original.uploadCatalogURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-600 hover:underline"
              >
                {fileName}
              </Link>
            </div>
          ) : (
            <div className="text-quaternary-dark dark:text-quaternary-light">
              No file uploaded
            </div>
          );
        },
        enableSorting: false,
      },
      {
        id: "action",
        header: "Actions",
        accessorKey: "action",
        cell: (props: any) => {
          const catalogConfig = props.row.original;
          return (
            <div className="flex">
              <TableActionPanel
                edit={{
                  show: true,
                  onClick: () => onEdit(catalogConfig.id),
                }}
                collapsible={false}
              />
              {catalogConfig.recStatus !== "R" && (
                <Button
                  className=""
                  type="button"
                  variant="default"
                  size="sm"
                  title="Delete Catalog"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onDelete(catalogConfig.original);
                  }}
                  icon={<SvgIcon name="Trash" width={24} height={24} />}
                />
              )}
            </div>
          );
        },

        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <ReactTable
      isListPage={false}
      COLUMNS={COLUMNS}
      DATA={catalogData}
      totalCount={paginationData.totalCount}
      pageSize={paginationData.pageSize}
      pageIndex={paginationData.pageIndex}
      showEditColumns={false}
      showFilter={false}
      displaySearch={false}
      showPagination={false}
    />
  );
};

export default React.memo(CatalogList);
