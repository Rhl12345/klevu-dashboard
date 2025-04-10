import React, { useState, memo } from "react";
import { FieldArray, useFormikContext } from "formik";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import SizeTable from "@/admin-pages/size-master/create/components/SizeTable";
import AddSizeModal from "@/admin-pages/size-master/create/components/AddSizeModal";
import {
  ISizeMasterFormValues,
  ISizeModalValues,
} from "@/types/sizemaster/sizemaster.type";
import { toast } from "react-toastify";
import { Label } from "@/components/Label/Label";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import DeleteModal from "@/components/Modal/DeleteModal";

const AddSizeFieldArray: React.FC = () => {
  const [editSize, setEditSize] = useState<ISizeModalValues | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { values } = useFormikContext<ISizeMasterFormValues>();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );

  const handleAddSize = () => {
    try {
      setOpenModal(true);
      setEditSize(null);
    } catch (err) {
      toast.error("Failed to add size. Please try again.");
    }
  };

  const handleEditSize = (size: ISizeModalValues) => {
    try {
      setOpenModal(true);
      setEditSize(size);
    } catch (err) {
      toast.error("Failed to edit size. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <ContentPageHeader name="Product Size">
        <Button
          type="button"
          onClick={handleAddSize}
          size="sm"
          variant="primary"
          aria-label="Add a new size"
        >
          <div className="flex items-center gap-2">
            <SvgIcon name="PlusIcon" />
            Add Size
          </div>
        </Button>
      </ContentPageHeader>

      <FieldArray
        name="sizes"
        render={(arrayHelpers) => {
          const handleDeleteSize = () => {
            try {
              if (selectedSizeIndex !== null) {
                arrayHelpers.remove(selectedSizeIndex);
                setSelectedSizeIndex(null);
                setOpenDeleteModal(false);
                toast.success("Size deleted successfully.");
              }
            } catch (err) {
              toast.error("Failed to delete size. Please try again.");
            }
          };

          return (
            <div>
              {values.sizes && values.sizes.length > 0 ? (
                <SizeTable
                  sizes={values.sizes}
                  onEdit={handleEditSize}
                  onRemove={(index: number) => {
                    setSelectedSizeIndex(index);
                    setOpenDeleteModal(true);
                  }}
                />
              ) : (
                <div className="w-full rounded-none p-4 lg:p-6">
                  <div className="text-center py-8 content border-2 border-dashed border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
                    <Label>No sizes added yet</Label>
                  </div>
                </div>
              )}

              <DeleteModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Delete Size"
                itemName="Size"
                onDelete={handleDeleteSize}
              />
            </div>
          );
        }}
      />

      <AddSizeModal
        editSize={editSize}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default memo(AddSizeFieldArray);
