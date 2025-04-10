import Button from "@/components/Button/Button";
import TableActionPanel from "@/components/common/TableActionPanel";
import DatePicker from "@/components/DatePicker/DatePicker";
import Dropdown from "@/components/DropDown/DropDown";
import Image from "@/components/Image/Image";
import InputNumber from "@/components/Input/InputNumber";
import { Label } from "@/components/Label/Label";
import Modal from "@/components/Modal/Modal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { IDropdownOption, ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { getProductInventoryData } from "@/services/product/productInventory.service";
import { IProductInventoryData } from "@/types/product/product.type";
import { getFormatDate } from "@/utils/date.util";
import { editInventoryValidationSchema } from "@/utils/validations/product.validation";
import { Row } from "@tanstack/react-table";
import { FieldArray, Form, Formik, FormikValues } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * Inventory Component
 *
 * A comprehensive component for managing product inventory, including current quantity
 * and future inventory projections. Supports vendor-specific inventory views and
 * inline editing capabilities.
 *
 * @component
 * @example
 * ```tsx
 * <Inventory
 *   vendorOptions={[{ label: 'Vendor 1', value: '1' }]}
 *   ecomSafetyQty={100}
 *   productId="prod_123"
 * />
 * ```
 *
 * @param {Object} props - Component props
 * @param {IDropdownOption[]} props.vendorOptions - Array of vendor options for filtering
 * @param {number} props.ecomSafetyQty - Default safety stock quantity for ecommerce
 * @param {string} props.productId - Unique identifier for the product
 *
 * @returns {JSX.Element} Rendered Inventory component
 */
