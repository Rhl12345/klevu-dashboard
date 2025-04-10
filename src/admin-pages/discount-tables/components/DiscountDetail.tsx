/**
 * @file DiscountDetail.tsx
 * @description Manages the detail view and operations for discount table entries.
 * Handles CRUD operations for individual discount ranges within a discount table.
 *
 * @component DiscountDetail
 * @requires React
 * @requires Formik - Form management
 * @requires Yup - Form validation
 * @requires Modal - Custom modal component
 * @requires DeleteModal - Custom delete confirmation modal
 *
 * Features:
 * - Add/Edit/Delete discount ranges
 * - Validation of discount values and ranges
 * - Real-time updates of discount table entries
 * - Status management for discount entries
 *
 * @typedef {Object} IDiscountDetailProps
 * @property {string} quantityId - ID of the parent discount table
 * @property {boolean} isAddMode - Flag indicating if component is in add mode
 */

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  IDiscountDetail,
  IDiscountDetailProps,
} from "@/types/discount-table/discountDetail.type";
import DiscountDetailTable from "@/admin-pages/discount-tables/components/DiscountDetailTable";
import {
  createDiscountsDetail,
  getDiscountsDetail,
  updateDiscountsDetail,
  updateMultipleStatus,
} from "@/services/discount-table/discountDetail.service";
import Modal from "@/components/Modal/Modal";
import { Formik, Form as FormikForm } from "formik";
import Button from "@/components/Button/Button";
import DeleteModal from "@/components/Modal/DeleteModal";
import { getErrorMessage } from "@/utils/common.util";
import { discountDetailValidationSchema } from "@/utils/validations/discountTable.validation";
import InputNumber from "@/components/Input/InputNumber";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";

const INITIAL_VALUES: IDiscountDetail = {
  id: "",
  quantityId: "",
  minQuantity: 0,
  maxQuantity: 0,
  discount: 0,
  discountType: "percent",
  recStatus: "A",
  createdDate: "",
  createdBy: "System",
  modifiedDate: "",
  modifiedBy: "",
  rowVersion: "1",
};

