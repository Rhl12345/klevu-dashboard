import Input from "@/components/Input/Input";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { IProductTableProps } from "@/types/customer-quote/customerQuote.type";

const ProductTable = ({
  products = [],
  onQuantityChange,
  onPriceChange,
  onNotesChange,
  onDelete,
  total,
}: IProductTableProps) => {
  const COLUMNS: ITableColumn[] = [
    {
      id: "productName",
      header: "Product Name",
      enableSorting: false,
      accessorKey: "name",
      cell: ({ row }: { row: any }) => (
        <Text size="sm">{row.original.name}</Text>
      ),
    },
    {
      id: "options",
      header: "Options",
      accessorKey: "options",
      cell: ({ row }: { row: any }) => <Text size="sm">{`Black , MD`}</Text>,
    },
    {
      id: "sku",
      header: "SKU",
      accessorKey: "sku",
    },
    {
      id: "quantity",
      header: "QTY",
      accessorKey: "quantity",
      cell: ({ row }: { row: any }) => (
        <Input
          name={`customerQuoteProducts[${row.index}].quantity`}
          value={row.original.quantity}
          onChange={(e) => onQuantityChange(row.index, e.target.value)}
          inputMode="numeric"
        />
      ),
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      cell: ({ row }: { row: any }) => (
        <Input
          name={`customerQuoteProducts[${row.index}].price`}
          value={row.original.price}
          onChange={(e) => onPriceChange(row.index, e.target.value)}
          inputMode="numeric"
        />
      ),
    },
    {
      id: "notes",
      header: "Notes",
      accessorKey: "notes",
      cell: ({ row }: { row: any }) => (
        <Input
          name={`customerQuoteProducts[${row.index}].notes`}
          value={row.original.notes}
          onChange={(e) => onNotesChange(row.index, e.target.value)}
          maxLength={255}
        />
      ),
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => (
        <SvgIcon name="Trash" onClick={() => onDelete(row.index)} />
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={products}
        totalCount={products.length}
        pageSize={10}
        isListPage={false}
        noData="No products found"
        showEditColumns={false}
        showFilter={false}
        displaySearch={false}
      />
      <div className="px-4 lg:px-6 pb-4">
        <Text size="lg">Total: ${total}</Text>
      </div>
    </div>
  );
};

export default ProductTable;