const Inventory = ({
  vendorOptions,
  ecomSafetyQty,
  productId,
}: {
  vendorOptions: IDropdownOption[];
  ecomSafetyQty: number;
  productId: string;
}) => {
  const [inventory, setInventory] = useState(ecomSafetyQty);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IProductInventoryData[]>([]);

  const [selectedVendor, setSelectedVendor] = useState<IDropdownOption | null>(
    vendorOptions[0]
  );

  const [editInventoryModal, setEditInventoryModal] = useState<{
    isOpen: boolean;
    rowData: IProductInventoryData | null;
  }>({
    isOpen: false,
    rowData: null,
  });

  /**
   * Fetches inventory data for the selected vendor
   * @async
   * @function fetchInventoryData
   * @returns {Promise<void>}
   */
  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const data = await getProductInventoryData(
        productId,
        selectedVendor?.value?.toString() || "all"
      );
      setData(data);
    } catch (error) {
      toast.error("Error fetching inventory data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, [selectedVendor]);

  /**
   * Handles saving inventory changes from the edit modal
   * @function handleInventorySave
   * @param {FormikValues} values - Form values to be saved
   * @param {Object} formikHelpers - Formik helper functions
   */
  const handleInventorySave = (
    values: FormikValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      setData((prev) =>
        prev.map((item) =>
          item.id === editInventoryModal?.rowData?.parent
            ? {
                ...item,
                subRows: item.subRows?.map((subRow) =>
                  subRow.id === editInventoryModal?.rowData?.id
                    ? { ...subRow, ...values }
                    : subRow
                ),
              }
            : item
        )
      );
      toast.success("Inventory saved successfully");
      setEditInventoryModal({ isOpen: false, rowData: null });
    } catch (error) {
      toast.error("Error saving inventory");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  /**
   * Handles saving overall inventory changes
   * @function handleSave
   */
  const handleSave = () => {
    try {
      toast.success("Inventory data saved successfully");
    } catch (error) {
      toast.error("Error saving inventory");
    }
  };

  /**
   * Memoized table columns configuration
   * @type {ITableColumn<IProductInventoryData>[]}
   */
  const columns: ITableColumn<IProductInventoryData>[] = useMemo(() => {
    return [
      {
        id: "imageUrl",
        accessorKey: "imageUrl",
        header: "Image",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="w-full max-w-24">
            <Image
              alt={row.original.variant}
              src={row.original.imageUrl}
              objectFit="contain"
              variant="next"
              height={100}
              width={100}
            />
          </div>
        ),
      },
      {
        id: "variant",
        accessorKey: "variant",
        header: "Variant",
        enableSorting: false,
      },
      {
        id: "sku",
        accessorKey: "sku",
        header: "SKU",
        enableSorting: false,
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "Quantity",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) =>
          row.getParentRow()?.original?.id ? row?.original?.quantity : "",
      },
      {
        id: "futureInventoryDate",
        accessorKey: "futureInventory",
        header: "Future Inventory Date",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="flex flex-col gap-1">
            {row?.original?.futureInventory?.map((item, index) => (
              <div key={`date_${index}_${row.original.id}`}>
                {getFormatDate(item.date).date}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "futureInventoryQuantity",
        accessorKey: "futureInventory",
        header: "Future Inventory Quantity",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) => (
          <div className="flex flex-col gap-1">
            {row?.original?.futureInventory?.map((item, index) => (
              <div key={`quantity_${index}_${row.original.id}`}>
                {item.quantity}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: "actions",
        accessorKey: "actions",
        header: "Action",
        enableSorting: false,
        cell: ({ row }: { row: Row<IProductInventoryData> }) =>
          row.getParentRow()?.original?.id ? (
            <TableActionPanel
              collapsible={false}
              edit={{
                show: true,
                onClick: () =>
                  setEditInventoryModal({
                    isOpen: true,
                    rowData: row.original,
                  }),
              }}
            />
          ) : null,
      },
    ];
  }, []);

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark flex flex-col gap-4 p-4 lg:p-6 ">
      <div className="flex justify-between">
        <Text size="lg">Inventory</Text>
        <Button variant="primary" size="sm" onClick={() => handleSave()}>
          Save
        </Button>
      </div>

      <InputNumber
        name="safetyQty"
        label="Ecomm Safety Qty"
        onChange={(event) =>
          setInventory(+event.target.value < 0 ? 0 : +event.target.value)
        }
        value={inventory}
        formik={false}
      />

      <div className="flex justify-end">
        <Dropdown
          options={vendorOptions}
          onChange={(option) => setSelectedVendor(option as IDropdownOption)}
          value={selectedVendor}
        />
      </div>

      <ReactTable
        COLUMNS={columns}
        DATA={data}
        isListPage={false}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        getRowCanExpand={(row) => row.original?.subRows?.length > 0}
        loading={loading}
        usedInsideModal
      />

      {editInventoryModal.isOpen && (
        <Modal
          isOpen={editInventoryModal.isOpen}
          onClose={() =>
            setEditInventoryModal({ isOpen: false, rowData: null })
          }
          size="2xl"
          header={`Edit Inventory for ${editInventoryModal?.rowData?.variant}`}
          content={
            <Formik
              initialValues={{
                quantity: editInventoryModal?.rowData?.quantity,
                futureInventory: editInventoryModal?.rowData
                  ?.futureInventory || [{ date: null, quantity: 0 }],
              }}
              validationSchema={editInventoryValidationSchema}
              onSubmit={handleInventorySave}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <Form id="edit-inventory-form" onSubmit={handleSubmit}>
                  <InputNumber
                    name="quantity"
                    label="Quantity"
                    value={values.quantity}
                    onChange={(event) => {
                      setFieldValue(
                        "quantity",
                        isNaN(+event.target.value) ? 0 : +event.target.value
                      );
                    }}
                    displayError
                  />
                  <FieldArray
                    name="futureInventory"
                    render={(arrayHelpers) => (
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center justify-between">
                          <Text size="base">Future Inventory</Text>
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({ date: null, quantity: 0 })
                            }
                            variant="outline-primary"
                          >
                            Add Future Inventory
                          </Button>
                        </div>

                        {values.futureInventory?.map((_, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-1">
                              <DatePicker
                                name={`futureInventory.${index}.date`}
                                label="Date"
                                minDate={new Date()}
                                popperClassName="!z-50"
                                defaultDate={
                                  values.futureInventory[index].date
                                    ? new Date(
                                        values.futureInventory[index].date
                                      )
                                    : null
                                }
                              />
                            </div>
                            <div className="flex-1">
                              <InputNumber
                                name={`futureInventory.${index}.quantity`}
                                value={values.futureInventory[index].quantity}
                                onChange={(event) =>
                                  setFieldValue(
                                    `futureInventory.${index}.quantity`,
                                    isNaN(+event.target.value)
                                      ? 0
                                      : +event.target.value
                                  )
                                }
                                label="Quantity"
                                displayError
                              />
                            </div>

                            <div className="flex flex-col min-h-10 gap-2">
                              <Label>&nbsp;</Label>
                              <Button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                variant="default"
                                icon={
                                  <SvgIcon
                                    name="Trash"
                                    width={24}
                                    height={24}
                                  />
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </Form>
              )}
            </Formik>
          }
          footer={
            <div className="flex items-center justify-end space-x-2 ">
              <Button
                type="button"
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  setEditInventoryModal({
                    rowData: null,
                    isOpen: false,
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                form="edit-inventory-form"
              >
                Save
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Inventory;
