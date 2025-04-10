import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import { IRequirementListActionModalsProps } from "@/types/product-seo-requirement/productSeoRequirement.type";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";

const RequirementListActionModals = ({
  isOpen,
  type,
  requirement,
  handleModalClose,
  handleDelete,
  handleStatusChange,
  isProductRequirement,
}: IRequirementListActionModalsProps) => {
  return (
    <>
      {/* Delete Modal */}
      {isOpen && type === "delete" && (
        <DeleteModal
          isOpen={type === "delete"}
          onClose={handleModalClose}
          title={`Delete ${isProductRequirement ? "Product" : "Seo"} Requirement`}
          itemName={`${isProductRequirement ? "product" : "seo"} requirement`}
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isOpen && type === "activeInactive" && (
        <StatusChangeModel
          isOpen={type === "activeInactive"}
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus: requirement!.recStatus === "A" ? "active" : "inactive",
            quantityName: `${isProductRequirement ? "product" : "seo"} requirement`,
            recordName: requirement!.name!,
          }}
          title="Change Status"
          message={`Do you want to change the status of this ${isProductRequirement ? "product" : "seo"} requirement?`}
        />
      )}

      {/* View History Modal */}
      {isOpen && type === "viewHistory" && (
        <ViewHistoryModal
          isOpen={isOpen && type === "viewHistory"}
          onClose={handleModalClose}
          historyData={DUMMY_VIEW_HISTORY_DATA}
          recordName={requirement!.name!}
        />
      )}
    </>
  );
};

export default RequirementListActionModals;