// Custom hook for discount detail management
const useDiscountDetailManagement = (
  quantityId: string | undefined,
  isAddMode: boolean
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [discountData, setDiscountData] = useState<IDiscountDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] =
    useState<IDiscountDetail>(INITIAL_VALUES);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState<IDiscountDetail | null>(
    null
  );

  const fetchDiscountDetails = useCallback(async () => {
    if (isAddMode || !quantityId) return;

    setIsLoading(true);
    try {
      const response = await getDiscountsDetail(quantityId, {
        pageIndex: 0,
        pageSize: 100,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "minQuantity",
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [],
      });

      if (response) {
        setDiscountData(response);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to fetch discount details"));
    } finally {
      setIsLoading(false);
    }
  }, [quantityId, isAddMode]);

  const handleDetailOperation = async (
    operation: "create" | "update" | "delete",
    values: IDiscountDetail
  ) => {
    setIsLoading(true);
    try {
      switch (operation) {
        case "create":
        case "update": {
          const service =
            operation === "update"
              ? updateDiscountsDetail
              : createDiscountsDetail;

          const response = await service({
            quantityDiscountDetailModel: {
              ...values,
              quantityId: quantityId || "",
            },
          });

          if (response) {
            toast.success(`Discount detail ${operation}d successfully`);
          }
          break;
        }
        case "delete": {
          const response = await updateMultipleStatus({
            args: {
              idsRowVersion: [
                { item1: values.id, item2: values.rowVersion || "" },
              ],
              status: "archived",
            },
          });

          if (response) {
            toast.success("Discount detail deleted successfully");
          }
          break;
        }
      }
      await fetchDiscountDetails();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to perform operation"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingId,
    setEditingId,
    discountData,
    isLoading,
    initialValues,
    setInitialValues,
    openDeleteModal,
    setOpenDeleteModal,
    detailToDelete,
    setDetailToDelete,
    fetchDiscountDetails,
    handleDetailOperation,
  };
};

const DiscountDetail = ({ quantityId, isAddMode }: IDiscountDetailProps) => {
  const {
    isModalOpen,
    setIsModalOpen,
    editingId,
    setEditingId,
    discountData,
    isLoading,
    initialValues,
    setInitialValues,
    openDeleteModal,
    setOpenDeleteModal,
    detailToDelete,
    setDetailToDelete,
    fetchDiscountDetails,
    handleDetailOperation,
  } = useDiscountDetailManagement(quantityId, isAddMode);

  useEffect(() => {
    fetchDiscountDetails();
  }, [fetchDiscountDetails]);

  const handleSubmit = async (values: IDiscountDetail) => {
    try {
      await handleDetailOperation(editingId ? "update" : "create", values);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save discount detail"));
    }
  };

  const handleEdit = useCallback(
    (id: string) => {
      const data = discountData.find((item) => item.id === id);
      if (!data) return;

      setEditingId(id);
      setInitialValues(data);
      setIsModalOpen(true);
    },
    [discountData, setEditingId, setInitialValues, setIsModalOpen]
  );

  const handleDelete = async () => {
    if (!detailToDelete) return;

    try {
      await handleDetailOperation("delete", detailToDelete);
      setOpenDeleteModal(false);
      setDetailToDelete(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete discount detail"));
    }
  };

  const modalContent = (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={discountDetailValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit: formikSubmit,
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
      }) => (
        <FormikForm id="discount-detail-form" onSubmit={formikSubmit}>
          <div className="space-y-4">
            <InputNumber
              label="Low Quantity"
              name="minQuantity"
              asterisk
              placeholder="Enter Low Quantity"
              defaultValue={values.minQuantity}
              displayError={!!errors.minQuantity && !!touched.minQuantity}
              onBlur={handleBlur}
              onValueChange={(values: { floatValue: number }) => {
                setFieldValue("minQuantity", values.floatValue);
              }}
            />

            <InputNumber
              label="High Quantity"
              name="maxQuantity"
              asterisk
              placeholder="Enter High Quantity"
              defaultValue={values.maxQuantity}
              displayError={!!errors.maxQuantity && !!touched.maxQuantity}
              onBlur={handleBlur}
              onValueChange={(values: { floatValue: number }) => {
                setFieldValue("maxQuantity", values.floatValue);
              }}
            />

            <InputNumber
              label="Discount Percent"
              name="discount"
              asterisk
              placeholder="Enter Discount Percent"
              defaultValue={values.discount}
              allowNegative={false}
              decimalScale={2}
              max={100}
              displayError={!!errors.discount && !!touched.discount}
              onBlur={handleBlur}
              onValueChange={(values: { floatValue: number }) => {
                setFieldValue("discount", values.floatValue);
              }}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );

  return (
    <>
      <div>
        <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
          <div className="w-full mb-6 last:mb-0">
            <ContentHeader name="Discount Detail">
              <Button
                type="button"
                title="Add Discount Detail"
                variant="primary"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setInitialValues(INITIAL_VALUES);
                  setIsModalOpen(true);
                }}
              >
                Add Discount Detail
              </Button>
            </ContentHeader>

            <DiscountDetailTable
              discountData={discountData}
              onEdit={handleEdit}
              onDelete={(detail) => {
                setDetailToDelete(detail);
                setOpenDeleteModal(true);
              }}
              isAddMode={isAddMode}
            />
          </div>
        </div>
      </div>

      {/* Add / Edit Discount Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header={`${editingId ? "Edit" : "Add"} Discount Detail`}
        content={modalContent}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              form="discount-detail-form"
            >
              Save
            </Button>
          </div>
        }
      />

      {/* Delete Discount Detail Modal */}
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        title="Delete Discount Detail"
        itemName="Discount Detail"
      />
    </>
  );
};

export default React.memo(DiscountDetail);
