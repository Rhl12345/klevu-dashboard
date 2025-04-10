"use client";
import React, { useCallback, useState } from "react";
import { PRODUCT_FEEDS } from "@/types/products-database/productDatabase.type";
import { PageRoutes } from "@/admin-pages/routes";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { IDropdownOption, ITableColumn } from "@/components/Table/types";
import DateCell from "@/components/common/DateCell";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import {
  IManualBrandInventoryItem,
  IModalOpen,
} from "@/types/manual-brand-inventory/manualBrandInventory.type";
import { getManualBrandInventoryList } from "@/services/manual-brand-inventory/manualBrandInventory.service";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Button from "@/components/Button/Button";
import { brandOptions, vendorOptions } from "@/utils/Dummy";
import Modal from "@/components/Modal/Modal";
import { Form, Formik } from "formik";
import Input from "@/components/Input/Input";
import {
  ImportExportManualBrandInventorySchema,
  UploadBrandInventorySchema,
} from "@/utils/validations/manualBrandInventory.validaton";
import { STATUS_OPTIONS } from "@/constants/product-database/fields.constant";
import Text from "@/components/Text/Text";
import { getFormatDate } from "@/utils/date.util";

const initialValues = {
  brand: "",
  brandInventoryFile: "",
};

const importExportInitialValues = {
  brand: "",
  vendor: "",
  recStatus: "",
};

