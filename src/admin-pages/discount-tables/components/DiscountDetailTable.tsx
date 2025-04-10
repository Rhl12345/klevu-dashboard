import React, { useMemo } from "react";
import { CellContext, createColumnHelper, Row } from "@tanstack/react-table";
import {
  IDiscountDetail,
  IDiscountDetailTableProps,
} from "@/types/discount-table/discountDetail.type";
import ReactTable from "@/components/Table/ReactTable";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Button from "@/components/Button/Button";

/**
 * @file DiscountDetailTable.tsx
 * @description Table component for displaying discount details with editing capabilities.
 * Implements a reactive table with sorting, filtering, and action buttons.
 *
 * @component DiscountDetailTable
 * @requires React
 * @requires ReactTable - Table component
 * @requires Button - Custom button component
 * @requires SvgIcon - Icon component
 *
 * Features:
 * - Display discount ranges and percentages
 * - Edit/Delete functionality for rows
 * - Special handling for first/last rows
 * - Responsive table layout
 *
 * @typedef {Object} IDiscountDetailTableProps
 * @property {IDiscountDetail[]} discountData - Array of discount details
 * @property {Function} onEdit - Edit handler function
 * @property {Function} onDelete - Delete handler function
 * @property {boolean} isAddMode - Table add mode flag
 */

/**
 * DiscountDetailTable Component
 * Displays a table of discount details with editing and deletion capabilities
 *
 * @component
 * @param {IDiscountDetailTableProps} props - Component properties
 * @param {IDiscountDetail[]} props.discountData - Array of discount details to display
 * @param {Function} props.onEdit - Callback function when editing a row
 * @param {Function} props.onDelete - Callback function when deleting a row
 * @param {boolean} props.isAddMode - Flag indicating if the table is in add mode
 * @returns {JSX.Element}
 */
export const DiscountDetailTable = React.memo<IDiscountDetailTableProps>(
  ({ discountData, onEdit, onDelete, isAddMode }) => {
    // Create a column helper for type safety
    const columnHelper = createColumnHelper<IDiscountDetail>();

    // Memoize columns configuration to prevent unnecessary re-renders
    // This is especially important for tables with many rows or complex column configurations
    const columns = useMemo(
      () => [
        // @discount-tables: Define minimum quantity column
        {
          id: "minQuantity",
          header: "Low Quantity",
          accessorKey: "minQuantity",
          enableSorting: false,
          cell: ({ getValue }: CellContext<IDiscountDetail, number>) =>
            getValue(),
        },
        // @discount-tables: Define maximum quantity column
        {
          id: "maxQuantity",
          header: "High Quantity",
          accessorKey: "maxQuantity",
          enableSorting: false,
          cell: ({ getValue }: CellContext<IDiscountDetail, number>) =>
            getValue(),
        },
        // @discount-tables: Define discount percentage column with % symbol
        {
          id: "discount",
          header: "Discount Percent",
          accessorKey: "discount",
          enableSorting: false,
          cell: ({ getValue }: CellContext<IDiscountDetail, number>) =>
            `${getValue()}%`,
        },
        // @discount-tables: Define actions column with edit/delete buttons
        {
          id: "actions",
          header: "Actions",
          accessorKey: "id",
          enableSorting: false,
          cell: ({ row }: { row: Row<IDiscountDetail> }) => {
            const index = row.index;
            // @discount-tables: Only allow deletion for first and last rows
            const isFirstOrLast =
              index === 0 || index === discountData.length - 1;

            return (
              <div className="relative text-center flex gap-2">
                <Button
                  type="button"
                  title="Edit"
                  variant="default"
                  onClick={() => onEdit(row.original.id, !isFirstOrLast)}
                  icon={<SvgIcon name="Edit" />}
                />
                {isFirstOrLast && (
                  <Button
                    type="button"
                    title="Delete"
                    variant="default"
                    onClick={() => onDelete(row.original)}
                    icon={<SvgIcon name="Trash" width={24} height={24} />}
                  />
                )}
              </div>
            );
          },
        },
      ],
      // @discount-tables: Recompute columns when data length changes (affects first/last row logic)
      [columnHelper, discountData.length, onEdit, onDelete]
    );

    // @discount-tables: Render table with memoized columns
    return (
      <>
        <ReactTable
          isListPage={false}
          COLUMNS={columns}
          DATA={discountData}
          totalCount={discountData.length}
          pageSize={discountData.length}
          pageIndex={1}
          displaySearch={false}
          showFilter={false}
          sortingOptions={[
            {
              field: "",
              direction: 0,
              priority: 0,
            },
          ]}
        />
      </>
    );
  }
);

// @discount-tables: Memoize the entire component to prevent unnecessary re-renders
export default DiscountDetailTable;
