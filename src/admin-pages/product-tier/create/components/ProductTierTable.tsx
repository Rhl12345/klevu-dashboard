import React, { useState, useMemo } from "react";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import EditTierModal from "@/admin-pages/product-tier/create/components/EditTierModal";
import ReactTable from "@/components/Table/ReactTable";
import {
  IEditTierFormValues,
  ITierRangeType,
} from "@/types/product-tier/productTier.type";
import { TierRange } from "@/utils/Dummy";
import DeleteModal from "@/components/Modal/DeleteModal";

const ProductTierTable = () => {
  const [editTier, setEditTier] = useState<IEditTierFormValues | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tierRange, setTierRange] = useState<ITierRangeType[]>(TierRange);
  const [selectedTier, setSelectedTier] = useState<ITierRangeType | null>(null);

  const handleEditTier = (tier: IEditTierFormValues) => {
    setOpenModal(true);
    setEditTier(tier);
  };

  const handleDeleteTier = (tier: ITierRangeType | null) => {
    if (tier) {
      setTierRange(prevTierRange => prevTierRange.filter(t => t.id !== tier.id));
    }
  };
  

  const COLUMNS: any = useMemo(
    () => [
      {
        id: "tierName",
        header: "Tier Name",
        accessorKey: "tierName",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "tierValue",
        header: "Tier Value",
        accessorKey: "tierValue",
        cell: (info: any) => info.getValue(),
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }: { row: any }) => (
          <div className="flex">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEditTier(row.original);
              }}
              title="Edit"
            >
              <SvgIcon name="Edit" className="size-6" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={(e) => {
                setSelectedTier(row.original);
                setOpenDeleteModal(true);
              }}
              title="Delete"
            >
              <SvgIcon name="Trash" className="size-6 " />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <ReactTable
        isListPage={false}
        COLUMNS={COLUMNS}
        DATA={tierRange}
        totalCount={tierRange.length}
        pageSize={tierRange.length}
        showFilter={false}
        showEditColumns={false}
        displaySearch={false}
        hasPageSize={false}
      />

      <EditTierModal
        editTier={editTier}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Delete Tier"
        itemName="Tier"
        onDelete={() => handleDeleteTier(selectedTier)}
      />
    </>
  );
};

export default ProductTierTable;