const ManualBrandInventory = ({ type }: { type: PRODUCT_FEEDS }) => {
  const [data, setData] = useState<IManualBrandInventoryItem[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [isModalOpen, setIsModalOpen] = useState<IModalOpen>({
    isOpen: false,
    type: null,
  });

  const dateConfig = getFormatDate(new Date().toISOString());

  const columns: ITableColumn<IManualBrandInventoryItem>[] = [
    {
      id: "systemSKU",
      header: "SystemSKU",
      accessorKey: "systemSKU",
    },
    {
      id: "brand",
      header: "Brand",
      accessorKey: "brand",
    },
    {
      id: "vendor",
      header: "Vendor",
      accessorKey: "vendor",
    },
    {
      id: "style",
      header: "Style",
      accessorKey: "style",
      cell: ({ getValue }) => {
        return getValue() || null;
      },
    },
    {
      id: "color",
      header: "Color",
      accessorKey: "color",
    },
    {
      id: "size",
      header: "Size",
      accessorKey: "size",
    },
    {
      id: "actualInventory",
      header: "Vendor Inventory",
      accessorKey: "actualInventory",
      cell: ({ getValue }) => {
        return getValue() || 0;
      },
    },
    {
      id: "bufferInventory",
      header: "Buffer Inventory",
      accessorKey: "bufferInventory",
      cell: ({ getValue }) => {
        return getValue() || 0;
      },
    },
    {
      id: "navInventory",
      header: "BC Inventory",
      accessorKey: "navInventory",
      cell: ({ getValue }) => {
        return getValue() || 0;
      },
    },
    {
      id: "totalInventory",
      header: "Inventory",
      accessorKey: "totalInventory",
      cell: ({ getValue }) => {
        return getValue() || 0;
      },
    },
    {
      id: "log",
      header: "log",
      accessorKey: "log",
      cell: ({ getValue }) => {
        return getValue() || null;
      },
    },
    {
      id: "modifiedDate",
      header: "Date/Time Of Update",
      accessorKey: "updateOn",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
  ];

  const fetchManualBrandInventoryList = async () => {
    try {
      setIsLoading(true);
      const response = await getManualBrandInventoryList();
      setData(response.items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const setPaginationDataFunc = (key: string, value: number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOpenModal = (type: IModalOpen["type"]) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  const onUploadBrandInventorySubmit = async (values: typeof initialValues) => {
    try {
      toast.success("Brand inventory uploaded successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onImportExportManualBrandInventorySubmit = async (
    values: typeof importExportInitialValues
  ) => {
    try {
      toast.success("Manual brand inventory imported/exported successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDropdownChange = useCallback(
    (fieldName: string, setFieldValue: (field: string, value: any) => void) => {
      return (e: unknown) => {
        setFieldValue(fieldName, (e as IDropdownOption)?.value ?? "");
      };
    },
    []
  );

  return (
    <>
      <ListPageHeader
        moduleName={`Manual Brand Inventory`}
        showBackButton
        navigateUrl={PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.LIST}
      >
        <Dropdown
          id="brandId"
          name="brandId"
          options={brandOptions}
          placeholder="Select Brand"
        />
        <Button
          variant="primary"
          onClick={() => handleOpenModal("uploadBrandInventory")}
        >
          Upload Brand Inventory
        </Button>
        <Button
          variant="primary"
          onClick={() => handleOpenModal("importExportManualBrandInventory")}
        >
          Import/Export Manual Brand Inventory
        </Button>
      </ListPageHeader>

      <Text
        size="base"
        className="flex justify-between pt-4 xl:px-8 px-4 lg:pt-8"
      >
        PROCESSED On {dateConfig.date} {dateConfig.time}
      </Text>

      <ReactTable
        loading={isLoading}
        DATA={data}
        COLUMNS={columns}
        fetchData={fetchManualBrandInventoryList}
        sortingOptions={[]}
        setSortingOptionHandler={() => {}}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showEditColumns={false}
        showFilter={false}
        globalFilter={globalFilter}
        totalPages={data.length}
        setGlobalFilter={setGlobalFilter}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />

      <Modal
        header="Upload Brand Inventory"
        contentClassName="overflow-inherit"
        footerClassName="z-0"
        isOpen={
          isModalOpen.isOpen && isModalOpen.type === "uploadBrandInventory"
        }
        onClose={handleCloseModal}
        content={
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onUploadBrandInventorySubmit}
            validationSchema={UploadBrandInventorySchema}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form id="uploadBrandInventoryForm">
                  <div className="w-full mb-4 last:mb-0">
                    <Dropdown
                      isClearable
                      label="Brand"
                      asterisk
                      name="brand"
                      id="brand-inventory"
                      value={brandOptions.find(
                        (option) => option.value === values.brand
                      )}
                      onChange={handleDropdownChange("brand", setFieldValue)}
                      options={brandOptions}
                      placeholder="Select Brand"
                      displayError
                      isFormikField
                    />
                  </div>
                  <div className="w-full mb-4 last:mb-0">
                    <Input label="File" type="file" name="brandInventoryFile" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
        footer={
          <>
            <Button variant="outline-primary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="uploadBrandInventoryForm"
              variant="primary"
            >
              Save
            </Button>
          </>
        }
      />

      <Modal
        header="Import/Export Manual Brand Inventory"
        contentClassName="overflow-inherit"
        footerClassName="z-0"
        isOpen={
          isModalOpen.isOpen &&
          isModalOpen.type === "importExportManualBrandInventory"
        }
        onClose={handleCloseModal}
        content={
          <Formik
            enableReinitialize
            initialValues={importExportInitialValues}
            onSubmit={onImportExportManualBrandInventorySubmit}
            validationSchema={ImportExportManualBrandInventorySchema}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form id="importExportManualBrandInventoryForm">
                  <div className="w-full mb-4 last:mb-0">
                    <Dropdown
                      id="brand-name"
                      label="Brand Name"
                      asterisk
                      name="brand"
                      options={brandOptions}
                      placeholder="Select Brand"
                      isClearable
                      value={brandOptions.find(
                        (option) => option.value === values.brand
                      )}
                      onChange={handleDropdownChange("brand", setFieldValue)}
                      displayError
                      isFormikField
                    />
                  </div>

                  <div className="w-full mb-4 last:mb-0">
                    <Dropdown
                      id="vendor"
                      label="Vendor Name"
                      asterisk
                      name="vendor"
                      options={vendorOptions}
                      placeholder="Select Vendor"
                      isClearable
                      value={vendorOptions.find(
                        (option) => option.value === values.vendor
                      )}
                      onChange={handleDropdownChange("vendor", setFieldValue)}
                      displayError
                      isFormikField
                    />
                  </div>

                  <div className="w-full mb-4 last:mb-0">
                    <Dropdown
                      id="recStatus"
                      label="Status"
                      asterisk
                      name="recStatus"
                      options={STATUS_OPTIONS}
                      placeholder="Select Record Status"
                      isClearable
                      value={STATUS_OPTIONS.find(
                        (option) => option.value === values.recStatus
                      )}
                      onChange={handleDropdownChange(
                        "recStatus",
                        setFieldValue
                      )}
                      displayError
                      isFormikField
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
        footer={
          <>
            <Button variant="outline-primary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="importExportManualBrandInventoryForm"
              variant="primary"
            >
              Download
            </Button>
          </>
        }
      />
    </>
  );
};

export default ManualBrandInventory;
