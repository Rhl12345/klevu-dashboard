"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import Image from "@/components/Image/Image";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import catalogData from "@/mock-data/storeBrandData.json";
import CatalogModal from "@/admin-pages/store-brand/components/CatalogModal";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import { ICatalogData } from "@/types/store-brand/storeBrand.type";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";

const Catalog = ({ brandId }: { brandId: number }) => {
  const [isModalOpen, setIsModalOpen] = useState<{
    type: "catalog" | "delete" | null;
    isOpen: boolean;
  }>({
    type: null,
    isOpen: false,
  });
  const [selectedCatalog, setSelectedCatalog] = useState<ICatalogData | null>(
    null
  );

  const handleClick = (catalog: ICatalogData) => {
    setSelectedCatalog(catalog);
    handleOpen("catalog");
  };

  const handleOpen = (type: "catalog" | "delete") => {
    setIsModalOpen({
      type,
      isOpen: true,
    });
  };

  const handleClose = () => {
    setIsModalOpen({
      type: null,
      isOpen: false,
    });
  };

  const COLUMNS: ITableColumn<ICatalogData>[] = useMemo(
    () => [
      {
        id: "catalogName",
        header: "Catalog Name",
        accessorKey: "catalogName",
        enableSorting: false,
      },
      {
        id: "catalogLogo",
        header: "Catalog Logo",
        accessorKey: "catalogLogo",
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <Image
                  src={row?.original?.catalogLogo}
                  alt={`${row?.original?.catalogLogo}'s avatar`}
                  height={10}
                  width={10}
                  aspectRatio="landscape"
                  objectFit="contain"
                  rounded="sm"
                  variant="next"
                />
              </div>
            </div>
          );
        },
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
        id: "displayOrder",
        header: "Display Order",
        accessorKey: "displayOrder",
        enableSorting: false,
      },
      {
        id: "action",
        header: "Actions",
        accessorKey: "action",
        cell: (props: { row: { original: ICatalogData } }) => {
          const catalogConfig = props.row.original;
          return (
            <div className="flex gap-2">
              <TableActionPanel
                edit={{
                  show: true,
                  onClick: () => handleClick(catalogConfig),
                }}
                collapsible={false}
              />
              {catalogConfig.recStatus !== "R" && (
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  title="Delete Catalog"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleOpen("delete");
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
    []
  );

  return (
    <>
      <div>
        <ContentPageHeader name="Catalog Changes">
          <Button
            onClick={() => handleClick({} as ICatalogData)}
            variant="primary"
            size="sm"
          >
            Add Catalog
          </Button>
        </ContentPageHeader>

        <ReactTable
          COLUMNS={COLUMNS}
          DATA={catalogData.catalogData}
          showEditColumns={false}
          showFilter={false}
          displaySearch={false}
          showPagination={false}
          isListPage={false}
        />
      </div>

      <CatalogModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "catalog"}
        onClose={handleClose}
        data={selectedCatalog as ICatalogData}
        catalogId={selectedCatalog?.displayOrder as number}
      />

      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleClose}
        onDelete={handleClose}
        title="Delete Catalog"
        itemName="Catalog"
      />
    </>
  );
};

export default Catalog;
