"use client";
import CatalogList from "@/admin-pages/brand/components/CatalogList";
import Button from "@/components/Button/Button";
import LoadingSpinner from "@/components/common/Loader";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import DeleteModal from "@/components/Modal/DeleteModal";
import Modal from "@/components/Modal/Modal";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import brandsData from "@/mock-data/BrandData.json";
import CommonListData from "@/mock-data/CommonListData.json";
import {
  ICatalogData,
  ICatalogFormValues,
  ICatalogProps,
  IVendorItem,
} from "@/types/brand/brand.types";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { CatalogSchema } from "@/utils/validations/brand.validation";
import { Formik, Form as FormikForm } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const defaultCatalogData: ICatalogFormValues = {
  id: 0,
  brandId: 0,
  displayInFront: false,
  vendorId: "",
  catalogName: "",
  startDate: "",
  releasedDate: "",
  uploadCatalogURL: "",
  uploadCatalogName: "",
  isBrand: true,
  recStatus: "active",
  rowVersion: "",
};

// Custom hook for catalog management
const useCatalogManagement = (brandId: number | undefined) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [catalogData, setCatalogData] = useState<ICatalogData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] =
    useState<ICatalogFormValues>(defaultCatalogData);
  const [vendorOptions] = useState<IVendorItem[]>(
    CommonListData.vendorOptions.map((item) => ({
      label: item.label,
      value: Number(item.value),
    }))
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [catalogToDelete, setCatalogToDelete] = useState<ICatalogData | null>(
    null
  );

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    /* Currently as static and becomes dynamic after the API call.  */
    totalCount: 1,
  });

  const getCatalogData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Replace with actual API call
      const response = brandsData.catalogData;
      setCatalogData(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (brandId) {
      getCatalogData();
    }
  }, [brandId, getCatalogData]);

  const handleCatalogOperation = async (
    operation: "create" | "update" | "delete",
    values: ICatalogFormValues | ICatalogData
  ) => {
    try {
      setIsLoading(true);
      switch (operation) {
        case "create":
          // await createCatalog(values);
          toast.success("Catalog created successfully");
          break;
        case "update":
          // await updateCatalog(values);
          toast.success("Catalog updated successfully");
          break;
        case "delete":
          // await deleteCatalog(values);
          toast.success("Catalog deleted successfully");
          break;
      }
      await getCatalogData();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingId,
    setEditingId,
    catalogData,
    isLoading,
    initialValues,
    setInitialValues,
    vendorOptions,
    openDeleteModal,
    setOpenDeleteModal,
    catalogToDelete,
    setCatalogToDelete,
    paginationData,
    handleCatalogOperation,
    getCatalogData,
  };
};

const Catalog = ({ vendorId, brandId, isAddMode, id }: ICatalogProps) => {
  const {
    isModalOpen,
    setIsModalOpen,
    editingId,
    setEditingId,
    catalogData,
    isLoading,
    initialValues,
    setInitialValues,
    vendorOptions,
    openDeleteModal,
    setOpenDeleteModal,
    catalogToDelete,
    setCatalogToDelete,
    paginationData,
    handleCatalogOperation,
  } = useCatalogManagement(brandId);

  const handleSubmit = async (values: ICatalogFormValues) => {
    await handleCatalogOperation(editingId ? "update" : "create", values);
    setIsModalOpen(false);
  };

  const handleEdit = useCallback(
    (id: number) => {
      const data = catalogData.find((item) => item.id === id);
      if (!data) return;

      setEditingId(id);
      setInitialValues({
        id: data?.id,
        brandId: data?.brandId,
        displayInFront: data?.displayInFront,
        vendorId: data?.vendorId.toString(),
        catalogName: data?.catalogName,
        startDate: data?.startDate,
        releasedDate: data?.releasedDate,
        uploadCatalogURL: data?.uploadCatalogURL,
        uploadCatalogName: data?.uploadCatalogName || "",
        isBrand: data?.isBrand || true,
        recStatus: data?.recStatus,
        rowVersion: data?.rowVersion,
      });
      setIsModalOpen(true);
    },
    [catalogData, setEditingId, setInitialValues, setIsModalOpen]
  );

  const handleDelete = async () => {
    if (catalogToDelete) {
      await handleCatalogOperation("delete", catalogToDelete);
      setOpenDeleteModal(false);
      setCatalogToDelete(null);
    }
  };

  const modalContent = (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={CatalogSchema}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ setFieldValue, values, handleSubmit: formikSubmit }) => (
        <FormikForm id="catalog-form" onSubmit={formikSubmit}>
          <div className="p-2 space-y-4">
            <div className="mb-4">
              <ToggleButton
                label="Display In Front"
                id="displayInFront"
                name="displayInFront"
                defaultValue={values?.displayInFront}
              />
            </div>

            <Dropdown
              label="Vendor"
              asterisk
              name="vendorId"
              options={vendorOptions}
              defaultValue={values?.vendorId}
              onChange={(newValue: unknown) =>
                setFieldValue(
                  "vendorId",
                  (newValue as IVendorItem)?.value || ""
                )
              }
            />

            <Input
              label="Catalog Name"
              name="catalogName"
              asterisk
              defaultValue={values?.catalogName}
            />

            <Input
              label="Start Date"
              name="startDate"
              type="date"
              asterisk
              defaultValue={values?.startDate}
            />

            <Input
              label="Release Date"
              name="releasedDate"
              type="date"
              asterisk
              defaultValue={values?.releasedDate}
            />

            <Input
              type="file"
              label="Upload Catalog"
              name="uploadCatalogURL"
              asterisk
              defaultValue={values?.uploadCatalogURL}
            />

            <Input label="Catalog File Name" name="uploadCatalogName" />
          </div>
        </FormikForm>
      )}
    </Formik>
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-6">
        <div className="w-full">
          <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
            <div className="w-full mb-6 last:mb-0">
              <div className="flex items-center justify-between lg:pt-6 lg:px-6 pt-4 px-4 pb-0">
                <Label>Catalog Changes</Label>
                <div>
                  <Button
                    type="button"
                    title="Add Catalog"
                    disabled={isAddMode}
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setEditingId(null);
                      setInitialValues(defaultCatalogData);
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="ml-1">Add Catalog</span>
                  </Button>
                </div>
              </div>

              <CatalogList
                catalogData={catalogData}
                onEdit={handleEdit}
                onDelete={(catalog: ICatalogData) => {
                  setCatalogToDelete(catalog);
                  setOpenDeleteModal(true);
                }}
                paginationData={paginationData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Catalog Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header={`${editingId ? "Edit" : "Add"} Catalog`}
        content={modalContent}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              form="catalog-form"
            >
              Save
            </Button>
          </div>
        }
      />

      {/* Delete Catalog Modal */}
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDelete}
        title="Delete Catalog"
        itemName="Catalog"
      />
    </>
  );
};

export default React.memo(Catalog);
