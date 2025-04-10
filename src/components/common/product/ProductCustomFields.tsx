"use client";

import React, { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import Checkbox from "@/components/Checkbox/Checkbox";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Input from "@/components/Input/Input";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import productCustomFieldsData from "@/mock-data/productCustomFieldsTab.json";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import { IProductCustomFields } from "@/types/products-database/productCustomFieldsTab.type";
import { productCustomFieldsTabValidation } from "@/utils/validations/productCustomFieldsTab.validation";

const ProductCustomFields = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const initialValues: IProductCustomFields = {
    name: "",
    require: "",
    extraPrice: "",
    changePerCharacter: "",
    makeExclusive: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "edit" | "add" | null;
  }>({ isOpen: false, type: null });

  const handleModalOpen = (
    type: "edit" | "add" | null,
    product?: IProductCustomFields
  ) => {
    if (type === "edit" && product) {
      setFormData(product);
    } else {
      setFormData(initialValues);
    }
    setIsModalOpen({ isOpen: true, type });
  };

  const columns: ITableColumn<IProductCustomFields>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
    },
    {
      id: "require",
      header: "Require",
      accessorKey: "require",
      enableSorting: false,
    },
    {
      id: "extraPrice",
      header: "Extra Price",
      accessorKey: "extraPrice",
      enableSorting: false,
    },
    {
      id: "changePerCharacter",
      header: "Change Per Character",
      accessorKey: "changePerCharacter",
      enableSorting: false,
    },
    {
      id: "makeExclusive",
      header: "Make Exclusive",
      accessorKey: "makeExclusive",
      enableSorting: false,
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => handleModalOpen("edit", row.original),
            }}
            remove={{
              show: true,
              onClick: () => setOpenDeleteModal(true),
            }}
          />
        );
      },
    },
  ];
  return (
    <>
      <div className="border rounded-none border-gray-light dark:border-gray-dark">
        <ContentHeader name="Product Custom Fields">
          <Button variant="primary" onClick={() => handleModalOpen("add")}>
            Add Product Custom Field
          </Button>
        </ContentHeader>

        <ReactTable
          COLUMNS={columns}
          DATA={productCustomFieldsData.productCustomFieldsData}
          isListPage={false}
          showFilter={false}
          displaySearch={false}
          showPagination={false}
        />

        <Modal
          header={`${isModalOpen.type === "add" ? "Add" : "Edit"} Product Custom Field`}
          isOpen={isModalOpen.isOpen}
          onClose={() => setIsModalOpen({ isOpen: false, type: null })}
          content={
            <Formik
              initialValues={formData}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={productCustomFieldsTabValidation}
            >
              {({ values, errors }) => {
                return (
                  <FormikForm
                    id="product-custom-field-form"
                    className="flex flex-col gap-4"
                  >
                    <Input
                      name="name"
                      label="Name"
                      placeholder="Enter name"
                      asterisk
                    />
                    <Checkbox id="require" label="Require" name="require" />
                    <Input
                      name="extraPrice"
                      label="Extra Price"
                      placeholder="Enter extra price"
                      asterisk
                    />
                    <Checkbox
                      id="changePerCharacter"
                      label="Change Per Character ?"
                      name="changePerCharacter"
                    />
                    <Checkbox
                      id="makeExclusive"
                      label="Make Exclusive ?"
                      name="makeExclusive"
                    />
                  </FormikForm>
                );
              }}
            </Formik>
          }
          footer={
            <>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => setIsModalOpen({ isOpen: false, type: null })}
              >
                Cancel
              </Button>
              <Button
                form="product-custom-field-form"
                type="submit"
                variant="primary"
              >
                Save
              </Button>
            </>
          }
        />
      </div>

      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title="Delete"
          itemName="Product Custom Field"
          onDelete={() => {
            setOpenDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductCustomFields;
