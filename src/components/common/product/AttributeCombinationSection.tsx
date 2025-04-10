import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import Input from "@/components/Input/Input";
import InputNumber from "@/components/Input/InputNumber";
import StatusChangeModel from "@/components/Modal/StatusModal";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { IAttributeCombination } from "@/types/product/product.type";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { getErrorMessage } from "@/utils/common.util";
import { Row } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

/**
 * AttributeCombinationSection component displays and manages product attribute combinations
 * in a table format. It allows editing of various attributes like price, quantity, and UPC/GTIN
 * codes for product variants.
 *
 * @component
 * @param {Object} props - Component props
 * @param {IAttributeCombination[]} props.attributeCombinationData - Array of attribute combinations data
 * @param {PRODUCT_FEEDS} props.feedType - Type of product feed (CORE_PRODUCT_FEED or PRODUCT_FEED)
 *
 * @example
 * ```tsx
 * <AttributeCombinationSection
 *   attributeCombinationData={attributeData}
 *   feedType={PRODUCT_FEEDS.PRODUCT_FEED}
 * />
 * ```
 */
const AttributeCombinationSection = ({
  attributeCombinationData,
  feedType,
}: {
  attributeCombinationData: IAttributeCombination[];
  feedType: PRODUCT_FEEDS | STORE_TYPES;
}) => {
  const [data, setData] = useState<IAttributeCombination[]>(
    attributeCombinationData
  );

  const [activeInactiveModal, setActiveInactiveModal] = useState<{
    isOpen: boolean;
    rowData: IAttributeCombination | null;
  }>({
    isOpen: false,
    rowData: null,
  });

  /**
   * Handles changes to input fields in the attribute combination table
   * @param {string} rowId - ID of the row being edited
   * @param {string | undefined} parentId - ID of the parent row (if editing a child row)
   * @param {keyof IAttributeCombination} field - Field being edited
   * @param {string | number} value - New value for the field
   */
  const handleInputChange = useCallback(
    (
      rowId: string,
      parentId: string | undefined,
      field: keyof IAttributeCombination,
      value: string | number
    ) => {
      setData((prevData) => {
        return prevData.map((item) => {
          if (parentId) {
            if (item.id === parentId && item.subRows) {
              return {
                ...item,
                subRows: item.subRows.map((subRow) =>
                  subRow.id === rowId ? { ...subRow, [field]: value } : subRow
                ),
              };
            }
          } else {
            if (item.id === rowId) {
              return { ...item, [field]: value };
            }
          }
          return item;
        });
      });
    },
    []
  );

  /**
   * Renders an input cell in the table
   * @param {Object} params - Cell render parameters
   * @param {Row<IAttributeCombination>} params.row - Row data
   * @param {keyof IAttributeCombination} params.field - Field to render
   * @param {'text' | 'number'} [params.type='number'] - Input type
   */
  const renderInputCell = useCallback(
    ({
      row,
      field,
      type = "number",
    }: {
      row: any;
      field: keyof IAttributeCombination;
      type?: "text" | "number";
    }) => {
      const value = row.original[field] || "";
      const isParentRow = row.getCanExpand();
      const parentId = row.getParentRow()?.original?.id;

      if ((field === "additionalPrice" || field === "upcGtin") && isParentRow) {
        return value || "";
      }

      if (
        (field === "minQuantity" || field === "multipleQuantity") &&
        !isParentRow
      ) {
        return "";
      }
      const InputComponent = type === "number" ? InputNumber : Input;

      return (
        <InputComponent
          key={`${field}-${row.original.id}`}
          name={`${field}-${row.original.id}`}
          value={value}
          type={type}
          disabled={feedType === PRODUCT_FEEDS.CORE_PRODUCT_FEED}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue =
              type === "number" ? +e.target.value : e.target.value;
            handleInputChange(row.original.id, parentId, field, newValue);
          }}
          formik={false}
          {...(type === "number" && {
            min: 0,
          })}
        />
      );
    },
    [handleInputChange, feedType]
  );

  const columns: ITableColumn<IAttributeCombination>[] = useMemo(() => {
    const commonColumns = [
      {
        id: "imageUrl",
        accessorKey: "imageUrl",
        header: "Image",
        enableSorting: false,
        cell: ({ row }: { row: Row<IAttributeCombination> }) => (
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
        id: "additionalPrice",
        accessorKey: "additionalPrice",
        header: "Additional Price ($)",
        enableSorting: false,
        cell: (props: any) =>
          renderInputCell({ ...props, field: "additionalPrice" }),
      },
      {
        id: "minQuantity",
        accessorKey: "minQuantity",
        header: "Min Quantity",
        enableSorting: false,
        cell: (props: any) =>
          renderInputCell({ ...props, field: "minQuantity" }),
      },
      {
        id: "multipleQuantity",
        accessorKey: "multipleQuantity",
        header: "Multiple Quantity",
        enableSorting: false,
        cell: (props: any) =>
          renderInputCell({ ...props, field: "multipleQuantity" }),
      },
      {
        id: "upcGtin",
        accessorKey: "upcGtin",
        header: "UPC/GTIN",
        enableSorting: false,
        cell: (props: any) =>
          renderInputCell({ ...props, field: "upcGtin", type: "text" }),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        enableSorting: false,
        cell: ({ row }: { row: Row<IAttributeCombination> }) => (
          <Status type={row.original.isActive ? "A" : "I"} />
        ),
      },
    ];

    if (feedType !== PRODUCT_FEEDS.CORE_PRODUCT_FEED) {
      return [
        ...commonColumns,
        {
          id: "actions",
          accessorKey: "actions",
          header: "Action",
          enableSorting: false,
          cell: ({ row }: { row: Row<IAttributeCombination> }) => (
            <Button
              variant="default"
              title={
                row.original.isActive ? "Toggle Inactive" : "Toggle Active"
              }
              icon={
                <SvgIcon
                  name={row.original.isActive ? "EyeClosed" : "EyeOpen"}
                />
              }
              onClick={() =>
                setActiveInactiveModal({
                  isOpen: true,
                  rowData: row.original,
                })
              }
            />
          ),
        },
      ];
    }

    return commonColumns;
  }, [renderInputCell, feedType]);

  /**
   * Saves the current attribute combination data
   * Validates for negative values before saving
   */
  const handleSave = () => {
    const hasNegativeValue = data.some((item) =>
      item.subRows?.some(
        (subRow) =>
          subRow.additionalPrice < 0 ||
          subRow.minQuantity < 0 ||
          subRow.multipleQuantity < 0
      )
    );
    if (hasNegativeValue) {
      toast.error("Negative value is not allowed");
      return;
    }
    toast.success("Attribute combination saved successfully");
  };

  /**
   * Handles the status change (active/inactive) for an attribute combination
   */
  const handleStatusChange = () => {
    try {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === activeInactiveModal.rowData!.id
            ? { ...item, isActive: !activeInactiveModal.rowData!.isActive }
            : item
        )
      );
      setActiveInactiveModal({
        isOpen: false,
        rowData: null,
      });
      toast.success("Attribute combination status changed successfully");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Error changing attribute combination status")
      );
    }
  };

  return (
    <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
      <div className="flex justify-between items-center px-4 lg:px-6 pt-4 xl:pt-6">
        <Text size="lg">Attribute Combination</Text>
        <Button variant="primary" size="sm" onClick={() => handleSave()}>
          Save
        </Button>
      </div>

      <ReactTable
        COLUMNS={columns}
        DATA={data}
        isListPage={false}
        showFilter={false}
        showPagination={false}
        displaySearch={false}
        getRowCanExpand={(row) => row.original.subRows?.length > 0}
      />

      {activeInactiveModal.isOpen && (
        <StatusChangeModel
          isOpen={activeInactiveModal.isOpen}
          onClose={() =>
            setActiveInactiveModal({
              isOpen: false,
              rowData: null,
            })
          }
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus: activeInactiveModal.rowData!.isActive
              ? "active"
              : "inactive",
            quantityName: "Attribute Combination",
            recordName: activeInactiveModal.rowData!.variant!,
          }}
          title="Change Status"
          message={`Do you want to change the status of this Attribute Combination?`}
        />
      )}
    </div>
  );
};

export default AttributeCombinationSection;
