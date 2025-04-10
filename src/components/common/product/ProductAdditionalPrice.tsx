"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import Checkbox from "@/components/Checkbox/Checkbox";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Input from "@/components/Input/Input";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { Textarea } from "@/components/Textarea/Textarea";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import { productAdditionalPriceValidationSchema } from "@/utils/validations/productAdditionalPrice.validation";
import productAdditionalPriceData from "@/mock-data/ProductAdditionalPrice.json";
import {
  IAdditionalProduct,
  IModalState,
  IModalType,
  IProductAdditionalPriceModalProps,
} from "@/types/products-database/productAdditionalPrice.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
const ProductAdditionalPrice = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState<IAdditionalProduct[]>(
    productAdditionalPriceData
  );
  const handleModalOpen = useCallback((type: IModalType["type"]) => {
    setModalState({ isOpen: true, type: type as IModalType["type"] });
  }, []);

  const [modalState, setModalState] = useState<IModalState>({
    isOpen: false,
    type: null,
  });

  const columns: ITableColumn<IAdditionalProduct>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      enableSorting: false,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      enableSorting: false,
    },
    {
      id: "hideFromCustomer",
      header: "Hide From customer",
      accessorKey: "hideFromCustomer",
      enableSorting: false,
    },
    {
      id: "fundRaising",
      header: "Fund Raising",
      accessorKey: "fundRaising",
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Action",
      accessorKey: "actions",
      enableSorting: false,

      cell: (props) => {
        const product = props.row.original;
        return (
          <>
            <TableActionPanel
              edit={{
                onClick: () => {
                  handleModalOpen("edit");
                  setEditId(product.id);
                },
                show: true,
              }}
              remove={{
                show: true,
                onClick: () => setOpenDeleteModal(true),
              }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="border rounded-none border-gray-light dark:border-gray-dark">
      <ContentHeader name="Product Additional Price">
        <Button variant="primary" onClick={() => handleModalOpen("add")}>
          Add Product Additional Price
        </Button>
      </ContentHeader>

      <ProductAdditionalPriceModal
        isOpen={
          modalState.isOpen &&
          (modalState.type === "add" || modalState.type === "edit")
        }
        setModalState={setModalState}
        setEditId={setEditId}
        editId={editId}
      />
      <div>
        <ReactTable
          COLUMNS={columns}
          DATA={data}
          isListPage={false}
          showFilter={false}
          displaySearch={false}
          showPagination={false}
        />
        {openDeleteModal && (
          <DeleteModal
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={() => {
              setOpenDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default ProductAdditionalPrice;

const ProductAdditionalPriceModal = ({
  isOpen,
  editId,
  setModalState,
  setEditId,
}: IProductAdditionalPriceModalProps) => {
  const formikRef = useRef<FormikProps<IAdditionalProduct>>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<IAdditionalProduct | null>(null);

  const initialValues: IAdditionalProduct = {
    id: selectedProduct?.id || 0,
    name: selectedProduct?.name || "",
    amount: selectedProduct?.amount || 0,
    description: selectedProduct?.description || "",
    hideFromCustomer: selectedProduct?.hideFromCustomer || false,
    fundRaising: selectedProduct?.fundRaising || false,
  };
  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (!editId) return;
    try {
      setSelectedProduct(
        productAdditionalPriceData.filter(
          (item) => item.id === Number(editId)
        )[0] || null
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, [editId]);

  const handleSubmit = async (values: IAdditionalProduct) => {
    handleModalClose();
  };
  return (
    <div>
      <Modal
        size="2xl"
        header={`${editId ? "Edit" : "Add"} Product Additional Price`}
        isOpen={isOpen}
        onClose={handleModalClose}
        content={
          <div>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={productAdditionalPriceValidationSchema}
              innerRef={formikRef}
            >
              {({ errors }) => {
                return (
                  <FormikForm id="productAdditionalPriceForm">
                    <div className="gap-4 flex flex-col">
                      <Input
                        name="name"
                        label="Name"
                        placeholder="Enter name"
                        asterisk
                        errorMessage={errors.name}
                      />
                      <Input
                        name="amount"
                        label="Amount"
                        placeholder="Enter amount"
                        asterisk
                        errorMessage={errors.amount}
                      />
                      <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                      />
                      <Checkbox
                        id="isRequired"
                        label="Hide From customer "
                        name="hideFromCustomer"
                      />
                      <Checkbox
                        id="isRequired"
                        label="Fund Raising"
                        name="fundRaising"
                      />
                    </div>
                  </FormikForm>
                );
              }}
            </Formik>
          </div>
        }
        footer={
          <div className="flex gap-2">
            <Button variant="outline-secondary" onClick={handleModalClose}>
              cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              form="productAdditionalPriceForm"
            >
              save
            </Button>
          </div>
        }
      />
    </div>
  );
};
